import { company } from "./company";
import { services } from "./services";
import { publicProjects } from "./projects";
export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}
export const pages: PageMeta[] = [
  {
    path: "/",
    title: "VEX Technology Solutions | Giải pháp công nghệ từ thực tiễn",
    description:
      "VEX kết nối phần mềm, AI, robotics và hệ thống tự động hóa, hướng tới giải pháp có tính ứng dụng cho doanh nghiệp và tổ chức.",
  },
  {
    path: "/about/",
    title: "Về VEX | VEX Technology Solutions",
    description:
      "Tìm hiểu doanh nghiệp công nghệ VEX, câu chuyện thương hiệu Vertex và định hướng kết nối phần mềm, AI, robotics và tự động hóa.",
  },
  {
    path: "/solutions/",
    title: "Giải pháp & Dịch vụ | VEX Technology Solutions",
    description:
      "Khám phá các hướng giải pháp phần mềm theo yêu cầu, AI, IoT, tự động hóa và tích hợp hệ thống của VEX.",
  },
  ...services.map((s) => ({
    path: `/solutions/${s.slug}/`,
    title: `${s.title} | VEX Technology Solutions`,
    description: s.summary,
  })),
  {
    path: "/projects/",
    title: "Dự án & Sản phẩm | VEX Technology Solutions",
    description:
      "Thông tin dự án, sản phẩm và nghiên cứu của VEX được công bố khi có dữ liệu và quyền giới thiệu phù hợp.",
  },
  ...publicProjects.map((p) => ({
    path: `/projects/${p.slug}/`,
    title: `${p.title} | VEX Technology Solutions`,
    description: p.summary,
  })),
  {
    path: "/contact/",
    title: "Liên hệ hợp tác | VEX Technology Solutions",
    description:
      "Kết nối với VEX để trao đổi nhu cầu giải pháp công nghệ, hợp tác kinh doanh và hợp tác nghiên cứu.",
  },
  {
    path: "/privacy-policy/",
    title: "Thông tin quyền riêng tư | VEX Technology Solutions",
    description:
      "Cách website VEX xử lý thông tin khi bạn xem nội dung và chủ động liên hệ bằng email.",
  },
  {
    path: "/terms/",
    title: "Điều khoản sử dụng | VEX Technology Solutions",
    description:
      "Điều kiện sử dụng thông tin, tài sản thương hiệu và liên kết trên website VEX.",
  },
];
export const notFound: PageMeta = {
  path: "/404/",
  title: "Không tìm thấy trang | VEX",
  description:
    "Trang bạn tìm có thể đã thay đổi địa chỉ. Quay về trang chủ VEX hoặc liên hệ để được hỗ trợ.",
  noindex: true,
};
export function normalizePath(path: string): string {
  const clean = path
    .split(/[?#]/)[0]
    .replace(/\/index\.html$/, "/")
    .replace(/\/+$/, "");
  return clean ? `${clean}/` : "/";
}
export function getPage(path: string): PageMeta {
  return pages.find((page) => page.path === normalizePath(path)) ?? notFound;
}
export function structuredData(meta: PageMeta) {
  const organization = {
    "@type": "Organization",
    "@id": `${company.url}/#organization`,
    name: company.legalName,
    alternateName: company.name,
    url: company.url,
    logo: `${company.url}/assets/logo-color-tight.png`,
    taxID: company.taxId,
    foundingDate: company.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Thôn Ninh Thành, Xã Thọ Xuân",
      addressRegion: "Thanh Hóa",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84877759036",
      email: company.email,
      contactType: "business inquiries",
    },
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${company.url}/#website`,
        name: company.name,
        url: company.url,
        inLanguage: "vi",
        publisher: { "@id": organization["@id"] },
      },
      ...(meta.path !== "/" && !meta.noindex
        ? [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Trang chủ",
                  item: company.url + "/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: meta.title.split(" | ")[0],
                  item: company.url + meta.path,
                },
              ],
            },
          ]
        : []),
    ],
  };
}
