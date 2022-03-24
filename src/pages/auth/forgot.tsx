import { NextPage } from "next";
import { FormEventHandler } from "react";
import { toast } from 'react-hot-toast'
import { z } from "zod";
import { Input } from "../../components/input";
import { getFormData } from "../../helpers/helpers";
import { http } from "../../lib/http";

const scheme = z.object({
  email: z.string().email()
})

const ForgotPage: NextPage = () => {

  const forgotHandler: FormEventHandler = async e => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const result = getFormData(form, scheme)
    if (!result.success) {
      toast.error('邮箱格式错误')
      return
    }
    await http.post('/auth/recovery', result.data)
  }

  return (
    <div className="px-12 py-12">
      <h1 className="text-3xl">找回密码</h1>
      <div className="w-[360px] mt-6">
        <form onSubmit={forgotHandler}>
        <Input label="邮箱" name="email" />
        <button className="px-6 py-1.5 bg-red-500 text-white rounded-md mt-2" type="submit">找回密码</button>
      </form>
      </div>
    </div>
  )
}

export default ForgotPage