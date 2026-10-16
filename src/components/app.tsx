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
import MobileLayout from "./mobile-layout";
import { SheetProvider } from "@/contexts/sheet-provider";
import { ItemsProvider } from "@/contexts/items-provider";
import NavigationLayout from "./navigation-layout";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    errorElement: <NotFoundPage />,
    children: [

      // ------------- PUBLIC PAGES

      {
        path: "sign-in",
        element: <SignInPage />
      },
      {
        path: "sign-up",
        element: <SignUpPage />
      },

      // ------------ PROTECTED PAGES

      {
        path: "/",
        element: (
          <ItemsProvider>
            <SheetProvider>
              <ProtectedRoute />
            </SheetProvider>
          </ItemsProvider>
        ),
        children: [
          {
            index: true,
            element: (
              <NavigationLayout>
                <HomePage />
              </NavigationLayout>
            )
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
            element: (
              <NavigationLayout>
                <WardrobePage />
              </NavigationLayout>
            )
          },
          {
            path: 'wardrobe/add',
            element: <WardrobeAddPage />
          },
          {
            path: 'tryon',
            element: (
              <NavigationLayout>
                <TryonPage />
              </NavigationLayout>
            )
          },
          {
            path: 'account',
            element: (
              <NavigationLayout>
                <AccountPage />
              </NavigationLayout>
            )
          },
        ]
      },
    ],
  },
]);

export default function App() {
  return <MobileLayout><RouterProvider router={router} /></MobileLayout>
}