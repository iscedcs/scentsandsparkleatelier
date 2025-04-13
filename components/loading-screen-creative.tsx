"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"


interface LoadingScreenCreativeProps {
  onComplete?: () => void
}
export function LoadingScreenCreative({ onComplete }: LoadingScreenCreativeProps) {
  const [loading, setLoading] = useState(true)
  const progressValue = useMotionValue(0)
  const progressPercentage = useTransform(progressValue, [0, 1], [0, 100])
  const roundedPercentage = useTransform(progressPercentage, (value) => Math.floor(value))
  const loadingTimer = useRef<NodeJS.Timeout | null>(null)
  const incrementTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let percentage = 0
    incrementTimer.current = setInterval(() => {
      const increment =
        percentage < 30 ? 1.2 : percentage < 60 ? 0.8 : percentage < 80 ? 0.5 : percentage < 95 ? 0.3 : 0.1

      percentage = Math.min(percentage + increment, 100)
      progressValue.set(percentage / 100)

      if (percentage >= 100) {
        if (incrementTimer.current) clearInterval(incrementTimer.current)

        loadingTimer.current = setTimeout(() => {
          setLoading(false)
          if (onComplete) {
            onComplete();
          }
        }, 800)
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

          <div className="relative w-full max-w-xs mb-8">
            <div className="flex justify-between items-center mb-4">
              <motion.div className="text-primary font-heading text-4xl" style={{ opacity: progressValue }}>
                <motion.span>{roundedPercentage}</motion.span>
                <span>%</span>
              </motion.div>

              <div className="text-right">
                <motion.div
                  className="text-white/80 text-xs uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {roundedPercentage.get() < 100 ? "Loading" : "Complete"}
                </motion.div>
                <motion.div
                  className="text-white/50 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Please wait...
                </motion.div>
              </div>
            </div>

            <div className="h-[2px] w-full bg-white/10 overflow-hidden">
              <motion.div className="h-full bg-primary origin-left" style={{ scaleX: progressValue }} />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/80 text-sm tracking-widest"
          >
            CRAFTING INTENTIONAL SCENTS
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
