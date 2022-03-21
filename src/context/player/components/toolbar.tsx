import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { MdVolumeUp, MdVolumeOff, MdVolumeMute } from 'react-icons/md'
import Slider from 'rc-slider'
import { usePlayer } from "..";

type VolumeSliderProps = {
  volume: number
  setVolume: (volume: number) => void
}

const VolumeSlider: FunctionComponent<VolumeSliderProps> = ({volume, setVolume}) => {
  const { audio } = usePlayer()
  const onChange = useCallback((value: number | number[]) => {
    if (typeof value !== 'number') {
      return
    }
    setVolume(value)
    if (!audio) {
      return
    }
    audio.volume = value / 100
  }, [setVolume, audio])
  return (
    <div className="w-16 ml-2">
      <Slider
        value={volume}
        onChange={onChange}
        trackStyle={{background: 'black', height: 2}} 
        railStyle={{height: 2}}
        handleStyle={{background: 'white', opacity: 1, borderWidth: 0, width: 10, height: 10, marginTop: -4, boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.5)'}}
      />
    </div>
  )
}

const VolumeComponent: FunctionComponent = () => {
  const { audio } = usePlayer()
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(100)
  const toggleMuted = () => {
    setMuted(muted => !muted)
    setVolume(0)
    if (!audio) {
      return
    }
    audio.muted = !audio.muted
  }

  useEffect(() => {
    if (muted || !audio) {
      return
    }
    setVolume(audio.volume * 100)
  }, [muted, audio])

  const volumeIcon = () => {
    if (muted) {
      return <MdVolumeOff />
    } else if (volume === 0) {
      return <MdVolumeMute />
    }
    return <MdVolumeUp />
  }
  return (
    <div className="flex items-center">
      <button onClick={toggleMuted} className="text-lg w-[18px] text-left">
        {volumeIcon()}
      </button>
      <VolumeSlider volume={volume} setVolume={setVolume} />
    </div>
  )
}

export const PlayerToolBarComponent: FunctionComponent = () => {
  return (
    <div className="flex">
      <VolumeComponent />
    </div>
  )
}