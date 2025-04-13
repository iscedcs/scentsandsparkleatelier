"use client"

import { useState, useCallback } from "react"

interface CopyToClipboardReturn {
  value: string
  success: boolean
  copy: (text: string) => void
}

export function useCopyToClipboard(): CopyToClipboardReturn {
  const [value, setValue] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)

  const copy = useCallback((text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported")
      setSuccess(false)
      return
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setValue(text)
        setSuccess(true)
      })
      .catch((error) => {
        console.error("Failed to copy:", error)
        setSuccess(false)
      })
  }, [])

  return { value, success, copy }
}
