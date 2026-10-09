import { company } from "./content/company";
import { getPage } from "./content/pages";
import { publicMedia } from "./content/media";

export type WebsiteEvent =
  | "cta_click"
  | "email_click"
  | "phone_click"
  | "email_prepared"
  | "media_download"
  | "article_open"
  | "job_open"
  | "project_open";

export const analyticsEnabled =
  import.meta.env.VITE_ANALYTICS_ENABLED === "true";
const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL ?? "";
const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID ?? "";

export function analyticsOrigin() {
  if (!analyticsEnabled) return "";
  const url = new URL(scriptUrl);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(websiteId)
  )
    throw new Error(
      "Analytics requires a valid HTTPS script URL and website ID",
    );
  return url.origin;
}

// Only public metadata enters a payload. Query strings, form values, referrers
// and visitor identifiers are never read or passed to the provider.
export function analyticsPayload(
  path: string,
  event?: WebsiteEvent,
  destination?: string,
) {
  const page = getPage(path);
  return {
    website: websiteId,
    hostname: new URL(company.url).hostname,
    url: page.path,
    title: page.title,
    ...(event
      ? {
          name: event,
          data: {
            ...(destination ? { destination: getPage(destination).path } : {}),
          },
        }
      : {}),
  };
}

type AnalyticsWindow = Window & {
  umami?: { track: (payload: object) => Promise<unknown> | void };
};

function optedOut() {
  return (
    navigator.doNotTrack === "1" ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

function send(payload: object) {
  if (!analyticsEnabled || optedOut()) return;
  try {
    const result = (window as AnalyticsWindow).umami?.track(payload);
    if (result) void result.catch(() => {});
  } catch {
    // An analytics failure must not prevent navigation or email preparation.
  }
}

export function trackWebsiteEvent(event: WebsiteEvent, destination?: string) {
  if (!analyticsEnabled) return;
  send(analyticsPayload(window.location.pathname, event, destination));
}

export function initializeAnalytics() {
  if (!analyticsEnabled || optedOut()) return;
  analyticsOrigin();
  if (window.location.hostname !== new URL(company.url).hostname) return;
  const script = document.createElement("script");
  script.src = scriptUrl;
  script.async = true;
  script.dataset.websiteId = websiteId;
  script.dataset.autoTrack = "false";
  script.dataset.excludeSearch = "true";
  script.dataset.excludeHash = "true";
  script.dataset.doNotTrack = "true";
  script.onload = () => send(analyticsPayload(window.location.pathname));
  document.head.append(script);
  document.addEventListener("click", (event) => {
    const anchor =
      event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!(anchor instanceof HTMLAnchorElement)) return;
    const href = anchor.getAttribute("href") ?? "";
    if (href.startsWith("mailto:")) return trackWebsiteEvent("email_click");
    if (href.startsWith("tel:")) return trackWebsiteEvent("phone_click");
    const url = new URL(anchor.href);
    if (url.origin !== window.location.origin) return;
    if (publicMedia.some((asset) => asset.href === url.pathname))
      return trackWebsiteEvent("media_download");
    if (anchor.dataset.vexEvent === "cta_click")
      return trackWebsiteEvent("cta_click", url.pathname);
    const page = getPage(url.pathname);
    if (page.noindex) return;
    for (const [prefix, name] of [
      ["/insights/", "article_open"],
      ["/careers/", "job_open"],
      ["/projects/", "project_open"],
    ] as const)
      if (page.path.startsWith(prefix) && page.path !== prefix)
        return trackWebsiteEvent(name, page.path);
  });
}
