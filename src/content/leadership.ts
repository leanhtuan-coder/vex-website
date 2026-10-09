import type { ContentImage } from "./articles";
import type { ContentGovernance } from "./governance";
import publication from "./published.json";

export interface LeadershipProfile extends ContentGovernance {
  slug: string;
  name: string;
  role: string;
  photo?: ContentImage;
  biography?: string[];
  responsibilities?: string[];
  expertise?: string[];
  links?: { label: string; href: string }[];
}

// Only the publisher's approved, verified projection enters browser code.
// Missing portraits and biographies remain absent rather than placeholders.
export const publicLeadership = publication.leadership as LeadershipProfile[];
