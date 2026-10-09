import { Text } from "@cloudflare/kumo/components/text";
import { Link } from "@cloudflare/kumo/components/link";
import { Badge } from "@cloudflare/kumo/components/badge";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { solutionChallenges, challengeServices } from "../content/challenges";
import { CTA, Heading } from "./shared";

export default function SolutionsByChallenge() {
  return (
    <section
      className="section corporate-challenges-section"
      id="theo-nhu-cau"
      aria-labelledby="challenge-section-title"
    >
      <div className="container">
        <div id="challenge-section-title">
          <Heading
            label="SOLUTIONS BY CHALLENGE"
            title="Bắt đầu từ nhu cầu của bạn."
          >
            Chọn bài toán để xem hướng tiếp cận. Phạm vi và tính khả thi được
            trao đổi cho từng dự án.
          </Heading>
        </div>
        <div className="challenge-list">
          {solutionChallenges.map((challenge, index) => {
            const matched = challengeServices(challenge);
            const technologies = [
              ...new Set(matched.flatMap((service) => service.technologies)),
            ];
            return (
              <details
                className="challenge-entry"
                id={`challenge-${challenge.id}`}
                key={challenge.id}
              >
                <summary className="challenge-title">
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Text
                    as="h3"
                    variant="heading"
                    id={`challenge-${challenge.id}-title`}
                  >
                    {challenge.title}
                  </Text>
                  <span className="challenge-toggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="challenge-detail">
                  <div className="challenge-facts">
                    <div>
                      <Text as="h4" variant="heading">
                        Bài toán thực tế
                      </Text>
                      {matched.map((service) => (
                        <Text key={service.slug} variant="secondary">
                          {service.problem}
                        </Text>
                      ))}
                    </div>
                    <div>
                      <Text as="h4" variant="heading">
                        Đối tượng phù hợp
                      </Text>
                      {matched.map((service) => (
                        <Text key={service.slug} variant="secondary">
                          {service.audience}
                        </Text>
                      ))}
                    </div>
                    <div>
                      <Text as="h4" variant="heading">
                        Hướng giải pháp
                      </Text>
                      <ul>
                        {matched
                          .flatMap((service) => service.approach)
                          .map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <Text as="h4" variant="heading">
                        Phạm vi có thể triển khai
                      </Text>
                      <ul>
                        {[
                          ...new Set(
                            matched.flatMap((service) => service.deliverables),
                          ),
                        ].map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="tags" aria-label="Công nghệ có thể sử dụng">
                    {technologies.map((technology) => (
                      <Badge variant="outline" key={technology}>
                        {technology}
                      </Badge>
                    ))}
                  </div>
                  <div className="challenge-related">
                    {matched.map((service) => (
                      <Link
                        href={`/solutions/${service.slug}/`}
                        key={service.slug}
                        variant="plain"
                      >
                        {service.title}
                        <ArrowUpRightIcon size={16} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                  <CTA href={`/contact/?topic=solution&need=${challenge.id}`}>
                    Trao đổi nhu cầu
                  </CTA>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
