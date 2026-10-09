import { contentAsOfDate } from "./build-date";
import publication from "./published.json";
import type { ContentGovernance } from "./governance";

export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; id: string; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | ({ type: "image" } & ContentImage);

export interface Article extends ContentGovernance {
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: "draft" | "published" | "archived";
  approvedForPublication: boolean;
  author: string;
  authorType?: "Person" | "Organization";
  /** Verified publication date in YYYY-MM-DD format. */
  publishedAt: string;
  updatedAt?: string;
  cover?: ContentImage;
  body: ArticleBlock[];
  relatedArticleSlugs?: string[];
  relatedLinks?: { label: string; href: string }[];
}

// Browser code receives only the validated build-time publication, never drafts.
export const articles = publication.articles as Article[];

export function getPublicArticles(asOfDate: string) {
  return articles
    .filter(
      (article) =>
        article.approvedForPublication &&
        article.status === "published" &&
        article.publishedAt <= asOfDate,
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export const publicArticles = getPublicArticles(contentAsOfDate);
