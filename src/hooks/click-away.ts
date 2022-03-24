import { MutableRefObject, useEffect } from "react";

export const useClickAway = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: MouseEvent) => void,
) => {
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as Node
      if (!ref.current?.contains(target)) {
        handler(e)
      }
    }
    document.addEventListener('click', clickHandler)

    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [handler, ref])
}