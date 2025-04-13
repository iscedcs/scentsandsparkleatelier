"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedLogo } from "./animated-logo"

interface LoadingScreenAdvancedProps {
  onComplete?: () => void;
}
export function LoadingScreenAdvanced({ onComplete }: LoadingScreenAdvancedProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      if (onComplete) {
        onComplete();
      }
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

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
          <div className="relative w-full max-w-xs h-40 mb-8 flex items-center justify-center">
            <AnimatedLogo />
          </div>

          <div className="relative w-full max-w-xs h-1 bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 h-full bg-primary"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-white/80 text-sm tracking-widest"
            >
              CRAFTING INTENTIONAL SCENTS
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-white/50 text-xs mt-2"
            >
              SINCE 2023
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
