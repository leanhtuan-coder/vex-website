import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const origin = "http://127.0.0.1:4173";
const routes = [
  "/",
  "/about/",
  "/solutions/",
  "/projects/",
  "/contact/",
  "/privacy-policy/",
  "/terms/",
  ...[
    "custom-software",
    "ai-computer-vision",
    "automation",
    "iot-embedded",
    "system-integration",
  ].map((s) => `/solutions/${s}/`),
];
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560];
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext();
const securityHeaders = Object.fromEntries(
  (await readFile("dist/_headers", "utf8"))
    .split("\n")
    .filter((line) => line.startsWith("  "))
    .map((line) => {
      const separator = line.indexOf(":");
      return [
        line.slice(0, separator).trim(),
        line.slice(separator + 1).trim(),
      ];
    }),
);
// Simulate the build's header template; preview hosting does not apply _headers itself.
await context.route("**/*", async (route) => {
  if (route.request().resourceType() !== "document") return route.continue();
  const response = await route.fetch();
  await route.fulfill({
    response,
    headers: { ...response.headers(), ...securityHeaders },
  });
});
const page = await context.newPage();
const errors = [];
const inaccessible = [];
const linkTargets = new Set();
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (
    message.type() === "error" ||
    (message.type() === "warning" && message.text().includes("Kumo"))
  )
    errors.push(message.text());
});
for (const path of routes) {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto(origin + path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `${path} overflow at ${width}`,
    );
    assert.equal(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every((img) => img.complete && img.naturalWidth > 0),
        ),
      true,
      `${path}: broken image`,
    );
    assert.equal(
      await page
        .locator(".logo")
        .evaluateAll((logos) =>
          logos.every((logo) => logo.textContent.trim() === ""),
        ),
      true,
    );
    if (width === 390 || width === 1440)
      await page.screenshot({
        path: `artifacts/${path === "/" ? "home" : path.replaceAll("/", "-").replace(/^-|-$/g, "")}-${width}.png`,
        fullPage: true,
      });
  }
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  if (scan.violations.length)
    inaccessible.push({
      path,
      violations: scan.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    });
  for (const href of await page
    .locator("a[href]")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
    if (href.startsWith("/")) linkTargets.add(href.split("#")[0]);
    if (href.startsWith("#"))
      assert.equal(
        await page.locator(`[id="${href.slice(1)}"]`).count(),
        1,
        `${path}: broken anchor ${href}`,
      );
  }
  assert.equal(
    await page.locator("link[rel=canonical]").getAttribute("href"),
    "https://vex.biz.vn" + path,
  );
  const response = await page.request.get(origin + path);
  const source = await response.text();
  assert.ok(
    source.includes('data-route="' + path + '"'),
    `${path}: missing prerender`,
  );
  assert.ok(!source.includes('name="keywords"'), "No keyword stuffing");
  assert.ok(!source.includes('id="S:'), `${path}: hidden streaming payload`);
  assert.ok(
    !source.includes("Đang tải nội dung…"),
    `${path}: unresolved static content`,
  );
}
for (const target of linkTargets) {
  const response = await page.request.get(origin + target);
  assert.ok(response.ok(), `Broken route ${target}: ${response.status()}`);
}
await page.setViewportSize({ width: 390, height: 950 });
await page.goto(origin + "/");
await page.getByRole("button", { name: "Mở menu" }).click();
const dialog = page.getByRole("dialog");
await expect(dialog).toBeVisible();
await dialog.evaluate(async (element) => {
  await Promise.all(
    element
      .getAnimations({ subtree: true })
      .map((animation) => animation.finished),
  );
});
for (let index = 0; index < 8; index++) {
  await page.keyboard.press("Tab");
  await expect
    .poll(
      () =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      { message: "Menu focus must remain in dialog" },
    )
    .toBe(true);
}
await page.screenshot({ path: "artifacts/menu-390.png", fullPage: false });
const menuScan = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
  .analyze();
if (menuScan.violations.length)
  inaccessible.push({
    path: "mobile-menu",
    violations: menuScan.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  });
await page.keyboard.press("Escape");
await expect(dialog).toHaveCount(0);
await expect(page.getByRole("button", { name: "Mở menu" })).toBeFocused();
await page.getByRole("button", { name: "Mở menu" }).click();
await page
  .getByRole("dialog")
  .getByRole("link", { name: "Về VEX", exact: true })
  .click();
await page.waitForURL(origin + "/about/");
await page.goto(origin + "/contact/");
const submit = page.getByRole("button", { name: "Soạn email liên hệ" });
await expect(submit).toBeDisabled();
await page.getByLabel("Họ và tên").fill("   ");
await page.getByLabel("Email liên hệ").fill("test@example.com");
await page
  .getByLabel("Nội dung trao đổi")
  .fill("Kiểm tra giao diện, không gửi email.");
await page.getByRole("checkbox").check();
await submit.click();
await expect(page.getByRole("alert")).toContainText("Vui lòng nhập");
await page.screenshot({
  path: "artifacts/form-error-390.png",
  fullPage: false,
});
await page.getByLabel("Họ và tên").fill("Kiểm tra VEX");
const select = page.getByRole("combobox", { name: "Chủ đề liên hệ" });
await select.click();
await page
  .getByRole("option", { name: "Hợp tác công nghệ", exact: true })
  .click();
await select.focus();
await page.keyboard.press("ArrowDown");
await expect(page.getByRole("listbox")).toBeVisible();
await page.keyboard.press("Escape");
await expect(page.getByRole("listbox")).toHaveCount(0);
await expect(select).toBeFocused();
await page.evaluate(() =>
  document.querySelector("form").addEventListener(
    "submit",
    (event) => {
      window.__testForm = Object.fromEntries(new FormData(event.target));
    },
    { capture: true },
  ),
);
await submit.click();
await expect(page.getByRole("status")).toContainText("nhấn gửi");
assert.equal(
  await page.evaluate(() => window.__testForm.topic),
  "Hợp tác công nghệ",
);
await page.screenshot({
  path: "artifacts/form-prepared-390.png",
  fullPage: false,
});
assert.equal(await page.evaluate(() => localStorage.length), 0);
await page.goto(origin + "/missing-page/");
await expect(page.locator("h1")).toHaveText("Không tìm thấy trang.");
await expect(page.locator("meta[name=robots]")).toHaveAttribute(
  "content",
  "noindex, follow",
);
const staticContext = await browser.newContext({ javaScriptEnabled: false });
const staticPage = await staticContext.newPage();
for (const path of routes) {
  await staticPage.goto(origin + path);
  assert.equal(await staticPage.locator("h1").count(), 1);
  await expect(staticPage.locator("h1")).toBeVisible();
  await expect(staticPage.getByText("Đang tải nội dung…")).toHaveCount(0);
}
const build404 = await readFile("dist/404.html", "utf8");
assert.ok(build404.includes("noindex, follow"));
await writeFile(
  "artifacts/qa-results.json",
  JSON.stringify(
    {
      routes,
      widths,
      layoutChecks: routes.length * widths.length,
      errors,
      accessibility: inaccessible,
    },
    null,
    2,
  ),
);
await browser.close();
assert.deepEqual(errors, []);
assert.deepEqual(inaccessible, []);
console.log(
  `PASS: ${routes.length} routes x ${widths.length} widths, prerender/no-JS, links, 404, accessibility, menu focus, consent, validation and email preparation.`,
);
