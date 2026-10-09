import App from "./App";
import ContactPage from "./pages/ContactPage";
import { Research, Academy } from "./pages/ResearchAcademy";
import {
  Insights,
  ArticleDetail,
  Careers,
  CareerDetail,
} from "./pages/ContentGrowth";
import Media from "./pages/MediaPage";
const extendedComponents = {
  Research,
  Academy,
  Insights,
  ArticleDetail,
  Careers,
  CareerDetail,
  Media,
};
// Static builds eagerly resolve the form while the browser retains route splitting.
export default function Prerender({ path }: { path: string }) {
  return (
    <App
      path={path}
      contactComponent={ContactPage}
      extendedComponents={extendedComponents}
    />
  );
}
