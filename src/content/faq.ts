import { company, process } from "./company";

export interface CorporateFAQItem {
  id: string;
  question: string;
  answer: string;
  links: { label: string; href: string }[];
}

// Answers summarize the public service directions, reference process and
// contact flow. They do not establish pricing, SLAs or delivery guarantees.
export const corporateFAQ: CorporateFAQItem[] = [
  {
    id: "dich-vu-cong-nghe",
    question: "VEX cung cấp những dịch vụ công nghệ nào?",
    answer:
      "Các hướng giải pháp của VEX gồm phần mềm theo yêu cầu, AI & Computer Vision, tự động hóa quy trình, IoT và hệ thống nhúng, kiến trúc và tích hợp hệ thống. Phạm vi và khả năng triển khai được trao đổi theo từng bài toán.",
    links: [{ label: "Khám phá các hướng giải pháp", href: "/solutions/" }],
  },
  {
    id: "phan-mem-theo-yeu-cau",
    question: "Doanh nghiệp có thể đặt phát triển phần mềm theo yêu cầu không?",
    answer:
      "Bạn có thể trao đổi nhu cầu xây dựng ứng dụng web, phần mềm quản lý hoặc số hóa quy trình riêng. Hướng tiếp cận bắt đầu từ quy trình, vai trò người sử dụng và dữ liệu; phạm vi phát triển, tích hợp và bàn giao được thống nhất trước khi triển khai.",
    links: [
      { label: "Phần mềm theo yêu cầu", href: "/solutions/custom-software/" },
    ],
  },
  {
    id: "tich-hop-ai",
    question: "VEX có tiếp nhận dự án tích hợp AI không?",
    answer:
      "Bạn có thể trao đổi bài toán AI hoặc Computer Vision gắn với dữ liệu và nhu cầu cụ thể. Việc thử nghiệm cần đánh giá chất lượng dữ liệu, quyền sử dụng, độ chính xác và giới hạn tích hợp; các quyết định quan trọng vẫn cần người kiểm tra.",
    links: [
      { label: "AI & Computer Vision", href: "/solutions/ai-computer-vision/" },
    ],
  },
  {
    id: "quy-trinh-trien-khai",
    question: "Quy trình trao đổi nhu cầu và triển khai ra sao?",
    answer: `Lộ trình tham khảo gồm: ${process.map((step) => step.title.toLowerCase()).join("; ")}. Phạm vi, các bước và tiêu chí đánh giá được thống nhất riêng cho từng dự án.`,
    links: [{ label: "Trao đổi nhu cầu", href: "/contact/?topic=solution" }],
  },
  {
    id: "hop-tac-robotics-iot",
    question: "Có thể hợp tác nghiên cứu Robotics/IoT không?",
    answer:
      "Bạn có thể trao đổi nhu cầu nghiên cứu robotics, IoT, cảm biến hoặc hệ thống nhúng. Hướng tiếp cận cần làm rõ môi trường sử dụng, nguồn điện, kết nối và phạm vi thử nghiệm. Khả năng ứng dụng được đánh giá theo bài toán và điều kiện triển khai thực tế.",
    links: [{ label: "Hướng nghiên cứu của VEX", href: "/research/" }],
  },
  {
    id: "nhan-tu-van",
    question: "Làm thế nào để nhận tư vấn?",
    answer:
      "Bạn có thể bắt đầu bằng mô tả bài toán, quy trình hiện tại, đối tượng sử dụng và những ràng buộc cần giải quyết. Trang liên hệ cho phép chọn chủ đề và soạn email; bạn kiểm tra nội dung rồi nhấn gửi trong ứng dụng email.",
    links: [{ label: "Chọn chủ đề trao đổi", href: "/contact/" }],
  },
  {
    id: "ho-tro-sau-ban-giao",
    question: "VEX có hỗ trợ sau bàn giao không?",
    answer:
      "Phương án bàn giao, hướng dẫn sử dụng và hỗ trợ tiếp theo cần được thống nhất theo phạm vi hợp tác. Hiện chưa có chính sách bảo hành, thời gian phản hồi hoặc SLA áp dụng chung được công bố; bạn nên làm rõ các điều kiện này khi trao đổi về dự án.",
    links: [
      { label: "Trao đổi phạm vi hợp tác", href: "/contact/?topic=business" },
    ],
  },
  {
    id: "lien-he-hop-tac",
    question: "Làm thế nào để liên hệ hợp tác?",
    answer: `Bạn có thể liên hệ VEX qua email ${company.email}, điện thoại ${company.phone} hoặc trang liên hệ. Biểu mẫu hiện chỉ giúp soạn email, chưa tiếp nhận yêu cầu tự động và không xác nhận rằng VEX đã nhận được nội dung.`,
    links: [
      { label: company.email, href: `mailto:${company.email}` },
      { label: company.phone, href: company.phoneHref },
    ],
  },
];
