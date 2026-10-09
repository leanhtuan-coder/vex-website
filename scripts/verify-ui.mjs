import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (
    m.type() === "error" ||
    (m.type() === "warning" && m.text().includes("Kumo"))
  )
    errors.push(m.text());
});
for (const width of [1440, 768, 390, 320]) {
  await page.setViewportSize({ width, height: 950 });
  await page.goto("http://127.0.0.1:4173");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  const brand = await page.evaluate(() => ({
    family: getComputedStyle(document.querySelector("h1")).fontFamily,
    weight: getComputedStyle(document.querySelector("h1")).fontWeight,
    cyan: getComputedStyle(document.documentElement)
      .getPropertyValue("--color-kumo-brand")
      .trim(),
    loaded: [...document.fonts]
      .filter((font) => font.family === "SVN-Aguda")
      .every((font) => font.status === "loaded"),
    externalFonts: [...document.querySelectorAll("link")].some((link) =>
      link.href.includes("fonts.googleapis.com"),
    ),
  }));
  assert.match(brand.family, /SVN-Aguda/);
  assert.equal(brand.weight, "900");
  assert.equal(brand.cyan.toLowerCase(), "#00707e");
  assert.equal(brand.loaded, true);
  assert.equal(brand.externalFonts, false);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator(".logo").count(), 2);
  assert.equal(
    await page
      .locator(".logo")
      .evaluateAll((logos) =>
        logos.map((logo) => logo.textContent.trim()).join(""),
      ),
    "",
  );
  assert.equal(await page.locator(".logo span").count(), 0);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
    `Overflow at ${width}`,
  );
  assert.equal(
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.every((img) => img.complete && img.naturalWidth > 0),
      ),
    true,
  );
  await page.screenshot({ path: `artifacts/vex-${width}.png`, fullPage: true });
}
await page.getByRole("button", { name: "Mở menu" }).click();
await page
  .locator("#mobile-nav")
  .getByRole("link", { name: "Liên hệ" })
  .click();
assert.equal(await page.locator("#mobile-nav").count(), 0);
assert.equal(await page.evaluate(() => location.hash), "#contact");
const select = page.getByRole("combobox", { name: "Giải pháp quan tâm" });
await select.click();
await page
  .getByRole("option", { name: "Phần cứng & IoT", exact: true })
  .click();
assert.equal(
  await page.locator('input[name="service"]').inputValue(),
  "Phần cứng & IoT",
);
await select.focus();
await page.keyboard.press("ArrowDown");
await expect(page.getByRole("listbox")).toBeVisible();
assert.equal(
  await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
  false,
);
await page.screenshot({
  path: "artifacts/kumo-select-320.png",
  fullPage: false,
});
await page.keyboard.press("Escape");
await expect(page.getByRole("listbox")).toHaveCount(0);
await expect(select).toBeFocused();
await page.evaluate(() => {
  document.querySelector("form").addEventListener(
    "submit",
    (event) => {
      window.__submittedFields = Object.fromEntries(new FormData(event.target));
    },
    { capture: true },
  );
});
await page.getByLabel("Họ và tên").fill("Kiểm tra VEX");
await page.getByLabel("Số điện thoại").fill("0877759036");
await page.getByLabel("Email liên hệ").fill("test@example.com");
await page.getByRole("button", { name: "Soạn email tư vấn" }).click();
assert.match(await page.getByRole("status").innerText(), /nhấn gửi/);
assert.equal(
  await page.evaluate(() => window.__submittedFields.service),
  "Phần cứng & IoT",
);
assert.deepEqual(errors, []);
const staticPage = await browser.newPage({ javaScriptEnabled: false });
await staticPage.goto("http://127.0.0.1:4173");
assert.equal(await staticPage.locator("h1").count(), 1);
assert.ok(
  (await staticPage.locator("footer").innerText()).includes("2803218550"),
);
await staticPage.close();
await page.setViewportSize({ width: 1440, height: 950 });
await page.goto("http://127.0.0.1:4173");
await page.getByRole("link", { name: "Khám phá giải pháp" }).click();
assert.equal(await page.evaluate(() => location.hash), "#solutions");
assert.deepEqual(errors, []);
await browser.close();
console.log(
  "PASS: VEX fonts and brand tokens, responsive layouts, images, hydration, navigation, and consultation form.",
);
