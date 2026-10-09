import { services } from "./services";

export interface SolutionChallenge {
  id: string;
  title: string;
  serviceSlugs: string[];
}
// Alternate paths through the existing solution content; no new product claims.
export const solutionChallenges: SolutionChallenge[] = [
  {
    id: "so-hoa",
    title: "Số hóa quy trình và dữ liệu",
    serviceSlugs: ["custom-software", "system-integration"],
  },
  {
    id: "phan-mem-quan-ly",
    title: "Phát triển phần mềm quản lý",
    serviceSlugs: ["custom-software"],
  },
  {
    id: "tu-dong-hoa",
    title: "Tự động hóa các tác vụ",
    serviceSlugs: ["automation"],
  },
  {
    id: "nhan-dien-hinh-anh",
    title: "Phân tích và nhận diện hình ảnh",
    serviceSlugs: ["ai-computer-vision"],
  },
  {
    id: "ket-noi-thiet-bi",
    title: "Kết nối thiết bị và hệ thống",
    serviceSlugs: ["iot-embedded", "system-integration"],
  },
  {
    id: "nguyen-mau",
    title: "Nghiên cứu/phát triển nguyên mẫu",
    serviceSlugs: ["ai-computer-vision", "iot-embedded"],
  },
];

export function challengeServices(challenge: SolutionChallenge) {
  return challenge.serviceSlugs.map((slug) => {
    const service = services.find((item) => item.slug === slug);
    if (!service) throw new Error(`Unknown challenge solution: ${slug}`);
    return service;
  });
}
