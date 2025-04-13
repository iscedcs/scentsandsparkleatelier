"use client"

import { useState, useEffect } from "react"

interface MousePosition {
  x: number
  y: number
  relativeX: number // 0 to 1 (left to right)
  relativeY: number // 0 to 1 (top to bottom)
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    relativeX: 0,
    relativeY: 0,
  })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const relativeX = e.clientX / window.innerWidth
      const relativeY = e.clientY / window.innerHeight

      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        relativeX,
        relativeY,
      })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return mousePosition
}
