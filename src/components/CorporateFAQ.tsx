import { Accordion } from "@cloudflare/kumo/primitives/accordion";
import { Link } from "@cloudflare/kumo/components/link";
import { Text } from "@cloudflare/kumo/components/text";
import { ArrowUpRightIcon, MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { corporateFAQ, type CorporateFAQItem } from "../content/faq";
import { Heading } from "./shared";
import "../styles-faq.css";

export default function CorporateFAQ({
  items = corporateFAQ,
  id = "cau-hoi-thuong-gap",
}: {
  items?: CorporateFAQItem[];
  id?: string;
}) {
  return (
    <section
      className="section corporate-faq-section"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="container corporate-faq-layout">
        <div className="corporate-faq-intro" id={`${id}-title`}>
          <Heading
            label="FAQ / GIẢI ĐÁP"
            title="Bắt đầu từ những điều cần làm rõ."
          >
            Thông tin về hướng giải pháp, cách trao đổi nhu cầu và phạm vi hợp
            tác với VEX.
          </Heading>
          <Link href="/contact/" variant="plain" className="text-link">
            Trao đổi với VEX <ArrowUpRightIcon size={18} aria-hidden="true" />
          </Link>
        </div>
        <Accordion.Root
          className="corporate-faq-list"
          multiple
          defaultValue={items.map((item) => item.id)}
        >
          {items.map((item, index) => (
            <Accordion.Item
              className="corporate-faq-item"
              value={item.id}
              key={item.id}
            >
              <Accordion.Header className="corporate-faq-heading">
                <Accordion.Trigger className="corporate-faq-trigger">
                  <span className="corporate-faq-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.question}</span>
                  <span className="corporate-faq-toggle" aria-hidden="true">
                    <MinusIcon className="corporate-faq-icon-open" size={20} />
                    <PlusIcon className="corporate-faq-icon-closed" size={20} />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="corporate-faq-panel">
                <Text variant="secondary">{item.answer}</Text>
                <div className="corporate-faq-links">
                  {item.links.map((link) => (
                    <Link
                      href={link.href}
                      key={link.href}
                      variant="plain"
                      className="text-link"
                    >
                      {link.label}{" "}
                      <ArrowUpRightIcon size={17} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
