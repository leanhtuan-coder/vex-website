import { build } from "vite";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { resolve } from "node:path";
import { webpDimensions } from "./leadership-images.mjs";

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
for (const field of [
  "photo",
  "shortBiography",
  "education",
  "careerHighlights",
  "linkedinUrl",
  "personalWebsite",
])
  equal(Object.hasOwn(accepted.leadership[0], field), false);
const extendedLeader = validatePublication(
  {
    ...empty(),
    leadership: [
      {
        ...leader,
        id: "fixture-leader",
        titleVietnamese: "FIXTURE TITLE",
        abbreviation: "FIX",
        initials: "FL",
        shortBiography: "FIXTURE SHORT BIOGRAPHY",
        biography: ["FIXTURE BIOGRAPHY"],
        responsibilities: ["FIXTURE RESPONSIBILITY"],
        expertise: [],
        education: [],
        careerHighlights: [],
        linkedinUrl:
          "https://www.linkedin.com/in/c%E1%BA%A9m-t%C3%BA-94786b42a/",
        personalWebsite: "https://example.com/profile",
        photoFocalPoint: { x: 0, y: 100, privateNote: "PRIVATE SENTINEL" },
        displayOrder: 3,
        photo: {
          src: "/images/leadership/fixture-leader.webp",
          alt: "FIXTURE IMAGE",
          width: 1200,
          height: 1500,
        },
      },
      { ...leader, slug: "second-fixture", displayOrder: 1 },
      { ...leader, slug: "third-fixture", displayOrder: 1 },
      { ...leader, slug: "unordered-fixture" },
    ],
  },
  asOfDate,
);
equal(
  extendedLeader.leadership.map((profile) => profile.slug).join(","),
  "second-fixture,third-fixture,fixture-leader,unordered-fixture",
  "Display order is stable; missing order follows ordered records",
);
const completeLeader = extendedLeader.leadership[2];
equal(completeLeader.role, leader.role, "Full title is not abbreviated");
equal(completeLeader.titleVietnamese, "FIXTURE TITLE");
equal(completeLeader.abbreviation, "FIX");
equal(completeLeader.initials, "FL");
equal(completeLeader.shortBiography, "FIXTURE SHORT BIOGRAPHY");
equal(completeLeader.photo.width, 1200);
equal(completeLeader.photo.height, 1500);
equal(completeLeader.photoFocalPoint.x, 0);
equal(completeLeader.photoFocalPoint.y, 100);
equal(
  completeLeader.linkedinUrl,
  "https://www.linkedin.com/in/c%E1%BA%A9m-t%C3%BA-94786b42a/",
  "Supplied encoded LinkedIn URLs stay byte-for-byte unchanged",
);
equal(completeLeader.personalWebsite, "https://example.com/profile");
for (const field of ["expertise", "education", "careerHighlights"])
  equal(
    Object.hasOwn(completeLeader, field),
    false,
    "Empty optional lists are omitted from public output",
  );
okay(!JSON.stringify(extendedLeader).includes("PRIVATE SENTINEL"));
equal(extendedLeader.images.length, 1);
for (const linkedinUrl of [
  "https://example.com/in/fixture/",
  "https://www.linkedin.com/company/fixture/",
  "https://www.linkedin.com/in/fixture/?tracking=1",
  "https://www.linkedin.com/in/fixture/#secret",
  "https://www.linkedin.com.evil.test/in/fixture/",
  "http://www.linkedin.com/in/fixture/",
])
  rejected(() =>
    validatePublication(
      { ...empty(), leadership: [{ ...leader, linkedinUrl }] },
      asOfDate,
    ),
  );
for (const personalWebsite of [
  "javascript:alert(1)",
  "http://example.com",
  "https://user:secret@example.com",
])
  rejected(() =>
    validatePublication(
      { ...empty(), leadership: [{ ...leader, personalWebsite }] },
      asOfDate,
    ),
  );
for (const photoFocalPoint of [
  { x: -1, y: 50 },
  { x: 50, y: 101 },
  { x: 50 },
  { x: "50", y: 50 },
])
  rejected(() =>
    validatePublication(
      { ...empty(), leadership: [{ ...leader, photoFocalPoint }] },
      asOfDate,
    ),
  );
for (const displayOrder of [0, -1, 1.5, "1"])
  rejected(() =>
    validatePublication(
      { ...empty(), leadership: [{ ...leader, displayOrder }] },
      asOfDate,
    ),
  );
for (const src of [
  "/images/leadership/other-person.webp",
  "/images/leadership/fixture-leader.png",
  "/images/leadership/../fixture-leader.webp",
])
  rejected(() =>
    validatePublication(
      {
        ...empty(),
        leadership: [
          {
            ...leader,
            photo: { src, alt: "FIXTURE", width: 1200, height: 1500 },
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
      leadership: [
        { ...leader, id: "duplicate-id" },
        { ...leader, slug: "other-fixture", id: "duplicate-id" },
      ],
    },
    asOfDate,
  ),
);

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

// Synthetic WebP headers exercise metadata parsing only. These are not portraits
// or image fixtures, and are never written to public/ or publication records.
function webpContainer(chunks) {
  const bodies = chunks.map(([type, payload]) => {
    const header = Buffer.alloc(8);
    header.write(type, 0, 4, "ascii");
    header.writeUInt32LE(payload.length, 4);
    return Buffer.concat([header, payload, Buffer.alloc(payload.length % 2)]);
  });
  const body = Buffer.concat(bodies);
  const header = Buffer.alloc(12);
  header.write("RIFF", 0, 4, "ascii");
  header.writeUInt32LE(body.length + 4, 4);
  header.write("WEBP", 8, 4, "ascii");
  return Buffer.concat([header, body]);
}
const lossy = Buffer.alloc(10);
lossy.set([0x9d, 0x01, 0x2a], 3);
lossy.writeUInt16LE(1200, 6);
lossy.writeUInt16LE(1500, 8);
const lossless = Buffer.alloc(5);
lossless[0] = 0x2f;
lossless.writeUInt32LE(1199 + (1499 << 14), 1);
const extended = Buffer.alloc(10);
extended.writeUIntLE(1199, 4, 3);
extended.writeUIntLE(1499, 7, 3);
for (const chunks of [
  [["VP8 ", lossy]],
  [["VP8L", lossless]],
  [
    ["VP8X", extended],
    ["VP8 ", lossy],
  ],
]) {
  const dimensions = webpDimensions(webpContainer(chunks));
  equal(dimensions.width, 1200);
  equal(dimensions.height, 1500);
}
const animated = Buffer.from(extended);
animated[0] = 0x02;
const mismatched = Buffer.from(extended);
mismatched.writeUIntLE(999, 4, 3);
for (const data of [
  Buffer.from("<html>not a portrait</html>"),
  webpContainer([["VP8 ", lossy]]).subarray(0, 20),
  webpContainer([
    ["VP8X", animated],
    ["VP8 ", lossy],
  ]),
  webpContainer([
    ["ANIM", Buffer.alloc(6)],
    ["VP8 ", lossy],
  ]),
  webpContainer([
    ["VP8X", mismatched],
    ["VP8 ", lossy],
  ]),
  webpContainer([["VP8X", extended]]),
  webpContainer([
    ["VP8 ", lossy],
    ["VP8L", lossless],
  ]),
  webpContainer([["VP8L", Buffer.alloc(5)]]),
])
  rejected(() => webpDimensions(data));
console.log(
  `Content publication verification passed: ${checks} checks; synthetic fixtures stayed in memory.`,
);
