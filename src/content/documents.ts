import type { ContentGovernance } from "./governance";
import publication from "./published.json";

export type DocumentCategory =
  | "company-profile"
  | "brand-guidelines"
  | "media-kit"
  | "product-brochure"
  | "technology-document";

export interface DocumentRecord extends ContentGovernance {
  slug: string;
  title: string;
  category: DocumentCategory;
  summary: string;
  /** Explicit public copies only, under /assets/documents/public-*.pdf. */
  href: string;
  version?: string;
  publishedAt?: string;
}

export interface PublicDocument extends DocumentRecord {
  filename: string;
  format: "PDF";
  /** Measured from the approved regular file during publication. */
  bytes: number;
}

export const documentCategoryLabels: Record<DocumentCategory, string> = {
  "company-profile": "Hồ sơ doanh nghiệp",
  "brand-guidelines": "Hướng dẫn nhận diện công khai",
  "media-kit": "Bộ tài liệu truyền thông",
  "product-brochure": "Tài liệu sản phẩm",
  "technology-document": "Tài liệu công nghệ",
};

export const publicDocuments = publication.documents as PublicDocument[];
