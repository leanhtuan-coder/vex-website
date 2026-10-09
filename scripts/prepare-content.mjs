import { build } from "vite";
import {
  lstat,
  mkdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const workspace = await realpath(resolve(import.meta.dirname, ".."));
const temporaryDirectory = resolve(workspace, ".content-build");
const generatedFile = resolve(workspace, "src/content/published.json");
const sourceFile = resolve(workspace, "content/website.ts");
const asOfDate =
  process.env.VEX_CONTENT_DATE ||
  new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" }).format(
    new Date(),
  );

function staysInside(parent, child) {
  const path = relative(parent, child);
  return path !== "" && !path.startsWith("..") && !isAbsolute(path);
}

async function existingStat(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code === "ENOENT") return undefined;
    throw error;
  }
}

async function verifyTemporaryDirectory() {
  if (
    dirname(temporaryDirectory) !== workspace ||
    temporaryDirectory !== resolve(workspace, ".content-build")
  )
    throw new Error("Invalid generated content build directory");
  const stats = await existingStat(temporaryDirectory);
  if (
    stats &&
    (stats.isSymbolicLink() ||
      !stats.isDirectory() ||
      (await realpath(temporaryDirectory)) !== temporaryDirectory)
  )
    throw new Error(
      "Content build directory must be a regular workspace directory",
    );
}

// Validate the exact resolved target before each recursive cleanup, including
// rejection of symbolic links/junctions to a directory outside the workspace.
await verifyTemporaryDirectory();
await rm(temporaryDirectory, { recursive: true, force: true });
await mkdir(temporaryDirectory);
try {
  await build({
    configFile: false,
    root: workspace,
    publicDir: false,
    logLevel: "warn",
    build: {
      ssr: sourceFile,
      outDir: temporaryDirectory,
      emptyOutDir: false,
      sourcemap: false,
      minify: false,
      rollupOptions: { output: { entryFileNames: "website.mjs" } },
    },
  });
  const { websiteContent, validatePublication, validateSvgMarkup } =
    await import(
      pathToFileURL(resolve(temporaryDirectory, "website.mjs")).href
    );
  const publication = validatePublication(websiteContent, asOfDate);
  const assetsDirectory = await realpath(resolve(workspace, "assets"));
  for (const image of publication.images) {
    const expectedPath = resolve(workspace, image.slice(1));
    const resolvedPath = await realpath(expectedPath);
    if (!staysInside(assetsDirectory, resolvedPath))
      throw new Error(
        "Published images must resolve inside the website assets directory",
      );
    const stats = await lstat(expectedPath);
    if (!stats.isFile() || stats.isSymbolicLink())
      throw new Error("Published images must be regular website asset files");
    if (image.endsWith(".svg")) {
      const source = await readFile(resolvedPath, "utf8");
      validateSvgMarkup(source);
    }
  }
  const generatedDirectory = await realpath(dirname(generatedFile));
  if (!staysInside(workspace, generatedDirectory))
    throw new Error("Generated publication must remain inside the workspace");
  const outputStat = await existingStat(generatedFile);
  if (outputStat && (!outputStat.isFile() || outputStat.isSymbolicLink()))
    throw new Error("Generated publication must be a regular workspace file");
  await writeFile(generatedFile, `${JSON.stringify(publication, null, 2)}\n`);
  console.log(
    `Published content for ${publication.asOfDate}: ${publication.articles.length} articles, ${publication.jobs.length} jobs, ${publication.projects.length} projects, ${publication.images.length} approved images.`,
  );
} finally {
  await verifyTemporaryDirectory();
  await rm(temporaryDirectory, { recursive: true, force: true });
}
