import { FunctionComponent, MouseEventHandler, PropsWithChildren } from "react";
import { usePlayer } from "../../context/player";
import { Radio } from "../../types/radio";
import { PlayStateIcon, PlayStateIconProps } from "../play-state-icon";

type PlayButtonProps = PropsWithChildren<Omit<PlayStateIconProps, 'state'> & {
  radio: Radio
  className?: string
  onClick?: MouseEventHandler
}>

export const PlayButton: FunctionComponent<PlayButtonProps> = ({
  radio, className, onClick, children, ...props 
}) => {
  const { play, pause, getPlayState } = usePlayer()
  const playState = getPlayState(radio)
  const playRadio: MouseEventHandler = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onClick && onClick(e)
    if (playState === 'playing' || playState === 'loading') {
      pause()
    } else {
      play(radio)
    }
  }
  return (
    <button className={className} onClick={playRadio}>
      <PlayStateIcon state={playState} {...props} />
      { children }
    </button>
  )
}