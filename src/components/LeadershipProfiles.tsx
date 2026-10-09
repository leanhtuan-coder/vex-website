import { Badge } from "@cloudflare/kumo/components/badge";
import { Link } from "@cloudflare/kumo/components/link";
import { Text } from "@cloudflare/kumo/components/text";
import { ArrowUpRightIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { publicLeadership } from "../content/leadership";
import LeadershipPortrait from "./LeadershipPortrait";
import "../styles-leadership.css";

export default function LeadershipProfiles() {
  if (publicLeadership.length === 0) return null;
  return (
    <section
      className="section leadership-section"
      id="doi-ngu-lanh-dao"
      aria-labelledby="leadership-title"
    >
      <div className="container leadership-layout">
        <div className="section-heading leadership-section-heading">
          <div className="eyebrow">OUR LEADERSHIP</div>
          <Text as="h2" variant="heading" id="leadership-title">
            Đội ngũ lãnh đạo
          </Text>
          <Text variant="secondary">
            Những thành viên phụ trách định hướng chiến lược, công nghệ, thương
            hiệu, tài chính và phát triển kinh doanh của VEX Technology
            Solutions.
          </Text>
        </div>
        <div className="leadership-profile-list">
          {publicLeadership.map((profile) => (
            <article
              className="leadership-profile"
              key={profile.slug}
              aria-labelledby={`leader-${profile.slug}-name`}
            >
              <LeadershipPortrait profile={profile} />
              <div className="leadership-profile-text">
                <Text
                  as="h3"
                  variant="heading"
                  id={`leader-${profile.slug}-name`}
                >
                  {profile.name}
                </Text>
                <Text DANGEROUS_className="leadership-role" lang="en">
                  {profile.role}
                </Text>
                {profile.abbreviation && (
                  <Badge variant="outline" className="leadership-role-badge">
                    {profile.abbreviation}
                  </Badge>
                )}
                {profile.titleVietnamese && (
                  <Text
                    variant="secondary"
                    DANGEROUS_className="leadership-vietnamese-title"
                  >
                    {profile.titleVietnamese}
                  </Text>
                )}
                <nav
                  className="leadership-profile-links"
                  aria-label={`Hồ sơ công khai của ${profile.name}`}
                >
                  <Link
                    href={`/leadership/#${profile.slug}`}
                    variant="plain"
                    className="leadership-profile-link"
                    aria-label={`Xem hồ sơ ${profile.name}`}
                  >
                    Xem hồ sơ
                    <ArrowUpRightIcon size={18} aria-hidden="true" />
                  </Link>
                  {profile.linkedinUrl && (
                    <Link
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="plain"
                      className="leadership-social-link"
                      aria-label={`LinkedIn của ${profile.name}`}
                    >
                      <LinkedinLogoIcon size={22} aria-hidden="true" />
                    </Link>
                  )}
                </nav>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
