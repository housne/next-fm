import { NextPage } from "next";
import { RegisterFormComponent } from "../../components/auth/register";

const UserRegisterPage: NextPage = () => {

  return (
    <div className="px-4 sm:px-12 py-6 sm:py-12">
      <div className="max-w-[360px] mx-auto lg:mx-0">
        <h1 className="text-3xl mb-6">用户注册</h1>
        <RegisterFormComponent />
      </div>
    </div>
  )
}

export default UserRegisterPage