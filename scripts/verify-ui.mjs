import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const origin = "http://127.0.0.1:4173";
const requiredRoutes = [
  "/",
  "/about/",
  "/solutions/",
  "/projects/",
  "/contact/",
  "/privacy-policy/",
  "/terms/",
  "/research/",
  "/insights/",
  "/careers/",
  "/media/",
  "/academy/",
  ...[
    "custom-software",
    "ai-computer-vision",
    "automation",
    "iot-embedded",
    "system-integration",
  ].map((s) => `/solutions/${s}/`),
];
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
for (const path of requiredRoutes)
  assert.ok(routes.includes(path), `Missing required route ${path}`);
assert.equal(new Set(routes).size, routes.length, "Duplicate sitemap URLs");
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
const externalRequests = [];
page.on("request", (request) => {
  const url = new URL(request.url());
  if (["http:", "https:"].includes(url.protocol) && url.origin !== origin)
    externalRequests.push(request.url());
});
const inaccessible = [];
const linkTargets = new Set();
const routeMetadata = new Map();
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
  routeMetadata.set(path, {
    title: await page.title(),
    description: await page
      .locator("meta[name=description]")
      .getAttribute("content"),
    image: await page
      .locator('meta[property="og:image"]')
      .getAttribute("content"),
    type: await page
      .locator('meta[property="og:type"]')
      .getAttribute("content"),
  });
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
  if (response.headers()["content-type"]?.includes("text/html")) {
    const pathname = new URL(target, origin).pathname;
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    assert.ok(
      routes.includes(path),
      `Link targets an unpublished route: ${target}`,
    );
  }
}
await page.setViewportSize({ width: 390, height: 950 });
await page.goto(origin + "/");
await page.getByRole("button", { name: "Mở menu" }).click();
const dialog = page.getByRole("dialog");
await expect(dialog).toBeVisible();
await expect(
  dialog.getByRole("link", { name: "Nghiên cứu & Phát triển", exact: true }),
).toBeVisible();
await expect(
  dialog.getByRole("link", { name: "Tài nguyên thương hiệu", exact: true }),
).toBeVisible();
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
await page.setViewportSize({ width: 1440, height: 950 });
const explore = page.getByRole("button", { name: "Khám phá VEX" });
await explore.click();
await expect(page.getByRole("menu")).toBeVisible();
await expect(
  page.getByRole("menuitem", { name: "Nghiên cứu & Phát triển" }),
).toBeVisible();
await page.keyboard.press("Escape");
await expect(page.getByRole("menu")).toHaveCount(0);
await expect(explore).toBeFocused();

// Customer routes expose real solution scopes and preserve only approved need IDs.
const challengeTitles = [
  "Số hóa quy trình và dữ liệu",
  "Phát triển phần mềm quản lý",
  "Tự động hóa các tác vụ",
  "Phân tích và nhận diện hình ảnh",
  "Kết nối thiết bị và hệ thống",
  "Nghiên cứu/phát triển nguyên mẫu",
];
for (const width of [390, 1440]) {
  await page.setViewportSize({ width, height: 950 });
  await page.goto(origin + "/solutions/");
  const challenges = page.locator(".challenge-entry");
  await expect(challenges).toHaveCount(6);
  await expect(challenges.locator("summary h3")).toHaveText(challengeTitles);
  for (let index = 0; index < challengeTitles.length; index++) {
    const challenge = challenges.nth(index);
    const summary = challenge.locator("summary");
    await expect(challenge).toHaveJSProperty("open", false);
    await summary.focus();
    await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(challenge).toHaveJSProperty("open", true);
    for (const name of [
      "Bài toán thực tế",
      "Đối tượng phù hợp",
      "Hướng giải pháp",
      "Phạm vi có thể triển khai",
    ]) {
      const heading = challenge.getByRole("heading", { name, exact: true });
      await expect(heading).toBeVisible();
      assert.ok(
        (await heading.locator("..").innerText()).replace(name, "").trim(),
        `${challengeTitles[index]}: missing ${name}`,
      );
    }
    const technologies = challenge.locator(
      '[aria-label="Công nghệ có thể sử dụng"]',
    );
    await expect(technologies).toBeVisible();
    assert.ok(
      (await technologies.innerText()).trim(),
      `${challengeTitles[index]}: missing technologies`,
    );
    const needCTA = challenge.getByRole("link", {
      name: "Trao đổi nhu cầu",
      exact: true,
    });
    await expect(needCTA).toBeVisible();
    await expect(needCTA).toHaveAttribute(
      "href",
      /^\/contact\/\?topic=solution&need=[a-z-]+$/,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `${challengeTitles[index]}: expanded disclosure overflow at ${width}`,
    );
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(challenge).toHaveJSProperty("open", false);
    await expect(summary).toBeFocused();
  }
}
const firstChallenge = page.locator(".challenge-entry").first();
await firstChallenge.locator("summary").focus();
await page.keyboard.press("Enter");
await firstChallenge
  .getByRole("link", { name: "Trao đổi nhu cầu", exact: true })
  .click();
