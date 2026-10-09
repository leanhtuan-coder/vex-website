import { cp, mkdir, rm, readFile, realpath, lstat } from "node:fs/promises";
import { resolve, dirname, relative, isAbsolute } from "node:path";
const workspace = await realpath(resolve(import.meta.dirname, ".."));
const publicDirectory = resolve(workspace, "public");
if (dirname(publicDirectory) !== workspace)
  throw new Error("Invalid generated public directory");
try {
  const stats = await lstat(publicDirectory);
  if (
    stats.isSymbolicLink() ||
    !stats.isDirectory() ||
    (await realpath(publicDirectory)) !== publicDirectory
  )
    throw new Error(
      "Generated public resources require a regular workspace directory",
    );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
await rm(publicDirectory, { recursive: true, force: true });
await mkdir(resolve(publicDirectory, "assets"), { recursive: true });
// Copy only public website resources; internal PDFs never enter the build.
for (const file of [
  "assets/logo-color-tight.png",
  "assets/logo-white-tight.png",
  "assets/vex-logo.svg",
  "assets/vex-logo-white.svg",
  "assets/og-image.jpg",
  "assets/favicon.png",
  "assets/vex-favicon.svg",
  "assets/vex-favicon-32.png",
  "assets/vex-apple-touch-icon.png",
  "assets/vex-logo-favicon.svg",
  "assets/vex-logo-favicon-32.png",
  "assets/vex-logo-apple-touch-icon.png",
  "CNAME",
  "robots.txt",
  "THIRD_PARTY_UI_NOTICES.txt",
  "sitemap.xml",
  "logo.png",
  "favicon.png",
]) {
  await cp(resolve(workspace, file), resolve(publicDirectory, file));
}
const publication = JSON.parse(
  await readFile(resolve(workspace, "src/content/published.json"), "utf8"),
);
const assetsDirectory = await realpath(resolve(workspace, "assets"));
for (const image of publication.images) {
  if (
    !/^\/assets\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.(?:png|jpe?g|webp|avif|svg)$/.test(
      image,
    )
  )
    throw new Error("Invalid approved image path");
  const source = await realpath(resolve(workspace, image.slice(1)));
  const withinAssets = relative(assetsDirectory, source);
  if (
    !withinAssets ||
    withinAssets.startsWith("..") ||
    isAbsolute(withinAssets)
  )
    throw new Error("Approved image must remain inside assets");
  const destination = resolve(publicDirectory, image.slice(1));
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination);
}
for (const document of publication.documents || []) {
  if (
    document.approvedForPublication !== true ||
    document.contentState !== "VERIFIED" ||
    !/^\/assets\/documents\/public-[A-Za-z0-9_-]+\.pdf$/.test(document.href)
  )
    throw new Error("Invalid approved public document");
  const documentsDirectory = resolve(assetsDirectory, "documents");
  if ((await realpath(documentsDirectory)) !== documentsDirectory)
    throw new Error(
      "Public documents directory cannot be a symbolic link or junction",
    );
  const expectedSource = resolve(workspace, document.href.slice(1));
  const source = await realpath(expectedSource);
  const stats = await lstat(expectedSource);
  const withinDocuments = relative(documentsDirectory, source);
  if (
    !withinDocuments ||
    withinDocuments.startsWith("..") ||
    isAbsolute(withinDocuments) ||
    source !== expectedSource ||
    !stats.isFile() ||
    stats.isSymbolicLink() ||
    stats.size !== document.bytes
  )
    throw new Error(
      "Approved public document must match the measured regular asset file",
    );
  const destination = resolve(publicDirectory, document.href.slice(1));
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination);
}
