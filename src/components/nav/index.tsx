import { createElement, FunctionComponent, useState } from 'react'
import { FiRadio } from 'react-icons/fi'
import { IoGridOutline, IoGrid } from 'react-icons/io5'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { IconType } from 'react-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { SearchComponent } from '../search'
import styles from './nav.module.scss'

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
  const [showMenu, setShowMenu] = useState(false)

  const toggle = () => setShowMenu(show => !show)

  return (
    <nav className="lg:h-full lg:relative bg-white lg:bg-gray-100 lg:border-r fixed top-0 left-0 w-full z-40">
      <div className={classNames("flex relative px-4 py-4 items-center z-40 border-b lg:border-b-0", {"border-b-0": showMenu})}>
        <h1 className="text-2xl font-semibold flex-1 flex">
          <Link href="/" passHref><a className="inline-flex items-center"><FiRadio className="text-red-500 mr-2 text-3xl" />电台</a></Link>
        </h1>
        <button onClick={toggle} className={classNames("lg:hidden relative", styles.menu, {[styles.active]: showMenu})}>
          <span className={styles.menu_icon} />
        </button>
      </div>
      <div 
        className={
          classNames(
            "absolute h-screen w-full pt-[70px] top-0 left-0 z-30 px-4 py-4 bg-white lg:static lg:h-auto lg:bg-transparent lg:pt-0",
            {"hidden lg:block": !showMenu}
          )
      }
      >
        <SearchComponent />
        <nav className="py-4">
          <NavItemComponent href="/" icon={IoGridOutline} activeIcon={IoGrid} label="浏览" />
          <NavItemComponent href="/likes" icon={IoIosHeartEmpty} activeIcon={IoIosHeart} label="喜欢" />
        </nav>
      </div>
    </nav>
  )
}