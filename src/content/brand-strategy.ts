export interface BrandPurpose {
  id: string;
  title: string;
  englishTitle: string;
  message: string;
  summary: string;
  statement: string;
  supportingMessages: string[];
}

export interface CoreValue {
  number: string;
  title: string;
  englishTitle: string;
  description: string;
}

interface BrandStrategy {
  status: "draft" | "approved";
  title: string;
  draftLabel: string;
  draftNote: string;
  vision: BrandPurpose;
  mission: BrandPurpose;
  values: CoreValue[];
}

// Owner-provided strategy draft, 2026-10-09. Integration into the website does
// not constitute approval as official brand policy. Edit this shared source
// for Home/About; change status only after an explicit owner approval.
export const brandStrategy: BrandStrategy = {
  status: "draft",
  title: "Định hướng phát triển của VEX",
  draftLabel: "Bản thảo định hướng",
  draftNote:
    "Tầm nhìn, sứ mệnh và giá trị cốt lõi dưới đây là bản thảo định hướng, chờ phê duyệt chính thức.",
  vision: {
    id: "tam-nhin",
    title: "Tầm nhìn",
    englishTitle: "Our Vision",
    message: "Kiến tạo giá trị bền vững bằng công nghệ và đổi mới sáng tạo.",
    summary:
      "VEX hướng tới xây dựng năng lực nghiên cứu, phát triển và ứng dụng công nghệ, kết nối phần mềm, AI, robotics và tự động hóa để giải quyết những thách thức thực tiễn.",
    statement:
      "Trở thành doanh nghiệp công nghệ Việt Nam có năng lực nghiên cứu, phát triển và triển khai các giải pháp công nghệ mang tính ứng dụng cao; từng bước kết nối phần mềm, trí tuệ nhân tạo, robotics và tự động hóa nhằm tạo ra giá trị bền vững cho doanh nghiệp, cộng đồng và hệ sinh thái công nghệ Việt Nam.",
    supportingMessages: [
      "VEX hướng tới việc phát triển năng lực công nghệ từ nghiên cứu đến ứng dụng, từng bước xây dựng những sản phẩm và giải pháp có khả năng giải quyết các bài toán thực tế.",
      "Tầm nhìn không chỉ giới hạn ở phát triển phần mềm mà còn hướng đến sự kết hợp giữa công nghệ số, trí tuệ nhân tạo và hệ thống vật lý thông minh.",
    ],
  },
  mission: {
    id: "su-menh",
    title: "Sứ mệnh",
    englishTitle: "Our Mission",
    message: "Biến những bài toán thực tiễn thành giải pháp công nghệ.",
    summary:
      "Thông qua nghiên cứu, phát triển và tích hợp công nghệ, VEX hướng tới xây dựng những giải pháp hiệu quả, có khả năng ứng dụng và đáp ứng nhu cầu thực tế của doanh nghiệp, tổ chức.",
    statement:
      "Nghiên cứu, phát triển và ứng dụng công nghệ nhằm chuyển hóa những bài toán thực tiễn thành các sản phẩm và giải pháp hiệu quả, phù hợp với nhu cầu sử dụng và có khả năng phát triển lâu dài. Thông qua sự kết hợp giữa phần mềm, trí tuệ nhân tạo, robotics và tự động hóa, VEX hướng tới việc nâng cao hiệu quả vận hành, thúc đẩy đổi mới sáng tạo và tạo ra những giá trị thiết thực cho khách hàng và cộng đồng.",
    supportingMessages: [
      "VEX không phát triển công nghệ chỉ vì tính mới mẻ của công nghệ.",
      "Chúng tôi hướng tới việc hiểu đúng vấn đề, lựa chọn công nghệ phù hợp và xây dựng những giải pháp có giá trị sử dụng thực tế.",
    ],
  },
  values: [
    {
      number: "01",
      title: "Đổi mới sáng tạo",
      englishTitle: "Innovation",
      description:
        "Không ngừng tìm tòi, nghiên cứu và thử nghiệm những phương pháp, công nghệ và giải pháp mới nhằm nâng cao chất lượng sản phẩm và hiệu quả ứng dụng.",
    },
    {
      number: "02",
      title: "Tính thực tiễn",
      englishTitle: "Practicality",
      description:
        "Lấy nhu cầu và vấn đề thực tế làm điểm xuất phát, ưu tiên những giải pháp có tính khả thi, mang lại giá trị sử dụng và phù hợp với điều kiện triển khai.",
    },
    {
      number: "03",
      title: "Chính trực và trách nhiệm",
      englishTitle: "Integrity & Responsibility",
      description:
        "Đề cao sự minh bạch, tinh thần trách nhiệm và các cam kết trong hoạt động nghiên cứu, phát triển sản phẩm cũng như hợp tác với khách hàng, đối tác.",
    },
    {
      number: "04",
      title: "Hợp tác và kết nối",
      englishTitle: "Collaboration",
      description:
        "Thúc đẩy sự phối hợp giữa các lĩnh vực chuyên môn, giữa con người và công nghệ, đồng thời xây dựng những mối quan hệ hợp tác dựa trên sự tin cậy và cùng phát triển.",
    },
    {
      number: "05",
      title: "Không ngừng cải tiến",
      englishTitle: "Continuous Improvement",
      description:
        "Liên tục học hỏi, đánh giá và cải thiện sản phẩm, quy trình và năng lực đội ngũ để thích ứng với sự phát triển của công nghệ và nhu cầu thị trường.",
    },
  ],
};
