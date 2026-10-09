export type ProjectStatus =
  | "Concept"
  | "Research"
  | "Prototype"
  | "Pilot"
  | "Commercial Product";
export interface Project {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  approvedForPublication: boolean;
  summary: string;
  image: string;
  imageAlt: string;
  context: string;
  problem: string;
  solution: string;
  technologies: string[];
  role: string;
  evidence: string;
  challenges: string;
  nextSteps: string;
}
// Add only projects whose ownership, media, status and public release are approved.
export const projects: Project[] = [];
export const publicProjects = projects.filter(
  (project) => project.approvedForPublication,
);
