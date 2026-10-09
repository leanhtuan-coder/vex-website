import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { Button } from "@cloudflare/kumo/components/button";
import { Input, InputArea } from "@cloudflare/kumo/components/input";
import { Select } from "@cloudflare/kumo/components/select";
import { Checkbox } from "@cloudflare/kumo/components/checkbox";
import { Link } from "@cloudflare/kumo/components/link";
import { Text } from "@cloudflare/kumo/components/text";
import { Banner } from "@cloudflare/kumo/components/banner";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { ArrowUpRightIcon, EnvelopeIcon } from "@phosphor-icons/react";
import { company } from "../content/company";
import { primaryButtonStyle } from "./button-theme";
import { contactTopics, topicFromSearch } from "../content/contact-topics";
import { trackWebsiteEvent } from "../analytics";
import { publicJobs } from "../content/careers";
import { solutionChallenges } from "../content/challenges";
const topics = Object.values(contactTopics);
function subscribeToLocation(listener: () => void) {
  window.addEventListener("popstate", listener);
  return () => window.removeEventListener("popstate", listener);
}
export default function ContactForm() {
  const initialTopic = useSyncExternalStore(
    subscribeToLocation,
    () => topicFromSearch(window.location.search),
    () => contactTopics.solution,
  );
  const position = useSyncExternalStore(
    subscribeToLocation,
    () => new URLSearchParams(window.location.search).get("position") ?? "",
    () => "",
  );
  const selectedJob = publicJobs.find((job) => job.slug === position);
  const need = useSyncExternalStore(
    subscribeToLocation,
    () => new URLSearchParams(window.location.search).get("need") ?? "",
    () => "",
  );
  const selectedChallenge = solutionChallenges.find(
    (challenge) => challenge.id === need,
  );
  const [state, setState] = useState<"idle" | "opening" | "prepared" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [invalidField, setInvalidField] = useState<"name" | "message" | null>(
    null,
  );
  const [consent, setConsent] = useState(false);
  const lastSubmit = useRef(0);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const name = String(data.get("name") ?? "").trim(),
      message = String(data.get("message") ?? "").trim();
    if (!name || !message || !consent) {
      const missing = !name ? "name" : !message ? "message" : null;
      setInvalidField(missing);
      if (missing) (form.elements.namedItem(missing) as HTMLElement)?.focus();
      setError(
        "Vui lòng nhập họ tên, nội dung và xác nhận thông tin quyền riêng tư.",
      );
      setState("error");
      return;
    }
    if (Date.now() - lastSubmit.current < 3000) return;
    const body = `Họ và tên: ${name}\nDoanh nghiệp / tổ chức: ${String(data.get("organization") ?? "").trim()}\nEmail: ${data.get("email")}\nĐiện thoại: ${data.get("phone")}\nChủ đề: ${data.get("topic")}\n${selectedJob ? `Vị trí: ${selectedJob.title}\n` : ""}${selectedChallenge ? `Nhu cầu: ${selectedChallenge.title}\n` : ""}\n${message}`;
    const href = `mailto:${company.email}?subject=${encodeURIComponent("Liên hệ VEX — " + data.get("topic") + (selectedJob ? " — " + selectedJob.title : ""))}&body=${encodeURIComponent(body)}`;
    if (href.length > 7500) {
      setError(
        "Nội dung quá dài để soạn email qua trình duyệt. Hãy rút gọn hoặc gửi trực tiếp đến " +
          company.email,
      );
      setState("error");
      return;
    }
    lastSubmit.current = Date.now();
    setState("opening");
    setInvalidField(null);
    setError("");
    try {
      window.location.href = href;
      trackWebsiteEvent("email_prepared");
      setState("prepared");
    } catch {
      setError(
        "Không thể mở ứng dụng email. Bạn có thể liên hệ trực tiếp qua địa chỉ bên dưới.",
      );
      setState("error");
    }
  }
  return (
    <LayerCard className="form-card">
      <div className="form-title">
        <EnvelopeIcon size={24} />
        <Text as="h2" variant="heading">
          Trao đổi về dự án của bạn
        </Text>
      </div>
      <Text variant="secondary">
        Website hiện chưa có hệ thống nhận form tự động. Các thông tin bên dưới
        chỉ dùng để soạn email; bạn kiểm tra và nhấn gửi trong ứng dụng email.
      </Text>
      <form onSubmit={submit}>
        {selectedChallenge && (
          <Text variant="secondary" DANGEROUS_className="contact-selected-need">
            Nhu cầu đang trao đổi: {selectedChallenge.title}.
          </Text>
        )}
        {selectedJob && (
          <Text variant="secondary" size="sm">
            Vị trí đang trao đổi: {selectedJob.title}. Biểu mẫu chỉ soạn email,
            chưa nhận hồ sơ tự động.
          </Text>
        )}
        <div className="form-grid">
          <Input
            label="Họ và tên *"
            name="name"
            required
            autoComplete="name"
            maxLength={100}
            placeholder="Nguyễn Văn A"
            error={
              invalidField === "name" ? "Vui lòng nhập họ và tên." : undefined
            }
            onChange={() => {
              if (invalidField === "name") setInvalidField(null);
            }}
          />
          <Input
            label="Doanh nghiệp / tổ chức"
            name="organization"
            autoComplete="organization"
            maxLength={160}
            placeholder="Tên doanh nghiệp"
          />
        </div>
        <div className="form-grid">
          <Input
            label="Email liên hệ *"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            placeholder="ban@doanhnghiep.vn"
          />
          <Input
            label="Số điện thoại"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="Không bắt buộc"
          />
        </div>
        <Select
          key={initialTopic}
          label="Chủ đề liên hệ"
          name="topic"
          defaultValue={initialTopic}
          items={topics.map((topic) => ({ value: topic, label: topic }))}
          className="service-select"
        />
        <InputArea
          label="Nội dung trao đổi *"
          name="message"
          required
          maxLength={2000}
          rows={5}
          placeholder="Bài toán, nhu cầu và phạm vi bạn muốn trao đổi…"
          error={
            invalidField === "message"
              ? "Vui lòng nhập nội dung trao đổi."
              : undefined
          }
          onChange={() => {
            if (invalidField === "message") setInvalidField(null);
          }}
        />
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Để trống trường này</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Checkbox
          name="consent"
          checked={consent}
          onCheckedChange={setConsent}
          label="Tôi đồng ý cung cấp thông tin để VEX phản hồi yêu cầu."
        />
        <Text size="sm" variant="secondary">
          Xem <Link href="/privacy-policy/">thông tin quyền riêng tư</Link>{" "}
          trước khi đồng ý.
        </Text>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="submit"
          style={primaryButtonStyle}
          disabled={!consent}
          loading={state === "opening"}
        >
          Soạn email liên hệ
          <ArrowUpRightIcon size={18} />
        </Button>
        <Text variant="secondary" size="xs">
          Cần ứng dụng email đã được cấu hình. Không có dữ liệu nào được gửi đến
          VEX trước khi bạn tự nhấn gửi.
        </Text>
        {state === "prepared" && (
          <Banner variant="secondary" size="sm" role="status">
            Đã yêu cầu mở ứng dụng email. Hãy kiểm tra nội dung và nhấn gửi. Nếu
            email chưa mở, liên hệ trực tiếp:{" "}
            <Link href={`mailto:${company.email}`}>{company.email}</Link>.
          </Banner>
        )}
        {state === "error" && (
          <Banner variant="error" size="sm" role="alert">
            {error}
          </Banner>
        )}
      </form>
    </LayerCard>
  );
}
