"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"

export function LoadingScreenPercentage() {
  const [loading, setLoading] = useState(true)
  const [loadingPercentage, setLoadingPercentage] = useState(0)
  const progressValue = useMotionValue(0)
  const progressPercentage = useTransform(progressValue, [0, 1], [0, 100])
  const loadingTimer = useRef<NodeJS.Timeout | null>(null)
  const incrementTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Simulate loading progress
    let percentage = 0
    incrementTimer.current = setInterval(() => {
      // Accelerate progress as it gets closer to 100%
      const increment = percentage < 50 ? 1 : percentage < 80 ? 0.8 : percentage < 95 ? 0.5 : 0.2
      percentage = Math.min(percentage + increment, 100)
      setLoadingPercentage(Math.floor(percentage))
      progressValue.set(percentage / 100)

      if (percentage >= 100) {
        if (incrementTimer.current) clearInterval(incrementTimer.current)

        // Add a small delay at 100% before hiding the loading screen
        loadingTimer.current = setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }, 30)

    return () => {
      if (incrementTimer.current) clearInterval(incrementTimer.current)
      if (loadingTimer.current) clearTimeout(loadingTimer.current)
    }
  }, [progressValue])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <div className="relative w-full max-w-xs h-40 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src="/assets/logo.jpg"
                alt="Scents & Sparkle Atelier"
                width={200}
                height={80}
                className="h-auto w-auto max-h-20 invert"
              />
            </motion.div>
          </div>

          <div className="w-full max-w-xs mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60 text-xs">LOADING</span>
              <motion.span className="text-primary font-medium text-sm">
                {Math.floor(progressPercentage.get())}%
              </motion.span>
            </div>
            <div className="h-[2px] w-full bg-white/10 overflow-hidden">
              <motion.div className="h-full bg-primary origin-left" style={{ scaleX: progressValue }} />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/80 mt-6 text-sm tracking-widest"
          >
            CRAFTING INTENTIONAL SCENTS
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
