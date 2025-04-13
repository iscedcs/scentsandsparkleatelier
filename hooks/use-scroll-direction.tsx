"use client"

import { useState, useEffect } from "react"

type ScrollDirection = "up" | "down" | null

export function useScrollDirection(threshold = 10): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? "down" : "up"

      // Only update direction if the scroll difference is greater than the threshold
      if (Math.abs(scrollY - lastScrollY) > threshold) {
        setScrollDirection(direction)
        lastScrollY = scrollY > 0 ? scrollY : 0
      }
    }

    window.addEventListener("scroll", updateScrollDirection)

    return () => {
      window.removeEventListener("scroll", updateScrollDirection)
    }
  }, [threshold])

  return scrollDirection
}
