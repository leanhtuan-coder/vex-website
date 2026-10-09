import type { Article } from "../src/content/articles";
import type { Job } from "../src/content/careers";
import type { Project } from "../src/content/projects";
import type { LeadershipProfile } from "../src/content/leadership";
import type { DocumentRecord } from "../src/content/documents";
import type { PublicationRecords } from "../src/content/validation";
import { company } from "../src/content/company";

// Editorial source, processed only by the build-time publisher. Never import
// this file from browser code, and never store confidential documents here.
// Draft and unapproved records stay out of generated browser assets.
export const websiteContent: PublicationRecords = {
  articles: [] as Article[],
  jobs: [] as Job[],
  projects: [] as Project[],
  leadership: [
    {
      slug: "le-anh-tuan",
      name: company.representative,
      role: company.representativeRole,
      contentState: "VERIFIED",
      approvedForPublication: true,
    },
  ] as LeadershipProfile[],
  documents: [] as DocumentRecord[],
};

export {
  validatePublication,
  validateSvgMarkup,
  validatePdfSignature,
} from "../src/content/validation";
