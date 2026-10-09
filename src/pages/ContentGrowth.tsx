import { useState } from "react";
import { Badge } from "@cloudflare/kumo/components/badge";
import { Button } from "@cloudflare/kumo/components/button";
import { Empty } from "@cloudflare/kumo/components/empty";
import { Input } from "@cloudflare/kumo/components/input";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Link } from "@cloudflare/kumo/components/link";
import { Select } from "@cloudflare/kumo/components/select";
import { Text } from "@cloudflare/kumo/components/text";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { CTA, ContentCard, Heading, PageIntro } from "../components/shared";
import {
  publicArticles,
  type Article,
  type ArticleBlock,
} from "../content/articles";
import {
  careerDirections,
  employmentLabels,
  publicJobs,
  workplaceLabels,
  type Job,
} from "../content/careers";
import { NotFound } from "./CorporatePages";
import "../styles-growth.css";

function dateLabel(date: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function searchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLocaleLowerCase("vi")
    .trim();
}

function GrowthContact({
  title,
  description,
  label,
  href,
}: {
  title: string;
  description: string;
  label: string;
  href: string;
}) {
  return (
    <section className="closing-cta">
      <div className="container">
        <div>
          <Text as="h2" variant="heading">
            {title}
          </Text>
          <Text variant="secondary">{description}</Text>
        </div>
        <CTA href={href} size="lg">
          {label}
        </CTA>
      </div>
    </section>
  );
}

function ArticleCard({
  article,
  headingLevel = "h2",
}: {
  article: Article;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <LayerCard className="content-card growth-card">
      {article.cover && (
        <img
          className="growth-card-image"
          src={article.cover.src}
          alt={article.cover.alt}
          width={article.cover.width}
          height={article.cover.height}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="growth-meta">
        <Badge variant="outline">{article.category}</Badge>
        <time dateTime={article.publishedAt}>
          {dateLabel(article.publishedAt)}
        </time>
      </div>
      <Text as={headingLevel} variant="heading">
        {article.title}
      </Text>
      <Text variant="secondary">{article.summary}</Text>
      <Link href={`/insights/${article.slug}/`} variant="plain">
        Đọc bài viết <ArrowUpRightIcon size={18} />
      </Link>
    </LayerCard>
  );
}

function ArticleList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = [
    ...new Set(publicArticles.map((article) => article.category)),
  ];
  const needle = searchText(query);
  const results = publicArticles.filter(
    (article) =>
      (category === "all" || article.category === category) &&
      searchText(
        `${article.title} ${article.summary} ${article.author}`,
      ).includes(needle),
  );
  return (
    <>
      <div className="growth-filters">
        <Input
          label="Tìm bài viết"
          type="search"
          placeholder="Tiêu đề, nội dung hoặc tác giả"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          maxLength={120}
        />
        <Select
          label="Chủ đề"
          value={category}
          onValueChange={(value) => setCategory(value ?? "all")}
          items={[
            { value: "all", label: "Tất cả chủ đề" },
            ...categories.map((value) => ({ value, label: value })),
          ]}
          className="growth-select"
        />
      </div>
      <div className="growth-result-count" role="status">
        <Text size="sm" variant="secondary">
          {results.length} bài viết
        </Text>
      </div>
      {results.length > 0 ? (
        <div className="technology-grid growth-card-grid">
          {results.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <Empty
          className="growth-empty"
          title="Chưa tìm thấy bài viết phù hợp"
          description="Thử một từ khóa khác hoặc xem tất cả chủ đề."
          contents={
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
            >
              Xóa bộ lọc
            </Button>
          }
        />
      )}
    </>
  );
}

export function Insights() {
  return (
    <>
      <PageIntro
        label="Tin tức & Góc nhìn"
        title="Thông tin rõ ràng. Góc nhìn có cơ sở."
      >
        Nơi VEX chia sẻ thông tin công ty, hoạt động và các góc nhìn về công
        nghệ khi nội dung được xác nhận để công bố.
      </PageIntro>
      <section className="section container">
        {publicArticles.length > 0 ? (
          <ArticleList />
        ) : (
          <Empty
            className="growth-empty"
            title="Chưa có bài viết được công bố"
            description="Các bài viết và thông tin hoạt động sẽ được cập nhật tại đây. Trong thời gian này, bạn có thể tìm hiểu những hướng nghiên cứu và giải pháp của VEX."
            contents={<CTA href="/research/">Khám phá hướng nghiên cứu</CTA>}
          />
        )}
      </section>
      <GrowthContact
        title="Kết nối để trao đổi và chia sẻ."
        description="Liên hệ VEX về nội dung, truyền thông hoặc cơ hội hợp tác công nghệ."
        label="Liên hệ với VEX"
        href="/contact/?topic=media"
      />
    </>
  );
}

function BodyBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return <Text>{block.text}</Text>;
    case "heading":
      return (
        <Text
          as={block.level === 2 ? "h2" : "h3"}
          id={block.id}
          variant="heading"
        >
          {block.text}
        </Text>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List>
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </List>
      );
    }
    case "image":
      return (
        <figure className="growth-figure">
          <img
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            loading="lazy"
            decoding="async"
          />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
  }
}

