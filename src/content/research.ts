export const researchPage = {
  title: "Nghiên cứu để hiểu. Phát triển để ứng dụng.",
  intro:
    "Định hướng R&D của VEX kết nối phần mềm, AI và hệ thống vật lý. Điểm bắt đầu là một bài toán rõ ràng; khả năng ứng dụng cần được đánh giá bằng thử nghiệm và dữ liệu phù hợp.",
  status: "Định hướng nghiên cứu",
  statusNote:
    "Trang này giới thiệu các lĩnh vực quan tâm và cách tiếp cận đề xuất. Các nguyên mẫu, kết quả thử nghiệm và nghiên cứu nội bộ chỉ được công bố khi có dữ liệu và quyền công bố được xác nhận.",
  collaboration:
    "Bạn có bài toán cần khảo sát, dữ liệu có quyền sử dụng hoặc đề xuất kết nối phần mềm với thiết bị? Hãy chia sẻ bối cảnh và mục tiêu để cùng đánh giá hướng nghiên cứu phù hợp.",
};

export const researchDirections = [
  {
    id: "software",
    label: "01 / SOFTWARE",
    title: "Phần mềm làm nền tảng kết nối",
    description:
      "Quan tâm đến kiến trúc ứng dụng, mô hình dữ liệu và API để kết nối các thành phần trong một hệ thống có thể phát triển lâu dài.",
    questions: [
      "Dữ liệu đi qua những bước nào?",
      "Hệ thống cần tích hợp và mở rộng ra sao?",
    ],
    href: "/solutions/custom-software/",
  },
  {
    id: "ai",
    label: "02 / AI",
    title: "AI trong bối cảnh sử dụng thực tế",
    description:
      "Định hướng xử lý hình ảnh, phân tích dữ liệu và hỗ trợ tác vụ. Chất lượng dữ liệu, cách đo lường và vai trò kiểm tra của con người cần được xác định ngay từ đầu.",
    questions: [
      "Dữ liệu có phù hợp và được phép sử dụng?",
      "Sai số nào có thể chấp nhận trong quy trình?",
    ],
    href: "/solutions/ai-computer-vision/",
  },
  {
    id: "robotics",
    label: "03 / ROBOTICS",
    title: "Robot gắn với nhiệm vụ cụ thể",
    description:
      "Tìm hiểu cách phối hợp cảm nhận, điều khiển và chuyển động. Nhiệm vụ, môi trường hoạt động và giới hạn an toàn là cơ sở để đánh giá một hướng phát triển robot.",
    questions: [
      "Robot cần thực hiện nhiệm vụ nào?",
      "Điều gì xảy ra khi tín hiệu hoặc điều khiển lỗi?",
    ],
    href: "/solutions/iot-embedded/",
  },
  {
    id: "embedded",
    label: "04 / EMBEDDED SYSTEMS",
    title: "Thiết bị và phần mềm cùng vận hành",
    description:
      "Định hướng tích hợp cảm biến, bộ điều khiển, hệ thống nhúng và IoT. Kết nối với ứng dụng cần xét đến độ ổn định, điều kiện triển khai và khả năng bảo trì.",
    questions: [
      "Thiết bị thu thập và phản hồi những tín hiệu gì?",
      "Hệ thống xử lý mất kết nối thế nào?",
    ],
    href: "/solutions/iot-embedded/",
  },
  {
    id: "automation",
    label: "05 / AUTOMATION",
    title: "Tự động hóa có điểm kiểm soát",
    description:
      "Quan tâm đến quy trình kết nối dữ liệu, tác vụ và hệ thống. Mỗi bước tự động cần có điều kiện thực hiện, cách theo dõi và phương án xử lý ngoại lệ.",
    questions: [
      "Bước nào lặp lại và có quy tắc rõ ràng?",
      "Khi nào cần người kiểm tra hoặc phê duyệt?",
    ],
    href: "/solutions/automation/",
  },
] as const;

export const researchSystemLayers = [
  {
    number: "01",
    title: "Thu nhận",
    description: "Tín hiệu và dữ liệu đầu vào",
    technologies: ["Cảm biến", "Camera", "Dữ liệu nghiệp vụ"],
  },
  {
    number: "02",
    title: "Xử lý",
    description: "Phần mềm và logic hệ thống",
    technologies: ["Ứng dụng & API", "AI", "Bộ điều khiển"],
  },
  {
    number: "03",
    title: "Phản hồi",
    description: "Hành động và thông tin vận hành",
    technologies: ["Robot / thiết bị", "Tác vụ tự động", "Giao diện giám sát"],
  },
] as const;

export const researchProcess = [
  {
    title: "Xác định bài toán",
    description:
      "Làm rõ nhu cầu, đối tượng sử dụng, bối cảnh và giới hạn. Chọn tiêu chí để biết một thử nghiệm có trả lời được câu hỏi ban đầu hay không.",
    reference: "Đầu ra tham khảo: câu hỏi nghiên cứu và tiêu chí đánh giá.",
  },
  {
    title: "Thiết kế thử nghiệm",
    description:
      "Xem xét dữ liệu, quyền sử dụng và nguồn lực; so sánh các hướng kỹ thuật. Giới hạn phạm vi để kiểm tra giả thuyết quan trọng trước.",
    reference:
      "Đầu ra tham khảo: kế hoạch thử nghiệm và giả thuyết cần kiểm tra.",
  },
  {
    title: "Đo lường và phân tích",
    description:
      "Ghi nhận điều kiện thử nghiệm, kết quả, sai số và các trường hợp chưa xử lý được. Đánh giá cả tính khả thi kỹ thuật lẫn điều kiện ứng dụng.",
    reference: "Đầu ra tham khảo: dữ liệu đo và giới hạn của phương án.",
  },
  {
    title: "Chọn hướng phát triển",
    description:
      "Dựa trên bằng chứng để quyết định tiếp tục, điều chỉnh hoặc dừng. Nếu chuyển sang triển khai, cần thống nhất phạm vi, trách nhiệm và cách kiểm chứng.",
    reference:
      "Đầu ra tham khảo: đề xuất bước tiếp theo và yêu cầu kiểm chứng.",
  },
] as const;
