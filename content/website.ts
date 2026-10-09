import type { Article } from "../src/content/articles";
import type { Job } from "../src/content/careers";
import type { Project } from "../src/content/projects";
import type { PublicationRecords } from "../src/content/validation";

// Editorial source, processed only by the build-time publisher. Never import
// this file from browser code, and never store confidential documents here.
// Draft and unapproved records stay out of generated browser assets.
export const websiteContent: PublicationRecords = {
  articles: [] as Article[],
  jobs: [] as Job[],
  projects: [] as Project[],
};

export {
  validatePublication,
  validateSvgMarkup,
} from "../src/content/validation";
