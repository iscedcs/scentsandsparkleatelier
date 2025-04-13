"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const countRef = useRef(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      const startTime = Date.now()
      const endTime = startTime + duration * 1000

      const animateCount = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / (endTime - startTime), 1)
        const currentCount = Math.floor(progress * end)

        if (countRef.current !== currentCount) {
          countRef.current = currentCount
          setCount(currentCount)
        }

        if (progress < 1) {
          requestAnimationFrame(animateCount)
        }
      }

      requestAnimationFrame(animateCount)
    }
  }, [isInView, end, duration, hasAnimated])

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl text-primary">
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
