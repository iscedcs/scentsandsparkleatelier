"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export function VideoBackgroundSection() {
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          loop
          muted
          playsInline
          autoPlay
          poster="/video/IMG_6170.mp4?height=1080&width=1920"
        >
          <source
            src="/video/IMG_6170.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10  h-full flex flex-col items-center justify-center text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="font-heading text-3xl md:text-5xl mb-6">Elevate Your Space With Intentional Scents</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Our handcrafted candles transform ordinary moments into extraordinary experiences. Discover the power of
            fragrance to create atmosphere, evoke memories, and enhance your wellbeing.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white">Shop Our Collection</Button>
        </motion.div>

        {/* Video controls */}
        <div className="absolute bottom-8 right-8 flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
    </section>
  )
}
