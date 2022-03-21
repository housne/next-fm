import { useCallback, useContext } from "react"
import { Radio } from "../../types/radio";
import { PlayerProviderContext } from "./context"

export const usePlayer = () => {
  const context = useContext(PlayerProviderContext)

  const isPlaying = useCallback((radio: Radio) => {
    const playState = context.getPlayState(radio)
    return playState === 'playing' || playState === 'loading'
  }, [context])

  return {
    isPlaying,
    ...context
  }
}