import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "../hooks/use-auth";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const data = useAuth();
  useEffect(() => {
    // console.log(data);
    if (!data?.user) {
      navigate("/sign-in");
      return;
    }
  });
  return <Outlet />;
};