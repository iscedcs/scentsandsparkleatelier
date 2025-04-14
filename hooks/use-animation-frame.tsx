"use client"

import { useRef, useEffect, useCallback } from "react"

export function useAnimationFrame(callback: (deltaTime: number) => void, active = true) {
  const requestRef = useRef<number | undefined>(undefined)
  const previousTimeRef = useRef<number | undefined>(undefined)

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        callback(deltaTime)
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    },
    [callback],
  )

  useEffect(() => {
    if (active) {
      requestRef.current = requestAnimationFrame(animate)
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current)
        }
      }
    }
  }, [animate, active])
}
