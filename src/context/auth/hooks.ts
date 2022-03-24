import { useContext } from "react";
import { AuthProviderContext } from "./context";

export function useAuth() {
  const context = useContext(AuthProviderContext)
  return {
    ...context
  }
}