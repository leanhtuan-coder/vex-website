import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const { default: lighthouse } = await import(
  process.env.VEX_LIGHTHOUSE_MODULE || "lighthouse"
);
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({
  args: ["--remote-debugging-port=9222"],
});
const results = [];
try {
  for (const [name, path, desktop] of [
    ["home-mobile", "/", false],
    ["home-desktop", "/", true],
    ["contact-mobile", "/contact/", false],
    ["solutions-mobile", "/solutions/", false],
    ["media-mobile", "/media/", false],
    ["media-desktop", "/media/", true],
  ]) {
    const result = await lighthouse(
      "http://127.0.0.1:4173" + path,
      {
        port: 9222,
        logLevel: "error",
        output: ["json", "html"],
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
      desktop
        ? {
            extends: "lighthouse:default",
            settings: {
              formFactor: "desktop",
              screenEmulation: {
                mobile: false,
                width: 1440,
                height: 900,
                deviceScaleFactor: 1,
              },
              throttling: {
                rttMs: 40,
                throughputKbps: 10240,
                cpuSlowdownMultiplier: 1,
              },
            },
          }
        : undefined,
    );
    await writeFile(`artifacts/lighthouse-${name}.json`, result.report[0]);
    await writeFile(`artifacts/lighthouse-${name}.html`, result.report[1]);
    const summary = {
      name,
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      metrics: Object.fromEntries(
        [
          "first-contentful-paint",
          "largest-contentful-paint",
          "total-blocking-time",
          "cumulative-layout-shift",
        ].map((key) => [key, result.lhr.audits[key].displayValue]),
      ),
      findings: Object.values(result.lhr.audits)
        .filter((audit) => audit.score !== null && audit.score < 1)
        .map((audit) => ({
          id: audit.id,
          title: audit.title,
          displayValue: audit.displayValue,
        })),
    };
    results.push(summary);
    console.log(JSON.stringify(summary));
  }
  await writeFile(
    "artifacts/performance-summary.json",
    JSON.stringify(results, null, 2),
  );
} finally {
  await browser.close();
}
