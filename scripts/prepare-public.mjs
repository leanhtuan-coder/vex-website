import { cp, mkdir, rm, readFile, realpath } from "node:fs/promises";
import { resolve, dirname, relative, isAbsolute } from "node:path";
const workspace = resolve(import.meta.dirname, "..");
const publicDirectory = resolve(workspace, "public");
if (dirname(publicDirectory) !== workspace)
  throw new Error("Invalid generated public directory");
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
