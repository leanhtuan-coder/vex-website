import App from "./App";
import ContactPage from "./pages/ContactPage";
// Static builds eagerly resolve the form while the browser retains route splitting.
export default function Prerender({ path }: { path: string }) {
  return <App path={path} contactComponent={ContactPage} />;
}
