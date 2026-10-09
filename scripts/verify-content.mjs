import { build } from "vite";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { resolve } from "node:path";

// Test the same build-only validator as publication, without writing fixtures,
// temporary content, or browser assets. Synthetic records never enter website.ts.
const workspace = resolve(import.meta.dirname, "..");
const bundled = await build({
  configFile: false,
  root: workspace,
  publicDir: false,
  logLevel: "silent",
  build: {
    ssr: resolve(workspace, "src/content/validation.ts"),
    write: false,
    emptyOutDir: false,
    minify: false,
  },
});
const chunk = bundled.output.find((item) => item.type === "chunk");
assert.ok(
  chunk,
  "The publication validator must produce a self-contained SSR module",
);
const { validatePublication, validatePdfSignature, validateSvgMarkup } =
  await import(
    `data:text/javascript;base64,${Buffer.from(chunk.code).toString("base64")}`
  );
let checks = 0;
const equal = (actual, expected, message) => {
  assert.equal(actual, expected, message);
  checks++;
};
const okay = (condition, message) => {
  assert.ok(condition, message);
  checks++;
};
const rejected = (action, message) => {
  assert.throws(action, message);
  checks++;
};
const asOfDate = "2026-10-09";
const empty = () => ({
  articles: [],
  jobs: [],
  projects: [],
  leadership: [],
  documents: [],
});
const leader = {
  slug: "fixture-leader",
  name: "FIXTURE ONLY",
  role: "FIXTURE ROLE",
  contentState: "VERIFIED",
  approvedForPublication: true,
  privateEditorialNote: "PRIVATE SENTINEL",
};
const project = {
  slug: "fixture-project",
  title: "FIXTURE ONLY",
  category: "FIXTURE",
  status: "Prototype",
  contentState: "VERIFIED",
  approvedForPublication: true,
  summary: "FIXTURE SUMMARY",
  image: "/assets/vex-logo.svg",
  imageAlt: "FIXTURE IMAGE",
  imageWidth: 100,
  imageHeight: 100,
  context: "FIXTURE CONTEXT",
  problem: "FIXTURE PROBLEM",
  solution: "FIXTURE METHOD",
  technologies: ["FIXTURE TECHNOLOGY"],
  role: "FIXTURE ROLE",
  provenance: {
    ownership: "personal-research",
    statement: "FIXTURE PERSONAL RESEARCH ATTRIBUTION",
  },
  privateEditorialNote: "PRIVATE SENTINEL",
};
const document = {
  slug: "fixture-profile",
  title: "FIXTURE ONLY",
  category: "company-profile",
  summary: "FIXTURE SUMMARY",
  href: "/assets/documents/public-fixture-profile.pdf",
  contentState: "VERIFIED",
  approvedForPublication: true,
  bytes: 999999,
  filename: "wrong-secret-filename.pdf",
  privateEditorialNote: "PRIVATE SENTINEL",
};
const article = {
  slug: "fixture-article",
  title: "FIXTURE ONLY",
  summary: "FIXTURE SUMMARY",
  category: "FIXTURE",
  status: "published",
  approvedForPublication: true,
  author: "FIXTURE AUTHOR",
  publishedAt: "2026-10-08",
  body: [{ type: "paragraph", text: "FIXTURE BODY" }],
};
const job = {
  slug: "fixture-job",
  title: "FIXTURE ONLY",
  department: "FIXTURE",
  summary: "FIXTURE SUMMARY",
  approvedForPublication: true,
  status: "open",
  employmentType: "FULL_TIME",
  workplace: "onsite",
  location: { label: "FIXTURE LOCATION", country: "VN" },
  publishedAt: "2026-10-08",
  deadline: "2026-10-10",
  responsibilities: ["FIXTURE"],
  requirements: ["FIXTURE"],
  benefits: ["FIXTURE"],
  applicationInstructions: "FIXTURE ONLY",
};
const accepted = validatePublication(
  {
    ...empty(),
    leadership: [leader],
    projects: [project],
    documents: [document],
  },
  asOfDate,
);
equal(accepted.leadership.length, 1);
equal(accepted.projects.length, 1);
equal(accepted.documents.length, 1);
equal(accepted.documents[0].filename, "public-fixture-profile.pdf");
equal(
  accepted.documents[0].bytes,
  undefined,
  "Editorial sizes must be replaced by filesystem measurements",
);
equal(accepted.projects[0].status, "Prototype");
equal(accepted.projects[0].provenance.ownership, "personal-research");
for (const field of [
  "evidence",
  "challenges",
  "nextSteps",
  "publicArchitecture",
])
  equal(Object.hasOwn(accepted.projects[0], field), false);
