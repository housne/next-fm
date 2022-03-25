import { FormEventHandler, FunctionComponent } from "react";
import { getFormData } from "../../helpers/helpers";
import { http } from "../../lib/http";
import { RegisterScheme } from "../../scheme/user";
import { Session } from "../../types/auth";
import { Input } from "../input-group";

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
      <div>
      <Input label="邮箱" name="email" placeholder="邮箱" />
      <Input label="密码" name="password" type="password" placeholder="密码" />
      </div>
      <button className="px-6 py-2 w-full bg-red-500 text-white rounded-md mt-6" type="submit">注册</button>
    </form>
  )
}