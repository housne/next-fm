import { NextPage } from "next";
import { RegisterFormComponent } from "../../components/auth/register";

const UserRegisterPage: NextPage = () => {

  return (
    <div className="px-12 py-12">
      <h1 className="text-3xl">用户注册</h1>
      <div className="w-[320px] mt-6">
        <RegisterFormComponent />
      </div>
    </div>
  )
}

export default UserRegisterPage