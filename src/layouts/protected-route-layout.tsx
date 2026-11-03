import { Loader } from "lucide-react";
import { useSession } from "@/lib/auth";
import { Toaster } from "@/components/ui/toast";
import { useNavigate, Outlet } from "react-router";
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
    <ItemsProvider>
      <OutfitsProvider>
        <SheetProvider>
          <Outlet />
        </SheetProvider>
        <Toaster />
      </OutfitsProvider>
    </ItemsProvider>
  );
};