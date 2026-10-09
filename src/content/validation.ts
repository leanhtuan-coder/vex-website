import type { Article, ArticleBlock, ContentImage } from "./articles";
import type { Job } from "./careers";
import type { Project, ProjectStatus } from "./projects";
import type { ContentGovernance } from "./governance";
import type { LeadershipProfile } from "./leadership";
import type {
  DocumentCategory,
  DocumentRecord,
  PublicDocument,
} from "./documents";

export interface PublicationRecords {
  articles: (Article & ContentGovernance)[];
  jobs: (Job & ContentGovernance)[];
  projects: Project[];
  leadership?: LeadershipProfile[];
  documents?: DocumentRecord[];
}

export interface PublishedContent {
  articles: Article[];
  jobs: Job[];
  projects: Project[];
  leadership: LeadershipProfile[];
  /** File sizes are added by the filesystem publisher, never taken from editorial input. */
  documents: Omit<PublicDocument, "bytes">[];
  asOfDate: string;
  /** Exact local asset paths referenced by published content. */
  images: string[];
}

/** Approved SVG media must stay static and reference only local fragment IDs. */
export function validateSvgMarkup(source: string) {
  const unsafeReference = [
    ...source.matchAll(/\b(?:href|src)\s*=\s*(?:(["'])(.*?)\1|([^\s"'<>]+))/gi),
  ].some((match) => !match[1] || !/^#[A-Za-z0-9_-]+$/.test(match[2].trim()));
  const unsafeCssUrl = [
    ...source.matchAll(/\burl\s*\(\s*([^)]*?)\s*\)/gi),
  ].some((match) => !/^(["']?)#[A-Za-z0-9_-]+\1$/.test(match[1].trim()));
  if (
    /<(?:script|foreignObject|animate|set|animateTransform|animateMotion)\b|<!\s*(?:DOCTYPE|ENTITY)\b|\bon[a-z]+\s*=|@import\b/i.test(
      source,
    ) ||
    unsafeReference ||
    unsafeCssUrl
  )
    throw new Error(
      "Published SVG images cannot contain active content or external resources",
    );
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const imagePattern =
  /^\/assets\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.(?:png|jpe?g|webp|avif|svg)$/;
const projectStatuses: ProjectStatus[] = [
  "Concept",
  "Research",
  "Prototype",
  "Pilot",
  "Commercial Product",
];
const projectOwnerships = [
  "vex",
  "founder-before-vex",
  "personal-research",
  "collaboration",
] as const;
const documentCategories: DocumentCategory[] = [
  "company-profile",
  "brand-guidelines",
  "media-kit",
  "product-brochure",
  "technology-document",
];

function fail(path: string, reason: string): never {
  throw new Error(`Invalid publication field ${path}: ${reason}`);
}

function object(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    fail(path, "expected an object");
  return value as Record<string, unknown>;
}

function text(value: unknown, path: string): string {
  if (typeof value !== "string" || !value.trim())
    fail(path, "a nonempty verified text value is required");
  if (
    Array.from(value).some((character) => {
      const code = character.charCodeAt(0);
      return code < 32 && code !== 9 && code !== 10 && code !== 13;
    })
  )
    fail(path, "control characters are not allowed");
  if (/<\/?[a-z][^>]*>/i.test(value))
    fail(path, "use typed content blocks rather than raw HTML");
  return value.trim();
}

function date(value: unknown, path: string): string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    fail(path, "use YYYY-MM-DD");
  const parsed = new Date(`${value}T00:00:00Z`);
  if (
    !Number.isFinite(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== value
  )
    fail(path, "the calendar date does not exist");
  return value;
}

function slug(value: unknown, path: string): string {
  if (
    typeof value !== "string" ||
    !slugPattern.test(value) ||
    value.length > 100
  )
    fail(path, "use a safe lowercase slug with hyphens");
  return value;
}

function number(value: unknown, path: string, minimum = 1): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < minimum)
    fail(path, "expected a finite positive number");
  return value;
}

function dimension(value: unknown, path: string): number {
  const result = number(value, path);
  if (!Number.isInteger(result) || result > 20000)
    fail(path, "image dimensions must be whole pixels from 1 to 20000");
  return result;
}

function texts(value: unknown, path: string, required = true): string[] {
  if (!Array.isArray(value) || (required && value.length === 0))
    fail(path, "expected a nonempty list of verified text values");
  return value.map((item, index) => text(item, `${path}[${index}]`));
}

function assetPath(value: unknown, path: string): string {
  if (typeof value !== "string" || !imagePattern.test(value))
    fail(
      path,
      "use an approved local /assets/ image path without URLs or traversal",
    );
  return value;
}

function image(value: unknown, path: string): ContentImage {
  const item = object(value, path);
  return {
    src: assetPath(item.src, `${path}.src`),
    alt: text(item.alt, `${path}.alt`),
    width: dimension(item.width, `${path}.width`),
    height: dimension(item.height, `${path}.height`),
    ...(item.caption === undefined
      ? {}
      : { caption: text(item.caption, `${path}.caption`) }),
  };
}

function link(value: unknown, path: string): string {
  if (typeof value !== "string" || /[\s<>"'\\]/.test(value))
    fail(path, "expected a safe relative path or HTTPS source link");
  if (value.startsWith("#")) {
    if (!slugPattern.test(value.slice(1))) fail(path, "unsafe anchor");
    return value;
  }
  let parsed: URL;
  try {
    parsed = new URL(value, "https://vex.biz.vn");
  } catch {
    fail(path, "invalid link");
  }
  if (value.startsWith("/")) {
    if (
      value.startsWith("//") ||
      /(?:^|\/)\.{1,2}(?:\/|$)/.test(value) ||
      /%/.test(value)
    )
      fail(path, "unsafe relative path");
    if (!/^\/[a-z0-9/-]*(?:\?[a-z0-9=&_-]+)?(?:#[a-z0-9-]+)?$/.test(value))
      fail(path, "unsafe relative path");
  } else if (!value.startsWith("https://")) {
    fail(path, "only local paths and HTTPS source links are allowed");
  }
  if (parsed.protocol !== "https:" || parsed.username || parsed.password)
    fail(path, "unsafe URL protocol or credentials");
  return value;
}

function blocks(value: unknown, path: string): ArticleBlock[] {
  if (!Array.isArray(value) || value.length === 0)
    fail(path, "at least one typed content block is required");
  const headingIds = new Set<string>();
  let hasHeading = false;
  return value.map((value, index) => {
    const blockPath = `${path}[${index}]`;
    const block = object(value, blockPath);
    switch (block.type) {
      case "paragraph":
        return {
          type: "paragraph",
          text: text(block.text, `${blockPath}.text`),
        };
      case "heading": {
        if (block.level !== 2 && block.level !== 3)
          fail(`${blockPath}.level`, "use heading level 2 or 3");
        if (block.level === 3 && !hasHeading)
          fail(
            `${blockPath}.level`,
            "start article sections with an h2 heading",
          );
        hasHeading = true;
        const id = slug(block.id, `${blockPath}.id`);
        if (
          headingIds.has(id) ||
          ["main", "related-links-title", "related-articles-title"].includes(id)
        )
          fail(
            `${blockPath}.id`,
            "heading IDs must be unique and not reserved",
          );
        headingIds.add(id);
        return {
          type: "heading",
          level: block.level,
          id,
          text: text(block.text, `${blockPath}.text`),
        };
      }
      case "list":
        if (block.ordered !== undefined && typeof block.ordered !== "boolean")
          fail(`${blockPath}.ordered`, "expected a boolean");
        return {
          type: "list",
          ...(block.ordered === undefined ? {} : { ordered: block.ordered }),
          items: texts(block.items, `${blockPath}.items`),
        };
      case "image":
        return { type: "image", ...image(block, blockPath) };
      default:
        return fail(
          `${blockPath}.type`,
          "unsupported content block; raw HTML is not supported",
        );
    }
  });
}

function unique(records: { slug: string }[], path: string) {
  const seen = new Set<string>();
  for (const record of records) {
    if (seen.has(record.slug))
      fail(path, "approved records must have unique slugs");
    seen.add(record.slug);
  }
}

function approvedArticle(value: unknown, path: string): Article {
  const item = object(value, path);
  const publishedAt = date(item.publishedAt, `${path}.publishedAt`);
  const updatedAt =
    item.updatedAt === undefined
      ? undefined
      : date(item.updatedAt, `${path}.updatedAt`);
  if (updatedAt && updatedAt < publishedAt)
    fail(`${path}.updatedAt`, "cannot precede the publication date");
  if (
    item.authorType !== undefined &&
    item.authorType !== "Person" &&
    item.authorType !== "Organization"
  )
    fail(`${path}.authorType`, "use Person or Organization");
  const relatedArticleSlugs =
    item.relatedArticleSlugs === undefined
      ? undefined
      : texts(
          item.relatedArticleSlugs,
          `${path}.relatedArticleSlugs`,
          false,
        ).map((value, index) =>
          slug(value, `${path}.relatedArticleSlugs[${index}]`),
        );
  let relatedLinks: Article["relatedLinks"];
  if (item.relatedLinks !== undefined) {
    if (!Array.isArray(item.relatedLinks))
      fail(`${path}.relatedLinks`, "expected a list of source links");
    relatedLinks = item.relatedLinks.map((value, index) => {
      const linkPath = `${path}.relatedLinks[${index}]`;
      const source = object(value, linkPath);
      return {
        label: text(source.label, `${linkPath}.label`),
        href: link(source.href, `${linkPath}.href`),
      };
    });
  }
  return {
    slug: slug(item.slug, `${path}.slug`),
    title: text(item.title, `${path}.title`),
    summary: text(item.summary, `${path}.summary`),
    category: text(item.category, `${path}.category`),
    status: "published",
    approvedForPublication: true,
    author: text(item.author, `${path}.author`),
    ...(item.authorType === undefined ? {} : { authorType: item.authorType }),
    publishedAt,
    ...(updatedAt ? { updatedAt } : {}),
    ...(item.cover === undefined
      ? {}
      : { cover: image(item.cover, `${path}.cover`) }),
    body: blocks(item.body, `${path}.body`),
    ...(relatedArticleSlugs === undefined ? {} : { relatedArticleSlugs }),
    ...(relatedLinks === undefined ? {} : { relatedLinks }),
  };
}

function approvedJob(value: unknown, path: string): Job {
  const item = object(value, path);
  if (
    typeof item.employmentType !== "string" ||
    !["FULL_TIME", "PART_TIME", "CONTRACTOR", "INTERN"].includes(
      item.employmentType,
    )
  )
    fail(`${path}.employmentType`, "unsupported employment type");
  if (
    typeof item.workplace !== "string" ||
    !["onsite", "hybrid", "remote"].includes(item.workplace)
  )
    fail(`${path}.workplace`, "unsupported workplace type");
  const location = object(item.location, `${path}.location`);
  if (
    typeof location.country !== "string" ||
    !/^[A-Z]{2}$/.test(location.country)
  )
    fail(`${path}.location.country`, "use a two-letter country code");
  const publishedAt = date(item.publishedAt, `${path}.publishedAt`);
  const deadline = date(item.deadline, `${path}.deadline`);
  if (deadline < publishedAt)
    fail(`${path}.deadline`, "cannot precede the publication date");
  let salary: Job["salary"];
  if (item.salary !== undefined) {
    const source = object(item.salary, `${path}.salary`);
    const minimum = number(source.minimum, `${path}.salary.minimum`);
    const maximum =
      source.maximum === undefined
        ? undefined
        : number(source.maximum, `${path}.salary.maximum`);
    if (maximum !== undefined && maximum < minimum)
      fail(`${path}.salary.maximum`, "cannot be lower than the minimum");
    if (
      typeof source.currency !== "string" ||
      !Intl.supportedValuesOf("currency").includes(source.currency)
    )
      fail(`${path}.salary.currency`, "use a recognized ISO currency code");
    try {
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: source.currency,
      }).format(minimum);
    } catch {
      fail(`${path}.salary.currency`, "invalid currency code");
    }
    if (source.period !== "MONTH" && source.period !== "YEAR")
      fail(`${path}.salary.period`, "use MONTH or YEAR");
    salary = {
      minimum,
      ...(maximum === undefined ? {} : { maximum }),
      currency: source.currency,
      period: source.period,
    };
  }
  return {
    slug: slug(item.slug, `${path}.slug`),
    title: text(item.title, `${path}.title`),
    department: text(item.department, `${path}.department`),
    summary: text(item.summary, `${path}.summary`),
    approvedForPublication: true,
    status: "open",
    employmentType: item.employmentType as Job["employmentType"],
    workplace: item.workplace as Job["workplace"],
    location: {
      label: text(location.label, `${path}.location.label`),
      country: location.country,
      ...(location.streetAddress === undefined
        ? {}
        : {
            streetAddress: text(
              location.streetAddress,
              `${path}.location.streetAddress`,
            ),
          }),
      ...(location.locality === undefined
        ? {}
        : { locality: text(location.locality, `${path}.location.locality`) }),
      ...(location.region === undefined
        ? {}
        : { region: text(location.region, `${path}.location.region`) }),
    },
    publishedAt,
    deadline,
    responsibilities: texts(item.responsibilities, `${path}.responsibilities`),
    requirements: texts(item.requirements, `${path}.requirements`),
    ...(item.preferredQualifications === undefined
      ? {}
      : {
          preferredQualifications: texts(
            item.preferredQualifications,
            `${path}.preferredQualifications`,
            false,
          ),
        }),
    benefits: texts(item.benefits, `${path}.benefits`),
    ...(salary === undefined ? {} : { salary }),
    applicationInstructions: text(
      item.applicationInstructions,
      `${path}.applicationInstructions`,
    ),
  };
}

function approvedProject(value: unknown, path: string): Project {
  const item = object(value, path);
  if (!projectStatuses.includes(item.status as ProjectStatus))
    fail(`${path}.status`, "unsupported project status");
  const provenance = object(item.provenance, `${path}.provenance`);
  if (
    !projectOwnerships.includes(
      provenance.ownership as Project["provenance"]["ownership"],
    )
  )
    fail(
      `${path}.provenance.ownership`,
      "identify VEX, pre-incorporation, personal research, or collaboration separately",
    );
  return {
    slug: slug(item.slug, `${path}.slug`),
    title: text(item.title, `${path}.title`),
    category: text(item.category, `${path}.category`),
    status: item.status as ProjectStatus,
    approvedForPublication: true,
    contentState: "VERIFIED",
    summary: text(item.summary, `${path}.summary`),
    image: assetPath(item.image, `${path}.image`),
    imageAlt: text(item.imageAlt, `${path}.imageAlt`),
    imageWidth: dimension(item.imageWidth, `${path}.imageWidth`),
    imageHeight: dimension(item.imageHeight, `${path}.imageHeight`),
    context: text(item.context, `${path}.context`),
    problem: text(item.problem, `${path}.problem`),
    solution: text(item.solution, `${path}.solution`),
    technologies: texts(item.technologies, `${path}.technologies`),
    role: text(item.role, `${path}.role`),
    provenance: {
      ownership: provenance.ownership as Project["provenance"]["ownership"],
      statement: text(provenance.statement, `${path}.provenance.statement`),
    },
    ...(item.publicArchitecture === undefined
      ? {}
      : {
          publicArchitecture: text(
            item.publicArchitecture,
            `${path}.publicArchitecture`,
          ),
        }),
    ...(item.evidence === undefined
      ? {}
      : { evidence: text(item.evidence, `${path}.evidence`) }),
    ...(item.challenges === undefined
      ? {}
      : { challenges: text(item.challenges, `${path}.challenges`) }),
    ...(item.nextSteps === undefined
      ? {}
      : { nextSteps: text(item.nextSteps, `${path}.nextSteps`) }),
  };
}

/** Verify the approved file's PDF container markers; this is not a malware scanner. */
export function validatePdfSignature(header: string, trailer: string) {
  if (
    !/^%PDF-(?:1\.[0-7]|2\.0)[\r\n]/.test(header) ||
    !/%%EOF[\t\r\n ]*$/.test(trailer)
  )
    throw new Error(
      "Approved documents must be complete PDF files with a valid header and EOF marker",
    );
}

function approvedLeader(value: unknown, path: string): LeadershipProfile {
  const item = object(value, path);
  let links: LeadershipProfile["links"];
  if (item.links !== undefined) {
    if (!Array.isArray(item.links))
      fail(`${path}.links`, "expected public profile links");
    links = item.links.map((value, index) => {
      const linkPath = `${path}.links[${index}]`;
      const source = object(value, linkPath);
      const href = link(source.href, `${linkPath}.href`);
      if (!href.startsWith("https://"))
        fail(
          `${linkPath}.href`,
          "leadership links must be verified public HTTPS profiles",
        );
      return { label: text(source.label, `${linkPath}.label`), href };
    });
  }
  return {
    slug: slug(item.slug, `${path}.slug`),
    name: text(item.name, `${path}.name`),
    role: text(item.role, `${path}.role`),
    contentState: "VERIFIED",
    approvedForPublication: true,
    ...(item.photo === undefined
      ? {}
      : { photo: image(item.photo, `${path}.photo`) }),
    ...(item.biography === undefined
      ? {}
      : { biography: texts(item.biography, `${path}.biography`, false) }),
    ...(item.responsibilities === undefined
      ? {}
      : {
          responsibilities: texts(
            item.responsibilities,
            `${path}.responsibilities`,
            false,
          ),
        }),
    ...(item.expertise === undefined
      ? {}
      : { expertise: texts(item.expertise, `${path}.expertise`, false) }),
    ...(links === undefined ? {} : { links }),
  };
}

function approvedDocument(
  value: unknown,
  path: string,
): Omit<PublicDocument, "bytes"> {
  const item = object(value, path);
  if (!documentCategories.includes(item.category as DocumentCategory))
    fail(`${path}.category`, "unsupported public document category");
  if (
    typeof item.href !== "string" ||
    !/^\/assets\/documents\/public-[A-Za-z0-9_-]+\.pdf$/.test(item.href)
  )
    fail(
      `${path}.href`,
      "use an explicitly approved /assets/documents/public-*.pdf copy; internal documents are excluded",
    );
  return {
    slug: slug(item.slug, `${path}.slug`),
    title: text(item.title, `${path}.title`),
    summary: text(item.summary, `${path}.summary`),
    category: item.category as DocumentCategory,
    href: item.href,
    filename: item.href.slice(item.href.lastIndexOf("/") + 1),
    format: "PDF",
    contentState: "VERIFIED",
    approvedForPublication: true,
    ...(item.version === undefined
      ? {}
      : { version: text(item.version, `${path}.version`) }),
    ...(item.publishedAt === undefined
      ? {}
      : { publishedAt: date(item.publishedAt, `${path}.publishedAt`) }),
  };
}

/** Build-only publication gate. Returned records contain only whitelisted public fields. */
export function validatePublication(
  records: PublicationRecords,
  asOfDate: string,
): PublishedContent {
  const acceptedDate = date(asOfDate, "asOfDate");
  const source = object(records, "content");
  for (const key of ["articles", "jobs", "projects"]) {
    if (!Array.isArray(source[key]))
      fail(`content.${key}`, "expected a content list");
  }
  for (const key of ["leadership", "documents"]) {
    if (source[key] !== undefined && !Array.isArray(source[key]))
      fail(`content.${key}`, "expected a content list");
  }
  const eligible = (item: unknown, requireVerification = false) =>
    item !== null &&
    typeof item === "object" &&
    (item as Record<string, unknown>).approvedForPublication === true &&
    ((item as Record<string, unknown>).contentState === "VERIFIED" ||
      (!requireVerification &&
        (item as Record<string, unknown>).contentState === undefined));
  const articleCandidates = records.articles
    .filter((item) => eligible(item) && item.status === "published")
    .map((item, index) => approvedArticle(item, `articles[${index}]`));
  const jobCandidates = records.jobs
    .filter((item) => eligible(item) && item.status === "open")
    .map((item, index) => approvedJob(item, `jobs[${index}]`));
  const projects = records.projects
    .filter((item) => eligible(item, true))
    .map((item, index) => approvedProject(item, `projects[${index}]`));
  const leadership = (records.leadership || [])
    .filter((item) => eligible(item, true))
    .map((item, index) => approvedLeader(item, `leadership[${index}]`));
  const documentCandidates = (records.documents || [])
    .filter((item) => eligible(item, true))
    .map((item, index) => approvedDocument(item, `documents[${index}]`));
  unique(articleCandidates, "articles.slug");
  unique(jobCandidates, "jobs.slug");
  unique(projects, "projects.slug");
  unique(leadership, "leadership.slug");
  unique(documentCandidates, "documents.slug");
  const documents = documentCandidates.filter(
    (item) => !item.publishedAt || item.publishedAt <= acceptedDate,
  );
  const articles = articleCandidates
    .filter((item) => item.publishedAt <= acceptedDate)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const jobs = jobCandidates
    .filter(
      (item) =>
        item.publishedAt <= acceptedDate && item.deadline >= acceptedDate,
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  for (const article of articles) {
    if (article.updatedAt && article.updatedAt > acceptedDate)
      fail(
        "articles.updatedAt",
        "a future update must not be publicly visible",
      );
    if (article.relatedArticleSlugs) {
      article.relatedArticleSlugs = article.relatedArticleSlugs.filter(
        (slug) =>
          slug !== article.slug &&
          articles.some((other) => other.slug === slug),
      );
    }
  }
  const images = new Set<string>();
  for (const article of articles) {
    if (article.cover) images.add(article.cover.src);
    for (const block of article.body)
      if (block.type === "image") images.add(block.src);
  }
  for (const project of projects) images.add(project.image);
  for (const leader of leadership)
    if (leader.photo) images.add(leader.photo.src);
  return {
    asOfDate: acceptedDate,
    articles,
    jobs,
    projects,
    leadership,
    documents,
    images: [...images].sort(),
  };
}
