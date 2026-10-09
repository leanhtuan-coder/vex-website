import { Link } from "@cloudflare/kumo/components/link";
import { Text } from "@cloudflare/kumo/components/text";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { publicLeadership } from "../content/leadership";
import "../styles-leadership-preview.css";

export default function LeadershipPreview() {
  if (!publicLeadership.length) return null;
  return (
    <section
      className="section container home-leadership"
      aria-labelledby="home-leadership-title"
    >
      <div className="home-leadership-heading">
        <span className="eyebrow" lang="en">
          OUR LEADERSHIP
        </span>
        <Text as="h2" variant="heading" id="home-leadership-title">
          Đội ngũ lãnh đạo
        </Text>
        <Link href="/leadership/" variant="plain" className="text-link">
          Khám phá đội ngũ lãnh đạo
          <ArrowUpRightIcon size={18} aria-hidden="true" />
        </Link>
      </div>
      <div className="home-leadership-list">
        {publicLeadership.map((profile) => (
          <Link
            key={profile.slug}
            href={`/leadership/#${profile.slug}`}
            variant="plain"
            className="home-leadership-person"
          >
            <Text as="h3" variant="heading">
              {profile.name}
            </Text>
            <Text DANGEROUS_className="home-leadership-role" lang="en">
              {profile.role}
            </Text>
            <ArrowUpRightIcon size={18} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
