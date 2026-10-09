import { Text } from "@cloudflare/kumo/components/text";
import { Badge } from "@cloudflare/kumo/components/badge";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Link } from "@cloudflare/kumo/components/link";
import {
  ArrowUpRightIcon,
  BrainIcon,
  CodeIcon,
  CpuIcon,
  RobotIcon,
  TreeStructureIcon,
  FlaskIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import { CTA, Heading, PageIntro } from "../components/shared";
import {
  researchDirections,
  researchPage,
  researchProcess,
  researchSystemLayers,
} from "../content/research";
import {
  academyDirections,
  academyLearningPath,
  academyPage,
  academyPreparation,
} from "../content/academy";
import "../styles-research.css";

const researchIcons = {
  software: CodeIcon,
  ai: BrainIcon,
  robotics: RobotIcon,
  embedded: CpuIcon,
  automation: TreeStructureIcon,
};
const academyIcons = {
  stem: FlaskIcon,
  robotics: RobotIcon,
  coding: CodeIcon,
  ai: BrainIcon,
};

export function Research() {
  return (
    <>
      <PageIntro label="Nghiên cứu & Phát triển" title={researchPage.title}>
        {researchPage.intro}
      </PageIntro>
      <section className="section container research-opening">
        <div className="research-opening-copy">
          <Badge variant="outline">{researchPage.status}</Badge>
          <Heading
            label="TƯ DUY TÍCH HỢP"
            title="Một bài toán. Nhiều lớp công nghệ."
          >
            Phần mềm và AI tạo giá trị khi được đặt trong một hệ thống có đầu
            vào, logic xử lý và cách phản hồi rõ ràng. Kết nối các lớp công nghệ
            là một hướng nghiên cứu của VEX.
          </Heading>
          <Text variant="secondary">{researchPage.statusNote}</Text>
          <CTA href="/contact/?topic=research">Trao đổi hướng nghiên cứu</CTA>
        </div>
        <figure
          className="research-system"
          aria-labelledby="research-map-title"
        >
          <div className="research-system-header">
            <span className="eyebrow">SƠ ĐỒ ĐỊNH HƯỚNG</span>
            <Text as="h3" variant="heading" id="research-map-title">
              Từ tín hiệu đến phản hồi
            </Text>
          </div>
          <ol className="research-system-layers">
            {researchSystemLayers.map((layer) => (
              <li key={layer.number}>
                <div className="research-layer-title">
                  <span>{layer.number}</span>
                  <div>
                    <strong>{layer.title}</strong>
                    <Text variant="secondary">{layer.description}</Text>
                  </div>
                </div>
                <div className="research-layer-tags">
                  {layer.technologies.map((technology) => (
                    <Badge key={technology} variant="outline">
                      {technology}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <div className="research-feedback">
            <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
              <path
                d="M18 7H8a5 5 0 0 0 0 10h9M18 7l-4-4m4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Theo dõi kết quả · Kiểm tra · Điều chỉnh
          </div>
          <figcaption>
            Minh họa cách kết nối công nghệ, không phải kiến trúc một sản phẩm
            đang vận hành.
          </figcaption>
        </figure>
      </section>
      <section className="section research-directions-section">
        <div className="container">
          <Heading
            label="LĨNH VỰC QUAN TÂM"
            title="Năm hướng nghiên cứu cùng kết nối."
          >
            Các câu hỏi dưới đây giúp xác định điểm cần khảo sát trước khi chọn
            công nghệ hoặc xây dựng một thử nghiệm.
          </Heading>
          <div className="research-directions">
            {researchDirections.map((direction) => {
              const Icon = researchIcons[direction.id];
              return (
                <article className="research-direction" key={direction.id}>
                  <div className="research-direction-label">
                    <Icon size={25} aria-hidden="true" />
                    <span>{direction.label}</span>
                  </div>
                  <div className="research-direction-content">
                    <Text as="h3" variant="heading">
                      {direction.title}
                    </Text>
                    <Text variant="secondary">{direction.description}</Text>
                    <ul>
                      {direction.questions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                    <Link
                      href={direction.href}
                      className="research-related-link"
                    >
                      Xem hướng giải pháp <ArrowUpRightIcon size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section container">
        <Heading label="CÁCH TIẾP CẬN" title="Từ câu hỏi đến bằng chứng.">
          Quy trình nghiên cứu tham khảo để thảo luận cho từng bài toán. Phạm vi
          và cách đánh giá được thống nhất trước khi triển khai.
        </Heading>
        <ol className="research-process">
          {researchProcess.map((step, index) => (
            <li key={step.title}>
              <span className="research-process-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Text as="h3" variant="heading">
                {step.title}
              </Text>
              <Text variant="secondary">{step.description}</Text>
              <Text DANGEROUS_className="research-process-reference">
                {step.reference}
              </Text>
            </li>
          ))}
        </ol>
        <div className="research-publication-note">
          <Text as="h3" variant="heading">
            Công bố dựa trên dữ liệu được xác nhận
          </Text>
          <Text variant="secondary">
            Chưa có nguyên mẫu hoặc kết quả nghiên cứu được công bố trên
            website. Các thông tin đã được phép giới thiệu sẽ có trong danh mục
            dự án và sản phẩm.
          </Text>
          <Link href="/projects/" className="research-related-link">
            Xem dự án & sản phẩm <ArrowUpRightIcon size={16} />
          </Link>
        </div>
      </section>
      <section className="research-band">
        <div className="container research-layout">
          <Heading label="HỢP TÁC NGHIÊN CỨU" title="Cùng làm rõ một bài toán.">
            {researchPage.collaboration}
          </Heading>
          <div className="research-collaboration">
            <Text>
              Nội dung trao đổi ban đầu nên gồm mục tiêu, điều kiện sử dụng và
              nguồn lực sẵn có. VEX sẽ cùng bạn xem xét tính phù hợp và phạm vi
              có thể tiếp tục thảo luận.
            </Text>
            <CTA href="/contact/?topic=research" onDark>
              Liên hệ hợp tác R&D
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
}

export function Academy() {
  return (
    <>
      <PageIntro label="VEX Academy" title={academyPage.title}>
        {academyPage.intro}
      </PageIntro>
      <section className="section container academy-opening">
        <div className="academy-opening-copy">
          <Badge variant="outline">{academyPage.status}</Badge>
          <Heading
            label="ĐỊNH HƯỚNG GIÁO DỤC"
            title="Hiểu công nghệ bằng cách khám phá."
          >
            VEX Academy hướng tới việc kết nối kiến thức với thực hành, giúp
            người học đặt câu hỏi, thử ý tưởng và hiểu cách công nghệ hoạt động.
          </Heading>
          <Text variant="secondary">{academyPage.statusNote}</Text>
          <div className="academy-location">
            <MapPinIcon size={19} aria-hidden="true" />
            <span>Địa phương định hướng: Thọ Xuân, Thanh Hóa</span>
          </div>
          <CTA href="/contact/?topic=academy">Trao đổi về VEX Academy</CTA>
        </div>
        <figure
          className="academy-learning"
          aria-labelledby="academy-map-title"
        >
          <div className="academy-learning-heading">
            <span className="eyebrow">TƯ DUY HỌC TẬP</span>
            <Text as="h3" variant="heading" id="academy-map-title">
              Từ tò mò đến hiểu biết
            </Text>
          </div>
          <ol>
            {academyLearningPath.map((step, index) => (
              <li key={step.title}>
                <span className="academy-learning-node" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <Text as="h4" variant="heading">
                    {step.title}
                  </Text>
                  <Text variant="secondary">{step.description}</Text>
                </div>
              </li>
            ))}
          </ol>
          <figcaption>Minh họa định hướng học tập của VEX Academy.</figcaption>
        </figure>
      </section>
      <section className="section research-directions-section">
        <div className="container">
          <Heading
            label="NỘI DUNG QUAN TÂM"
            title="Bốn hướng khám phá công nghệ."
          >
            Những lĩnh vực dự kiến để phát triển nội dung giáo dục. Mục tiêu, lộ
            trình và hình thức cụ thể sẽ được công bố khi được xác nhận.
          </Heading>
          <div className="academy-directions">
            {academyDirections.map((direction) => {
              const Icon = academyIcons[direction.id];
              return (
                <LayerCard className="academy-direction" key={direction.id}>
                  <div className="icon-box">
                    <Icon size={25} aria-hidden="true" />
                  </div>
                  <Text as="h3" variant="heading">
                    {direction.title}
                  </Text>
                  <Text variant="secondary">{direction.description}</Text>
                  <Text DANGEROUS_className="academy-direction-focus">
                    {direction.focus}
                  </Text>
                </LayerCard>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section container academy-preparation">
        <Heading
          label="CÁC BƯỚC CHUẨN BỊ"
          title="Xây nền tảng trước khi bắt đầu."
        >
          Hướng chuẩn bị dự kiến nhằm đưa ý tưởng giáo dục đến một mô hình phù
          hợp với nhu cầu và điều kiện thực tế.
        </Heading>
        <ol>
          {academyPreparation.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <Text as="h3" variant="heading">
                  {step.title}
                </Text>
                <Text variant="secondary">{step.description}</Text>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="research-band">
        <div className="container research-layout">
          <Heading
            label="KẾT NỐI GIÁO DỤC"
            title="Cùng trao đổi từ nhu cầu thực tế."
          >
            {academyPage.collaboration}
          </Heading>
          <div className="research-collaboration">
            <Text>
              Kênh liên hệ hiện dành cho trao đổi định hướng và hợp tác. Khi có
              thông tin mở chương trình, VEX sẽ công bố trạng thái và điều kiện
              đăng ký rõ ràng trên website.
            </Text>
            <CTA href="/contact/?topic=academy" onDark>
              Liên hệ về VEX Academy
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
}
