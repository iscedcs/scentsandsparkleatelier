"use client"

import { useState, useEffect } from "react"
import { debounce } from "@/lib/utils"

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(delay = 100): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Debounce the resize handler
    const debouncedHandleResize = debounce(handleResize, delay)

    // Add event listener
    window.addEventListener("resize", debouncedHandleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", debouncedHandleResize)
  }, [delay])

  return windowSize
}
