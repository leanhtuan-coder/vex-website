import { useState } from "react";
import { Button, LinkButton } from "@cloudflare/kumo/components/button";
import { Input, InputArea } from "@cloudflare/kumo/components/input";

import { Badge } from "@cloudflare/kumo/components/badge";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Select } from "@cloudflare/kumo/components/select";
import { Link } from "@cloudflare/kumo/components/link";
import { Banner } from "@cloudflare/kumo/components/banner";
import { Text } from "@cloudflare/kumo/components/text";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  CodeIcon,
  CpuIcon,
  StackIcon,
  CheckIcon,
  ListIcon,
  XIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TreeStructureIcon,
  ChartLineUpIcon,
  GlobeIcon,
} from "@phosphor-icons/react";

const links = [
  ["about", "Về VEX"],
  ["solutions", "Giải pháp"],
  ["process", "Quy trình"],
  ["contact", "Liên hệ"],
];
const services = [
  {
    icon: StackIcon,
    title: "Phần mềm & chuyển đổi số",
    text: "Kết nối dữ liệu, chuẩn hóa vận hành và xây dựng nền tảng tăng trưởng cho doanh nghiệp.",
    tags: ["SaaS / ERP", "POS", "Web & Mobile"],
    items: [
      "Hệ thống quản trị doanh nghiệp tập trung",
      "Phần mềm bán hàng & quản lý đa chi nhánh",
      "Ứng dụng được phát triển theo yêu cầu",
    ],
  },
  {
    icon: CpuIcon,
    title: "Phần cứng & IoT",
    text: "Từ ý tưởng đến thiết bị: kết hợp kỹ thuật phần cứng, phần mềm nhúng và kết nối thông minh.",
    tags: ["PCB Design", "Embedded", "IoT"],
    items: [
      "Nghiên cứu & thiết kế mạch điện tử",
      "Lập trình firmware và hệ thống nhúng",
      "Tích hợp thiết bị, cảm biến & nền tảng cloud",
    ],
  },
];
function CTA({ children, href = "#contact", secondary = false }) {
  return (
    <LinkButton
      href={href}
      variant={secondary ? "secondary" : "primary"}
      size="lg"
    >
      {children}
      <ArrowUpRightIcon size={18} />
    </LinkButton>
  );
}
function Logo() {
  return (
    <Link
      variant="plain"
      className="logo"
      href="#"
      aria-label="VEX — Trang chủ"
    >
      <img src="assets/logo-color-tight.png" alt="VEX" />
    </Link>
  );
}
function Heading({ number, label, title, children }) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span>{number}</span>
        {label}
      </div>
      <Text as="h2" variant="heading">
        {title}
      </Text>
      {children && (
        <Text as="p" variant="secondary">
          {children}
        </Text>
      )}
    </div>
  );
}
function ContactForm() {
  const [notice, setNotice] = useState(false);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Họ và tên: ${data.get("name")}\nĐiện thoại: ${data.get("phone")}\nEmail: ${data.get("email")}\nDịch vụ: ${data.get("service")}\n\n${data.get("message")}`;
    window.location.href = `mailto:contact@vex.biz.vn?subject=${encodeURIComponent("Yêu cầu tư vấn — " + data.get("name"))}&body=${encodeURIComponent(body)}`;
    setNotice(true);
  }
  return (
    <LayerCard className="form-card">
      <div className="form-title">
        <EnvelopeIcon size={24} />
        <Text as="h3" variant="heading">
          Trao đổi về dự án của bạn
        </Text>
      </div>
      <Text as="p" variant="secondary">
        Chia sẻ nhu cầu để VEX tư vấn giải pháp phù hợp.
      </Text>
      <form onSubmit={submit}>
        <div className="form-grid">
          <Input
            label="Họ và tên *"
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Nguyễn Văn A"
          />
          <Input
            label="Số điện thoại *"
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="0877 759 036"
          />
        </div>
        <Input
          label="Email liên hệ *"
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="ban@doanhnghiep.vn"
        />
        <Select
          label="Giải pháp quan tâm"
          name="service"
          defaultValue="Phần mềm quản trị SaaS / ERP / POS"
          className="service-select"
          items={[
            {
              value: "Phần mềm quản trị SaaS / ERP / POS",
              label: "Phần mềm quản trị SaaS / ERP / POS",
            },
            { value: "Phần cứng & IoT", label: "Phần cứng & IoT" },
            {
              value: "Phát triển phần mềm theo yêu cầu",
              label: "Phát triển phần mềm theo yêu cầu",
            },
            { value: "Tư vấn chuyển đổi số", label: "Tư vấn chuyển đổi số" },
          ]}
        />
        <InputArea
          label="Nội dung trao đổi"
          id="message"
          name="message"
          rows={4}
          placeholder="Bạn đang muốn giải quyết bài toán gì?"
        />
        <Button type="submit" variant="primary" size="lg" className="submit">
          Soạn email tư vấn
          <ArrowUpRightIcon size={18} />
        </Button>
        <Text as="p" variant="secondary" className="form-note">
          Thông tin được chuyển vào ứng dụng email để bạn kiểm tra và gửi.
        </Text>
        {notice && (
          <Banner variant="secondary" size="sm" role="status">
            Đã yêu cầu mở ứng dụng email. Hãy nhấn gửi trong ứng dụng đó. Nếu
            email chưa mở, bạn có thể gửi trực tiếp đến contact@vex.biz.vn.
          </Banner>
        )}
      </form>
    </LayerCard>
  );
}
export default function App() {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <Link variant="plain" href="#main" className="skip-link">
        Chuyển đến nội dung
      </Link>
      <header>
        <div className="container header-inner">
          <Logo />
          <nav aria-label="Điều hướng chính">
            {links.map(([id, label]) => (
              <Link variant="plain" key={id} href={`#${id}`}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <CTA>Đặt lịch tư vấn</CTA>
            <Button
              className="menu-toggle"
              shape="square"
              variant="secondary"
              aria-label={menu ? "Đóng menu" : "Mở menu"}
              aria-expanded={menu}
              aria-controls="mobile-nav"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <XIcon size={22} /> : <ListIcon size={22} />}
            </Button>
          </div>
        </div>
        {menu && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Điều hướng di động"
            onKeyDown={(e) => {
              if (e.key === "Escape") setMenu(false);
            }}
          >
            {links.map(([id, label]) => (
              <Link
                variant="plain"
                key={id}
                href={`#${id}`}
                onClick={() => setMenu(false)}
              >
                {label}
                <ArrowUpRightIcon />
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <Badge variant="outline">
                <span className="status-dot" />
                CÔNG NGHỆ CHO DOANH NGHIỆP VIỆT
              </Badge>
              <Text as="h1" variant="heading">
                Từ bài toán thực tế.
                <br />
                Đến giải pháp <span>khác biệt.</span>
              </Text>
              <Text as="p" variant="secondary">
                VEX kết nối phần mềm, phần cứng và tư duy công nghệ để giúp
                doanh nghiệp vận hành hiệu quả, phát triển bền vững.
              </Text>
              <div className="hero-actions">
                <CTA>Bắt đầu cùng VEX</CTA>
                <CTA secondary href="#solutions">
                  Khám phá giải pháp
                </CTA>
              </div>
              <div className="hero-foot">
                <ShieldCheckIcon size={20} />
                <span>Thiết kế theo nhu cầu. Đồng hành từ đầu đến cuối.</span>
              </div>
            </div>
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
                  <img src="assets/logo-white-tight.png" alt="VEX" />
                  <small>TECHNOLOGY CORE</small>
                </div>
                <LayerCard className="node node-right">
                  <GlobeIcon size={23} />
                  <span>Kết nối</span>
                  <small>IoT · Cloud</small>
                </LayerCard>
                <LayerCard className="node node-bottom">
                  <ChartLineUpIcon size={23} />
                  <span>Dữ liệu</span>
                  <small>Insights · Automation</small>
                </LayerCard>
              </div>
              <div className="visual-bottom">
                <span>Một hệ sinh thái. Nhiều khả năng.</span>
                <ArrowUpRightIcon size={20} />
              </div>
            </LayerCard>
          </div>
        </section>
        <div className="capability-strip">
          <div className="container">
            <span>NĂNG LỰC CỐT LÕI</span>
            {[
              [CodeIcon, "Software Engineering"],
              [CpuIcon, "Hardware R&D"],
              [GlobeIcon, "IoT Solutions"],
              [TreeStructureIcon, "Digital Transformation"],
            ].map(([Icon, text]) => (
              <div key={text}>
                <Icon size={22} />
                {text}
              </div>
            ))}
          </div>
        </div>
        <section id="about" className="section container">
          <div className="about-layout">
            <Heading
              number="01"
              label="VỀ VEX"
              title={
                <>
                  Công nghệ vững chắc.
                  <br />
                  Giá trị dài lâu.
                </>
              }
            >
              Chúng tôi xây dựng giải pháp từ sự thấu hiểu hoạt động của doanh
              nghiệp, với kỹ thuật làm nền tảng và hiệu quả thực tế làm mục
              tiêu.
            </Heading>
            <div className="about-values">
              {[
                [
                  CodeIcon,
                  "Kỹ nghệ phần mềm",
                  "Kiến trúc linh hoạt, dễ mở rộng. Trải nghiệm rõ ràng, phù hợp với người sử dụng.",
                ],
                [
                  CpuIcon,
                  "Nghiên cứu & thiết kế",
                  "Kết hợp phần cứng và phần mềm để giải quyết bài toán từ thiết bị đến hệ thống.",
                ],
                [
                  ChartLineUpIcon,
                  "Tối ưu vận hành",
                  "Số hóa quy trình, kết nối dữ liệu và giảm những thao tác thủ công lặp lại.",
                ],
              ].map(([Icon, title, text]) => (
                <div className="value" key={title}>
                  <div className="icon-box">
                    <Icon size={24} />
                  </div>
                  <div>
                    <Text as="h3" variant="heading">
                      {title}
                    </Text>
                    <Text as="p" variant="secondary">
                      {text}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="solutions" className="section solution-section">
          <div className="container">
            <div className="heading-row">
              <Heading
                number="02"
                label="GIẢI PHÁP"
                title="Đúng công nghệ. Đúng nhu cầu."
              >
                Một đối tác cho hành trình từ ý tưởng đến triển khai.
              </Heading>
              <Link variant="plain" className="text-link" href="#contact">
                Tìm giải pháp cho bạn
                <ArrowUpRightIcon size={18} />
              </Link>
            </div>
            <div className="solution-grid">
              {services.map(({ icon: Icon, title, text, tags, items }, i) => (
                <LayerCard key={title} className="solution-card">
                  <div className="card-top">
                    <div className="icon-box">
                      <Icon size={28} />
                    </div>
                    <span>0{i + 1} / SOLUTION</span>
                  </div>
                  <Text as="h3" variant="heading">
                    {title}
                  </Text>
                  <Text as="p" variant="secondary">
                    {text}
                  </Text>
                  <div className="tags">
                    {tags.map((tag) => (
                      <Badge variant="outline" key={tag}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>
                        <CheckIcon size={17} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link variant="plain" className="card-link" href="#contact">
                    Trao đổi nhu cầu
                    <ArrowUpRightIcon size={20} />
                  </Link>
                </LayerCard>
              ))}
            </div>
            <LayerCard id="services" className="consulting">
              <div className="icon-box">
                <TreeStructureIcon size={26} />
              </div>
              <div>
                <Text as="h3" variant="heading">
                  Bạn cần một lộ trình công nghệ rõ ràng?
                </Text>
                <Text as="p" variant="secondary">
                  VEX tư vấn kiến trúc hệ thống, tích hợp API và chiến lược
                  chuyển đổi số.
                </Text>
              </div>
              <CTA secondary>Trao đổi với kỹ sư</CTA>
            </LayerCard>
          </div>
        </section>
        <section id="process" className="section container">
          <Heading
            number="03"
            label="CÁCH CHÚNG TÔI LÀM VIỆC"
            title="Rõ ràng ở từng bước."
          >
            Cùng bạn biến yêu cầu thành một hệ thống có thể vận hành.
          </Heading>
          <div className="process-grid">
            {[
              [
                "Khám phá",
                "Lắng nghe nhu cầu, khảo sát hiện trạng và xác định mục tiêu.",
              ],
              [
                "Thiết kế",
                "Đề xuất kiến trúc, giải pháp và lộ trình triển khai phù hợp.",
              ],
              [
                "Phát triển",
                "Xây dựng, kiểm thử và hoàn thiện theo phản hồi thực tế.",
              ],
              [
                "Đồng hành",
                "Bàn giao, hướng dẫn sử dụng và hỗ trợ trong quá trình vận hành.",
              ],
            ].map(([title, text], i) => (
              <div className="step" key={title}>
                <div className="step-number">
                  0{i + 1}
                  {i < 3 && <ArrowRightIcon size={18} />}
                </div>
                <Text as="h3" variant="heading">
                  {title}
                </Text>
                <Text as="p" variant="secondary">
                  {text}
                </Text>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <Heading
                number="04"
                label="KẾT NỐI VỚI VEX"
                title={
                  <>
                    Ý tưởng của bạn.
                    <br />
                    Bước tiếp theo cùng VEX.
                  </>
                }
              >
                Một cuộc trao đổi là khởi đầu cho giải pháp phù hợp. Hãy kể cho
                chúng tôi về dự án của bạn.
              </Heading>
              <div className="contact-list">
                <Link variant="plain" href="tel:+84877759036">
                  <PhoneIcon size={23} />
                  <div>
                    <small>Gọi cho chúng tôi</small>
                    <strong>0877 759 036</strong>
                  </div>
                  <ArrowUpRightIcon size={20} />
                </Link>
                <Link variant="plain" href="mailto:contact@vex.biz.vn">
                  <EnvelopeIcon size={23} />
                  <div>
                    <small>Email doanh nghiệp</small>
                    <strong>contact@vex.biz.vn</strong>
                  </div>
                  <ArrowUpRightIcon size={20} />
                </Link>
                <div>
                  <MapPinIcon size={23} />
                  <div>
                    <small>Trụ sở</small>
                    <strong>
                      Thôn Ninh Thành, Xã Thọ Xuân,
                      <br />
                      Tỉnh Thanh Hóa, Việt Nam
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-top">
            <div>
              <Logo />
              <Text as="p" variant="secondary">
                Kiến tạo giải pháp.
                <br />
                Kết nối tương lai.
              </Text>
            </div>
            <div>
              <Text as="h3" variant="heading">
                Khám phá
              </Text>
              {links.map(([id, label]) => (
                <Link variant="plain" key={id} href={`#${id}`}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="legal">
              <Text as="h3" variant="heading">
                Thông tin doanh nghiệp
              </Text>
              <strong>CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ VEX</strong>
              <Text as="p" variant="secondary">
                VEX TECHNOLOGY SOLUTIONS JOINT STOCK COMPANY
                <br />
                Tên viết tắt: VEX TECHNOLOGY SOLUTIONS JSC
              </Text>
              <Text as="p" variant="secondary">
                Mã số doanh nghiệp: <b>2803218550</b>
                <br />
                Đăng ký lần đầu: 10/03/2026 · Phòng ĐKKD - Tỉnh Thanh Hóa
                <br />
                Người đại diện: LÊ ANH TUẤN (Giám đốc)
              </Text>
              <Text as="p" variant="secondary">
                Thôn Ninh Thành, Xã Thọ Xuân, Tỉnh Thanh Hóa, Việt Nam
              </Text>
              <Link variant="plain" href="mailto:contact.vextech@gmail.com">
                Email dự phòng: contact.vextech@gmail.com
              </Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} VEX Technology Solutions JSC.
            </span>
            <div>
              <Link
                variant="plain"
                href="https://drive.google.com/file/d/1RMjZEK4cwVi90TTMNQQGJUE6dv_k3EtB/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Brand Guidelines
                <ArrowUpRightIcon size={14} />
              </Link>
              <Link variant="plain" href="sitemap.xml">
                Sitemap
              </Link>
              <Link variant="plain" href="https://vex.biz.vn/">
                vex.biz.vn
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
