import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AnalyticsProvider, CookieConsent } from "./components/AnalyticsProvider";

export default function App() {
  return (
    <AnalyticsProvider>
      <RouterProvider router={router} />
      <CookieConsent />
    </AnalyticsProvider>
  );
}