okay(!JSON.stringify(accepted).includes("PRIVATE SENTINEL"));
okay(!JSON.stringify(accepted).includes("wrong-secret"));

for (const contentState of [
  "DRAFT",
  "PENDING_APPROVAL",
  "NOT_AVAILABLE",
  undefined,
  "INVALID_STATE",
]) {
  const blocked = validatePublication(
    {
      ...empty(),
      leadership: [
        {
          ...leader,
          contentState,
          photo: { src: "/assets/private-portrait.png" },
        },
      ],
      projects: [
        { ...project, contentState, image: "/assets/private-project.png" },
      ],
      documents: [
        {
          ...document,
          contentState,
          href: "/assets/documents/internal-secret.pdf",
        },
      ],
    },
    asOfDate,
  );
  for (const key of ["leadership", "projects", "documents", "images"])
    equal(blocked[key].length, 0);
}
for (const [key, record] of [
  ["leadership", leader],
  ["projects", project],
  ["documents", document],
]) {
  const blocked = validatePublication(
    { ...empty(), [key]: [{ ...record, approvedForPublication: false }] },
    asOfDate,
  );
  equal(blocked[key].length, 0);
  equal(blocked.images.length, 0);
}
const legacy = validatePublication(
  { ...empty(), articles: [article], jobs: [job] },
  asOfDate,
);
equal(legacy.articles.length, 1);
equal(legacy.jobs.length, 1);
for (const contentState of [
  "DRAFT",
  "PENDING_APPROVAL",
  "NOT_AVAILABLE",
  "INVALID_STATE",
]) {
  const blocked = validatePublication(
    {
      ...empty(),
      articles: [{ ...article, contentState }],
      jobs: [{ ...job, contentState }],
    },
    asOfDate,
  );
  equal(blocked.articles.length, 0);
  equal(blocked.jobs.length, 0);
}
const inactive = validatePublication(
  {
    ...empty(),
    articles: [
      {
        ...article,
        publishedAt: "2026-10-10",
        cover: {
          src: "/assets/future-article.png",
          alt: "FIXTURE",
          width: 100,
          height: 100,
        },
      },
    ],
    jobs: [{ ...job, deadline: "2026-10-08" }],
    documents: [{ ...document, publishedAt: "2026-10-10" }],
  },
  asOfDate,
);
equal(inactive.articles.length, 0);
equal(inactive.jobs.length, 0);
equal(inactive.documents.length, 0);
equal(inactive.images.length, 0);
equal(
  validatePublication(
    { ...empty(), jobs: [{ ...job, deadline: asOfDate }] },
    asOfDate,
  ).jobs.length,
  1,
  "Deadline remains inclusive",
);
for (const [key, record] of [
  ["articles", article],
  ["jobs", job],
]) {
  equal(
    validatePublication(
      { ...empty(), [key]: [{ ...record, approvedForPublication: false }] },
      asOfDate,
    )[key].length,
    0,
  );
}
equal(
  validatePublication(
    {
      ...empty(),
      articles: [{ ...article, status: "draft" }],
      jobs: [{ ...job, status: "closed" }],
    },
    asOfDate,
  ).articles.length,
  0,
);
equal(
  validatePublication(
    { ...empty(), jobs: [{ ...job, status: "closed" }] },
    asOfDate,
  ).jobs.length,
  0,
);
for (const ownership of [
  "vex",
  "founder-before-vex",
  "personal-research",
  "collaboration",
]) {
  const current = validatePublication(
    {
      ...empty(),
      projects: [
        { ...project, provenance: { ownership, statement: "FIXTURE ONLY" } },
      ],
    },
    asOfDate,
  ).projects[0];
  equal(current.provenance.ownership, ownership);
  equal(current.status, "Prototype");
}
equal(
  validatePublication(
    { ...empty(), projects: [{ ...project, status: "Commercial Product" }] },
    asOfDate,
  ).projects[0].status,
  "Commercial Product",
);
for (const provenance of [
  undefined,
  { ownership: "unknown", statement: "FIXTURE" },
  { ownership: "vex", statement: "" },
])
  rejected(() =>
    validatePublication(
      { ...empty(), projects: [{ ...project, provenance }] },
      asOfDate,
    ),
  );
