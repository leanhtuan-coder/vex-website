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
  imageWidth: number;
  imageHeight: number;
  context: string;
  problem: string;
  solution: string;
  technologies: string[];
  role: string;
  evidence: string;
  challenges: string;
  nextSteps: string;
}
// Draft and unapproved project source never enters the browser module graph.
export const projects = publication.projects as Project[];
export const publicProjects = projects.filter(
  (project) => project.approvedForPublication,
);
import publication from "./published.json";
