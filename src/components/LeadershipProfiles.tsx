import { Badge } from "@cloudflare/kumo/components/badge";
import { Link } from "@cloudflare/kumo/components/link";
import { Text } from "@cloudflare/kumo/components/text";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { publicLeadership } from "../content/leadership";
import { Heading } from "./shared";
import "../styles-leadership.css";

export default function LeadershipProfiles() {
  if (publicLeadership.length === 0) return null;
  return (
    <section
      className="section leadership-section"
      id="doi-ngu-lanh-dao"
      aria-labelledby="leadership-title"
    >
      <div className="container editorial-grid leadership-layout">
        <div id="leadership-title">
          <Heading label="LEADERSHIP TEAM" title="Đội ngũ lãnh đạo" />
        </div>
        <div className="leadership-profile-list">
          {publicLeadership.map((profile) => (
            <article
              className={`leadership-profile${profile.photo ? " leadership-profile-with-photo" : ""}`}
              key={profile.slug}
              aria-labelledby={`leader-${profile.slug}-name`}
            >
              {profile.photo && (
                <figure className="leadership-photo">
                  <img
                    src={profile.photo.src}
                    alt={profile.photo.alt}
                    width={profile.photo.width}
                    height={profile.photo.height}
                    loading="lazy"
                  />
                  {profile.photo.caption && (
                    <figcaption>{profile.photo.caption}</figcaption>
                  )}
                </figure>
              )}
              <div className="leadership-profile-text">
                <Text
                  as="h3"
                  variant="heading"
                  id={`leader-${profile.slug}-name`}
                >
                  {profile.name}
                </Text>
                <Text variant="secondary">{profile.role}</Text>
                {profile.biography && profile.biography.length > 0 && (
                  <div className="leadership-biography">
                    {profile.biography.map((paragraph, index) => (
                      <Text key={index}>{paragraph}</Text>
                    ))}
                  </div>
                )}
                {profile.responsibilities &&
                  profile.responsibilities.length > 0 && (
                    <div className="leadership-profile-detail">
                      <Text as="h4" variant="heading">
                        Phạm vi phụ trách
                      </Text>
                      <ul>
                        {profile.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                {profile.expertise && profile.expertise.length > 0 && (
                  <div className="leadership-profile-detail">
                    <Text as="h4" variant="heading">
                      Lĩnh vực chuyên môn
                    </Text>
                    <div className="leadership-expertise">
                      {profile.expertise.map((expertise) => (
                        <Badge key={expertise} variant="outline">
                          {expertise}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.links && profile.links.length > 0 && (
                  <nav
                    className="leadership-profile-links"
                    aria-label={`Hồ sơ công khai của ${profile.name}`}
                  >
                    {profile.links.map((link) => (
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
                <Link
                  href="/contact/"
                  variant="plain"
                  className="leadership-contact-link"
                >
                  Liên hệ với VEX
                  <ArrowUpRightIcon size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
