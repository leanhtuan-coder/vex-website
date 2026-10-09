import { company } from "./company";
import { services } from "./services";
import { publicProjects } from "./projects";
import { publicArticles } from "./articles";
import { publicJobs } from "./careers";
export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  type?: "website" | "article";
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
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
    path: "/research/",
    title: "Nghiên cứu & Phát triển | VEX Technology Solutions",
    description:
      "Định hướng nghiên cứu kết nối phần mềm, AI, robotics, hệ thống nhúng và tự động hóa; cách VEX hướng tới ứng dụng và hợp tác công nghệ.",
  },
  {
    path: "/insights/",
    title: "Tin tức & Góc nhìn | VEX Technology Solutions",
    description:
      "Bài viết công nghệ, thông tin công ty và hoạt động được VEX phê duyệt công bố." +
      (publicArticles.length ? "" : " Hiện chưa có bài viết được công bố."),
  },
  ...publicArticles.map(
    (article): PageMeta => ({
      path: `/insights/${article.slug}/`,
      title: `${article.title} | VEX Technology Solutions`,
      description: article.summary,
      type: "article",
      image: article.cover?.src,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
    }),
  ),
  {
    path: "/careers/",
    title: "Cơ hội nghề nghiệp | VEX Technology Solutions",
    description:
      "Các nhóm chuyên môn VEX quan tâm và vị trí tuyển dụng được công bố chính thức." +
      (publicJobs.length
        ? ""
        : " Hiện chưa có vị trí tuyển dụng được công bố."),
  },
  ...publicJobs.map(
    (job): PageMeta => ({
      path: `/careers/${job.slug}/`,
      title: `${job.title} | Tuyển dụng VEX`,
      description: job.summary,
    }),
  ),
  {
    path: "/media/",
    title: "Tài nguyên thương hiệu | VEX Technology Solutions",
    description:
      "Tải logo VEX đầy đủ ở định dạng SVG và PNG, phiên bản màu và trắng; hướng dẫn sử dụng nhận diện đúng tỷ lệ và ngữ cảnh.",
  },
  {
    path: "/academy/",
    title: "VEX Academy — Định hướng giáo dục | VEX Technology Solutions",
    description:
      "Định hướng VEX Academy về STEM, Robotics, lập trình và AI tại Thọ Xuân, Thanh Hóa. Đang chuẩn bị, chưa mở tuyển sinh.",
  },
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
  const article = publicArticles.find(
    (item) => meta.path === `/insights/${item.slug}/`,
  );
  const job = publicJobs.find((item) => meta.path === `/careers/${item.slug}/`);
  const parentPath = `/${meta.path.split("/").filter(Boolean)[0]}/`;
  const parent =
    meta.path.split("/").filter(Boolean).length > 1
      ? pages.find((page) => page.path === parentPath)
      : undefined;
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
      ...(article
        ? [
            {
              "@type": "Article",
              "@id": `${company.url}${meta.path}#article`,
              headline: article.title,
              description: article.summary,
              mainEntityOfPage: company.url + meta.path,
              datePublished: `${article.publishedAt}T00:00:00+07:00`,
              ...(article.updatedAt
                ? { dateModified: `${article.updatedAt}T00:00:00+07:00` }
                : {}),
              author: {
                "@type": article.authorType ?? "Person",
                name: article.author,
              },
              publisher: { "@id": organization["@id"] },
              inLanguage: "vi",
              ...(article.cover
                ? { image: company.url + article.cover.src }
                : {}),
            },
          ]
        : []),
      ...(job
        ? [
            {
              "@type": "JobPosting",
              "@id": `${company.url}${meta.path}#job`,
              title: job.title,
              description: jobDescription(job),
              datePosted: job.publishedAt,
              validThrough: `${job.deadline}T23:59:59+07:00`,
              employmentType: job.employmentType,
              hiringOrganization: { "@id": organization["@id"] },
              identifier: {
                "@type": "PropertyValue",
                name: company.name,
                value: job.slug,
              },
              ...(job.workplace === "remote"
                ? {
                    jobLocationType: "TELECOMMUTE",
                    applicantLocationRequirements: {
                      "@type": "Country",
                      name: new Intl.DisplayNames(["en"], {
                        type: "region",
                      }).of(job.location.country),
                    },
                  }
                : {
                    jobLocation: {
                      "@type": "Place",
                      address: {
                        "@type": "PostalAddress",
                        ...(job.location.streetAddress
                          ? { streetAddress: job.location.streetAddress }
                          : {}),
                        ...(job.location.locality
                          ? { addressLocality: job.location.locality }
                          : {}),
                        ...(job.location.region
                          ? { addressRegion: job.location.region }
                          : {}),
                        addressCountry: job.location.country,
                      },
                    },
                  }),
              ...(job.salary
                ? {
                    baseSalary: {
                      "@type": "MonetaryAmount",
                      currency: job.salary.currency,
                      value: {
                        "@type": "QuantitativeValue",
                        minValue: job.salary.minimum,
                        ...(job.salary.maximum
                          ? { maxValue: job.salary.maximum }
                          : {}),
                        unitText: job.salary.period,
                      },
                    },
                  }
                : {}),
            },
          ]
        : []),
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
                ...(parent
                  ? [
                      {
                        "@type": "ListItem",
                        position: 2,
                        name: parent.title.split(" | ")[0],
                        item: company.url + parent.path,
                      },
                    ]
                  : []),
                {
                  "@type": "ListItem",
                  position: parent ? 3 : 2,
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
function jobDescription(job: (typeof publicJobs)[number]) {
  const escape = (text: string) =>
    text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  const sections: [string, string[]][] = [
    ["Công việc", job.responsibilities],
    ["Yêu cầu", job.requirements],
    ["Quyền lợi", job.benefits],
    ["Cách ứng tuyển", [job.applicationInstructions]],
  ];
  return (
    `<p>${escape(job.summary)}</p>` +
    sections
      .map(
        ([title, items]) =>
          `<h2>${escape(title)}</h2><ul>${items.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>`,
      )
      .join("")
  );
}
