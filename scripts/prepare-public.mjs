import { cp, mkdir, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
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
