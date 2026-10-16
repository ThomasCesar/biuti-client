import type { User } from "@/lib/users";
import { createContext } from "react";

type AuthContextProps = {
  user: null | User
  login(user: User, isNew: boolean): Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);