import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import { getPage, structuredData } from "./content/pages";
import { company } from "./content/company";
import "@cloudflare/kumo/styles/standalone";
import "./styles.css";
const root = document.getElementById("root")!;
const meta = getPage(window.location.pathname);
// Keep development and unknown-path fallback metadata accurate as well.
document.title = meta.title;
for (const [selector, attribute, value] of [
  ['meta[name="description"]', "content", meta.description],
  [
    'meta[name="robots"]',
    "content",
    meta.noindex ? "noindex, follow" : "index, follow",
  ],
  ['link[rel="canonical"]', "href", company.url + meta.path],
  ['meta[property="og:title"]', "content", meta.title],
  ['meta[property="og:description"]', "content", meta.description],
  ['meta[property="og:url"]', "content", company.url + meta.path],
] as const)
  document.querySelector(selector)?.setAttribute(attribute, value);
const schema = document.querySelector('script[type="application/ld+json"]');
if (schema) schema.textContent = JSON.stringify(structuredData(meta));
const app = <App path={window.location.pathname} />;
// Unknown URLs served by SPA dev/preview fallback must not hydrate the home HTML.
if (root.querySelector("main") && root.dataset.route === meta.path)
  hydrateRoot(root, app);
else createRoot(root).render(app);
