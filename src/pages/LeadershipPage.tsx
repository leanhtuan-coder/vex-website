import { Badge } from "@cloudflare/kumo/components/badge";
import { Link } from "@cloudflare/kumo/components/link";
import { Text } from "@cloudflare/kumo/components/text";
import { ArrowUpRightIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { publicLeadership } from "../content/leadership";
import LeadershipPortrait from "../components/LeadershipPortrait";
import { CTASection, PageIntro } from "../components/shared";
import "../styles-leadership.css";

export default function LeadershipPage() {
  return (
    <>
      <PageIntro label="Đội ngũ lãnh đạo" title="Đội ngũ lãnh đạo VEX.">
        Những thành viên phụ trách định hướng chiến lược, công nghệ, thương
        hiệu, tài chính và phát triển kinh doanh của VEX Technology Solutions.
      </PageIntro>
      <div className="container executive-introduction">
        <nav className="executive-index" aria-label="Hồ sơ lãnh đạo">
          {publicLeadership.map((profile, index) => (
            <Link href={`#${profile.slug}`} variant="plain" key={profile.slug}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {profile.name}
            </Link>
          ))}
        </nav>
        <Link href="/about/#doi-ngu-lanh-dao" variant="plain">
          Về VEX Technology Solutions
          <ArrowUpRightIcon size={18} aria-hidden="true" />
        </Link>
      </div>
      <section
        className="section executive-profiles"
        aria-label="Hồ sơ chi tiết"
      >
        <div className="container executive-profile-list">
          {publicLeadership.map((profile, index) => (
            <article
              id={profile.slug}
              key={profile.slug}
              className="executive-profile"
              aria-labelledby={`executive-${profile.slug}-name`}
            >
              <div className="executive-portrait-column">
                <span className="executive-profile-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} / VEX LEADERSHIP
                </span>
                <LeadershipPortrait profile={profile} />
                {profile.photo?.caption && (
                  <Text
                    variant="secondary"
                    DANGEROUS_className="executive-photo-caption"
                  >
                    {profile.photo.caption}
                  </Text>
                )}
              </div>
              <div className="executive-profile-content">
                <div className="executive-profile-heading">
                  <Text
                    as="h2"
                    variant="heading"
                    id={`executive-${profile.slug}-name`}
                  >
                    {profile.name}
                  </Text>
                  <Text DANGEROUS_className="executive-role" lang="en">
                    {profile.role}
                  </Text>
                  <div className="executive-role-meta">
                    {profile.abbreviation && (
                      <Badge
                        variant="outline"
                        className="leadership-role-badge"
                      >
                        {profile.abbreviation}
                      </Badge>
                    )}
                    {profile.titleVietnamese && (
                      <Text variant="secondary">{profile.titleVietnamese}</Text>
                    )}
                  </div>
                </div>
                {profile.biography && profile.biography.length > 0 && (
                  <section
                    className="executive-biography"
                    aria-label="Giới thiệu"
                  >
                    {profile.biography.map((paragraph, paragraphIndex) => (
                      <Text key={paragraphIndex}>{paragraph}</Text>
                    ))}
                  </section>
                )}
                {profile.responsibilities &&
                  profile.responsibilities.length > 0 && (
                    <section className="executive-profile-detail">
                      <Text as="h3" variant="heading">
                        Phạm vi phụ trách
                      </Text>
                      <ul>
                        {profile.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                {profile.expertise && profile.expertise.length > 0 && (
                  <section className="executive-profile-detail">
                    <Text as="h3" variant="heading">
                      Lĩnh vực chuyên môn
                    </Text>
                    <div className="leadership-expertise">
                      {profile.expertise.map((expertise) => (
                        <Badge key={expertise} variant="outline">
                          {expertise}
                        </Badge>
                      ))}
                    </div>
                  </section>
                )}
                {profile.education && profile.education.length > 0 && (
                  <section className="executive-profile-detail">
                    <Text as="h3" variant="heading">
                      Học vấn
                    </Text>
                    <ul>
                      {profile.education.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {profile.careerHighlights &&
                  profile.careerHighlights.length > 0 && (
                    <section className="executive-profile-detail">
                      <Text as="h3" variant="heading">
                        Dấu mốc nghề nghiệp
                      </Text>
                      <ul>
                        {profile.careerHighlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                {(profile.linkedinUrl ||
                  profile.personalWebsite ||
                  profile.links?.length) && (
                  <nav
                    className="executive-profile-links"
                    aria-label={`Liên kết công khai của ${profile.name}`}
                  >
                    {profile.linkedinUrl && (
                      <Link
                        href={profile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="plain"
                        aria-label={`LinkedIn của ${profile.name}`}
                      >
                        <LinkedinLogoIcon size={22} aria-hidden="true" />
                        LinkedIn
                        <ArrowUpRightIcon size={16} aria-hidden="true" />
                      </Link>
                    )}
                    {profile.personalWebsite && (
                      <Link
                        href={profile.personalWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="plain"
                        aria-label={`Website cá nhân của ${profile.name}`}
                      >
                        Website cá nhân
                        <ArrowUpRightIcon size={18} aria-hidden="true" />
                      </Link>
                    )}
                    {profile.links?.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="plain"
                      >
                        {link.label}
                        <ArrowUpRightIcon size={18} aria-hidden="true" />
                      </Link>
                    ))}
                  </nav>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
