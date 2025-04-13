"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"

interface CircularLoadingScreenAdvancedProps {
  onComplete?: () => void;
}
export function CircularLoadingScreenAdvanced({ onComplete }: CircularLoadingScreenAdvancedProps) {
  const [loading, setLoading] = useState(true)
  const progressValue = useMotionValue(0)
  const circleRadius = 80
  const circleCircumference = 2 * Math.PI * circleRadius

  // Define all transforms upfront to avoid conditional hook calls
  const progressPercentage = useTransform(progressValue, [0, 1], [0, 100])
  const roundedPercentage = useTransform(progressPercentage, (value) => Math.floor(value))
  const logoOpacity = useTransform(progressValue, [0, 1], [0.2, 1])
  const logoScale = useTransform(progressValue, [0, 1], [0.9, 1])
  const strokeDashoffset = useTransform(progressValue, [0, 1], [circleCircumference, 0])
  const circle1Opacity = useTransform(progressValue, [0, 0.125, 1], [0, 1, 1])
  const circle2Opacity = useTransform(progressValue, [0, 0.25, 1], [0, 1, 1])
  const circle3Opacity = useTransform(progressValue, [0, 0.375, 1], [0, 1, 1])
  const circle4Opacity = useTransform(progressValue, [0, 0.5, 1], [0, 1, 1])
  const circle5Opacity = useTransform(progressValue, [0, 0.625, 1], [0, 1, 1])
  const circle6Opacity = useTransform(progressValue, [0, 0.75, 1], [0, 1, 1])
  const circle7Opacity = useTransform(progressValue, [0, 0.875, 1], [0, 1, 1])
  const circle0Opacity = progressValue // Directly use progressValue for the first circle

  const loadingTimer = useRef<NodeJS.Timeout | null>(null)
  const incrementTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Simulate loading progress
    let percentage = 0
    incrementTimer.current = setInterval(() => {
      // Non-linear progress to make it feel more realistic
      const increment =
        percentage < 30 ? 1.2 : percentage < 60 ? 0.8 : percentage < 80 ? 0.5 : percentage < 95 ? 0.3 : 0.1

      percentage = Math.min(percentage + increment, 100)
      progressValue.set(percentage / 100)

      if (percentage >= 100) {
        if (incrementTimer.current) clearInterval(incrementTimer.current)

        // Add a small delay at 100% before hiding the loading screen
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
  }, [progressValue, onComplete])

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
          <div className="relative flex items-center justify-center w-64 h-64">
            <svg className="absolute w-full h-full" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={circleRadius}
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
              />
              <motion.circle
                cx="100"
                cy="100"
                r={circleRadius}
                fill="transparent"
                stroke="hsl(44,37%,49%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circleCircumference}
                style={{ strokeDashoffset }}
                transform="rotate(-90 100 100)"
              />

              <motion.circle
                cx="100"
                cy={100 - circleRadius}
                r="3"
                fill="hsl(44,37%,49%)"
                style={{ opacity: circle0Opacity }}
              />
              <motion.circle
                cx={100 + circleRadius * Math.cos((Math.PI / 4) * 7)}
                cy={100 + circleRadius * Math.sin((Math.PI / 4) * 7)}
                r="3"
                fill="hsl(44,37%,49%)"
                style={{ opacity: circle1Opacity }}
              />
              <motion.circle
                cx={100 + circleRadius}
                cy="100"
                r="3"
                fill="hsl(44,37%,49%)"
                style={{ opacity: circle2Opacity }}
              />
              <motion.circle
                cx={100 + circleRadius * Math.cos((Math.PI / 4) * 1)}
                cy={100 + circleRadius * Math.sin((Math.PI / 4) * 1)}
                r="3"
                fill="hsl(44,37%,49%)"
                style={{ opacity: circle3Opacity }}
              />
              <motion.circle
                cx="100"
                cy={100 + circleRadius}
                r="3"
                fill="hsl(44,37%,49%)"
                style={{ opacity: circle4Opacity }}
              />
              <motion.circle
                cx={100 + circleRadius * Math.cos((Math.PI / 4) * 5)}
                cy={100 + circleRadius * Math.sin((Math.PI / 4) * 5)}
                r="3"
                fill="hsl(44,37%,49%)"
                style={{ opacity: circle5Opacity }}
              />
              <motion.circle
                cx={100 - circleRadius}
                cy="100"
                r="3"
                fill="hsl(44,37%,49%)"
                style={{ opacity: circle6Opacity }}
              />
              <motion.circle
                cx={100 + circleRadius * Math.cos((Math.PI / 4) * 3)}
                cy={100 + circleRadius * Math.sin((Math.PI / 4) * 3)}
                r="3"
                fill="hsl(44,37%,49%)"
                style={{ opacity: circle7Opacity }}
              />
            </svg>

            {/* Logo that becomes more visible as progress increases */}
            <motion.div
              style={{ opacity: logoOpacity, scale: logoScale }}
              className="relative z-10 flex items-center justify-center w-40 h-40"
            >
              <Image
                src="/assets/logo.jpg"
                alt="Scents & Sparkle Atelier"
                width={160}
                height={64}
                className="h-auto w-auto max-h-20 invert"
              />
            </motion.div>

            {/* Percentage counter */}
            <motion.div
              className="absolute bottom-0 text-primary font-heading text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span>{roundedPercentage}</motion.span>
              <span>%</span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/80 mt-8 text-sm tracking-widest"
          >
            CRAFTING INTENTIONAL SCENTS
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