await page.waitForURL(origin + "/contact/?topic=solution&need=so-hoa");
await expect(page.locator(".contact-selected-need")).toHaveText(
  "Nhu cầu đang trao đổi: Số hóa quy trình và dữ liệu.",
);
await expect(
  page.getByRole("combobox", { name: "Chủ đề liên hệ" }),
).toContainText("Tư vấn giải pháp");
for (const invalidNeed of ["not-published", "__proto__"]) {
  await page.goto(`${origin}/contact/?topic=solution&need=${invalidNeed}`);
  await expect(page.locator(".contact-selected-need")).toHaveCount(0);
}

await page.goto(origin + "/solutions/");
const faq = page.locator(".corporate-faq-section");
const faqItems = faq.locator(".corporate-faq-item");
await expect(faqItems).toHaveCount(8);
await expect(faq.locator(".corporate-faq-heading")).toHaveCount(8);
for (const item of await faqItems.all()) {
  await expect(item.getByRole("button")).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(item.locator(".corporate-faq-panel p")).toBeVisible();
  assert.ok((await item.locator(".corporate-faq-panel p").innerText()).trim());
}
const firstFAQ = faqItems.first();
const firstQuestion = firstFAQ.getByRole("button", {
  name: "VEX cung cấp những dịch vụ công nghệ nào?",
  exact: true,
});
await firstQuestion.focus();
await page.keyboard.press("Enter");
await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
await expect(firstFAQ.locator(".corporate-faq-panel")).not.toBeVisible();
await expect(firstQuestion).toBeFocused();
await page.keyboard.press("Space");
await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
await expect(firstFAQ.locator(".corporate-faq-panel")).toBeVisible();
// Base UI 1.8 follows the updated APG: arrow keys preserve trigger focus;
// Tab continues through the ordinary document order, including answer links.
await page.keyboard.press("ArrowDown");
await expect(firstQuestion).toBeFocused();
await expect(firstFAQ.locator("h3").getByRole("button")).toBeFocused();
await page.keyboard.press("Tab");
await expect(firstFAQ.getByRole("link").first()).toBeFocused();

await page.goto(origin + "/about/");
await expect(page.locator("#why-vex h2")).toHaveText(
  "Công nghệ phù hợp bắt đầu từ việc hiểu đúng vấn đề.",
);
await expect(page.locator(".corporate-why-pillars h3")).toHaveText([
  "Lấy bài toán thực tế làm trọng tâm.",
  "Kết hợp phần mềm, AI, Robotics và hệ thống vật lý.",
  "Nghiên cứu, thử nghiệm và đánh giá tính khả thi.",
  "Hướng tới khả năng mở rộng và cải tiến lâu dài.",
]);
await expect(
  page.locator("#why-vex").getByText("Định hướng tiếp cận", { exact: true }),
).toBeVisible();
const journey = page.locator(".corporate-journey");
await expect(journey.locator("li")).toHaveCount(1);
await expect(journey.locator("time")).toHaveAttribute("datetime", "2026-03-10");
await expect(journey.locator("time")).toHaveText("10/03/2026");
await expect(journey.locator("h3")).toHaveText(
  "Đăng ký thành lập doanh nghiệp",
);

