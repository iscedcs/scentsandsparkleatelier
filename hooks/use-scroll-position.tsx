"use client"

import { useState, useEffect } from "react"
import { useDebounce } from "./use-debounce"

interface ScrollPosition {
  x: number
  y: number
  direction: "up" | "down" | "none"
  percentage: number
}

export function useScrollPosition(delay = 10): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: "none",
    percentage: 0,
  })

  useEffect(() => {
    let prevScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentScrollX = window.scrollX
      const direction = currentScrollY > prevScrollY ? "down" : currentScrollY < prevScrollY ? "up" : "none"

      // Calculate scroll percentage
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = scrollHeight > 0 ? (currentScrollY / scrollHeight) * 100 : 0

      setScrollPosition({
        x: currentScrollX,
        y: currentScrollY,
        direction,
        percentage: scrollPercentage,
      })

      prevScrollY = currentScrollY
    }

    const debouncedHandleScroll = useDebounce(handleScroll, delay)

    window.addEventListener("scroll", debouncedHandleScroll)

    // Initial call
    handleScroll()

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll)
    }
  }, [delay])

  return scrollPosition
}
