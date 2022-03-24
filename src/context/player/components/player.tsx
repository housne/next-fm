import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Radio } from "../../../types/radio";
import Image from "next/image";
import { PlayerControllerProps, PlayerControllerComponent } from './controller'
import { PlayerToolBarComponent } from "./toolbar";
import { PlayListComponent } from "./playlist";
import { transformSecondsToHours } from "../../../helpers/helpers";
export type { LoopMode } from './controller'

type PlayerComponentProps = PlayerControllerProps &  {
  playlist: Radio[]
  removeItemFromPlaylist: (radio: Radio) => void
  clearPlaylist: () => void
}

export const PlayerComponent: FunctionComponent<PlayerComponentProps> = ({
  playlist,
  removeItemFromPlaylist,
  clearPlaylist,
  ...props
}) => {
  const { playingRadio, playState } = props;
  const [playDuration, setPlayDuration] = useState(0)
  const durationTimer = useRef(0)

  useEffect(() => {
    if (playState === 'playing') {
      durationTimer.current = window.setInterval(() => setPlayDuration(d => d + 1), 1000)
    } else {
      clearInterval(durationTimer.current)
    }
    return () => {
      clearInterval(durationTimer.current)
    }
  }, [playState])

  useEffect(() => {
    if (!playingRadio) {
      return
    }
    setPlayDuration(0)
  }, [playingRadio])

  if (!playingRadio) {
    return null
  }
  return (
    <div className="fixed flex items-center left-0 lg:left-[260px] bottom-0 right-0 px-4 md:px-12 py-4 border-t bg-white" style={{boxShadow: '0 -5px 20px 2px rgba(0, 0, 0, 0.05)'}}>
      <PlayerControllerComponent {...props} />
      <div className="flex-1 flex sm:pl-12 pl-4">
        <div className="relative w-[38px] h-[38px] rounded-sm border">
          <Image src={playingRadio.thumbnail} alt={playingRadio.name} layout="fill" className="rounded-sm" />
        </div>
        <div className="ml-2">
          <div className="text-sm">{playingRadio.name}</div>
          <div className="text-xs text-gray-500">{transformSecondsToHours(playDuration)}</div>
        </div>
      </div>
      <PlayerToolBarComponent />
      <div className="ml-6">
        <PlayListComponent playList={playlist} onClear={clearPlaylist} onRemove={removeItemFromPlaylist} />
      </div>
    </div>
  )
}