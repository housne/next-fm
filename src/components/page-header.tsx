import { FunctionComponent, useRef, useState } from "react";
import { useAuth } from "../context/auth";
import { FaUserCircle } from 'react-icons/fa'
import Link from "next/link";
import Image from "next/image";
import { useClickAway } from "../hooks/click-away";

type ProfileDropDownProps = {
  isShow: boolean
}

const ProfileDropDown: FunctionComponent<ProfileDropDownProps> = ({isShow}) => {
  const { logout } = useAuth()
  return (
    <div className="absolute top-[40px] right-0 w-[180px] bg-white shadow-lg rounded-md border" style={{display: !isShow ? 'none' : ''}}>
      <Link href="/profile" passHref><a className="block w-full py-1.5 px-4 border-b text-red-500 hover:bg-gray-100 rounded-t-md">个人资料</a></Link>
      <button className="block w-full py-1.5 px-4 text-left text-red-500 hover:bg-gray-100 rounded-b-md" onClick={logout}>退出</button>
    </div>
  )
}

const ProfileComponent: FunctionComponent = () => {
  const { session, openAuthDialog } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useClickAway(containerRef, (e) => {
    e.stopPropagation()
    setShowDropdown(false)
  })

  const toggleDropdown = () => setShowDropdown(show => !show)

  if (!session) {
    return (
      <button onClick={openAuthDialog} className="text-red-500">登录</button>
    )
  }

  return (
    <div className="relative z-20" onClick={toggleDropdown} ref={containerRef}>
      {
        session.profile?.avatar ? 
          <Image height={32} width={32} alt="avatar" className="rounded-full" src={session.profile.avatar} /> : <FaUserCircle size={32} className="text-gray-500" />
      }
      <ProfileDropDown isShow={showDropdown} />
    </div>
  )
}

type PageHeaderComponentProps = {
  title: string
}

export const PageHeaderComponent: FunctionComponent<PageHeaderComponentProps> = ({
  title
}) => {
  
  return (
    <div className="flex border-b py-4 items-center">
      <h1 className="text-3xl flex-1">{title}</h1>
      <ProfileComponent />
    </div>
  )
}