import { createElement, FunctionComponent } from 'react'
import { FiRadio } from 'react-icons/fi'
import { IoGridOutline, IoGrid } from 'react-icons/io5'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { IconType } from 'react-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { SearchComponent } from '../search'

type NavItemComponentProps = {
  href: string
  icon: IconType
  label: string
  activeIcon?: IconType
}

const NavItemComponent: FunctionComponent<NavItemComponentProps> = ({ href, icon, label, activeIcon}) => {
  const router = useRouter()
  const { asPath } = router
  const isActive = asPath === href
  return (
    <Link href={href} passHref>
      <a className={classNames("flex items-center px-2 py-1.5 rounded-md", {"bg-gray-200": isActive})}>
        {createElement(isActive && activeIcon ? activeIcon : icon, {className: 'text-red-500 mr-2'})}
        <span>{ label }</span>
      </a>
    </Link>
  )
}

export const NavComponent: FunctionComponent = () => {
  return (
    <nav className="bg-gray-100 border-r h-full px-4 py-4">
      <h1 className="text-2xl font-semibold flex items-center mb-4">
        <Link href="/" passHref><a className="flex items-center"><FiRadio className="text-red-500 mr-2 text-3xl" />电台</a></Link>
      </h1>
      <SearchComponent />
      <nav className="py-4">
        <NavItemComponent href="/" icon={IoGridOutline} activeIcon={IoGrid} label="浏览" />
        <NavItemComponent href="/likes" icon={IoIosHeartEmpty} activeIcon={IoIosHeart} label="喜欢" />
      </nav>
    </nav>
  )
}