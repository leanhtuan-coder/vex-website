import { Badge } from "@cloudflare/kumo/components/badge";
import { LinkButton } from "@cloudflare/kumo/components/button";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Link } from "@cloudflare/kumo/components/link";
import { Text } from "@cloudflare/kumo/components/text";
import { DownloadSimpleIcon, ImagesIcon } from "@phosphor-icons/react";
import { CTA, Heading, PageIntro } from "../components/shared";
import { formatMediaSize, publicMedia } from "../content/media";
import "../styles-media.css";

const logoVariants = [
  {
    id: "color" as const,
    title: "Logo màu",
    description: "Dùng trên nền trắng hoặc nền sáng để giữ rõ màu nhận diện.",
    preview: "/assets/vex-logo.svg",
  },
  {
    id: "white" as const,
    title: "Logo trắng",
    description: "Dùng trên nền dark cyan hoặc nền tối có đủ độ tương phản.",
    preview: "/assets/vex-logo-white.svg",
  },
];

export default function MediaPage() {
  return (
    <>
      <PageIntro
        label="Thư viện truyền thông"
        title="Tài nguyên thương hiệu VEX."
      >
        Logo chính thức để giới thiệu VEX trong nội dung truyền thông và hợp
        tác. Chọn phiên bản phù hợp với nền và giữ nguyên hình dáng logo.
      </PageIntro>
      <section
        className="section container media-logo-section"
        aria-labelledby="media-logos-title"
      >
        <div className="section-heading">
          <div className="eyebrow">TẢI XUỐNG</div>
          <Text as="h2" variant="heading" id="media-logos-title">
            Logo VEX đầy đủ.
          </Text>
          <Text variant="secondary">
            SVG phù hợp khi cần thay đổi kích thước. PNG có nền trong suốt,
            thuận tiện cho tài liệu và bài viết.
          </Text>
        </div>
        <div className="media-logo-grid">
          {logoVariants.map((variant) => (
            <LayerCard key={variant.id} className="media-logo-card">
              <div
                className={`media-logo-preview media-logo-preview-${variant.id}`}
              >
                <img
                  src={variant.preview}
                  width={3067}
                  height={935}
                  alt={`Logo VEX đầy đủ, phiên bản ${variant.id === "color" ? "màu" : "trắng"}`}
                  loading="lazy"
                />
              </div>
              <div className="media-logo-details">
                <Text as="h3" variant="heading">
                  {variant.title}
                </Text>
                <Text variant="secondary">{variant.description}</Text>
                <ul
                  className="media-downloads"
                  aria-label={`Tệp ${variant.title.toLowerCase()}`}
                >
                  {publicMedia
                    .filter((asset) => asset.variant === variant.id)
                    .map((asset) => (
                      <li key={asset.id}>
                        <div className="media-file-details">
                          <Badge variant="outline">{asset.format}</Badge>
                          <Text
                            variant="secondary"
                            title={`${asset.bytes.toLocaleString("vi-VN")} byte`}
                          >
                            {formatMediaSize(asset.bytes)}
                            <span>{asset.dimensions}</span>
                          </Text>
                        </div>
                        <LinkButton
                          href={asset.href}
                          download={asset.filename}
                          variant="secondary"
                          size="base"
                          className="media-download-button"
                          icon={
                            <DownloadSimpleIcon size={16} aria-hidden="true" />
                          }
                          aria-label={`Tải ${asset.title}`}
                        >
                          Tải {asset.format}
                        </LinkButton>
                      </li>
                    ))}
                </ul>
              </div>
            </LayerCard>
          ))}
        </div>
      </section>
      <section className="section media-guidance-section">
        <div className="container editorial-grid">
          <Heading
            label="SỬ DỤNG NHẬN DIỆN"
            title="Giữ đúng hình dáng. Đặt đúng ngữ cảnh."
          />
          <div className="prose media-guidance">
            <ul>
              <li>
                Giữ nguyên tỷ lệ, đầy đủ chữ VEX và các chi tiết của logo. Không
                kéo giãn, cắt chữ hoặc tách biểu tượng để thay logo đầy đủ.
              </li>
              <li>
                Giữ nguyên màu của tệp cung cấp; không thêm hiệu ứng, đường viền
                hoặc đổi cấu trúc logo.
              </li>
              <li>
                Chừa khoảng thoáng quanh logo và chọn nền giúp toàn bộ logo dễ
                đọc.
              </li>
              <li>
                Không sử dụng theo cách khiến người xem hiểu nhầm về sự bảo trợ,
                chứng nhận hoặc quan hệ hợp tác với VEX.
              </li>
            </ul>
            <Text>
              Các tệp tải xuống phục vụ việc giới thiệu thương hiệu, không cấp
              quyền sở hữu hoặc giấy phép sử dụng tự do. Tham khảo{" "}
              <Link href="/terms/">điều khoản sử dụng</Link> và liên hệ VEX
              trước khi dùng cho mục đích thương mại hoặc cần xác nhận quyền sử
              dụng.
            </Text>
            <CTA href="/contact/?topic=media">Liên hệ truyền thông</CTA>
          </div>
        </div>
      </section>
      <section
        className="section container"
        aria-labelledby="media-projects-title"
      >
        <LayerCard className="media-project-assets">
          <div className="icon-box">
            <ImagesIcon size={24} aria-hidden="true" />
          </div>
          <Badge variant="outline">Chưa công bố</Badge>
          <Text as="h2" variant="heading" id="media-projects-title">
            Ảnh & video dự án
          </Text>
          <Text variant="secondary">
            Thư viện hiện chưa công bố ảnh hoặc video dự án. Tài nguyên sẽ được
            bổ sung khi có dữ liệu thực tế và quyền sử dụng phù hợp.
          </Text>
          <Link href="/projects/">Xem thông tin dự án & sản phẩm</Link>
        </LayerCard>
      </section>
    </>
  );
}
