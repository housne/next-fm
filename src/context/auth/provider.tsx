import { Session } from "../../types/auth";
import { FunctionComponent, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { PageSpinner } from "../../components/spinner/page-spinner";
import { http } from "../../lib/http";
import { AuthProviderContext, LoginOption, LoginProvider } from "./context";
import { AuthDialog, AuthDialogRef } from "./components/auth-dialog";

type OauthCallback = {
  resolve?: (session: Session) => void
  reject?: (reason?: any) => void
}

export const AuthContextProvider: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const oauthCallbackRef = useRef<OauthCallback>({})
  const authDialogRef = useRef<AuthDialogRef>(null)

  const oauthLogin = useCallback((provider: LoginProvider) => {
    return new Promise<Session>((resolve, reject) => {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/authorize`
      window.open(url, 'AuthWindow', 'width=500,heigh=500')
      oauthCallbackRef.current.resolve = resolve
      oauthCallbackRef.current.reject = reject
    })
  }, [])

  const passwordLogin = useCallback((email: string, password: string) => {
    return http.post<Session>(`/auth/login`, {email, password})
  }, [])

  const login = useCallback(async (option: LoginOption) => {
    const { email, password, provider } = option
    let session: Session | null = null
    if (provider) {
      session = await oauthLogin(provider)
    } else if (email && password) {
      session = await passwordLogin(email, password)
    }
    if (!session) {
      return Promise.reject()
    }
    localStorage.setItem('session', JSON.stringify(session))
    setSession(session)
    return session
  }, [oauthLogin, passwordLogin])


  const logout = useCallback(async () => {
    await http.post('/auth/logout')
    setSession(null)
  }, [])

  const openAuthDialog = useCallback(() => {
    if (!authDialogRef.current) {
      return
    }
    authDialogRef.current.open()
  }, [])
  

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const { data } = event
        if (data.type !== 'authorize') {
          return
        }
        const jwt = data.data
        http.post<Session>('/auth/authorize', undefined, { headers: {
          'Authorization': `bearer ${jwt}`
        }}).then((session) => {
          oauthCallbackRef.current.resolve && oauthCallbackRef.current.resolve(session)
        }).catch(e => {
          oauthCallbackRef.current.reject && oauthCallbackRef.current.reject(e)
        })
    }
    window.addEventListener('message', messageHandler)

    return () => {
      window.removeEventListener('message', messageHandler)
    }
  }, [])

  useEffect(() => {
    if (typeof session === 'undefined') {
      return
    }
    if (!session) {
      localStorage.removeItem('session')
      return
    }
  }, [session])

  useEffect(() => {
    const localSession = localStorage.getItem('session')
    if (!localSession) {
      setSession(null)
      return
    }
    http.post<Session>('/auth/authorize')
      .then(session => setSession(session))
      .catch(() => setSession(null))
  }, [])

  if (typeof session === 'undefined') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <PageSpinner size={40} />
      </div>
    )
  }

  

  return (
    <AuthProviderContext.Provider value={{login, logout, session, openAuthDialog}}>
      {
        children
      }
      <AuthDialog ref={authDialogRef} />
    </AuthProviderContext.Provider>
  )

}