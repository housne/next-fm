import classNames from "classnames";
import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useState } from "react";
import { useAuth } from "..";
import { LoginFormComponent } from "../../../components/auth/login";
import { RegisterFormComponent } from "../../../components/auth/register";
import { useDialog } from "../../../hooks/dialog";

export type AuthTab = 'login' | 'register'

type AuthDialogProps = {
  tab?: AuthTab
}

export type AuthDialogRef = {
  open: () => void
  close: () => void
}

const AuthDialogRender: ForwardRefRenderFunction<AuthDialogRef, AuthDialogProps> = (
  {
    tab = 'login'
  }, 
  ref
) => {
  const [isOpen, open, close] = useDialog()
  const [showTab, setShowTab] = useState(tab)
  const { session } = useAuth()

  useImperativeHandle(ref, () => ({ open, close }))

  useEffect(() => setShowTab(tab), [tab])

  useEffect(() => {
    if (session) {
      close()
    }
  }, [session, close])

  const tabs: {tab: AuthTab, label: string}[] = [
    {
      tab: 'login',
      label: '登录'
    },
    {
      tab: 'register',
      label: '注册'
    }
  ]

  return (
    <div className={classNames("fixed h-screen w-screen top-0 left-0 z-10", isOpen ? "block" : "hidden")}>
      <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-70" onClick={close} />
      <div className="relative z-10 max-w-[420px] mx-auto bg-white mt-[100px] rounded-md shadow-lg">
        <div className="px-6 border-b text-center">
          {
            tabs.map((tab) => (
              <button
                className={
                  classNames("py-2.5 mr-6 relative", {
                  "text-red-500 after:border-2 after:border-b after:border-red-500 after:absolute after:left-0 after:bottom-[-1px] after:w-full": showTab === tab.tab
                })}
                key={tab.tab} 
                onClick={() => setShowTab(tab.tab)}
              >{tab.label}</button>
            ))
          }
        </div>
        <div className="px-6 py-6">
          {
            showTab === 'register' ? <RegisterFormComponent /> : <LoginFormComponent />
          }
        </div>
      </div>
    </div>
  )
}

export const AuthDialog = forwardRef(AuthDialogRender)