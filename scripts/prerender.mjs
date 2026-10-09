import { build } from "vite";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
process.env.NODE_ENV = "production";
const { createElement } = await import("react");
const { renderToString } = await import("react-dom/server");
await build({
  build: { ssr: "src/Prerender.tsx", outDir: ".prerender", emptyOutDir: true },
  logLevel: "warn",
});
const { default: App } = await import("../.prerender/Prerender.js");
// Content metadata is bundled separately to use the same TS source on build and client.
await build({
  build: {
    ssr: "src/content/build-data.ts",
    outDir: ".prerender",
    emptyOutDir: false,
  },
  logLevel: "silent",
});
const { pages, notFound, structuredData, analyticsOrigin } = await import(
  "../.prerender/build-data.js"
);
const template = await readFile("dist/index.html", "utf8");
const escape = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
async function render(path) {
  // The static entry eagerly imports every page; no unresolved lazy content is streamed.
  return renderToString(createElement(App, { path }));
}
for (const meta of [...pages, notFound]) {
  let html = template
    .replace("<!--ssr-->", await render(meta.path))
    .replace('id="root"', `id="root" data-route="${meta.path}"`);
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${escape(meta.title)}</title>`,
  );
  for (const [name, value] of [
    ["description", meta.description],
    ["robots", meta.noindex ? "noindex, follow" : "index, follow"],
    ["twitter:title", meta.title],
    ["twitter:description", meta.description],
    [
      "twitter:image",
      "https://vex.biz.vn" + (meta.image ?? "/assets/og-image.jpg"),
    ],
  ])
    html = html.replace(
      new RegExp(`<meta name="${name}" content="[^"]*"[^>]*>`),
      `<meta name="${name}" content="${escape(value)}">`,
    );
  for (const [property, value] of [
    ["og:title", meta.title],
    ["og:description", meta.description],
    ["og:url", "https://vex.biz.vn" + meta.path],
    ["og:type", meta.type ?? "website"],
    ["og:image", "https://vex.biz.vn" + (meta.image ?? "/assets/og-image.jpg")],
  ])
    html = html.replace(
      new RegExp(`<meta property="${property}" content="[^"]*"[^>]*>`),
      `<meta property="${property}" content="${escape(value)}">`,
    );
  if (meta.publishedAt)
    html = html.replace(
      "</head>",
      `<meta property="article:published_time" content="${meta.publishedAt}T00:00:00+07:00">${meta.updatedAt ? `<meta property="article:modified_time" content="${meta.updatedAt}T00:00:00+07:00">` : ""}</head>`,
    );
  html = html
    .replace(
      /<link rel="canonical" href="[^"]*"[^>]*>/,
      `<link rel="canonical" href="https://vex.biz.vn${meta.path}">`,
    )
    .replace(
      /<script type="application\/ld\+json">.*?<\/script>/s,
      `<script type="application/ld+json">${JSON.stringify(structuredData(meta)).replaceAll("<", "\\u003c")}</script>`,
    );
  const directory = meta.path === "/" ? "dist" : `dist${meta.path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
  if (meta.noindex) await writeFile("dist/404.html", html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>https://vex.biz.vn${p.path}</loc>${p.updatedAt || p.publishedAt ? `<lastmod>${p.updatedAt || p.publishedAt}</lastmod>` : ""}</url>`).join("")}</urlset>`;
await writeFile("dist/sitemap.xml", sitemap);
await writeFile("sitemap.xml", sitemap);
await writeFile("dist/.nojekyll", "");
const analyticsHost = analyticsOrigin();
await writeFile(
  "dist/_headers",
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'self'; script-src 'self'${analyticsHost ? ` ${analyticsHost}` : ""}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'${analyticsHost ? ` ${analyticsHost}` : ""}; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests\n`,
);
await rm(".prerender", { recursive: true });
console.log(
  `Prerendered ${pages.length} public pages and 404, with route-specific SEO and sitemap.`,
);
