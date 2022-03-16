import { FunctionComponent, useEffect, useRef, useState } from "react";
import { PlayState } from "../../../types/player";
import { Radio } from "../../../lib/source";
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause, MdLoop } from 'react-icons/md'
import { IoShuffle } from 'react-icons/io5'
import Image from "next/image";
import { SpinnerComponent } from "../../../components/spinner";
import { PlayStateIcon } from "../../../components/play-state-icon";

export type LoopMode = 'list' | 'one' | 'none'

type PlayerControllerProps = {
  playingRadio?: Radio
  playState: PlayState
  onNext: () => void
  onPrev: () => void
  onLoopModeChange: (mode: LoopMode) => void
  onRandomChange: (random: boolean) => void
  play: () => void
  pause: () => void
}

const PlayerController: FunctionComponent<PlayerControllerProps> = ({
  onNext,
  onPrev,
  playState,
  play,
  pause
}) => {

  const [random, setRandom] = useState(false)
  const [loopMode, setLoopMode] = useState<LoopMode>('none')

  const playToggle = () => {
    if (playState === 'paused') {
      play()
    } else if (playState === 'playing' || playState === 'loading') {
      pause()
    } else {
      play()
    }
  }

  return (
    <div className="flex items-center">
      <button onClick={onPrev} className="text-xl"><MdSkipPrevious /></button>
      <button onClick={playToggle} className="text-3xl mx-5">
        <PlayStateIcon 
          state={playState} 
          loading={{size: 30, color: '#000', secondaryColor: '#ccc'}}
          classNames={{loadingPause: "text-xl"}}
        />
      </button>
      <button onClick={onNext} className="text-xl"><MdSkipNext /></button>
      <button className="text-xl mx-5"><MdLoop /></button>
      <button className="text-xl"><IoShuffle /></button>
    </div>
  )
}

type PlayerComponentProps = PlayerControllerProps &  {
  playlist: Radio[]
}

export const PlayerComponent: FunctionComponent<PlayerComponentProps> = ({playlist, ...props}) => {
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
    <div className="fixed flex items-center left-[260px] bottom-0 right-0 px-12 py-4 bg-white" style={{boxShadow: '0 -5px 20px 2px rgba(0, 0, 0, 0.05)'}}>
      <PlayerController {...props} />
      <div className="flex-1 flex pl-12">
        <div className="relative w-[38px] h-[38px] rounded-sm border">
          <Image src={playingRadio.thumbnail} alt={playingRadio.name} layout="fill" className="rounded-sm" />
        </div>
        <div className="ml-2">
          <div className="text-sm">{playingRadio.name}</div>
          <div className="text-xs text-gray-500">{playDuration}</div>
        </div>
      </div>
    </div>
  )
}