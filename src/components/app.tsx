import ColorimetryPage from "@/pages/colorimetry";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import WelcomePage from "@/pages/welcome";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProtectedRoute } from "./protected-route";
import WardrobePage from "@/pages/wardrobe";
import WardrobeAddPage from "@/pages/wardrobe-add";
import TryonPage from "@/pages/tryon";
import AccountPage from "@/pages/account";
import { AuthProvider } from "@/contexts/auth-provider";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    errorElement: <NotFoundPage />,
    children: [

      // public pages

      {
        path: "sign-in",
        element: <SignInPage />
      },
      {
        path: "sign-up",
        element: <SignUpPage />
      },

      // protected pages

      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'welcome',
            element: <WelcomePage />
          },
          {
            path: 'colorimetry',
            element: <ColorimetryPage />
          },
          {
            path: 'wardrobe',
            element: <WardrobePage />
          },
          {
            path: 'wardrobe/add',
            element: <WardrobeAddPage />
          },
          {
            path: 'tryon',
            element: <TryonPage />
          },
          {
            path: 'account',
            element: <AccountPage />
          },
        ]
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}