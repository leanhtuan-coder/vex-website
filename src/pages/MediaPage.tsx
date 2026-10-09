import { Badge } from "@cloudflare/kumo/components/badge";
import { useState } from "react";
import { Button, LinkButton } from "@cloudflare/kumo/components/button";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Link } from "@cloudflare/kumo/components/link";
import { Text } from "@cloudflare/kumo/components/text";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  DownloadSimpleIcon,
  ImagesIcon,
} from "@phosphor-icons/react";
import { BrandResourceVisual } from "../components/BrandResourceVisual";
import DocumentDownloadCenter from "../components/DocumentDownloadCenter";
import { publicDocuments } from "../content/documents";
import { CTA, Heading } from "../components/shared";
import { formatMediaSize, publicMedia } from "../content/media";
import "../styles-media.css";

const logoVariants = [
  {
    id: "color" as const,
    title: "Logo màu",
    description: "Dùng trên nền trắng hoặc nền sáng để giữ rõ màu nhận diện.",
    preview: "/assets/vex-logo.svg",
    background: "Nền sáng",
  },
  {
    id: "white" as const,
    title: "Logo trắng",
    description: "Dùng trên nền dark cyan hoặc nền tối có đủ độ tương phản.",
    preview: "/assets/vex-logo-white.svg",
    background: "Nền tối",
  },
];

const usageGuidelines = [
  {
    title: "Tỷ lệ & cấu trúc",
    description:
      "Giữ nguyên tỷ lệ, đầy đủ chữ VEX và các chi tiết của logo. Không kéo giãn, cắt chữ hoặc tách biểu tượng để thay logo đầy đủ.",
  },
  {
    title: "Màu & hiệu ứng",
    description:
      "Giữ nguyên màu của tệp cung cấp; không thêm hiệu ứng, đường viền hoặc đổi cấu trúc logo.",
  },
  {
    title: "Nền & khoảng thoáng",
    description:
      "Chừa khoảng thoáng quanh logo và chọn nền giúp toàn bộ logo dễ đọc.",
  },
  {
    title: "Ngữ cảnh sử dụng",
    description:
      "Không sử dụng theo cách khiến người xem hiểu nhầm về sự bảo trợ, chứng nhận hoặc quan hệ hợp tác với VEX.",
  },
];

const brandColors = [
  {
    name: "Dark cyan",
    role: "Màu chủ đạo",
    hex: "#00707E",
    rgb: "0 / 112 / 126",
    token: "var(--vex-cyan)",
  },
  {
    name: "Mint",
    role: "Màu nhấn",
    hex: "#67C08B",
    rgb: "103 / 192 / 139",
    token: "var(--vex-mint)",
  },
];

