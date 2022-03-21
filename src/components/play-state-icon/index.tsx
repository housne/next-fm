import { createElement, FunctionComponent } from "react";
import { PlayState } from "../../types/player"
import { MdPlayArrow, MdPause } from 'react-icons/md'
import { SpinnerComponent, SpinnerComponentProps } from "../spinner";
import cx from 'classnames'

export type PlayStateIconProps = {
  state: PlayState
  classNames?: {
    loading?: string
    play?: string
    pause?: string
    loadingPause?: string
  }
  loading?: SpinnerComponentProps
}

const DEFAULT_LOADING_CONFIG = {
  size: 24,
  color: 'rgb(239,68,68)'
}

export const PlayStateIcon: FunctionComponent<PlayStateIconProps> = ({ state, classNames, loading = DEFAULT_LOADING_CONFIG }) => {
  if (state === 'loading') {
    return (
      <div className="relative flex items-center justify-center" style={{width: loading.size || 24, height: loading.size || 24}}>
        <span className="absolute top-0 left-0">
          <SpinnerComponent {...loading} />
        </span>
        <MdPause className={cx(classNames?.pause, classNames?.loadingPause)} />
      </div>
    )
  } else if (state === 'playing') {
    return createElement(MdPause, {className: classNames?.pause })
  }
  return createElement(MdPlayArrow, {className: classNames?.play })
}