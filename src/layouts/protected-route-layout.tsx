import { Loader } from "lucide-react";
import { useSession } from "@/lib/auth";
import { useNavigate, Outlet } from "react-router";
import BrandsProvider from "@/contexts/brands-provider";
import { ItemsProvider } from "@/contexts/items-provider";
import OutfitsProvider from "@/contexts/outfits-provider";
import { SheetProvider } from "@/contexts/sheet-provider";

export const ProtectedRouteLayout = () => {

  const navigate = useNavigate();
  const userSession = useSession();

  if (
    userSession.isPending
    || userSession.isRefetching
  ) {
    return (
      <div className="h-screen w-screen flex flex-col gap-10 justify-center items-center">
        <Loader className="stroke-muted-foreground animate-spin" size={50} />
        <p>Loading...</p>
      </div>
    )
  }

  if (!userSession.data?.user) {
    navigate("/sign-in");
  }

  return (
    <BrandsProvider>
      <ItemsProvider>
        <OutfitsProvider>
          <SheetProvider>
            <Outlet />
          </SheetProvider>
        </OutfitsProvider>
      </ItemsProvider>
    </BrandsProvider>
  );
};