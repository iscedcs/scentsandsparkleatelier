"use client"

import { useEffect } from "react"

export function useScrollLock(lock: boolean): void {
  useEffect(() => {
    if (lock) {
      // Save current scroll position and overflow style
      const scrollY = window.scrollY
      const scrollX = window.scrollX
      const originalStyle = window.getComputedStyle(document.body).overflow

      // Apply lock
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = `-${scrollX}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"

      return () => {
        // Remove lock and restore position
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.left = ""
        document.body.style.width = ""
        document.body.style.overflow = originalStyle
        window.scrollTo(scrollX, scrollY)
      }
    }
  }, [lock])
}
