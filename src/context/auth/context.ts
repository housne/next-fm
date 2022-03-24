import { Session } from "../../types/auth";
import { createContext } from "react";

export type LoginProvider = 'github' | 'twitter' | 'google' | 'facebook'

export type LoginOption = {
  email?: string
  password?: string
  provider?: LoginProvider
}

export type AuthContext = {
  session: Session | null | undefined
  login: (options: LoginOption) => Promise<Session>
  logout: () => Promise<void>
  openAuthDialog: () => void
}

const DEFAULT_AUTH_CONTEXT: AuthContext = {
  session: undefined,
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
  openAuthDialog: () => {},
}

export const AuthProviderContext = createContext(DEFAULT_AUTH_CONTEXT)