// Verify actual browser clipboard access and the readable fallback when access fails.
await context.grantPermissions(["clipboard-read", "clipboard-write"], {
  origin,
});
await page.goto(origin + "/media/");
for (const hex of ["#00707E", "#67C08B"]) {
  const copy = page.getByRole("button", {
    name: `Sao chép mã HEX ${hex}`,
    exact: true,
  });
  await copy.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText(`Đã sao chép ${hex}.`);
  await expect(copy).toHaveText("Đã sao chép");
  assert.equal(
    await page.evaluate(() => window.navigator.clipboard.readText()),
    hex,
    `Clipboard must contain the requested color ${hex}`,
  );
}
await page.evaluate(() => {
  Object.defineProperty(window.navigator.clipboard, "writeText", {
    configurable: true,
    value: () =>
      Promise.reject(
        new window.DOMException("Test access denial", "NotAllowedError"),
      ),
  });
});
const deniedCopy = page.getByRole("button", {
  name: "Sao chép mã HEX #00707E",
  exact: true,
});
await deniedCopy.click();
await expect(page.getByRole("status")).toContainText(
  "Không thể sao chép tự động",
);
await expect(page.getByRole("status")).not.toContainText("Đã sao chép");
await expect(deniedCopy).toHaveText("Sao chép HEX");
assert.equal(
  await page.evaluate(() => window.navigator.clipboard.readText()),
  "#67C08B",
  "A failed copy must leave the real clipboard unchanged",
);
await page.reload();
const mediaDownloads = [];
for (const asset of [
  {
    label: "Tải Logo VEX màu — vector",
    href: "/assets/vex-logo.svg",
    filename: "vex-logo.svg",
    source: "assets/vex-logo.svg",
  },
  {
    label: "Tải Logo VEX màu — PNG",
    href: "/assets/logo-color-tight.png",
    filename: "vex-logo-color.png",
    source: "assets/logo-color-tight.png",
  },
  {
    label: "Tải Logo VEX trắng — vector",
    href: "/assets/vex-logo-white.svg",
    filename: "vex-logo-white.svg",
    source: "assets/vex-logo-white.svg",
  },
  {
    label: "Tải Logo VEX trắng — PNG",
    href: "/assets/logo-white-tight.png",
    filename: "vex-logo-white.png",
    source: "assets/logo-white-tight.png",
  },
]) {
  const link = page.getByRole("link", { name: asset.label, exact: true });
  await expect(link).toHaveAttribute("href", asset.href);
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    link.click(),
  ]);
  assert.equal(await download.failure(), null, `${asset.filename}: download`);
  assert.equal(download.suggestedFilename(), asset.filename);
  const downloadedPath = await download.path();
  assert.ok(downloadedPath, `${asset.filename}: missing downloaded file`);
  const [downloadedBytes, sourceBytes] = await Promise.all([
    readFile(downloadedPath),
    readFile(asset.source),
  ]);
  assert.deepEqual(
    downloadedBytes,
    sourceBytes,
    `${asset.filename}: downloaded bytes must match the original logo`,
  );
  mediaDownloads.push({
    filename: asset.filename,
    bytes: downloadedBytes.length,
  });
}

