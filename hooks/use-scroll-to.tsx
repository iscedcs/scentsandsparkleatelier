"use client"

import { useCallback } from "react"

interface ScrollToOptions {
  offset?: number
  behavior?: ScrollBehavior
}

export function useScrollTo() {
  const scrollTo = useCallback((target: string | HTMLElement, options: ScrollToOptions = {}) => {
    const { offset = 0, behavior = "smooth" } = options

    let element: HTMLElement | null = null

    if (typeof target === "string") {
      element = document.querySelector(target)
    } else {
      element = target
    }

    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior,
      })
    }
  }, [])

  return scrollTo
}
