import { FormEventHandler, FunctionComponent } from "react";
import { getFormData } from "../../helpers/helpers";
import { http } from "../../lib/http";
import { RegisterScheme } from "../../scheme/user";
import { Session } from "../../types/auth";
import { Input } from "../input";

type RegisterFormComponentProps = {
  onSuccess?: (session: Session) => void
}

export const RegisterFormComponent: FunctionComponent<RegisterFormComponentProps> = ({onSuccess}) => {
  const register: FormEventHandler = async e => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const result = getFormData(form, RegisterScheme)
    if (!result.success) {
      return
    }
    const session = await http.post<Session>('/auth/register', result.data)
    onSuccess && onSuccess(session)
  }

  return (
    <form onSubmit={register}>
      <Input label="邮箱" name="email" />
      <Input label="密码" name="password" type="password" />
      <button className="px-6 py-1.5 bg-red-500 text-white rounded-md mt-2" type="submit">注册</button>
    </form>
  )
}