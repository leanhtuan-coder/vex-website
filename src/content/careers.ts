import { contentAsOfDate } from "./build-date";
import publication from "./published.json";
import type { ContentGovernance } from "./governance";

export type EmploymentType =
  "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "INTERN";

export const employmentLabels: Record<EmploymentType, string> = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  CONTRACTOR: "Theo hợp đồng",
  INTERN: "Thực tập",
};

export interface Job extends ContentGovernance {
  slug: string;
  title: string;
  department: string;
  summary: string;
  approvedForPublication: boolean;
  status: "draft" | "open" | "closed";
  employmentType: EmploymentType;
  workplace: "onsite" | "hybrid" | "remote";
  location: {
    label: string;
    streetAddress?: string;
    locality?: string;
    region?: string;
    country: string;
  };
  /** Verified dates in YYYY-MM-DD format; deadline remains open through that day. */
  publishedAt: string;
  deadline: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications?: string[];
  benefits: string[];
  salary?: {
    minimum: number;
    maximum?: number;
    currency: string;
    period: "MONTH" | "YEAR";
  };
  /** Approved application instructions; no CV collection is enabled on this website. */
  applicationInstructions: string;
}

export const workplaceLabels: Record<Job["workplace"], string> = {
  onsite: "Tại nơi làm việc",
  hybrid: "Kết hợp trực tiếp và từ xa",
  remote: "Từ xa",
};

// Browser code receives only approved and currently open build-time records.
export const jobs = publication.jobs as Job[];

export function getPublicJobs(asOfDate: string) {
  return jobs
    .filter(
      (job) =>
        job.approvedForPublication &&
        job.status === "open" &&
        job.publishedAt <= asOfDate &&
        job.deadline >= asOfDate,
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export const publicJobs = getPublicJobs(contentAsOfDate);

export const careerDirections = [
  {
    title: "Kỹ thuật phần mềm",
    description:
      "Ứng dụng web, nền tảng số, dữ liệu và tích hợp API cho các bài toán vận hành.",
    href: "/solutions/custom-software/",
  },
  {
    title: "Trí tuệ nhân tạo",
    description:
      "AI ứng dụng, Computer Vision và các quy trình xử lý thông tin thông minh.",
    href: "/solutions/ai-computer-vision/",
  },
  {
    title: "Robotics & Embedded Systems",
    description:
      "Phần mềm kết nối với cảm biến, bộ điều khiển, phần cứng và hệ thống IoT.",
    href: "/solutions/iot-embedded/",
  },
  {
    title: "Tích hợp & Tự động hóa",
    description:
      "Kiến trúc hệ thống, kết nối dữ liệu và tự động hóa các quy trình thực tế.",
    href: "/solutions/system-integration/",
  },
] as const;
