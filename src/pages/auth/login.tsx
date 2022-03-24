import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { LoginFormComponent } from "../../components/auth/login";
import { useAuth } from "../../context/auth";

const UserLoginPage: NextPage = () => {

  const { session } = useAuth()
  const router = useRouter()

  if (session) {
    const { query: { next } } = router
    const redirectURL = typeof next === 'string' ? next : '/'
    router.replace(redirectURL)
  }

  return (
    <div className="px-12 py-12">
      <h1 className="text-3xl">用户登录</h1>
      <div className="w-[360px] mt-6">
        <LoginFormComponent />
      </div>
      <div className="my-6">
        <Link href="/auth/register"><a className="text-red-500 mr-4">注册</a></Link>
        <Link href="/auth/forgot"><a className="text-red-500 mr-4">忘记密码</a></Link>
      </div>
    </div>
  )
}

export default UserLoginPage