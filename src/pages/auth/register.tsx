import { NextPage } from "next";
import { FormEventHandler } from "react";
import { Input } from "../../components/input";
import { getFormData } from "../../helpers/helpers";
import { http } from "../../lib/http";
import { RegisterScheme } from "../../scheme/user";

const UserRegisterPage: NextPage = () => {

  const register: FormEventHandler = async e => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const result = getFormData(form, RegisterScheme)
    if (!result.success) {
      return
    }
    const user = await http.post('/auth/register', result.data)
    console.log(user)
  }

  return (
    <div className="px-12 py-12">
      <h1 className="text-3xl">用户注册</h1>
      <form className="w-[320px] mt-6" onSubmit={register}>
        <Input label="用户名" name="name" />
        <Input label="邮箱" name="email" />
        <Input label="密码" name="password" type="password" />
        <button className="px-6 py-1.5 bg-red-500 text-white rounded-md mt-2" type="submit">注册</button>
      </form>
    </div>
  )
}

export default UserRegisterPage