import type { Article } from "../src/content/articles";
import type { Job } from "../src/content/careers";
import type { Project } from "../src/content/projects";
import type { LeadershipProfile } from "../src/content/leadership";
import type { DocumentRecord } from "../src/content/documents";
import type { PublicationRecords } from "../src/content/validation";

// Editorial source, processed only by the build-time publisher. Never import
// this file from browser code, and never store confidential documents here.
// Draft and unapproved records stay out of generated browser assets.
export const websiteContent: PublicationRecords = {
  articles: [] as Article[],
  jobs: [] as Job[],
  projects: [] as Project[],
  leadership: [
    {
      id: "le-anh-tuan",
      slug: "le-anh-tuan",
      name: "Lê Anh Tuấn",
      role: "Founder & Chief Executive Officer",
      titleVietnamese: "Người sáng lập & Tổng Giám đốc",
      abbreviation: "CEO",
      initials: "LAT",
      linkedinUrl: "https://www.linkedin.com/in/anhtuanle05/",
      biography: [
        "Lê Anh Tuấn là người sáng lập và điều hành VEX Technology Solutions, với định hướng phát triển các giải pháp kết hợp phần mềm, trí tuệ nhân tạo, Robotics và tự động hóa. Anh quan tâm đến nghiên cứu, phát triển công nghệ và khả năng ứng dụng các giải pháp kỹ thuật vào những bài toán thực tiễn.",
      ],
      responsibilities: [
        "Định hướng chiến lược phát triển công ty.",
        "Điều hành hoạt động chung.",
        "Định hướng công nghệ, nghiên cứu và phát triển sản phẩm.",
        "Phát triển hệ sinh thái, đội ngũ và các quan hệ chiến lược.",
      ],
      displayOrder: 1,
      contentState: "VERIFIED",
      approvedForPublication: true,
    },
    {
      id: "hoang-mai",
      slug: "hoang-mai",
      name: "Hoàng Mai",
      role: "Chief Marketing Officer",
      titleVietnamese: "Giám đốc Marketing",
      abbreviation: "CMO",
      initials: "HM",
      linkedinUrl: "https://www.linkedin.com/in/maihoang0405/",
      biography: [
        "Hoàng Mai phụ trách định hướng marketing, xây dựng thương hiệu và các hoạt động truyền thông của VEX Technology Solutions. Vai trò tập trung vào việc phát triển hình ảnh doanh nghiệp, kết nối thương hiệu với thị trường và hỗ trợ các mục tiêu tăng trưởng.",
      ],
      responsibilities: [
        "Xây dựng chiến lược marketing.",
        "Phát triển thương hiệu.",
        "Định hướng truyền thông và hình ảnh doanh nghiệp.",
        "Phát triển các hoạt động tiếp cận thị trường và khách hàng.",
        "Phối hợp triển khai các chiến dịch truyền thông.",
      ],
      displayOrder: 2,
      contentState: "VERIFIED",
      approvedForPublication: true,
    },
    {
      id: "do-mai-trang",
      slug: "do-mai-trang",
      name: "Đỗ Mai Trang",
      role: "Chief Financial Officer",
      titleVietnamese: "Giám đốc Tài chính",
      abbreviation: "CFO",
      initials: "ĐMT",
      biography: [
        "Đỗ Mai Trang phụ trách công tác quản trị và định hướng tài chính tại VEX Technology Solutions, tập trung vào kế hoạch ngân sách, kiểm soát nguồn lực và hỗ trợ xây dựng nền tảng tài chính phục vụ hoạt động phát triển của doanh nghiệp.",
      ],
      responsibilities: [
        "Phụ trách quản lý và lập kế hoạch tài chính.",
        "Theo dõi ngân sách và dòng tiền.",
        "Phối hợp công tác kế toán, báo cáo và quản trị tài chính.",
        "Phân tích hiệu quả tài chính để hỗ trợ quyết định quản trị.",
      ],
      displayOrder: 3,
      contentState: "VERIFIED",
      approvedForPublication: true,
    },
    {
      id: "huynh-ngo-cam-tu",
      slug: "huynh-ngo-cam-tu",
      name: "Huỳnh Ngô Cẩm Tú",
      role: "Chief Business Development Officer",
      titleVietnamese: "Giám đốc Phát triển Kinh doanh",
      abbreviation: "CBDO",
      initials: "HNCT",
      linkedinUrl: "https://www.linkedin.com/in/c%E1%BA%A9m-t%C3%BA-94786b42a/",
      biography: [
        "Huỳnh Ngô Cẩm Tú phụ trách hoạt động phát triển kinh doanh tại VEX Technology Solutions, tập trung vào mở rộng thị trường, xây dựng quan hệ khách hàng, kết nối đối tác và phát triển các cơ hội hợp tác thương mại.",
      ],
      responsibilities: [
        "Phát triển thị trường và khách hàng.",
        "Tìm kiếm và xây dựng quan hệ hợp tác.",
        "Phát triển cơ hội kinh doanh.",
        "Phối hợp tư vấn và giới thiệu giải pháp công nghệ.",
        "Hỗ trợ triển khai chiến lược kinh doanh và mở rộng thị trường.",
      ],
      displayOrder: 4,
      contentState: "VERIFIED",
      approvedForPublication: true,
    },
  ] as LeadershipProfile[],
  documents: [] as DocumentRecord[],
};

export {
  validatePublication,
  validateSvgMarkup,
  validatePdfSignature,
} from "../src/content/validation";