export function ArticleDetail({ slug }: { slug: string }) {
  const article = publicArticles.find((item) => item.slug === slug);
  if (!article) return <NotFound />;
  const headings = article.body.filter(
    (block) => block.type === "heading" && block.level === 2,
  );
  const related = publicArticles.filter(
    (item) =>
      item.slug !== article.slug &&
      article.relatedArticleSlugs?.includes(item.slug),
  );
  return (
    <>
      <PageIntro label="Tin tức & Góc nhìn" title={article.title}>
        {article.summary}
      </PageIntro>
      <article
        className="section container editorial-grid growth-article"
        aria-label={article.title}
      >
        <aside className="detail-sidebar">
          <Badge variant="outline">{article.category}</Badge>
          <div className="growth-byline">
            <Text size="sm">Tác giả: {article.author}</Text>
            <Text size="sm" variant="secondary">
              Đăng ngày{" "}
              <time dateTime={article.publishedAt}>
                {dateLabel(article.publishedAt)}
              </time>
            </Text>
            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <Text size="sm" variant="secondary">
                Cập nhật{" "}
                <time dateTime={article.updatedAt}>
                  {dateLabel(article.updatedAt)}
                </time>
              </Text>
            )}
          </div>
          {headings.length > 0 && (
            <nav aria-label="Mục lục bài viết">
              {headings.map(
                (block) =>
                  block.type === "heading" && (
                    <Link key={block.id} href={`#${block.id}`}>
                      {block.text}
                    </Link>
                  ),
              )}
            </nav>
          )}
          <Link href="/insights/">Tất cả bài viết</Link>
        </aside>
        <div className="prose growth-body">
          {article.cover && (
            <figure className="growth-figure">
              <img
                src={article.cover.src}
                alt={article.cover.alt}
                width={article.cover.width}
                height={article.cover.height}
                decoding="async"
              />
              {article.cover.caption && (
                <figcaption>{article.cover.caption}</figcaption>
              )}
            </figure>
          )}
          {article.body.map((block, index) => (
            <BodyBlock key={index} block={block} />
          ))}
          {article.relatedLinks && article.relatedLinks.length > 0 && (
            <section
              className="growth-related-links"
              aria-labelledby="related-links-title"
            >
              <Text as="h2" variant="heading" id="related-links-title">
                Tìm hiểu thêm
              </Text>
              <ul>
                {article.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
      {related.length > 0 && (
        <section
          className="section container"
          aria-labelledby="related-articles-title"
        >
          <div className="growth-section-title">
            <Text as="h2" variant="heading" id="related-articles-title">
              Bài viết liên quan
            </Text>
          </div>
          <div className="technology-grid">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}
      <GrowthContact
        title="Trao đổi cùng VEX."
        description="Chia sẻ câu hỏi hoặc nhu cầu hợp tác liên quan đến nội dung bài viết."
        label="Kết nối với VEX"
        href="/contact/"
      />
    </>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <LayerCard className="content-card growth-card">
      <Badge variant="outline">{job.department}</Badge>
      <Text as="h3" variant="heading">
        {job.title}
      </Text>
      <Text variant="secondary">{job.summary}</Text>
      <div className="growth-meta">
        <span>{employmentLabels[job.employmentType]}</span>
        <span>{job.location.label}</span>
        <span>
          Hạn trao đổi:{" "}
          <time dateTime={job.deadline}>{dateLabel(job.deadline)}</time>
        </span>
      </div>
      <Link href={`/careers/${job.slug}/`} variant="plain">
        Xem vị trí <ArrowUpRightIcon size={18} />
      </Link>
    </LayerCard>
  );
}

function JobList() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const departments = [...new Set(publicJobs.map((job) => job.department))];
  const needle = searchText(query);
  const results = publicJobs.filter(
    (job) =>
      (department === "all" || job.department === department) &&
      searchText(`${job.title} ${job.summary} ${job.location.label}`).includes(
        needle,
      ),
  );
  return (
    <>
      <div className="growth-filters">
        <Input
          label="Tìm vị trí"
          type="search"
          placeholder="Tên vị trí hoặc địa điểm"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          maxLength={120}
        />
        <Select
          label="Nhóm chuyên môn"
          value={department}
          onValueChange={(value) => setDepartment(value ?? "all")}
          items={[
            { value: "all", label: "Tất cả nhóm chuyên môn" },
            ...departments.map((value) => ({ value, label: value })),
          ]}
          className="growth-select"
        />
      </div>
      <div className="growth-result-count" role="status">
        <Text size="sm" variant="secondary">
          {results.length} vị trí đang mở
        </Text>
      </div>
      {results.length > 0 ? (
        <div className="technology-grid growth-card-grid">
          {results.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
        </div>
      ) : (
        <Empty
          className="growth-empty"
          title="Chưa tìm thấy vị trí phù hợp"
          description="Thử một từ khóa khác hoặc xem tất cả nhóm chuyên môn."
          contents={
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setDepartment("all");
              }}
            >
              Xóa bộ lọc
            </Button>
          }
        />
      )}
    </>
  );
}

