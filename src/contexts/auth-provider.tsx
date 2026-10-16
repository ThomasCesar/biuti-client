import { useMemo } from "react";
import { AuthContext } from "./auth-context";
import { useNavigate, Outlet } from "react-router";
import MobileLayout from "@/components/mobile-layout";
import { useLocalStorage } from "@/hooks/use-localstorage";
import type { User } from "@/lib/users";

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
    <AuthContext.Provider value={value}>
      <MobileLayout>
        <Outlet />
      </MobileLayout>
    </AuthContext.Provider>
  );
};