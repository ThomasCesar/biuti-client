import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("auth context not initiated");
  }
  return auth;
}