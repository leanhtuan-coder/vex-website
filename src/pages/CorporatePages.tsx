import { Text } from "@cloudflare/kumo/components/text";
import { Link } from "@cloudflare/kumo/components/link";
import { Badge } from "@cloudflare/kumo/components/badge";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import {
  PageIntro,
  CTASection,
  Heading,
  ProjectEmpty,
} from "../components/shared";
import { company } from "../content/company";
import { services } from "../content/services";
import { publicProjects, projectOwnershipLabels } from "../content/projects";
import { analyticsEnabled } from "../analytics";
import BrandStrategyAbout from "../components/BrandStrategyAbout";
import {
  WhyVex,
  CompanyJourney,
  CompanyProfileNote,
} from "../components/CorporateIdentity";
import SolutionsByChallenge from "../components/SolutionsByChallenge";
import CorporateFAQ from "../components/CorporateFAQ";
import "../styles-corporate-redesign.css";
export function About() {
  return (
    <>
      <PageIntro
        label="Về VEX"
        title="Kết nối công nghệ từ những bài toán thực tiễn."
      >
        VEX Technology Solutions là doanh nghiệp công nghệ Việt Nam, tập trung
        vào nghiên cứu, phát triển và tích hợp giải pháp cho doanh nghiệp và tổ
        chức.
      </PageIntro>
      <nav
        className="container corporate-about-index"
        aria-label="Nội dung về VEX"
      >
        {[
          ["cau-chuyen-thuong-hieu", "Câu chuyện"],
          ["why-vex", "Why VEX"],
          ["hanh-trinh", "Hành trình"],
          ["tam-nhin-su-menh", "Tầm nhìn & Sứ mệnh"],
          ["gia-tri-cot-loi", "Giá trị cốt lõi"],
          ["doi-ngu-lanh-dao", "Lãnh đạo"],
          ["thong-tin-doanh-nghiep", "Thông tin doanh nghiệp"],
        ].map(([id, label]) => (
          <Link variant="plain" key={id} href={`#${id}`}>
            {label}
          </Link>
        ))}
      </nav>
      <section
        className="section container editorial-grid corporate-story-section"
        id="cau-chuyen-thuong-hieu"
      >
        <div className="corporate-story-heading">
          <Heading
            label="CÂU CHUYỆN THƯƠNG HIỆU"
            title="VEX. Từ ý tưởng Vertex."
          />
          <figure className="corporate-brand-figure">
            <div className="corporate-brand-preview">
              <img
                src="/assets/vex-logo.svg"
                width={3067}
                height={935}
                alt="Logo VEX đầy đủ, phiên bản màu"
                loading="lazy"
              />
              <span
                className="corporate-brand-corner corporate-brand-corner-tl"
                aria-hidden="true"
              />
              <span
                className="corporate-brand-corner corporate-brand-corner-tr"
                aria-hidden="true"
              />
              <span
                className="corporate-brand-corner corporate-brand-corner-bl"
                aria-hidden="true"
              />
              <span
                className="corporate-brand-corner corporate-brand-corner-br"
                aria-hidden="true"
              />
            </div>
            <figcaption>Logo VEX — phiên bản màu.</figcaption>
          </figure>
        </div>
        <div className="prose">
          <Text>
            VEX được phát triển từ ý tưởng “Vertex” — đỉnh và điểm kết nối trong
            một cấu trúc. Tên gọi thể hiện tinh thần vươn tới những khả năng mới
            và kết nối các yếu tố công nghệ.
          </Text>
          <Text>
            Trong logo, mũi tên âm bản giữa chữ E và X biểu trưng cho tư duy
            tiến về phía trước. Các khối pixel phía trên chữ E gợi nhắc thế giới
            số và quá trình xây dựng giá trị từ những yếu tố nhỏ.
          </Text>
          <Text>
            Màu dark cyan thể hiện sự tin cậy và tính ổn định; sắc bạc hà bổ
            sung cảm giác đổi mới. Website sử dụng hệ font SVN-Aguda theo bộ
            nhận diện VEX.
          </Text>
        </div>
      </section>
      <WhyVex />
      <CompanyJourney />
      <BrandStrategyAbout />
      <section className="section corporate-direction-section">
        <div className="container corporate-direction-grid">
          <Heading
            label="ĐỊNH HƯỚNG PHÁT TRIỂN"
            title="Phần mềm, AI và hệ thống vật lý."
          >
            VEX hướng tới sự kết hợp giữa Software, AI, Robotics, Embedded
            Systems và Automation để xây dựng các giải pháp có tính ứng dụng.
          </Heading>
          <div className="corporate-direction-list">
            {services.slice(0, 4).map((s, index) => (
              <Link
                key={s.slug}
                variant="plain"
                className="corporate-direction-row"
                href={`/solutions/${s.slug}/`}
              >
                <span className="corporate-row-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <Text as="h3" variant="heading">
                    {s.title}
                  </Text>
                  <Text variant="secondary">{s.summary}</Text>
                </div>
                <ArrowUpRightIcon size={22} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section
        className="section container editorial-grid corporate-facts-section"
        id="thong-tin-doanh-nghiep"
      >
        <Heading label="THÔNG TIN CÔNG TY" title="VEX Technology Solutions" />
        <div className="prose company-facts">
          <Text>{company.legalName}</Text>
          <dl>
            <dt>Mã số doanh nghiệp</dt>
            <dd>{company.taxId}</dd>
            <dt>Đăng ký lần đầu</dt>
            <dd>10/03/2026</dd>
            <dt>Trụ sở</dt>
            <dd>{company.address}</dd>
            <dt>Người đại diện theo pháp luật</dt>
            <dd>{company.representative} — Giám đốc</dd>
          </dl>
          <Text variant="secondary">
            Doanh nghiệp đang xây dựng nền tảng hoạt động và mở rộng các cơ hội
            hợp tác công nghệ.
          </Text>
          <CompanyProfileNote />
        </div>
      </section>
      <CTASection />
    </>
  );
}
export function Solutions() {
  return (
    <>
      <PageIntro
        label="Giải pháp"
        title="Giải pháp phù hợp bắt đầu từ nhu cầu rõ ràng."
      >
        Các hướng phát triển và tích hợp công nghệ của VEX. Phạm vi cung cấp
        được xác định sau khi trao đổi bài toán, dữ liệu và nguồn lực của từng
        đơn vị.
      </PageIntro>
      <SolutionsByChallenge />
      <section className="section container corporate-solutions-layout">
        <aside className="corporate-solutions-index">
          <Text as="h2" variant="heading">
            Hướng giải pháp
          </Text>
          <nav aria-label="Chọn hướng giải pháp">
            {services.map((s, index) => (
              <Link key={s.slug} href={`#service-${s.slug}`} variant="plain">
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {s.category}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="corporate-service-list">
          {services.map((s, index) => (
            <article
              key={s.slug}
              id={`service-${s.slug}`}
              className={`corporate-service-row${index === 0 ? " corporate-service-featured" : ""}`}
            >
              <div className="corporate-service-meta">
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Badge variant="outline">{s.category}</Badge>
              </div>
              <Text as="h2" variant="heading">
                {s.title}
              </Text>
              <Text variant="secondary">{s.summary}</Text>
              <div className="tags" aria-label={`Công nghệ cho ${s.title}`}>
                {s.technologies.map((technology) => (
                  <Badge variant="outline" key={technology}>
                    {technology}
                  </Badge>
                ))}
              </div>
              <Link
                href={`/solutions/${s.slug}/`}
                variant="plain"
                className="corporate-service-link"
              >
                Tìm hiểu giải pháp
                <ArrowUpRightIcon size={20} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CorporateFAQ />
      <CTASection />
    </>
  );
}
export function ServiceDetail({ slug }: { slug: string }) {
  const s = services.find((s) => s.slug === slug);
  if (!s) return <NotFound />;
  return (
    <>
      <PageIntro label={s.title} title={s.title}>
        {s.summary}
      </PageIntro>
      <section className="section container editorial-grid corporate-service-detail">
        <aside className="detail-sidebar corporate-detail-sidebar">
          <Badge variant="outline">{s.category}</Badge>
          <nav aria-label="Nội dung giải pháp">
            <Link href="#problem">Bài toán</Link>
            <Link href="#approach">Hướng giải quyết</Link>
            <Link href="#scope">Phạm vi</Link>
            <Link href="#value">Giá trị kỳ vọng</Link>
          </nav>
          <Link href="/solutions/">Tất cả giải pháp</Link>
        </aside>
        <div className="prose corporate-detail-prose">
          <section id="problem">
            <span className="corporate-detail-number" aria-hidden="true">
              01 / BÀI TOÁN
            </span>
            <Text as="h2" variant="heading">
              Bài toán cần giải quyết
            </Text>
            <Text>{s.problem}</Text>
            <Text as="h3" variant="heading">
              Đối tượng phù hợp
            </Text>
            <Text>{s.audience}</Text>
          </section>
          <section id="approach">
            <span className="corporate-detail-number" aria-hidden="true">
              02 / HƯỚNG GIẢI QUYẾT
            </span>
            <Text as="h2" variant="heading">
              Hướng giải quyết
            </Text>
            <ol>
              {s.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <div className="tags">
              {s.technologies.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </section>
          <section id="scope">
            <span className="corporate-detail-number" aria-hidden="true">
              03 / PHẠM VI
            </span>
            <Text as="h2" variant="heading">
              Phạm vi có thể trao đổi
            </Text>
            <ul>
              {s.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <Text>
              Phạm vi, tiến độ, trách nhiệm bàn giao và hỗ trợ được thống nhất
              trước khi triển khai. Các nội dung trên mô tả hướng giải pháp,
              không phải cam kết về một sản phẩm thương mại có sẵn.
            </Text>
          </section>
          <section id="value">
            <span className="corporate-detail-number" aria-hidden="true">
              04 / GIÁ TRỊ KỲ VỌNG
            </span>
            <Text as="h2" variant="heading">
              Giá trị kỳ vọng
            </Text>
            <Text>{s.expectation}</Text>
          </section>
        </div>
      </section>
      <CTASection />
    </>
  );
}
export function Projects() {
  return (
    <>
      <PageIntro
        label="Dự án & Sản phẩm"
        title="Giới thiệu kết quả bằng dữ liệu thực tế."
      >
        Các dự án, nguyên mẫu và sản phẩm được giới thiệu khi thông tin, hình
        ảnh và quyền công bố đã được xác nhận.
      </PageIntro>
      <section className="section container corporate-projects-section">
        {publicProjects.length === 0 ? (
          <ProjectEmpty />
        ) : (
          <div className="corporate-project-grid">
            {publicProjects.map((p, index) => (
              <LayerCard
                key={p.slug}
                className={`corporate-project-card${index === 0 ? " corporate-project-featured" : ""}`}
              >
                <Link
                  variant="plain"
                  href={`/projects/${p.slug}/`}
                  className="corporate-project-image-link"
                  aria-label={`Xem dự án ${p.title}`}
                >
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    width={p.imageWidth}
                    height={p.imageHeight}
                    loading="lazy"
                  />
                </Link>
                <div className="corporate-project-card-details">
                  <div className="tags">
                    <Badge variant="outline">{p.category}</Badge>
                    <Badge variant="outline">{p.status}</Badge>
                    <Badge variant="outline">
                      {projectOwnershipLabels[p.provenance.ownership]}
                    </Badge>
                  </div>
                  <Text as="h2" variant="heading">
                    {p.title}
                  </Text>
                  <Text variant="secondary">{p.summary}</Text>
                  <Link variant="plain" href={`/projects/${p.slug}/`}>
                    Xem dự án
                    <ArrowUpRightIcon size={20} aria-hidden="true" />
                  </Link>
                </div>
              </LayerCard>
            ))}
          </div>
        )}
      </section>
      <CTASection />
    </>
  );
}
export function ProjectDetail({ slug }: { slug: string }) {
  const p = publicProjects.find((p) => p.slug === slug);
  if (!p) return <NotFound />;
  return (
    <>
      <PageIntro label="Dự án" title={p.title}>
        {p.summary}
      </PageIntro>
      <section className="section container prose corporate-project-detail">
        <div className="tags">
          <Badge variant="outline">{p.status}</Badge>
          <Badge variant="outline">{p.category}</Badge>
          <Badge variant="outline">
            {projectOwnershipLabels[p.provenance.ownership]}
          </Badge>
        </div>
        <Text>{p.provenance.statement}</Text>
        <img
          className="project-image"
          src={p.image}
          alt={p.imageAlt}
          width={p.imageWidth}
          height={p.imageHeight}
          loading="lazy"
        />
        <div className="tags">
          {p.technologies.map((technology) => (
            <Badge key={technology} variant="outline">
              {technology}
            </Badge>
          ))}
        </div>
        {[
          ["Bối cảnh", p.context],
          ["Bài toán", p.problem],
          ["Giải pháp kỹ thuật", p.solution],
          ["Vai trò của VEX", p.role],
          ["Kiến trúc có thể công khai", p.publicArchitecture],
          ["Kết quả kiểm chứng", p.evidence],
          ["Thách thức", p.challenges],
          ["Hướng phát triển", p.nextSteps],
        ]
          .filter(([, text]) => Boolean(text))
          .map(([title, text]) => (
            <section key={title}>
              <Text as="h2" variant="heading">
                {title}
              </Text>
              <Text>{text}</Text>
            </section>
          ))}
      </section>
      <CTASection />
    </>
  );
}
export function Privacy() {
  return (
    <>
      <PageIntro label="Quyền riêng tư" title="Thông tin quyền riêng tư.">
        Cách website VEX xử lý thông tin trong phiên bản hiện tại.
      </PageIntro>
      <section className="section container prose policy">
        <Text as="h2" variant="heading">
          Thông tin bạn chủ động cung cấp
        </Text>
        <Text>
          Biểu mẫu liên hệ yêu cầu họ tên, email và nội dung trao đổi. Doanh
          nghiệp và số điện thoại là thông tin tùy chọn. Các trường chỉ được sử
          dụng trong trình duyệt để tạo nội dung email và không được lưu vào
          localStorage hoặc gửi tới API tiếp nhận trên website.
        </Text>
        <Text as="h2" variant="heading">
          Soạn email và gửi email
        </Text>
        <Text>
          Khi chọn “Soạn email liên hệ”, website yêu cầu mở ứng dụng email trên
          thiết bị. Bạn có thể kiểm tra, sửa hoặc hủy nội dung. Chỉ khi bạn nhấn
          gửi trong ứng dụng email, thông tin mới được chuyển qua nhà cung cấp
          email tới VEX để tiếp nhận yêu cầu và phản hồi.
        </Text>
        <Text as="h2" variant="heading">
          Dữ liệu kỹ thuật và bên cung cấp hạ tầng
        </Text>
        <Text>
          {analyticsEnabled
            ? "Website sử dụng Umami để đo lượt xem và tương tác với các đường dẫn công khai. Sự kiện không chứa nội dung form, email, số điện thoại, query URL hoặc mã nhận diện do VEX gán. Website tôn trọng Do Not Track và Global Privacy Control."
            : "Mã website không cài marketing pixel, công cụ analytics hoặc cookie theo dõi."}{" "}
          Dịch vụ lưu trữ, DNS, mạng và email có thể xử lý dữ liệu kỹ thuật như
          địa chỉ IP hoặc thông tin truy cập theo hoạt động và chính sách riêng
          của các bên cung cấp.
        </Text>
        <Text as="h2" variant="heading">
          Lựa chọn và yêu cầu của bạn
        </Text>
        <Text>
          Bạn có thể không điền hoặc không gửi email; có thể sử dụng các kênh
          liên hệ khác. Để trao đổi về việc truy cập, chỉnh sửa, rút lại sự đồng
          ý hoặc xóa thông tin đã gửi, hãy liên hệ{" "}
          <Link href={`mailto:${company.email}`}>{company.email}</Link>. VEX sẽ
          xem xét yêu cầu theo phạm vi xử lý thực tế và nghĩa vụ áp dụng.
        </Text>
        <Text as="h2" variant="heading">
          Nội dung nhạy cảm và thay đổi
        </Text>
        <Text>
          Không gửi mật khẩu, thông tin thanh toán, tài liệu mật hoặc dữ liệu cá
          nhân của người khác qua biểu mẫu. Thông tin quyền riêng tư cần được
          cập nhật khi website bổ sung API tiếp nhận, analytics hoặc một hình
          thức xử lý dữ liệu mới.
        </Text>
      </section>
      <CTASection />
    </>
  );
}
export function Terms() {
  return (
    <>
      <PageIntro label="Điều khoản" title="Điều khoản sử dụng website.">
        Thông tin giúp bạn sử dụng nội dung và các kênh liên hệ của VEX.
      </PageIntro>
      <section className="section container prose policy">
        {[
          [
            "Mục đích của website",
            "Website giới thiệu công ty, định hướng công nghệ và các hướng giải pháp của VEX. Nội dung không thay thế báo giá, hợp đồng hoặc cam kết triển khai cụ thể.",
          ],
          [
            "Nội dung và quyền sở hữu",
            "Logo, bộ nhận diện và các nội dung do VEX công bố cần được sử dụng đúng quyền sở hữu và quy định nhận diện. Hãy liên hệ VEX trước khi sử dụng tài sản thương hiệu cho mục đích thương mại hoặc làm người đọc hiểu nhầm về quan hệ hợp tác.",
          ],
          [
            "Thông tin giải pháp",
            "Tính khả thi, phạm vi, tiến độ và chi phí được đánh giá và thống nhất cho từng yêu cầu. Không có kết quả kinh doanh hoặc tỷ lệ cải thiện được bảo đảm chỉ từ thông tin giới thiệu trên website.",
          ],
          [
            "Liên hệ và liên kết ngoài",
            "Các đường dẫn điện thoại và email phụ thuộc thiết bị và ứng dụng của bạn. Khi gửi email, bạn chịu trách nhiệm kiểm tra nội dung và có quyền cung cấp các thông tin trong thư.",
          ],
          [
            "Cập nhật nội dung",
            "VEX có thể cập nhật nội dung để phản ánh hoạt động và cách vận hành website. Nếu có câu hỏi về thông tin trên trang, hãy liên hệ để được làm rõ.",
          ],
        ].map(([title, text]) => (
          <section key={title}>
            <Text as="h2" variant="heading">
              {title}
            </Text>
            <Text>{text}</Text>
          </section>
        ))}
      </section>
      <CTASection />
    </>
  );
}
export function NotFound() {
  return (
    <>
      <PageIntro label="404" title="Không tìm thấy trang.">
        Trang bạn tìm có thể đã thay đổi địa chỉ hoặc chưa được công bố.
      </PageIntro>
      <section className="section container">
        <Link href="/" className="text-link">
          Quay về trang chủ
        </Link>
        <Link href="/contact/" className="text-link">
          Liên hệ với VEX
        </Link>
      </section>
    </>
  );
}
