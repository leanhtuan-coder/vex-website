import { company } from "./company";

// Approved by the owner for publication as direction, not proven achievements.
export const whyVex = {
  approvedForPublication: true,
  headline: "Công nghệ phù hợp bắt đầu từ việc hiểu đúng vấn đề.",
  pillars: [
    "Lấy bài toán thực tế làm trọng tâm.",
    "Kết hợp phần mềm, AI, Robotics và hệ thống vật lý.",
    "Nghiên cứu, thử nghiệm và đánh giá tính khả thi.",
    "Hướng tới khả năng mở rộng và cải tiến lâu dài.",
  ],
} as const;

// A single confirmed legal milestone; no speculative growth timeline.
export const companyJourney = [
  {
    date: company.founded,
    label: "10/03/2026",
    title: "Đăng ký thành lập doanh nghiệp",
    description: company.legalName,
  },
] as const;
