import { FunctionComponent, MouseEventHandler, useEffect, useRef, useState } from "react";
import { Radio } from "../../../types/radio";
import { MdQueueMusic } from 'react-icons/md'
import Image from "next/image";
import { IoIosCloseCircle } from 'react-icons/io'
import { usePlayer } from "..";
import classNames from "classnames";
import { PlayButton } from "../../../components/play-button";

type RadioComponentProps = {
  radio: Radio
  onRemove: (radio: Radio) => void
}

const RadioComponent: FunctionComponent<RadioComponentProps> = ({ radio, onRemove }) => {
  const { isPlaying } = usePlayer()
  const isPlayingNow = isPlaying(radio)

  const handleRemove: MouseEventHandler = (e) => {
    e.stopPropagation()
    onRemove(radio)
  }

  return (
    <div className={classNames("flex items-center px-3 py-2 border-b group hover:bg-gray-100", {"bg-gray-100": isPlayingNow})}>
      <div className="relative">
        <div className="relative w-[36px] h-[36px] rounded-sm border">
          <Image src={radio.thumbnail} layout="fill" objectFit="cover" alt={radio.name} className="rounded-sm" />
        </div>
        <div className={classNames("absolute top-0 left-0 w-full h-full items-center justify-center group-hover:flex", isPlayingNow ? "flex" : "hidden")}>
          <PlayButton radio={radio} className="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-gray-100 text-red-500" />
        </div>
      </div>
      <div className="ml-2 flex-1 flex items-center">
        <div className="flex-1">{radio.name}</div>
        {
          !isPlayingNow && <button onClick={handleRemove} className="text-xl text-gray-500 hover:text-black hidden group-hover:block"><IoIosCloseCircle /></button>
        }
      </div>
    </div>
  )
}

type PlayListComponentProps = {
  playList: Radio[]
  onClear: () => void
  onRemove: (radio: Radio) => void
}

export const PlayListComponent: FunctionComponent<PlayListComponentProps> = ({ playList, onClear, onRemove }) => {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (containerRef.current?.contains(target)) {
        return
      }
      setIsPlaylistOpen(false)
    }
    document.body.addEventListener('click', handleOutClick)

    return () => {
      document.body.removeEventListener('click', handleOutClick)
    }
  }, [])

  const toggle = () => setIsPlaylistOpen(open => !open)
  return (
    <div className="relative flex" ref={containerRef}>
      <button onClick={toggle} className="text-xl"><MdQueueMusic /></button>
      <div className="absolute bg-white w-[420px] bottom-14 right-0 shadow-md rounded-md border" style={{display: !isPlaylistOpen ? 'none' : ''}}>
        <div className="flex items-center px-3 py-3 border-b">
          <h3 className="font-semibold flex-1">播放列表</h3>
          <button className="text-red-500" onClick={onClear}>清除</button>
        </div>
        <div className="h-[530px] overflow-auto">
          <div>
            {
              playList.map(radio => <RadioComponent radio={radio} key={radio.id} onRemove={onRemove} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}