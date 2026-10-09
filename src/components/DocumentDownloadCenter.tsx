import { LinkButton } from "@cloudflare/kumo/components/button";
import { Badge } from "@cloudflare/kumo/components/badge";
import { Text } from "@cloudflare/kumo/components/text";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import {
  publicDocuments,
  documentCategoryLabels,
  type DocumentCategory,
} from "../content/documents";
import { formatMediaSize } from "../content/media";

export default function DocumentDownloadCenter({
  category,
  headingLevel = "h2",
}: {
  category?: DocumentCategory;
  headingLevel?: "h2" | "h3";
}) {
  const documents = category
    ? publicDocuments.filter((document) => document.category === category)
    : publicDocuments;
  if (!documents.length) return null;
  return (
    <div className="public-documents">
      <Text as={headingLevel} variant="heading">
        {category ? documentCategoryLabels[category] : "Tài liệu công khai"}
      </Text>
      <div className="public-document-list">
        {documents.map((document) => (
          <article className="public-document" key={document.slug}>
            <Badge variant="outline">
              {documentCategoryLabels[document.category]}
            </Badge>
            <Text as={headingLevel === "h2" ? "h3" : "h4"} variant="heading">
              {document.title}
            </Text>
            <Text variant="secondary">{document.summary}</Text>
            <span className="public-document-meta">
              {document.filename} · PDF · {formatMediaSize(document.bytes)}
              {document.version ? ` · ${document.version}` : ""}
            </span>
            <LinkButton
              variant="secondary"
              size="base"
              href={document.href}
              download={document.filename}
              aria-label={`Tải ${document.title}`}
            >
              <DownloadSimpleIcon size={16} aria-hidden="true" /> Tải PDF
            </LinkButton>
          </article>
        ))}
      </div>
    </div>
  );
}
