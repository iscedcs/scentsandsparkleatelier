"use client"

import type React from "react"

import { useRef, useEffect } from "react"

export function useFocusTrap(active = true): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return

    const focusableElements = ref.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    if (!focusableElements || focusableElements.length === 0) return

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    // Focus the first element when the trap is activated
    firstElement.focus()

    // Add event listener
    document.addEventListener("keydown", handleTabKey)

    // Clean up
    return () => {
      document.removeEventListener("keydown", handleTabKey)
    }
  }, [active])

  return ref as React.RefObject<HTMLDivElement>
}
