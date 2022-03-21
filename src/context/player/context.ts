import { createContext } from "react";
import { Radio } from "../../types/radio";
import { PlayState } from "../../types/player";

export type PlayerContext = {
  play: (radio: Radio) => Promise<void>
  pause: () => void
  getPlayState: (radio?: Radio) => PlayState
  audio?: HTMLAudioElement
  addToPlayList: (radio: Radio) => void
}

export const DEFAULT_PLAYER_CONTEXT: PlayerContext = {
  play: () => Promise.reject(),
  pause: () => {},
  getPlayState: () => 'not_started',
  addToPlayList: () => {}
}

export const PlayerProviderContext = createContext(DEFAULT_PLAYER_CONTEXT)