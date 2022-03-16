import { useContext } from "react"
import { PlayerProviderContext } from "./context"

export const usePlayer = () => {
  const context = useContext(PlayerProviderContext)
  return {
    ...context
  }
}