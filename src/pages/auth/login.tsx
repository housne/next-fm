import { NextPage } from "next";
import { FormEventHandler } from "react";
import { Input } from "../../components/input";
import { getFormData } from "../../helpers/helpers";
import { http } from "../../lib/http";
import { LoginScheme } from "../../scheme/user";

const UserLoginPage: NextPage = () => {

  const login: FormEventHandler = async e => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const result = getFormData(form, LoginScheme)
    if (!result.success) {
      return
    }
    const user = await http.post('/auth/login', result.data)
    console.log(user)
  }

  return (
    <div className="px-12 py-12">
      <h1 className="text-3xl">用户登录</h1>
      <form className="w-[320px] mt-6" onSubmit={login}>
        <Input label="邮箱" name="email" />
        <Input label="密码" name="password" type="password" />
        <button className="px-6 py-1.5 bg-red-500 text-white rounded-md mt-2" type="submit">登录</button>
      </form>
    </div>
  )
}

export default UserLoginPage