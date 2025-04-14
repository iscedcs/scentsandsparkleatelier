"use client"

import { useState, useRef, useEffect, type RefObject } from "react"

export function useHover<T extends HTMLElement = HTMLElement>(): [RefObject<T>, boolean] {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return [ref as RefObject<T>, isHovered]
}