for (const href of [
  "/Brand Guidelines.pdf",
  "/assets/documents/internal-profile.pdf",
  "/assets/documents/../public-profile.pdf",
  "https://example.com/public-profile.pdf",
  "/assets/documents/public-profile.svg",
  "/assets/documents/public-profile.pdf?secret=1",
])
  rejected(() =>
    validatePublication(
      { ...empty(), documents: [{ ...document, href }] },
      asOfDate,
    ),
  );
for (const href of [
  "javascript:alert(1)",
  "http://example.com",
  "https://user:secret@example.com",
  "/contact/",
])
  rejected(() =>
    validatePublication(
      {
        ...empty(),
        leadership: [{ ...leader, links: [{ label: "FIXTURE", href }] }],
      },
      asOfDate,
    ),
  );
for (const src of [
  "/Brand Guidelines.pdf",
  "/assets/../private.png",
  "https://example.com/portrait.png",
  "/assets/portrait.pdf",
])
  rejected(() =>
    validatePublication(
      {
        ...empty(),
        leadership: [
          {
            ...leader,
            photo: { src, alt: "FIXTURE", width: 100, height: 125 },
          },
        ],
      },
      asOfDate,
    ),
  );
rejected(() =>
  validatePublication(
    {
      ...empty(),
      leadership: [{ ...leader, biography: ["<script>unsafe</script>"] }],
    },
    asOfDate,
  ),
);
rejected(() =>
  validatePublication(
    {
      ...empty(),
      articles: [
        {
          ...article,
          body: [{ type: "html", html: "<script>unsafe</script>" }],
        },
      ],
    },
    asOfDate,
  ),
);
rejected(() =>
  validatePublication(
    {
      ...empty(),
      projects: [{ ...project, publicArchitecture: "<iframe>unsafe</iframe>" }],
    },
    asOfDate,
  ),
);
rejected(() =>
  validatePublication({ ...empty(), leadership: [leader, leader] }, asOfDate),
);
rejected(() =>
  validatePublication(
    { ...empty(), documents: [document, document] },
    asOfDate,
  ),
);
rejected(() =>
  validatePublication(
    { ...empty(), articles: [{ ...article, publishedAt: "2026-02-30" }] },
    asOfDate,
  ),
);
rejected(() =>
  validatePublication(
    { ...empty(), documents: [{ ...document, publishedAt: "2026-02-30" }] },
    asOfDate,
  ),
);
validatePdfSignature("%PDF-1.7\n", "FIXTURE %%EOF\n");
checks++;
validatePdfSignature("%PDF-2.0\r", "FIXTURE %%EOF\r");
checks++;
for (const [header, trailer] of [
  ["<html>", "%%EOF"],
  ["%PDF-1.7\n", "truncated"],
  ["%PDF-9.0\n", "%%EOF"],
])
  rejected(() => validatePdfSignature(header, trailer));
validateSvgMarkup('<svg><path d="M0 0L1 1"/><use href="#local"/></svg>');
checks++;
for (const source of [
  "<svg><script>unsafe</script></svg>",
  '<svg onload="unsafe()"/>',
  "<svg><foreignObject/></svg>",
  '<svg><use href="https://example.com/asset.svg"/></svg>',
  '<svg><use href="javascript:unsafe()"/></svg>',
  '<svg><style>@import "https://example.com";</style></svg>',
  '<svg><path fill="url(https://example.com/asset)"/></svg>',
  '<!DOCTYPE svg [<!ENTITY leak SYSTEM "file:///private">]><svg/>',
  '<svg><animate attributeName="href"/></svg>',
])
  rejected(() => validateSvgMarkup(source));
console.log(
  `Content publication verification passed: ${checks} checks; synthetic fixtures stayed in memory.`,
);
