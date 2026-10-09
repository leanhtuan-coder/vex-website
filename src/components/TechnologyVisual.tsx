import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import {
  CodeIcon,
  CpuIcon,
  GlobeIcon,
  BrainIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
export default function TechnologyVisual() {
  return (
    <LayerCard
      className="system-visual"
      aria-label="Các năng lực VEX: phần mềm, phần cứng, dữ liệu và kết nối"
    >
      <div className="visual-top">
        <span>VEX / CONNECTED SOLUTIONS</span>
        <span className="visual-status">
          <span className="status-dot" />
          Kết nối toàn diện
        </span>
      </div>
      <div className="system-map">
        <div className="map-lines" />
        <LayerCard className="node node-top">
          <CodeIcon size={23} />
          <span>Phần mềm</span>
          <small>SaaS · ERP · POS</small>
        </LayerCard>
        <LayerCard className="node node-left">
          <CpuIcon size={23} />
          <span>Phần cứng</span>
          <small>Embedded · PCB</small>
        </LayerCard>
        <div className="core">
          <img
            src="/assets/logo-white-tight.png"
            width={68}
            height={21}
            alt="VEX"
          />
          <small>TECHNOLOGY CORE</small>
        </div>
        <LayerCard className="node node-right">
          <GlobeIcon size={23} />
          <span>Kết nối</span>
          <small>IoT · Cloud</small>
        </LayerCard>
        <LayerCard className="node node-bottom">
          <BrainIcon size={23} />
          <span>Trí tuệ nhân tạo</span>
          <small>Vision · Automation</small>
        </LayerCard>
      </div>
      <div className="visual-bottom">
        <span>Một hệ sinh thái. Nhiều khả năng.</span>
        <ArrowUpRightIcon size={20} />
      </div>
    </LayerCard>
  );
}
