import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import { getPage, structuredData } from "./content/pages";
import { company } from "./content/company";
import { initializeAnalytics } from "./analytics";
import "@cloudflare/kumo/styles/standalone";
import "./styles.css";
// Route styles are present in the initial HTML, including when JS is disabled.
import "./styles-research.css";
import "./styles-growth.css";
import "./styles-media.css";
import "./styles-strategy-about.css";
import "./styles-strategy-home.css";
import "./styles-home-redesign.css";
import "./styles-corporate-redesign.css";
import "./styles-corporate-identity.css";
import "./styles-faq.css";
import "./styles-leadership.css";
import "./visual-system.css";
import "./styles-visual-elements.css";
import "./styles-visual-hero.css";
import "./styles-leadership-preview.css";
import "./styles-mobile.css";
import "./styles-mobile-leadership.css";
import "./styles-mobile-shell.css";
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
  ['meta[property="og:type"]', "content", meta.type ?? "website"],
  [
    'meta[property="og:image"]',
    "content",
    company.url + (meta.image ?? "/assets/og-image.jpg"),
  ],
  [
    'meta[name="twitter:image"]',
    "content",
    company.url + (meta.image ?? "/assets/og-image.jpg"),
  ],
] as const)
  document.querySelector(selector)?.setAttribute(attribute, value);
const schema = document.querySelector('script[type="application/ld+json"]');
if (schema) schema.textContent = JSON.stringify(structuredData(meta));
const app = <App path={window.location.pathname} />;
// Unknown URLs served by SPA dev/preview fallback must not hydrate the home HTML.
if (root.querySelector("main") && root.dataset.route === meta.path)
  hydrateRoot(root, app);
else createRoot(root).render(app);
initializeAnalytics();
