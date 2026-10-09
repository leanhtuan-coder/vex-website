export type ProjectStatus =
  "Concept" | "Research" | "Prototype" | "Pilot" | "Commercial Product";
export type ProjectOwnership =
  "vex" | "founder-before-vex" | "personal-research" | "collaboration";
export const projectOwnershipLabels: Record<ProjectOwnership, string> = {
  vex: "Dự án của VEX",
  "founder-before-vex": "Dự án trước khi thành lập VEX",
  "personal-research": "Nghiên cứu cá nhân",
  collaboration: "Dự án hợp tác",
};
export interface Project extends ContentGovernance {
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
  /** Ownership/history is independent of the project's development status. */
  provenance: { ownership: ProjectOwnership; statement: string };
  publicArchitecture?: string;
  evidence?: string;
  challenges?: string;
  nextSteps?: string;
}
// Draft and unapproved project source never enters the browser module graph.
export const projects = publication.projects as Project[];
export const publicProjects = projects.filter(
  (project) => project.approvedForPublication,
);
import publication from "./published.json";
import type { ContentGovernance } from "./governance";
