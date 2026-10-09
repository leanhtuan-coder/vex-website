import { cp, mkdir } from "node:fs/promises";
await mkdir("public", { recursive: true });
// Copy only public website resources; internal PDFs never enter the build.
for (const file of [
  "assets",
  "CNAME",
  "robots.txt",
  "sitemap.xml",
  "logo.png",
  "favicon.png",
]) {
  await cp(file, `public/${file}`, { recursive: true });
}
