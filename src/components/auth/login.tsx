import { FormEventHandler, FunctionComponent } from "react";
import { IconType } from "react-icons/lib";
import { SiGithub, SiFacebook } from 'react-icons/si'
import { FcGoogle } from 'react-icons/fc'
import { LoginProvider, useAuth } from "../../context/auth";
import { getFormData } from "../../helpers/helpers";
import { LoginScheme } from "../../scheme/user";
import { Input } from "../input";

export const LoginFormComponent: FunctionComponent = () => {
  const { login } = useAuth()
  
  const loginHandler: FormEventHandler = async e => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const result = getFormData(form, LoginScheme)
    if (!result.success) {
      return
    }
    login({...result.data})
  }

  const oauthLoginProviders: {provider: LoginProvider, label: string, icon: IconType, iconClassName?: string}[] = [
    {
      provider: 'github',
      label: 'Github',
      icon: SiGithub
    },
    {
      provider: 'google',
      label: 'Google',
      icon: FcGoogle,
      iconClassName: 'text-lg'
    },
    {
      provider: 'facebook',
      label: 'Facebook',
      icon: SiFacebook,
      iconClassName: 'text-blue-500'
    }
  ]

  return (
    <div>
    <form onSubmit={loginHandler}>
      <Input label="邮箱" name="email" />
      <Input label="密码" name="password" type="password" />
      <button className="px-6 py-1.5 bg-red-500 text-white rounded-md mt-2" type="submit">登录</button>
    </form>
    <div className="pt-6">
      <div className="mb-2 text-sm text-gray-500">第三方登录</div>
      <div className="flex justify-between">
      {
        oauthLoginProviders.map(provider => (
          <button 
            key={provider.provider} 
            onClick={() => login({provider: provider.provider})}
            className="inline-flex items-center px-4 py-1.5 border rounded-md hover:bg-gray-100"
          >
            <provider.icon className={provider.iconClassName} />
            <span className="ml-2">{provider.label}</span>
          </button>
        ))
      }
      </div>
    </div>
    </div>
  )
}