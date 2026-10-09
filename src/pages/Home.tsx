import { Badge } from "@cloudflare/kumo/components/badge";
import { Text } from "@cloudflare/kumo/components/text";
import { Link } from "@cloudflare/kumo/components/link";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import {
  ArrowUpRightIcon,
  CodeIcon,
  BrainIcon,
  CpuIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react";
import { services, technologies } from "../content/services";
import { process } from "../content/company";
import { publicProjects } from "../content/projects";
import { publicArticles } from "../content/articles";
import { brandStrategy } from "../content/brand-strategy";
import {
  CTA,
  Heading,
  CTASection,
  ContentCard,
  ProjectEmpty,
  technologyIcons,
} from "../components/shared";
import TechnologyVisual from "../components/TechnologyVisual";
import "../styles-strategy-home.css";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Badge variant="outline">VEX TECHNOLOGY SOLUTIONS</Badge>
            <Text as="h1" variant="heading">
              Kiến tạo giải pháp công nghệ từ{" "}
              <span>những bài toán thực tiễn.</span>
            </Text>
            <Text variant="secondary">
              VEX nghiên cứu, phát triển và tích hợp phần mềm, trí tuệ nhân tạo,
              robotics và hệ thống tự động hóa, hướng tới những giải pháp có
              tính ứng dụng cho doanh nghiệp và tổ chức.
            </Text>
            <div className="hero-actions">
              <CTA size="lg" href="/solutions/">
                Khám phá giải pháp
              </CTA>
              <CTA size="lg" secondary>
                Kết nối với VEX
              </CTA>
            </div>
            <div className="hero-foot">
              <span className="status-dot" />
              SOFTWARE · AI · ROBOTICS · AUTOMATION
            </div>
          </div>
          <TechnologyVisual />
        </div>
      </section>
      <div className="capability-strip">
        <div className="container">
          <span>KẾT NỐI CÔNG NGHỆ</span>
          {[
            [CodeIcon, "Phần mềm"],
            [BrainIcon, "Trí tuệ nhân tạo"],
            [CpuIcon, "Robotics & Embedded"],
            [TreeStructureIcon, "Tự động hóa"],
          ].map(
            ([Icon, label]) =>
              typeof Icon !== "string" && (
                <div key={String(label)}>
                  <Icon size={22} />
                  {String(label)}
                </div>
              ),
          )}
        </div>
      </div>
      <section className="section container">
        <div className="about-layout">
          <Heading
            number="01"
            label="VEX LÀ AI?"
            title="Công nghệ được phát triển để tạo ra giá trị thực."
          >
            VEX Technology Solutions là doanh nghiệp công nghệ Việt Nam, tiếp
            cận công nghệ từ nhu cầu thực tế, hướng tới các hệ thống có khả năng
            ứng dụng, cải tiến và phát triển lâu dài.
          </Heading>
          <div className="about-values">
            {[
              [
                "Tư duy giải quyết vấn đề",
                "Bắt đầu bằng nhu cầu và những ràng buộc thực tế của tổ chức.",
              ],
              [
                "Kết hợp nhiều công nghệ",
                "Kết nối phần mềm, dữ liệu và hệ thống vật lý trong một hướng giải quyết.",
              ],
              [
                "Hướng tới ứng dụng",
                "Đánh giá khả năng triển khai, vận hành và cải tiến của từng giải pháp.",
              ],
            ].map(([title, text]) => (
              <div className="value" key={title}>
                <div>
                  <Text as="h3" variant="heading">
                    {title}
                  </Text>
                  <Text variant="secondary">{text}</Text>
                </div>
              </div>
            ))}
            <Link href="/about/" className="text-link" variant="plain">
              Tìm hiểu về VEX
              <ArrowUpRightIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container home-strategy-section">
        <div className="home-strategy-heading">
          <Heading
            number="02"
            label="TẦM NHÌN & SỨ MỆNH"
            title={brandStrategy.title}
          />
          {brandStrategy.status === "draft" && (
            <Badge variant="outline" className="home-strategy-draft">
              {brandStrategy.draftLabel}
            </Badge>
          )}
        </div>
        <div className="home-strategy-grid">
          {[brandStrategy.vision, brandStrategy.mission].map((purpose) => (
            <LayerCard className="home-strategy-card" key={purpose.id}>
              <div className="home-strategy-label">
                <Text as="h3" variant="heading">
                  {purpose.title}
                </Text>
                <Text variant="secondary" size="sm">
                  <span lang="en">{purpose.englishTitle}</span>
                </Text>
              </div>
              <Text
                as="p"
                variant="heading"
                DANGEROUS_className="home-strategy-message"
              >
                {purpose.message}
              </Text>
              <Text
                variant="secondary"
                DANGEROUS_className="home-strategy-summary"
              >
                {purpose.summary}
              </Text>
              <Link
                href={`/about/#${purpose.id}`}
                variant="plain"
                className="text-link home-strategy-link"
              >
                Tìm hiểu {purpose.title.toLowerCase()} của VEX
                <ArrowUpRightIcon size={18} aria-hidden="true" />
              </Link>
            </LayerCard>
          ))}
        </div>
      </section>
      <section className="section solution-section">
        <div className="container">
          <Heading
            number="03"
            label="LĨNH VỰC CÔNG NGHỆ"
            title="Kết nối năng lực. Mở rộng khả năng."
          >
            Từ phần mềm đến hệ thống vật lý, VEX hướng tới khả năng tích hợp các
            công nghệ để giải quyết những bài toán đa dạng.
          </Heading>
          <div className="technology-grid">
            {technologies.map((item) => {
              const Icon = technologyIcons[item.icon];
              return (
                <ContentCard
                  key={item.slug}
                  title={item.title}
                  description={item.text}
                  href={`/solutions/${item.slug}/`}
                  icon={<Icon size={26} />}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="heading-row">
          <Heading
            number="04"
            label="GIẢI PHÁP & DỊCH VỤ"
            title="Từ yêu cầu thực tế đến giải pháp phù hợp."
          >
            Mỗi nhu cầu có một phạm vi và điều kiện khác nhau. Cùng làm rõ hướng
            tiếp cận trước khi triển khai.
          </Heading>
          <Link href="/solutions/" variant="plain" className="text-link">
            Tất cả giải pháp
            <ArrowUpRightIcon size={18} />
          </Link>
        </div>
        <div className="service-list">
          {services.map((service, i) => (
            <Link
              href={`/solutions/${service.slug}/`}
              key={service.slug}
              variant="plain"
              className="service-row"
            >
              <span className="service-number">0{i + 1}</span>
              <div>
                <Text as="h3" variant="heading">
                  {service.title}
                </Text>
                <Text variant="secondary">{service.summary}</Text>
              </div>
              <ArrowUpRightIcon size={24} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section solution-section">
        <div className="container">
          <Heading
            number="05"
            label="DỰ ÁN & SẢN PHẨM"
            title="Từ ý tưởng đến những hệ thống thực tế."
          >
            Danh mục chỉ giới thiệu thông tin được phép công bố. Không sử dụng
            số liệu hay kết quả chưa được kiểm chứng.
          </Heading>
          {publicProjects.length === 0 ? (
            <ProjectEmpty />
          ) : (
            <div className="technology-grid">
              {publicProjects.map((p) => (
                <ContentCard
                  key={p.slug}
                  linkLabel="Xem dự án"
                  title={p.title}
                  description={p.summary}
                  href={`/projects/${p.slug}/`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="section container">
        <Heading
          number="06"
          label="LỘ TRÌNH THAM KHẢO"
          title="Cách tiếp cận một bài toán công nghệ."
        >
          Phạm vi và các bước triển khai được thống nhất riêng cho từng dự án.
        </Heading>
        <div className="process-grid">
          {process.map((step, i) => (
            <div className="step" key={step.title}>
              <div className="step-number">0{i + 1}</div>
              <Text as="h3" variant="heading">
                {step.title}
              </Text>
              <Text variant="secondary">{step.text}</Text>
            </div>
          ))}
        </div>
      </section>
      <section className="research-band">
        <div className="container research-layout">
          <div>
            <div className="eyebrow">NGHIÊN CỨU & PHÁT TRIỂN</div>
            <Text as="h2" variant="heading">
              Nghiên cứu hôm nay.
              <br />
              Hướng tới ứng dụng ngày mai.
            </Text>
          </div>
          <div>
            <Text variant="secondary">
              Thử nghiệm công nghệ, kết hợp phần mềm và phần cứng, đánh giá khả
              năng ứng dụng và cải tiến theo bài toán cụ thể là định hướng phát
              triển của VEX.
            </Text>
            <CTA onDark href="/research/">
              Khám phá hướng nghiên cứu
            </CTA>
          </div>
        </div>
      </section>
      <section className="section container academy-section">
        <div>
          <Badge variant="outline">ĐỊNH HƯỚNG TƯƠNG LAI</Badge>
          <Text as="h2" variant="heading">
            VEX Academy
          </Text>
        </div>
        <div>
          <Text variant="secondary">
            VEX đang nghiên cứu định hướng giáo dục STEM, Robotics, lập trình và
            AI, bắt đầu từ Thọ Xuân, Thanh Hóa.
          </Text>
          <Text variant="secondary" size="sm">
            Đang trong giai đoạn định hướng và chuẩn bị. Chưa mở tuyển sinh.
          </Text>
          <Link href="/academy/" variant="plain" className="text-link">
            Tìm hiểu định hướng VEX Academy <ArrowUpRightIcon size={18} />
          </Link>
        </div>
      </section>
      {publicArticles.length > 0 && (
        <section className="section container">
          <Heading label="TIN TỨC & GÓC NHÌN" title="Chia sẻ từ VEX.">
            Bài viết và hoạt động được VEX công bố.
          </Heading>
          <div className="card-grid">
            {publicArticles.slice(0, 3).map((article) => (
              <ContentCard
                key={article.slug}
                title={article.title}
                description={article.summary}
                href={`/insights/${article.slug}/`}
                linkLabel="Đọc bài viết"
              />
            ))}
          </div>
          <Link href="/insights/" variant="plain" className="text-link">
            Xem tất cả bài viết <ArrowUpRightIcon size={18} />
          </Link>
        </section>
      )}
      <CTASection />
    </>
  );
}
