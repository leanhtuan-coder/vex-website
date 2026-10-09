import { build } from "vite";
import { Buffer } from "node:buffer";
import {
  lstat,
  mkdir,
  open,
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
  const {
    websiteContent,
    validatePublication,
    validateSvgMarkup,
    validatePdfSignature,
  } = await import(
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
  if (publication.documents.length > 0) {
    const expectedDocumentsDirectory = resolve(assetsDirectory, "documents");
    const documentsDirectory = await realpath(expectedDocumentsDirectory);
    const directoryStats = await lstat(expectedDocumentsDirectory);
    if (
      !directoryStats.isDirectory() ||
      directoryStats.isSymbolicLink() ||
      documentsDirectory !== expectedDocumentsDirectory
    )
      throw new Error(
        "Approved public documents require a regular assets/documents directory",
      );
    for (const document of publication.documents) {
      const expectedPath = resolve(workspace, document.href.slice(1));
      const resolvedPath = await realpath(expectedPath);
      const stats = await lstat(expectedPath);
      if (
        !staysInside(documentsDirectory, resolvedPath) ||
        resolvedPath !== expectedPath ||
        !stats.isFile() ||
        stats.isSymbolicLink() ||
        stats.size === 0
      )
        throw new Error(
          "Approved public documents must be nonempty regular files inside assets/documents",
        );
      const handle = await open(resolvedPath, "r");
      try {
        const header = Buffer.alloc(Math.min(16, stats.size));
        const trailer = Buffer.alloc(Math.min(1024, stats.size));
        await handle.read(header, 0, header.length, 0);
        await handle.read(
          trailer,
          0,
          trailer.length,
          stats.size - trailer.length,
        );
        validatePdfSignature(
          header.toString("latin1"),
          trailer.toString("latin1"),
        );
      } finally {
        await handle.close();
      }
      document.bytes = stats.size;
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
    `Published content for ${publication.asOfDate}: ${publication.articles.length} articles, ${publication.jobs.length} jobs, ${publication.projects.length} projects, ${publication.leadership.length} verified leaders, ${publication.documents.length} public documents, ${publication.images.length} approved images.`,
  );
} finally {
  await verifyTemporaryDirectory();
  await rm(temporaryDirectory, { recursive: true, force: true });
}
