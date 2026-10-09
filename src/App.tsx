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
export default function App({
  path = "/",
  contactComponent,
}: {
  path?: string;
  contactComponent?: ComponentType;
}) {
  const Contact = contactComponent ?? ContactPage;
  const route = normalizePath(path);
  const meta = getPage(route);
  const view =
    route === "/" ? (
      <Home />
    ) : route === "/about/" ? (
      <About />
    ) : route === "/solutions/" ? (
      <Solutions />
    ) : route.startsWith("/solutions/") ? (
      <ServiceDetail slug={route.split("/")[2]} />
    ) : route === "/projects/" ? (
      <Projects />
    ) : route.startsWith("/projects/") ? (
      <ProjectDetail slug={route.split("/")[2]} />
    ) : route === "/contact/" ? (
      <Suspense
        fallback={
          <div className="container section" role="status">
            Đang tải nội dung…
          </div>
        }
      >
        <Contact />
      </Suspense>
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
      <main id="main">{view}</main>
      <Footer />
    </>
  );
}
