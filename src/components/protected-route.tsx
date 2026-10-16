import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { ItemsProvider } from "./items-provider";
import { SheetProvider } from "@/contexts/sheet-provider";
import { useAuth } from "@/hooks/use-auth";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const data = useAuth();
  useEffect(() => {
    if (!data?.user) {
      navigate("/sign-in");
      return;
    }
  });
  return (
    <ItemsProvider>
      <SheetProvider>
        <Outlet />
      </SheetProvider>
    </ItemsProvider>
  )
};