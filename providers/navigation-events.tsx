"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

type NavigationEventsContextType = {
  isNavigating: boolean
}

const NavigationEventsContext = createContext<NavigationEventsContextType>({
  isNavigating: false,
})

export function useNavigationEvents() {
  return useContext(NavigationEventsContext)
}

export function NavigationEventsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    setIsNavigating(true)

    // Reset the state after the animation completes
    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return <NavigationEventsContext.Provider value={{ isNavigating }}>{children}</NavigationEventsContext.Provider>
}
