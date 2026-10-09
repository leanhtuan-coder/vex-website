import { Text } from "@cloudflare/kumo/components/text";
import { Link } from "@cloudflare/kumo/components/link";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import { PageIntro } from "../components/shared";
import { company } from "../content/company";
import ContactForm from "../components/ContactForm";
export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="Liên hệ"
        title="Chia sẻ bài toán. Bắt đầu cuộc trao đổi."
      >
        Kết nối với VEX để trao đổi nhu cầu giải pháp, hợp tác kinh doanh hoặc
        hợp tác công nghệ.
      </PageIntro>
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-channels">
            <div className="eyebrow">KẾT NỐI TRỰC TIẾP</div>
            <Text as="h2" variant="heading">
              Kênh liên hệ VEX
            </Text>
            <Text variant="secondary">
              Bạn có thể gọi trực tiếp hoặc gửi email. Không cần điền biểu mẫu
              để sử dụng các kênh này.
            </Text>
            <div className="contact-list">
              <Link variant="plain" href={company.phoneHref}>
                <PhoneIcon size={23} />
                <div>
                  <small>Điện thoại</small>
                  <strong>{company.phone}</strong>
                </div>
                <ArrowUpRightIcon size={20} />
              </Link>
              <Link variant="plain" href={`mailto:${company.email}`}>
                <EnvelopeIcon size={23} />
                <div>
                  <small>Email liên hệ</small>
                  <strong>{company.email}</strong>
                </div>
                <ArrowUpRightIcon size={20} />
              </Link>
              <Link
                variant="plain"
                href={`mailto:${company.registrationEmail}`}
              >
                <EnvelopeIcon size={23} />
                <div>
                  <small>Email theo hồ sơ doanh nghiệp</small>
                  <strong>{company.registrationEmail}</strong>
                </div>
                <ArrowUpRightIcon size={20} />
              </Link>
              <div>
                <MapPinIcon size={23} />
                <div>
                  <small>Trụ sở đăng ký</small>
                  <strong>{company.address}</strong>
                </div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