await page.setViewportSize({ width: 390, height: 950 });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(origin + "/");
await page.evaluate(() => document.fonts.ready);
await expect(page.locator("h1")).toBeVisible();
assert.equal(
  await page
    .locator("h1")
    .evaluate((heading) => getComputedStyle(heading).opacity),
  "1",
  "Reduced motion must display the hero immediately",
);
assert.equal(
  await page
    .locator("main")
    .evaluate(
      (main) =>
        main
          .getAnimations({ subtree: true })
          .filter((animation) => animation.playState === "running").length,
    ),
  0,
  "Reduced motion must stop content and decorative animations",
);
await page.screenshot({
  path: "artifacts/reduced-motion-home-390.png",
  fullPage: false,
});
await page.emulateMedia({ reducedMotion: "no-preference" });
for (const [topic, label] of [
  ["research", "Hợp tác nghiên cứu"],
  ["academy", "Hợp tác giáo dục"],
  ["careers", "Tuyển dụng"],
  ["media", "Truyền thông"],
  ["invalid", "Tư vấn giải pháp"],
]) {
  await page.goto(`${origin}/contact/?topic=${topic}`);
  await expect(
    page.getByRole("combobox", { name: "Chủ đề liên hệ" }),
  ).toContainText(label);
}
await page.goto(origin + "/contact/");
await page.evaluate(() => {
  window.__analyticsEvents = [];
  window.umami = { track: (payload) => window.__analyticsEvents.push(payload) };
});
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
assert.deepEqual(
  await page.evaluate(() => window.__analyticsEvents),
  [],
  "Analytics stays disabled even if a tracker exists",
);
await expect(page.locator("script[data-website-id]")).toHaveCount(0);
assert.deepEqual(
  externalRequests,
  [],
  "No third-party requests with tracking disabled",
);
for (const path of [
  "/insights/not-published/",
  "/careers/not-published/",
  "/solutions/custom-software/extra/",
]) {
  await page.goto(origin + path);
  await expect(page.locator("h1")).toHaveText("Không tìm thấy trang.");
  await expect(page.locator("meta[name=robots]")).toHaveAttribute(
    "content",
    "noindex, follow",
  );
}
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
  const metadata = routeMetadata.get(path);
  assert.equal(
    await staticPage.title(),
    metadata.title,
    `${path}: static title`,
  );
  for (const selector of [
    "meta[name=description]",
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
  ])
    await expect(staticPage.locator(selector)).toHaveAttribute(
      "content",
      metadata.description,
    );
  for (const selector of [
    'meta[property="og:image"]',
    'meta[name="twitter:image"]',
  ])
    await expect(staticPage.locator(selector)).toHaveAttribute(
      "content",
      metadata.image,
    );
  await expect(staticPage.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    metadata.type,
  );
  await expect(staticPage.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://vex.biz.vn" + path,
  );
  if (path === "/solutions/") {
    const staticFAQ = staticPage.locator(".corporate-faq-item");
    await expect(staticFAQ).toHaveCount(8);
    for (const item of await staticFAQ.all())
      await expect(item.locator(".corporate-faq-panel p")).toBeVisible();
    const nativeChallenge = staticPage.locator(".challenge-entry").first();
    await expect(nativeChallenge).toHaveJSProperty("open", false);
    await nativeChallenge.locator("summary").focus();
    await staticPage.keyboard.press("Enter");
    await expect(nativeChallenge).toHaveJSProperty("open", true);
    await expect(
      nativeChallenge.getByRole("heading", {
        name: "Bài toán thực tế",
        exact: true,
      }),
    ).toBeVisible();
  }
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
      mediaDownloads,
      clipboard: { copied: ["#00707E", "#67C08B"], deniedCopyFallback: true },
      reducedMotion: true,
      customerExperience: {
        challenges: 6,
        expandedWidths: [390, 1440],
        selectedNeed: "so-hoa",
        invalidNeedIgnored: true,
        faq: { questions: 8, initiallyOpen: true, keyboard: true, noJS: true },
        approvedWhyVexPillars: 4,
        verifiedJourneyDates: ["2026-03-10"],
      },
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
  `PASS: ${routes.length} routes x ${widths.length} widths, prerender/no-JS, links, 404, accessibility, menus, solution challenges/need context, FAQ keyboard/no-JS, approved Why VEX/journey, clipboard/fallback, original logo downloads, reduced motion, topic presets, consent, validation, email preparation and tracking disabled.`,
);