export default function MediaPage() {
  const [copiedHex, setCopiedHex] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  async function copyHex(hex: string) {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setCopyStatus(`Đã sao chép ${hex}.`);
    } catch {
      setCopiedHex("");
      setCopyStatus(
        "Không thể sao chép tự động. Hãy chọn và sao chép mã HEX bên trên.",
      );
    }
  }

  return (
    <>
      <section className="media-hero" aria-labelledby="media-page-title">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Đường dẫn trang">
            <Link href="/">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Tài nguyên thương hiệu</span>
          </nav>
          <div className="media-hero-grid">
            <div className="media-hero-copy">
              <div className="eyebrow">THƯ VIỆN TRUYỀN THÔNG</div>
              <Text as="h1" variant="heading" id="media-page-title">
                Tài nguyên <span>thương hiệu VEX.</span>
              </Text>
              <Text variant="secondary">
                Logo chính thức để giới thiệu VEX trong nội dung truyền thông và
                hợp tác. Chọn phiên bản phù hợp với nền và giữ nguyên hình dáng
                logo.
              </Text>
              <Link
                href="#media-logos-title"
                variant="plain"
                className="media-hero-link"
              >
                Xem bộ logo
                <ArrowDownIcon size={18} aria-hidden="true" />
              </Link>
            </div>
            <BrandResourceVisual />
          </div>
        </div>
      </section>
      {publicDocuments.length > 0 && (
        <section className="section container">
          <DocumentDownloadCenter />
        </section>
      )}
      <section
        className="section container media-logo-section"
        aria-labelledby="media-logos-title"
      >
        <div className="media-section-header">
          <div className="section-heading">
            <div className="eyebrow">01 / BỘ LOGO</div>
            <Text as="h2" variant="heading" id="media-logos-title">
              Nhận diện nguyên bản.
            </Text>
          </div>
          <Text variant="secondary">
            SVG phù hợp khi cần thay đổi kích thước. PNG có nền trong suốt,
            thuận tiện cho tài liệu và bài viết.
          </Text>
        </div>
        <div className="media-logo-grid">
          {logoVariants.map((variant, index) => (
            <LayerCard key={variant.id} className="media-logo-card">
              <div
                className={`media-logo-preview media-logo-preview-${variant.id}`}
              >
                <div className="media-preview-caption" aria-hidden="true">
                  <span>VEX / {String(index + 1).padStart(2, "0")}</span>
                  <span>{variant.background}</span>
                </div>
                <img
                  src={variant.preview}
                  width={3067}
                  height={935}
                  alt={`Logo VEX đầy đủ, phiên bản ${variant.id === "color" ? "màu" : "trắng"}`}
                  loading="lazy"
                />
                <div className="media-preview-frame" aria-hidden="true" />
              </div>
              <div className="media-logo-details">
                <div className="media-variant-heading">
                  <Text as="h3" variant="heading">
                    {variant.title}
                  </Text>
                  <Badge variant="outline">SVG / PNG</Badge>
                </div>
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
                          <span className="media-file-format">
                            {asset.format}
                          </span>
                          <div>
                            <span className="media-file-name">
                              {asset.filename}
                            </span>
                            <Text
                              variant="secondary"
                              title={`${asset.bytes.toLocaleString("vi-VN")} byte`}
                            >
                              {formatMediaSize(asset.bytes)}
                              <span aria-hidden="true"> · </span>
                              <span>{asset.dimensions}</span>
                            </Text>
                          </div>
                        </div>
                        <LinkButton
                          href={asset.href}
                          download={asset.filename}
                          variant="secondary"
                          size="base"
                          className="media-download-button"
                          icon={
                            <DownloadSimpleIcon size={17} aria-hidden="true" />
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
      <section
        className="section container media-foundations"
        aria-labelledby="media-foundations-title"
      >
        <div className="media-section-header">
          <div className="section-heading">
            <div className="eyebrow">02 / NGÔN NGỮ THƯƠNG HIỆU</div>
            <Text as="h2" variant="heading" id="media-foundations-title">
              Màu sắc & kiểu chữ.
            </Text>
          </div>
          <Text variant="secondary">
            Màu và kiểu chữ từ Brand Guidelines VEX. Giữ nguyên màu trong các
            tệp logo được cung cấp.
          </Text>
        </div>
        <div className="media-foundation-grid">
          <div className="media-color-grid">
            {brandColors.map((color) => (
              <LayerCard className="media-color-card" key={color.hex}>
                <div
                  className="media-color-preview"
                  style={{ background: color.token }}
                  aria-hidden="true"
                />
                <div className="media-color-details">
                  <span className="media-color-role">{color.role}</span>
                  <Text as="h3" variant="heading">
                    {color.name}
                  </Text>
                  <dl>
                    <div>
                      <dt>HEX</dt>
                      <dd>{color.hex}</dd>
                    </div>
                    <div>
                      <dt>RGB</dt>
                      <dd>{color.rgb}</dd>
                    </div>
                  </dl>
                  <Button
                    variant="outline"
                    size="base"
                    className="media-copy-button"
                    icon={
                      copiedHex === color.hex ? (
                        <CheckIcon size={17} aria-hidden="true" />
                      ) : (
                        <CopyIcon size={17} aria-hidden="true" />
                      )
                    }
                    aria-label={`Sao chép mã HEX ${color.hex}`}
                    onClick={() => void copyHex(color.hex)}
                  >
                    {copiedHex === color.hex ? "Đã sao chép" : "Sao chép HEX"}
                  </Button>
                </div>
              </LayerCard>
            ))}
          </div>
          <div className="media-type-sample">
            <span className="media-color-role">KIỂU CHỮ</span>
            <Text as="h3" variant="heading">
              SVN-Aguda
            </Text>
            <div className="media-type-glyph" aria-hidden="true">
              <span>Aa</span>
              <span>Aa</span>
            </div>
            <dl>
              <div>
                <dt>Black</dt>
                <dd>Tiêu đề & điểm nhấn.</dd>
              </div>
              <div>
                <dt>Regular</dt>
                <dd>Nội dung & thông tin.</dd>
              </div>
            </dl>
            <Text variant="secondary">
              Phân cấp rõ ràng, giữ nội dung dễ đọc và có khoảng thở.
            </Text>
          </div>
        </div>
        <div className="media-palette-note">
          <Text variant="secondary">
            Mã Mint lấy từ mẫu màu vector trong Brand Guidelines.
          </Text>
          <p className="media-copy-status" role="status" aria-live="polite">
            {copyStatus}
          </p>
        </div>
      </section>
      <section className="section media-guidance-section">
        <div className="container media-guidance-grid">
          <Heading
            label="03 / SỬ DỤNG NHẬN DIỆN"
            title="Giữ đúng hình dáng. Đặt đúng ngữ cảnh."
          />
          <div>
            <ol className="media-usage-rules">
              {usageGuidelines.map((guideline, index) => (
                <li key={guideline.title}>
                  <span className="media-rule-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <Text as="h3" variant="heading">
                      {guideline.title}
                    </Text>
                    <Text variant="secondary">{guideline.description}</Text>
                  </div>
                </li>
              ))}
            </ol>
            <div className="media-permission-note">
              <Text variant="secondary">
                Các tệp tải xuống phục vụ việc giới thiệu thương hiệu, không cấp
                quyền sở hữu hoặc giấy phép sử dụng tự do. Tham khảo{" "}
                <Link href="/terms/">điều khoản sử dụng</Link> và liên hệ VEX
                trước khi dùng cho mục đích thương mại hoặc cần xác nhận quyền
                sử dụng.
              </Text>
              <CTA href="/contact/?topic=media">Liên hệ truyền thông</CTA>
            </div>
          </div>
        </div>
      </section>
      <section
        className="container media-project-note"
        aria-labelledby="media-projects-title"
      >
        <ImagesIcon size={28} aria-hidden="true" />
        <div>
          <Text as="h2" variant="heading" id="media-projects-title">
            Cần ảnh hoặc video dự án?
          </Text>
          <Text variant="secondary">
            Thư viện hiện chưa công bố ảnh hoặc video dự án. Liên hệ VEX để trao
            đổi tài nguyên truyền thông và quyền sử dụng phù hợp.
          </Text>
        </div>
        <Link href="/projects/" variant="plain">
          Thông tin dự án
          <ArrowUpRightIcon size={18} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
