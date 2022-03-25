import { NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from 'react-hot-toast'
import { FormEventHandler, useEffect, useRef } from "react";
import { z } from "zod";
import { Input } from "../../components/input";
import { getFormData } from "../../helpers/helpers";
import { http } from "../../lib/http";


const RecoveryPage: NextPage = () => {

  const jwtRef = useRef<string | null>(null)
  const router = useRouter()

  const recoveryHandler: FormEventHandler = async e => {
    e.preventDefault()
    if (!jwtRef.current) {
      toast.error('请求非法')
      return
    }
    const form = e.target as HTMLFormElement
    const data = getFormData(form)
    if (data.password !== data.password1) {
      toast.error('密码不匹配')
      return
    }
    const result = z.string().min(6).max(24).safeParse(data.password)
    if (!result.success) {
      return
    }
    await http.post('/auth/recovery', {
      access_token: jwtRef.current,
      password: data.password
    })
    toast.success('修改成功')
    setTimeout(() => router.replace('/auth/login'), 3000)
    
  }

  useEffect(() => {
    const { hash } = window.location
    if (!hash) {
      return
    }
    const hashQuery = new URLSearchParams(hash.replace(/#/g, ''))
    jwtRef.current = hashQuery.get('access_token')
  }, [])

  return (
    <div className="px-4 sm:px-12 py-12">
      <div className="max-w-[360px] mx-auto lg:mx-0">
      <h1 className="text-3xl">重设密码</h1>
      <div className="mt-6">
        <form onSubmit={recoveryHandler}>
        <Input label="新密码" name="password" type="password" />
        <Input label="确认密码" name="password1" type="password" />
        <button className="px-6 py-1.5 bg-red-500 text-white rounded-md mt-2" type="submit">重设密码</button>
      </form>
      </div>
      </div>
    </div>
  )
}

export default RecoveryPage