import { lazy, Suspense, type ComponentType } from "react";
import { Link } from "@cloudflare/kumo/components/link";
import { getPage, normalizePath } from "./content/pages";
import { SiteHeader, Footer } from "./components/SiteLayout";
import Home from "./pages/Home";
import {
  About,
  Solutions,
  ServiceDetail,
  Projects,
  ProjectDetail,
  Privacy,
  Terms,
  NotFound,
} from "./pages/CorporatePages";
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ResearchPage = lazy(() =>
  import("./pages/ResearchAcademy").then((module) => ({
    default: module.Research,
  })),
);
const AcademyPage = lazy(() =>
  import("./pages/ResearchAcademy").then((module) => ({
    default: module.Academy,
  })),
);
const InsightsPage = lazy(() =>
  import("./pages/ContentGrowth").then((module) => ({
    default: module.Insights,
  })),
);
const ArticlePage = lazy(() =>
  import("./pages/ContentGrowth").then((module) => ({
    default: module.ArticleDetail,
  })),
);
const CareersPage = lazy(() =>
  import("./pages/ContentGrowth").then((module) => ({
    default: module.Careers,
  })),
);
const JobPage = lazy(() =>
  import("./pages/ContentGrowth").then((module) => ({
    default: module.CareerDetail,
  })),
);
const MediaPage = lazy(() => import("./pages/MediaPage"));
const LeadershipPage = lazy(() => import("./pages/LeadershipPage"));
export interface ExtendedPageComponents {
  Research: ComponentType;
  Academy: ComponentType;
  Insights: ComponentType;
  ArticleDetail: ComponentType<{ slug: string }>;
  Careers: ComponentType;
  CareerDetail: ComponentType<{ slug: string }>;
  Media: ComponentType;
  Leadership: ComponentType;
}
export default function App({
  path = "/",
  contactComponent,
  extendedComponents,
}: {
  path?: string;
  contactComponent?: ComponentType;
  extendedComponents?: ExtendedPageComponents;
}) {
  const Contact = contactComponent ?? ContactPage;
  const Research = extendedComponents?.Research ?? ResearchPage;
  const Academy = extendedComponents?.Academy ?? AcademyPage;
  const Insights = extendedComponents?.Insights ?? InsightsPage;
  const ArticleDetail = extendedComponents?.ArticleDetail ?? ArticlePage;
  const Careers = extendedComponents?.Careers ?? CareersPage;
  const CareerDetail = extendedComponents?.CareerDetail ?? JobPage;
  const Media = extendedComponents?.Media ?? MediaPage;
  const Leadership = extendedComponents?.Leadership ?? LeadershipPage;
  const route = normalizePath(path);
  const meta = getPage(route);
  const view = meta.noindex ? (
    <NotFound />
  ) : route === "/" ? (
    <Home />
  ) : route === "/about/" ? (
    <About />
  ) : route === "/leadership/" ? (
    <Leadership />
  ) : route === "/solutions/" ? (
    <Solutions />
  ) : route.startsWith("/solutions/") ? (
    <ServiceDetail slug={route.split("/")[2]} />
  ) : route === "/projects/" ? (
    <Projects />
  ) : route.startsWith("/projects/") ? (
    <ProjectDetail slug={route.split("/")[2]} />
  ) : route === "/contact/" ? (
    <Contact />
  ) : route === "/research/" ? (
    <Research />
  ) : route === "/academy/" ? (
    <Academy />
  ) : route === "/insights/" ? (
    <Insights />
  ) : route.startsWith("/insights/") ? (
    <ArticleDetail slug={route.split("/")[2]} />
  ) : route === "/careers/" ? (
    <Careers />
  ) : route.startsWith("/careers/") ? (
    <CareerDetail slug={route.split("/")[2]} />
  ) : route === "/media/" ? (
    <Media />
  ) : route === "/privacy-policy/" ? (
    <Privacy />
  ) : route === "/terms/" ? (
    <Terms />
  ) : (
    <NotFound />
  );
  return (
    <>
      <Link variant="plain" href="#main" className="skip-link">
        Chuyển đến nội dung
      </Link>
      <SiteHeader path={meta.path} />
      <main
        id="main"
        data-page={meta.path.split("/").filter(Boolean)[0] ?? "home"}
      >
        <Suspense
          fallback={
            <div className="container section" role="status">
              Đang tải nội dung…
            </div>
          }
        >
          {view}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
