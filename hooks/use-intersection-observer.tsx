"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface IntersectionObserverOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverOptions = {},
): [RefObject<T>, boolean] {
  const { root = null, rootMargin = "0px", threshold = 0, once = false } = options
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)

        // If once is true and the element is intersecting, unobserve it
        if (once && entry.isIntersecting && ref.current) {
          observer.unobserve(ref.current)
        }
      },
      { root, rootMargin, threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [root, rootMargin, threshold, once])

  return [ref, isIntersecting]
}
