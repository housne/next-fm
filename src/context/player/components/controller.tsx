import { FunctionComponent, useEffect, useState } from "react";
import { PlayState } from "../../../types/player";
import { Radio } from "../../../types/radio";
import { MdSkipPrevious, MdSkipNext, MdShuffle, MdOutlineRepeat, MdOutlineRepeatOne } from 'react-icons/md'
import classNames from "classnames";
import { PlayButton } from "../../../components/play-button";

export const LoopModes = ['none', 'list', 'one'] as const

export type LoopMode = typeof LoopModes[number]

export type PlayerControllerProps = {
  playingRadio?: Radio
  playState: PlayState
  onNext: () => void
  onPrev: () => void
  onLoopModeChange: (mode: LoopMode) => void
  onRandomChange: (random: boolean) => void
  play: () => void
  pause: () => void
}

export const PlayerControllerComponent: FunctionComponent<PlayerControllerProps> = ({
  onNext,
  onPrev,
  playingRadio,
  onRandomChange,
  onLoopModeChange
}) => {

  const [random, setRandom] = useState(false)
  const [loopMode, setLoopMode] = useState<LoopMode>('none')

  const toggleRandom = () => setRandom(random => !random)

  const changeLoopMode = () => {
    setLoopMode(mode => {
      const index = LoopModes.findIndex(m => mode === m)
      if (index === LoopModes.length - 1) {
        return LoopModes[0]
      } else {
        return LoopModes[index + 1]
      }
    })
  }

  useEffect(() => {
    onRandomChange(random)
  }, [random, onRandomChange])

  useEffect(() => {
    onLoopModeChange(loopMode)
  }, [loopMode, onLoopModeChange])

  return (
    <div className="flex items-center">
      <button onClick={onPrev} className="text-xl"><MdSkipPrevious /></button>
      <PlayButton 
        radio={playingRadio as Radio} 
        loading={{size: 30, color: '#000', secondaryColor: '#ccc'}}
        classNames={{loadingPause: "text-xl"}}
        className="text-3xl mx-5"
      />
      <button onClick={onNext} className="text-xl"><MdSkipNext /></button>
      <button 
        className={classNames("text-xl mx-5 relative", {"text-red-500": loopMode !== 'none'})}
        onClick={changeLoopMode}
      >
          { loopMode === 'one' ? <MdOutlineRepeatOne /> : <MdOutlineRepeat />}
        </button>
      <button className={classNames("text-xl", {'text-red-500': random})} onClick={toggleRandom}><MdShuffle /></button>
    </div>
  )
}