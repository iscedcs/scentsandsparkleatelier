"use client"

import { useState, useEffect } from "react"

interface PreloadResult {
  loaded: boolean
  error: boolean
}

export function useImagePreload(src: string): PreloadResult {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!src) {
      return
    }

    let img: HTMLImageElement | null = new Image()

    const handleLoad = () => {
      setLoaded(true)
      setError(false)
      img = null
    }

    const handleError = () => {
      setLoaded(false)
      setError(true)
      img = null
    }

    img.onload = handleLoad
    img.onerror = handleError
    img.src = src

    return () => {
      if (img) {
        img.onload = null
        img.onerror = null
      }
    }
  }, [src])

  return { loaded, error }
}
