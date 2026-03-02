import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { AuthorProfile } from "./pages/AuthorProfile";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Quiz } from "./pages/Quiz";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/catalog",
    Component: Catalog,
  },
  {
    path: "/author",
    Component: AuthorProfile,
  },
  {
    path: "/privacy",
    Component: PrivacyPolicy,
  },
  {
    path: "/quiz",
    Component: Quiz,
  },
]);