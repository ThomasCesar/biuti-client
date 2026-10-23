import { useMemo } from "react";
import { AuthContext } from "./auth-context";
import { useNavigate, Outlet } from "react-router";
import { useLocalStorage } from "@/hooks/use-localstorage";
import type { User } from "@/lib/users";
import { wait } from "@/lib/utils";

export const AuthProvider = () => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const navigate = useNavigate();
  const value = useMemo(() => {
    const login = async (user: User, isNew: boolean) => {
      await wait();
      setUser(user);
      navigate(isNew ? '/welcome' : '/');
    };
    const logout = async () => {
      await wait();
      setUser(null);
      navigate("/", { replace: true });
    };
    return { user, login, logout };
  }, [user, navigate, setUser]);
  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  );
};