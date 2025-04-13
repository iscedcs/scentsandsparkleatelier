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
  const [isInitialized, setIsInitialized] = useState(false)

  const scentAudios: ScentAudio[] = [
    {
      name: "Relaxing Ambience",
      description: "Calm, soothing sounds to complement our relaxing scents",
      audioSrc: "https://assets.mixkit.co/music/preview/mixkit-relaxing-in-nature-522.mp3",
    },
    {
      name: "Energizing Beats",
      description: "Uplifting sounds to pair with our energizing fragrances",
      audioSrc: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    },
    {
      name: "Romantic Evening",
      description: "Soft, intimate sounds for our romantic scent collection",
      audioSrc: "https://assets.mixkit.co/music/preview/mixkit-piano-reflections-22.mp3",
    },
    {
      name: "Fresh Morning",
      description: "Bright, airy sounds for our fresh scent collection",
      audioSrc: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
    },
  ]

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio()
    audioRef.current.loop = true
    audioRef.current.volume = volume

    // Set default audio
    setCurrentAudio(scentAudios[0])

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current || !currentAudio) return

    // Update audio source when current audio changes
    audioRef.current.src = currentAudio.audioSrc

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        // Handle autoplay restrictions
        console.log("Autoplay prevented:", error)
        setIsPlaying(false)
      })
    }
  }, [currentAudio, isPlaying])

  useEffect(() => {
    if (!audioRef.current) return

    // Update volume
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const togglePlay = () => {
    if (!isInitialized) {
      setIsInitialized(true)
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Playback prevented:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }

    // Unmute if volume is changed while muted
    if (isMuted && newVolume > 0) {
      setIsMuted(false)
      if (audioRef.current) {
        audioRef.current.muted = false
      }
    }
  }

  const selectAudio = (audio: ScentAudio) => {
    setCurrentAudio(audio)
    setIsMenuOpen(false)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Main Control Button */}
      <motion.button
        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause ambient audio" : "Play ambient audio"}
      >
        <Music className="h-5 w-5" />
      </motion.button>

      {/* Audio Controls Panel */}
      <AnimatePresence>
        {isInitialized && (
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
                  onClick={toggleMute}
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Current Audio Info */}
            <div className="mb-3">
              <p className="text-sm font-medium">{currentAudio?.name}</p>
              <p className="text-xs text-gray-500">{currentAudio?.description}</p>
            </div>

            {/* Volume Slider */}
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

            {/* Audio Selection */}
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
                          currentAudio?.name === audio.name ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
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
