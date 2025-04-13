"use client"

import { useState, useEffect } from "react"
import { useLocalStorage } from "./use-local-storage"

type Theme = "light" | "dark" | "system"

export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setThemeInStorage] = useLocalStorage<Theme>("theme", "system")
  const [activeTheme, setActiveTheme] = useState<Theme>(theme)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove old theme classes
    root.classList.remove("light", "dark")

    // Apply new theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      setActiveTheme("system")
    } else {
      root.classList.add(theme)
      setActiveTheme(theme)
    }
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

      const handleChange = () => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(mediaQuery.matches ? "dark" : "light")
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme])

  return [activeTheme, setThemeInStorage]
}
