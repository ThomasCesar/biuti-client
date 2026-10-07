import ColorimetryPage from "@/pages/colorimetry";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import WelcomePage from "@/pages/welcome";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./auth-provider";
import { ProtectedRoute } from "./protected-route";
import WardrobePage from "@/pages/wardrobe";
import WardrobeAddPage from "@/pages/wardrobe-add";
import TryonPage from "@/pages/tryon";
import AccountPage from "@/pages/account";

const router = createBrowserRouter([
  {
    Component: AuthProvider,
    ErrorBoundary: NotFoundPage,
    children: [

      // public pages

      {
        path: "sign-in",
        Component: SignInPage
      },
      {
        path: "sign-up",
        Component: SignUpPage
      },

      // protected pages

      {
        path: "/",
        Component: ProtectedRoute,
        children: [
          {
            index: true,
            Component: HomePage,
          },
          {
            path: 'welcome',
            Component: WelcomePage
          },
          {
            path: 'colorimetry',
            Component: ColorimetryPage
          },
          {
            path: 'wardrobe',
            Component: WardrobePage
          },
          {
            path: 'wardrobe/add',
            Component: WardrobeAddPage
          },
          {
            path: 'tryon',
            Component: TryonPage
          },
          {
            path: 'account',
            Component: AccountPage
          },
        ]
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}