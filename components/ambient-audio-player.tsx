"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Music } from "lucide-react"

interface ScentAudio {
  name: string
  description: string
  audioSrc: string
}

export function AmbientAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [currentAudio, setCurrentAudio] = useState<ScentAudio | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPanelVisible, setIsPanelVisible] = useState(false)
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false) // Track if audio was playing before page was hidden

  const scentAudios: ScentAudio[] = [
    {
      name: "Peaceful",
      description: "Soft ambient background music perfect for relaxation and meditation.",
      audioSrc: "/sound/0452. Peaceful - AShamaluevMusic.mp3",
    },
    {
      name: "Soothing",
      description: "Calm and relaxing music suitable for creating a serene environment.",
      audioSrc: "/sound/0455. Soothing - AShamaluevMusic.mp3",
    },
    {
      name: "Aura",
      description: "An ambient track that brings a sense of calm and clarity.",
      audioSrc: "/sound/0454. Aura - AShamaluevMusic.mp3",
    },
    {
      name: "Silence",
      description: "Minimalistic and gentle, perfect for background ambiance.",
      audioSrc: "/sound/0453. Silence - AShamaluevMusic.mp3",
    },
  ]

  useEffect(() => {
    const shuffled = [...scentAudios].sort(() => 0.5 - Math.random())
    const firstAudio = shuffled[0]

    const audio = new Audio(firstAudio.audioSrc)
    audio.loop = true
    audio.volume = volume

    audioRef.current = audio
    setCurrentAudio(firstAudio)

    // Interaction handler to play audio
    const handleInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch((err) => {
          console.error("Playback failed:", err)
        })
      }
    }

    // Add interaction listener initially
    document.addEventListener("click", handleInteraction)

    // Handle page visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && audioRef.current) {
        // Store whether the audio was playing before hiding
        setWasPlayingBeforeHidden(isPlaying)
        audioRef.current.pause()
        setIsPlaying(false)
      } else if (document.visibilityState === "visible" && audioRef.current) {
        // When the page becomes visible, reattach the interaction listener
        // to resume playback if the audio was playing before
        if (wasPlayingBeforeHidden && !isPlaying) {
          // Remove any existing listener to avoid duplicates
          document.removeEventListener("click", handleInteraction)
          document.addEventListener("click", handleInteraction)
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      audioRef.current?.pause()
      document.querySelectorAll("audio").forEach((el) => el.pause())
    }
  }, []) // Removed isPlaying and wasPlayingBeforeHidden from dependencies

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      setWasPlayingBeforeHidden(false) // Reset this to prevent auto-resume if manually paused
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        setWasPlayingBeforeHidden(true) // Allow auto-resume if playing
      }).catch(() => {})
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      if (isMuted && newVolume > 0) {
        audioRef.current.muted = false
        setIsMuted(false)
      }
    }
  }

  const selectAudio = (audio: ScentAudio) => {
    if (!audioRef.current) return
    audioRef.current.src = audio.audioSrc
    audioRef.current.play().then(() => {
      setCurrentAudio(audio)
      setIsPlaying(true)
      setWasPlayingBeforeHidden(true) // Allow auto-resume if playing
    }).catch(() => setIsPlaying(false))
    setIsMenuOpen(false)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsPanelVisible(!isPanelVisible)}
        aria-label="Ambient audio controls"
      >
        <Music className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {isPanelVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 w-64"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-sm">Ambient Audio</h3>
              <div className="flex gap-2">
                <button
                  onClick={togglePlayPause}
                  aria-label="Toggle play/pause"
                  className="text-gray-500 hover:text-primary"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  onClick={toggleMute}
                  aria-label="Toggle mute"
                  className="text-gray-500 hover:text-primary"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm font-medium">{currentAudio?.name}</p>
              <p className="text-xs text-gray-500">{currentAudio?.description}</p>
            </div>

            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-sm text-primary hover:underline w-full text-left"
              >
                Change ambient sound
              </button>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-2 overflow-hidden"
                  >
                    {scentAudios.map((audio, index) => (
                      <button
                        key={index}
                        onClick={() => selectAudio(audio)}
                        className={`w-full text-left p-2 text-sm rounded-md transition-colors ${
                          currentAudio?.name === audio.name
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {audio.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}