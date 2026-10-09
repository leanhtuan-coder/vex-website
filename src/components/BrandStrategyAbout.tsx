import { Badge } from "@cloudflare/kumo/components/badge";
import { Text } from "@cloudflare/kumo/components/text";
import { brandStrategy } from "../content/brand-strategy";
import { Heading } from "./shared";
import LeadershipProfiles from "./LeadershipProfiles";

export default function BrandStrategyAbout() {
  return (
    <>
      <section
        className="section brand-purpose-section"
        id="tam-nhin-su-menh"
        aria-labelledby="brand-purpose-title"
      >
        <div className="container">
          <div id="brand-purpose-title">
            <Heading label="ĐỊNH HƯỚNG PHÁT TRIỂN" title="Tầm nhìn & Sứ mệnh" />
          </div>
          {brandStrategy.status === "draft" && (
            <div className="brand-draft-note">
              <Badge variant="outline">{brandStrategy.draftLabel}</Badge>
              <Text variant="secondary">{brandStrategy.draftNote}</Text>
            </div>
          )}
          <div className="brand-purpose-grid">
            {[brandStrategy.vision, brandStrategy.mission].map((purpose) => (
              <article
                id={purpose.id}
                key={purpose.id}
                aria-labelledby={`${purpose.id}-title`}
              >
                <div className="brand-purpose-card">
                  <div className="brand-purpose-heading">
                    <span lang="en">{purpose.englishTitle}</span>
                    <div id={`${purpose.id}-title`}>
                      <Text as="h3" variant="heading">
                        {purpose.title}
                      </Text>
                    </div>
                  </div>
                  <div className="brand-purpose-statement">
                    <Text>{purpose.statement}</Text>
                  </div>
                  <div className="brand-purpose-support">
                    {purpose.supportingMessages.map((message) => (
                      <Text key={message} variant="secondary">
                        {message}
                      </Text>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="section container brand-values-section"
        id="gia-tri-cot-loi"
        aria-labelledby="brand-values-title"
      >
        <div id="brand-values-title">
          <Heading label="CORE VALUES" title="Giá trị cốt lõi" />
        </div>
        <ol className="brand-values-list" role="list">
          {brandStrategy.values.map((value) => (
            <li className="brand-value-row" key={value.number}>
              <span className="brand-value-number" aria-hidden="true">
                {value.number}
              </span>
              <div className="brand-value-name">
                <Text as="h3" variant="heading">
                  {value.title}
                </Text>
                <span lang="en">{value.englishTitle}</span>
              </div>
              <div className="brand-value-description">
                <Text variant="secondary">{value.description}</Text>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <LeadershipProfiles />
    </>
  );
}