export function Careers() {
  return (
    <>
      <PageIntro
        label="Tuyển dụng"
        title="Cùng quan tâm đến những bài toán công nghệ."
      >
        Tìm hiểu các nhóm chuyên môn trong định hướng phát triển của VEX và theo
        dõi thông tin về cơ hội làm việc được công bố tại đây.
      </PageIntro>
      <section className="section container" aria-labelledby="open-jobs-title">
        <div className="growth-section-title">
          <Text as="h2" variant="heading" id="open-jobs-title">
            Vị trí đang tuyển
          </Text>
        </div>
        {publicJobs.length > 0 ? (
          <JobList />
        ) : (
          <Empty
            className="growth-empty"
            title="Chưa có vị trí tuyển dụng được công bố"
            description="VEX chưa thông báo vị trí đang mở trên website. Nếu muốn hỏi về cơ hội phù hợp, bạn có thể liên hệ để trao đổi trước; website hiện không tiếp nhận hoặc lưu hồ sơ ứng viên."
            contents={
              <CTA href="/contact/?topic=careers">Hỏi về cơ hội làm việc</CTA>
            }
          />
        )}
      </section>
      <section className="section solution-section">
        <div className="container">
          <Heading
            label="ĐỊNH HƯỚNG CHUYÊN MÔN"
            title="Những lĩnh vực VEX quan tâm."
          >
            Các nhóm dưới đây mô tả định hướng công nghệ, chưa phải danh sách vị
            trí đang tuyển.
          </Heading>
          <div className="technology-grid">
            {careerDirections.map((direction) => (
              <ContentCard
                key={direction.title}
                title={direction.title}
                description={direction.description}
                href={direction.href}
                linkLabel="Tìm hiểu định hướng"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function JobSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;
  return (
    <section id={id}>
      <Text as="h2" variant="heading">
        {title}
      </Text>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function CareerDetail({ slug }: { slug: string }) {
  const job = publicJobs.find((item) => item.slug === slug);
  if (!job) return <NotFound />;
  const salaryFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: job.salary?.currency ?? "VND",
    maximumFractionDigits: 0,
  });
  return (
    <>
      <PageIntro label="Tuyển dụng" title={job.title}>
        {job.summary}
      </PageIntro>
      <section className="section container editorial-grid">
        <aside className="detail-sidebar">
          <Badge variant="outline">{job.department}</Badge>
          <dl className="growth-job-facts">
            <dt>Hình thức</dt>
            <dd>{employmentLabels[job.employmentType]}</dd>
            <dt>Địa điểm</dt>
            <dd>{job.location.label}</dd>
            <dt>Cách làm việc</dt>
            <dd>{workplaceLabels[job.workplace]}</dd>
            <dt>Ngày đăng</dt>
            <dd>
              <time dateTime={job.publishedAt}>
                {dateLabel(job.publishedAt)}
              </time>
            </dd>
            <dt>Thời hạn</dt>
            <dd>
              <time dateTime={job.deadline}>{dateLabel(job.deadline)}</time>
            </dd>
            {job.salary && (
              <>
                <dt>Mức lương</dt>
                <dd>
                  {salaryFormatter.format(job.salary.minimum)}
                  {job.salary.maximum !== undefined &&
                    ` – ${salaryFormatter.format(job.salary.maximum)}`}{" "}
                  / {job.salary.period === "MONTH" ? "tháng" : "năm"}
                </dd>
              </>
            )}
          </dl>
          <nav aria-label="Nội dung vị trí">
            <Link href="#responsibilities">Công việc</Link>
            <Link href="#requirements">Yêu cầu</Link>
            {job.benefits.length > 0 && <Link href="#benefits">Quyền lợi</Link>}
            <Link href="#application">Cách liên hệ</Link>
          </nav>
          <Link href="/careers/">Tất cả vị trí</Link>
        </aside>
        <div className="prose">
          <JobSection
            id="responsibilities"
            title="Mô tả công việc"
            items={job.responsibilities}
          />
          <JobSection
            id="requirements"
            title="Yêu cầu bắt buộc"
            items={job.requirements}
          />
          <JobSection
            id="preferred"
            title="Yêu cầu ưu tiên"
            items={job.preferredQualifications ?? []}
          />
          <JobSection id="benefits" title="Quyền lợi" items={job.benefits} />
          <section id="application" className="growth-application">
            <Text as="h2" variant="heading">
              Cách liên hệ về vị trí
            </Text>
            <Text>{job.applicationInstructions}</Text>
            <Text variant="secondary">
              Website chỉ hỗ trợ soạn email qua trang liên hệ. Bạn kiểm tra nội
              dung và tự nhấn gửi trong ứng dụng email; không có hồ sơ nào được
              gửi hoặc lưu tại website.
            </Text>
            <CTA
              href={`/contact/?topic=careers&position=${encodeURIComponent(job.slug)}`}
            >
              Liên hệ về vị trí
            </CTA>
          </section>
        </div>
      </section>
    </>
  );
}
