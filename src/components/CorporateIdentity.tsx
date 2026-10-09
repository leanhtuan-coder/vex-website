import { Text } from "@cloudflare/kumo/components/text";
import { Badge } from "@cloudflare/kumo/components/badge";
import { Link } from "@cloudflare/kumo/components/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { companyJourney, whyVex } from "../content/corporate-identity";
import { Heading } from "./shared";
import { publicDocuments } from "../content/documents";
import DocumentDownloadCenter from "./DocumentDownloadCenter";

export function WhyVex() {
  if (!whyVex.approvedForPublication) return null;
  return (
    <section
      className="section corporate-why-section"
      id="why-vex"
      aria-labelledby="why-vex-title"
    >
      <div className="container corporate-why-layout">
        <div id="why-vex-title">
          <Heading label="WHY VEX" title={whyVex.headline} />
          <Badge variant="outline" className="corporate-direction-badge">
            Định hướng tiếp cận
          </Badge>
          <Text
            variant="secondary"
            DANGEROUS_className="corporate-direction-note"
          >
            Năng lực và phạm vi triển khai được xác định theo từng bài toán.
          </Text>
        </div>
        <ol className="corporate-why-pillars" role="list">
          {whyVex.pillars.map((pillar, index) => (
            <li key={pillar}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Text as="h3" variant="heading">
                {pillar}
              </Text>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CompanyJourney() {
  return (
    <section
      className="section container corporate-journey-layout"
      id="hanh-trinh"
      aria-labelledby="company-journey-title"
    >
      <div id="company-journey-title">
        <Heading label="OUR JOURNEY" title="Hành trình của VEX" />
      </div>
      <ol className="corporate-journey" role="list">
        {companyJourney.map((milestone) => (
          <li key={milestone.date}>
            <time dateTime={milestone.date}>{milestone.label}</time>
            <Text as="h3" variant="heading">
              {milestone.title}
            </Text>
            <Text variant="secondary">{milestone.description}</Text>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CompanyProfileNote() {
  if (
    publicDocuments.some((document) => document.category === "company-profile")
  )
    return (
      <DocumentDownloadCenter category="company-profile" headingLevel="h3" />
    );
  return (
    <div className="corporate-profile-note" id="ho-so-doanh-nghiep">
      <Text as="h3" variant="heading">
        Hồ sơ doanh nghiệp
      </Text>
      <Text variant="secondary">
        Chưa có hồ sơ doanh nghiệp để tải xuống. Liên hệ VEX để trao đổi thông
        tin cần thiết.
      </Text>
      <Link
        variant="plain"
        href="/contact/?topic=business"
        className="text-link"
      >
        Trao đổi về hồ sơ doanh nghiệp
        <ArrowUpRightIcon size={18} aria-hidden="true" />
      </Link>
    </div>
  );
}
