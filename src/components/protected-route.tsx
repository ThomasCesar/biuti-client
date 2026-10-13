import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { SheetProvider } from "./sheet-provider";
import { ItemsProvider } from "./items-provider";

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