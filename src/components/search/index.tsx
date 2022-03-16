import { FunctionComponent } from "react";
import { IoIosSearch } from 'react-icons/io'

export const SearchComponent: FunctionComponent = () => {
  return (
    <div className="relative flex bg-white rounded-md items-center border focus-within:ring focus-within:ring-red-500/60 px-2 py-1">
      <IoIosSearch className="text-gray-500 text-lg" />
      <input className="focus:ring-0 outline-none pl-2 appearance-none bg-transparent w-[160px]" placeholder="搜索" />
    </div>
  )
}