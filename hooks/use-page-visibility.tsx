"use client"

import { useState, useEffect } from "react"

export function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    // Initial check
    setIsVisible(!document.hidden)

    // Add event listener
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Clean up
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return isVisible
}
