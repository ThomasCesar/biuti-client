import type { User } from "@/types/main";
import { createContext, useContext } from "react";

type AuthContextProps = {
  user: null | User
  login(user: User, isNew: boolean): Promise<void>;
  logout(): Promise<void>;
}

export const authContext = createContext<AuthContextProps | null>(null);

export function useAuth() {
  const auth = useContext(authContext);
  if (!auth) {
    throw new Error("auth context not initiated");
  }
  return auth;
}