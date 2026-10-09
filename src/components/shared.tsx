import type { ReactNode } from "react";
import {
  LinkButton,
  type LinkButtonProps,
} from "@cloudflare/kumo/components/button";
import { Link } from "@cloudflare/kumo/components/link";
import { Text } from "@cloudflare/kumo/components/text";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Empty } from "@cloudflare/kumo/components/empty";
import {
  ArrowUpRightIcon,
  CodeIcon,
  CpuIcon,
  BrainIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react";
import { primaryButtonStyle } from "./button-theme";
import BrandGeometry from "./BrandGeometry";
export function CTA({
  children,
  href = "/contact/",
  secondary = false,
  onDark = false,
  size = "base",
}: {
  children: ReactNode;
  href?: string;
  secondary?: boolean;
  onDark?: boolean;
  size?: LinkButtonProps["size"];
}) {
  return (
    <LinkButton
      href={href}
      variant={secondary || onDark ? "secondary" : "primary"}
      size={size}
      className={`cta${onDark ? " cta-on-dark" : ""}`}
      data-vex-event="cta_click"
      style={secondary || onDark ? undefined : primaryButtonStyle}
    >
      {children}
      <ArrowUpRightIcon size={size === "lg" ? 18 : 16} />
    </LinkButton>
  );
}
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      variant="plain"
      className="logo"
      href="/"
      aria-label="VEX — Trang chủ"
    >
      <img
        src={inverted ? "/assets/vex-logo-white.svg" : "/assets/vex-logo.svg"}
        width={112}
        height={34}
        alt="VEX"
      />
    </Link>
  );
}
export function Heading({
  number,
  label,
  title,
  children,
}: {
  number?: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        {number && <span>{number}</span>}
        {label}
      </div>
      <Text as="h2" variant="heading">
        {title}
      </Text>
      {children && <Text variant="secondary">{children}</Text>}
    </div>
  );
}
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Đường dẫn trang">
          <Link href="/">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{label}</span>
        </nav>
        <div className="page-intro-layout">
          <div className="page-intro-copy">
            <div className="eyebrow">VEX TECHNOLOGY SOLUTIONS</div>
            <Text as="h1" variant="heading">
              {title}
            </Text>
            <Text variant="secondary">{children}</Text>
          </div>
          <BrandGeometry />
        </div>
      </div>
    </section>
  );
}
export function CTASection() {
  return (
    <section className="closing-cta">
      <div className="container">
        <div>
          <div className="eyebrow">KẾT NỐI CÙNG VEX</div>
          <Text as="h2" variant="heading">
            Cùng bắt đầu từ bài toán của bạn.
          </Text>
          <Text variant="secondary">
            Chia sẻ nhu cầu để tìm hướng giải quyết phù hợp.
          </Text>
        </div>
        <CTA onDark>Liên hệ hợp tác</CTA>
      </div>
    </section>
  );
}
export const technologyIcons = {
  software: CodeIcon,
  ai: BrainIcon,
  hardware: CpuIcon,
  automation: TreeStructureIcon,
};
export function ContentCard({
  title,
  description,
  href,
  icon,
  headingLevel = "h3",
  linkLabel = "Tìm hiểu giải pháp",
}: {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  headingLevel?: "h2" | "h3";
  linkLabel?: string;
}) {
  return (
    <LayerCard className="content-card">
      {icon && <div className="icon-box">{icon}</div>}
      <Text as={headingLevel} variant="heading">
        {title}
      </Text>
      <Text variant="secondary">{description}</Text>
      <Link href={href} variant="plain">
        {linkLabel}
        <ArrowUpRightIcon size={18} />
      </Link>
    </LayerCard>
  );
}
export function ProjectEmpty() {
  return (
    <Empty
      className="project-empty"
      title="Chưa có dự án được công bố"
      description="Thông tin dự án và sản phẩm sẽ được giới thiệu khi có dữ liệu và quyền công bố phù hợp. Bạn có thể liên hệ để trao đổi nhu cầu phát triển hoặc hợp tác."
      contents={<CTA>Trao đổi với VEX</CTA>}
    />
  );
}
