import HomePage from "@/pages/home";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import WelcomePage from "@/pages/welcome";
import AccountPage from "@/pages/account";
import WardrobePage from "@/pages/wardrobe";
import NotFoundPage from "@/pages/not-found";
import ColorimetryPage from "@/pages/colorimetry";
import MobileLayout from "@/layouts/mobile-layout";
import { AuthProvider } from "@/contexts/auth-provider";
import { SheetProvider } from "@/contexts/sheet-provider";
import { ItemsProvider } from "@/contexts/items-provider";
import NavigationLayout from "@/layouts/navigation-layout";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProtectedRouteLayout } from "@/layouts/protected-route-layout";
import OutfitsPage from "@/pages/outfits";

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
              <ProtectedRouteLayout />
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
            path: 'outfits',
            element: (
              <NavigationLayout>
                <OutfitsPage />
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
  return (
    <MobileLayout>
      <RouterProvider router={router} />
    </MobileLayout>
  )
}