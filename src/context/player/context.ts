import { createContext } from "react";
import { Radio } from "../../lib/source";
import { PlayState } from "../../types/player";

export type PlayerContext = {
  play: (radio: Radio) => Promise<void>
  pause: () => void
  getPlayState: (radio: Radio) => PlayState
}

export const DEFAULT_PLAYER_CONTEXT: PlayerContext = {
  play: () => Promise.reject(),
  pause: () => {},
  getPlayState: () => 'not_started'
}

export const PlayerProviderContext = createContext(DEFAULT_PLAYER_CONTEXT)