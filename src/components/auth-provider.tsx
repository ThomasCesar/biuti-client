import { useMemo } from "react";
import type { User } from "@/types/main";
import { authContext } from "@/hooks/use-auth";
import { useNavigate, Outlet } from "react-router";
import { useLocalStorage } from "@/hooks/use-localstorage";
import MobileLayout from "./mobile-layout";

export const AuthProvider = () => {

  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const navigate = useNavigate();

  const value = useMemo(() => {
    const login = async (user: User, isNew: boolean) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUser(user);
      navigate(isNew ? '/welcome' : '/');
    };
    const logout = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUser(null);
      navigate("/", { replace: true });
    };
    return { user, login, logout };
  }, [user, navigate, setUser]);

  return (
    <authContext.Provider value={value}>
      <MobileLayout>
        <Outlet />
      </MobileLayout>
    </authContext.Provider>
  );
};