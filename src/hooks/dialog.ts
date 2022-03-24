import { useCallback, useState } from "react"

type DialogHook = () => [boolean, () => void, () => void]

export const useDialog: DialogHook = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])

  const close = useCallback(() => setIsOpen(false), [])

  return [isOpen, open, close]
}