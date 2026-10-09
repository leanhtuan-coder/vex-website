import { useState } from "react";
import { Button } from "@cloudflare/kumo/components/button";
import { Dialog } from "@cloudflare/kumo/components/dialog";
import { Link } from "@cloudflare/kumo/components/link";
import { Text } from "@cloudflare/kumo/components/text";
import { ListIcon, XIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { company, navigation } from "../content/company";
import { CTA, Logo } from "./shared";
function active(href: string, path: string) {
  return href === "/" ? path === "/" : path.startsWith(href);
}
export function SiteHeader({ path }: { path: string }) {
  const [menu, setMenu] = useState(false);
  return (
    <header>
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-navigation" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <Link
              variant="plain"
              key={item.href}
              href={item.href}
              aria-current={active(item.href, path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <CTA>Liên hệ hợp tác</CTA>
          <Dialog.Root open={menu} onOpenChange={setMenu}>
            <Dialog.Trigger
              render={(props) => (
                <Button
                  {...props}
                  className="menu-toggle"
                  variant="secondary"
                  shape="square"
                  aria-label="Mở menu"
                >
                  <ListIcon size={22} />
                </Button>
              )}
            />
            <Dialog size="lg" className="mobile-menu-dialog">
              <div className="mobile-menu-top">
                <Dialog.Title>Điều hướng VEX</Dialog.Title>
                <Dialog.Close
                  render={(props) => (
                    <Button {...props} shape="square" aria-label="Đóng menu">
                      <XIcon size={22} />
                    </Button>
                  )}
                />
              </div>
              <Dialog.Description>
                Khám phá công ty, giải pháp và kết nối với VEX.
              </Dialog.Description>
              <nav
                className="mobile-navigation"
                aria-label="Điều hướng di động"
              >
                {navigation.map((item) => (
                  <Link
                    variant="plain"
                    key={item.href}
                    href={item.href}
                    aria-current={active(item.href, path) ? "page" : undefined}
                    onClick={() => setMenu(false)}
                  >
                    {item.label}
                    <ArrowUpRightIcon size={18} />
                  </Link>
                ))}
              </nav>
            </Dialog>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <Text variant="secondary">
              Kết nối phần mềm, AI và hệ thống vật lý từ những bài toán thực
              tiễn.
            </Text>
          </div>
          <div>
            <Text as="h2" variant="heading">
              Khám phá
            </Text>
            {navigation.slice(1).map((item) => (
              <Link variant="plain" key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="legal">
            <Text as="h2" variant="heading">
              Thông tin doanh nghiệp
            </Text>
            <strong>{company.legalName}</strong>
            <Text variant="secondary">
              {company.internationalName}
              <br />
              Tên viết tắt: {company.shortName}
            </Text>
            <Text variant="secondary">
              Mã số doanh nghiệp: <b>{company.taxId}</b>
              <br />
              Đăng ký lần đầu: 10/03/2026
              <br />
              Người đại diện theo pháp luật: {company.representative} (Giám đốc)
            </Text>
            <Text variant="secondary">{company.address}</Text>
            <Link variant="plain" href={company.phoneHref}>
              {company.phone}
            </Link>
            <Link variant="plain" href={`mailto:${company.email}`}>
              {company.email}
            </Link>
            <Link variant="plain" href={`mailto:${company.registrationEmail}`}>
              {company.registrationEmail}
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} VEX Technology Solutions JSC.
          </span>
          <div>
            <Link href="/privacy-policy/" variant="plain">
              Quyền riêng tư
            </Link>
            <Link href="/terms/" variant="plain">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
