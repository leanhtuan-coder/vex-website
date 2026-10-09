import type { ContentImage } from "./articles";
import type { ContentGovernance } from "./governance";
import publication from "./published.json";

export interface LeadershipProfile extends ContentGovernance {
  id?: string;
  slug: string;
  name: string;
  /** Canonical, unabbreviated English job title. */
  role: string;
  titleVietnamese?: string;
  abbreviation?: string;
  initials?: string;
  photo?: ContentImage;
  /** Percentages for CSS object-position; omitted values default to the center. */
  photoFocalPoint?: { x: number; y: number };
  shortBiography?: string;
  biography?: string[];
  responsibilities?: string[];
  expertise?: string[];
  education?: string[];
  careerHighlights?: string[];
  linkedinUrl?: string;
  personalWebsite?: string;
  displayOrder?: number;
  links?: { label: string; href: string }[];
}

// Only the publisher's approved, verified projection enters browser code.
// Missing portraits and biographies remain absent rather than placeholders.
export const publicLeadership = publication.leadership as LeadershipProfile[];
