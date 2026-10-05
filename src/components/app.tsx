import ColorimetryPage from "@/components/pages/colorimetry";
import HomePage from "@/components/pages/home";
import NotFoundPage from "@/components/pages/not-found";
import SignInPage from "@/components/pages/sign-in";
import SignUpPage from "@/components/pages/sign-up";
import WelcomePage from "@/components/pages/welcome";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./auth-provider";
import { ProtectedRoute } from "./protected-route";
import WardrobePage from "./pages/wardrobe";
import ShoppingPage from "./pages/shopping";
import TryonPage from "./pages/tryon";
import AccountPage from "./pages/account";
import WardrobeAddPage from "./pages/wardrobe-add";

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
            path: 'shopping',
            Component: ShoppingPage
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