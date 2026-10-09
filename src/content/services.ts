export interface Service {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  audience: string;
  approach: string[];
  technologies: string[];
  deliverables: string[];
  expectation: string;
}
export const services: Service[] = [
  {
    slug: "custom-software",
    title: "Phát triển phần mềm theo yêu cầu",
    category: "Phần mềm",
    summary:
      "Ứng dụng web và nền tảng quản lý được xây dựng quanh quy trình vận hành của bạn.",
    problem:
      "Dữ liệu nằm ở nhiều bảng tính, công việc phụ thuộc thao tác thủ công và khó theo dõi tiến độ giữa các bộ phận.",
    audience:
      "Doanh nghiệp, tổ chức có quy trình cần số hóa hoặc cần một ứng dụng phục vụ nghiệp vụ riêng.",
    approach: [
      "Khảo sát quy trình và vai trò người sử dụng.",
      "Thiết kế cấu trúc dữ liệu, luồng nghiệp vụ và giao diện.",
      "Phát triển ứng dụng, tích hợp API và kiểm thử các tình huống sử dụng.",
    ],
    technologies: ["Ứng dụng web", "API", "Cơ sở dữ liệu"],
    deliverables: [
      "Ứng dụng theo phạm vi thống nhất",
      "Tài liệu vận hành và hướng dẫn sử dụng",
      "Phương án tích hợp và mở rộng",
    ],
    expectation:
      "Tập trung dữ liệu, giảm công việc lặp lại và hỗ trợ theo dõi nghiệp vụ. Hiệu quả được đánh giá theo tiêu chí thống nhất cho từng dự án.",
  },
  {
    slug: "ai-computer-vision",
    title: "AI & Computer Vision",
    category: "Trí tuệ nhân tạo",
    summary:
      "Tìm hướng ứng dụng AI trong xử lý hình ảnh, dữ liệu và các quy trình cần hỗ trợ thông minh.",
    problem:
      "Khối lượng dữ liệu và hình ảnh lớn khiến việc kiểm tra, phân loại hoặc trích xuất thông tin bằng tay tốn thời gian.",
    audience:
      "Đơn vị có dữ liệu phù hợp và một bài toán cụ thể cần thử nghiệm khả năng ứng dụng AI.",
    approach: [
      "Đánh giá dữ liệu, quyền sử dụng và yêu cầu bảo vệ thông tin.",
      "Thử nghiệm mô hình hoặc tích hợp dịch vụ AI phù hợp.",
      "Đo lường độ chính xác, giới hạn và khả năng tích hợp vào quy trình.",
    ],
    technologies: ["Computer Vision", "AI Automation", "AI Agents"],
    deliverables: [
      "Đánh giá tính khả thi",
      "Nguyên mẫu hoặc thành phần tích hợp theo phạm vi",
      "Báo cáo đánh giá và giới hạn sử dụng",
    ],
    expectation:
      "Hỗ trợ xử lý thông tin và giảm thao tác thủ công. Kết quả phụ thuộc chất lượng dữ liệu; các quyết định quan trọng vẫn cần người kiểm tra.",
  },
  {
    slug: "automation",
    title: "Tự động hóa quy trình",
    category: "Tự động hóa",
    summary:
      "Kết nối tác vụ, dữ liệu và hệ thống để giảm các bước xử lý thủ công lặp lại.",
    problem:
      "Nhân sự phải nhập lại dữ liệu, chuyển thông tin giữa nhiều công cụ và kiểm tra trạng thái công việc một cách thủ công.",
    audience:
      "Doanh nghiệp có luồng công việc lặp lại và cần kết nối các công cụ hiện có.",
    approach: [
      "Xác định các bước có thể tự động hóa và các điểm cần con người phê duyệt.",
      "Thiết kế luồng xử lý, điều kiện kích hoạt và cơ chế xử lý lỗi.",
      "Tích hợp, kiểm thử và theo dõi kết quả của quy trình.",
    ],
    technologies: ["API", "Workflow", "Tích hợp dữ liệu"],
    deliverables: [
      "Luồng tự động hóa theo yêu cầu",
      "Cơ chế ghi nhận trạng thái và xử lý lỗi",
      "Hướng dẫn quản trị quy trình",
    ],
    expectation:
      "Giảm nhập liệu lặp lại và tăng khả năng theo dõi. Phạm vi tự động hóa được lựa chọn theo mức độ an toàn và tính phù hợp.",
  },
  {
    slug: "iot-embedded",
    title: "IoT, camera & hệ thống nhúng",
    category: "Robotics & Embedded",
    summary:
      "Kết hợp cảm biến, thiết bị, phần mềm nhúng và nền tảng dữ liệu trong một hệ thống.",
    problem:
      "Thiết bị hoạt động riêng lẻ, dữ liệu khó thu thập hoặc chưa kết nối được với phần mềm quản lý.",
    audience:
      "Đơn vị cần thử nghiệm thiết bị, thu thập dữ liệu hiện trường hoặc tích hợp phần cứng với phần mềm.",
    approach: [
      "Khảo sát môi trường sử dụng, nguồn điện và phương thức kết nối.",
      "Thiết kế, lập trình nhúng và tích hợp cảm biến hoặc camera.",
      "Thử nghiệm độ ổn định và kết nối với nền tảng dữ liệu.",
    ],
    technologies: ["IoT", "Embedded Systems", "Camera", "Robotics"],
    deliverables: [
      "Nguyên mẫu hoặc thành phần thiết bị theo phạm vi",
      "Firmware và kết nối dữ liệu",
      "Tài liệu thử nghiệm và tích hợp",
    ],
    expectation:
      "Tạo khả năng thu thập dữ liệu và điều khiển phù hợp với bài toán. Độ ổn định cần được đánh giá trong điều kiện triển khai thực tế.",
  },
  {
    slug: "system-integration",
    title: "Kiến trúc & tích hợp hệ thống",
    category: "Tích hợp hệ thống",
    summary:
      "Làm rõ nhu cầu, thiết kế kiến trúc và kết nối các nền tảng thành một giải pháp phù hợp.",
    problem:
      "Các hệ thống không chia sẻ dữ liệu, việc mở rộng gặp nhiều phụ thuộc và thiếu một lộ trình công nghệ rõ ràng.",
    audience:
      "Doanh nghiệp, tổ chức cần đánh giá hiện trạng hoặc tích hợp nhiều thành phần phần mềm và phần cứng.",
    approach: [
      "Đánh giá hiện trạng, các phụ thuộc và yêu cầu vận hành.",
      "Đề xuất kiến trúc, phương án tích hợp và lộ trình ưu tiên.",
      "Thử nghiệm kết nối, triển khai theo phạm vi và đánh giá kết quả.",
    ],
    technologies: ["Kiến trúc hệ thống", "API Integration", "Cloud"],
    deliverables: [
      "Phương án kiến trúc và lộ trình",
      "Các thành phần tích hợp theo phạm vi",
      "Tài liệu bàn giao và vận hành",
    ],
    expectation:
      "Kết nối dữ liệu và xây dựng nền tảng dễ duy trì. Giải pháp được lựa chọn theo nguồn lực và yêu cầu cụ thể của tổ chức.",
  },
];
export const technologies = [
  {
    title: "Kỹ nghệ phần mềm",
    text: "Ứng dụng, nền tảng số và hệ thống quản lý phù hợp với nhu cầu vận hành.",
    slug: "custom-software",
    icon: "software",
  },
  {
    title: "Trí tuệ nhân tạo",
    text: "AI, Computer Vision và các quy trình xử lý thông minh gắn với dữ liệu thực tế.",
    slug: "ai-computer-vision",
    icon: "ai",
  },
  {
    title: "Robotics & hệ thống nhúng",
    text: "Kết hợp phần cứng, cảm biến, bộ điều khiển và phần mềm.",
    slug: "iot-embedded",
    icon: "hardware",
  },
  {
    title: "Tự động hóa & tích hợp",
    text: "Kết nối hệ thống, dữ liệu và quy trình để giảm thao tác thủ công.",
    slug: "automation",
    icon: "automation",
  },
] as const;
