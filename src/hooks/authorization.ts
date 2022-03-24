import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth";

export function useAuthorization(callback?: () => void) {
  const { session } = useAuth()
  const router = useRouter()
  const { asPath } = router

  useEffect(() => {
    if (!session) {
      router.replace(`/auth/login?next=${asPath}`)
    }
    callback && callback()
  }, [session, router, callback, asPath])
}