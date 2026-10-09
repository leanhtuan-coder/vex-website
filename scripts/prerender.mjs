import { build } from "vite";
import { readFile, writeFile, rm } from "node:fs/promises";
await build({
  build: { ssr: "src/App.jsx", outDir: ".prerender", emptyOutDir: true },
  logLevel: "warn",
});
const { default: App } = await import("../.prerender/App.js");
const { createElement } = await import("react");
const { renderToString } = await import("react-dom/server");
const html = await readFile("dist/index.html", "utf8");
await writeFile(
  "dist/index.html",
  html.replace("<!--ssr-->", renderToString(createElement(App))),
);
await rm(".prerender", { recursive: true });
console.log("Static HTML rendered with VEX content and SEO metadata.");
