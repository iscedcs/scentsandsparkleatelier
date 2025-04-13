"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AnimatedLogo() {
  // SVG path for the "S" shape (simplified)
  const sPath = "M20,50 C20,30 40,20 60,30 C80,40 60,60 40,70 C20,80 40,100 60,90 C80,80 80,70 80,50"

  // SVG path for the "A" shape (simplified)
  const aPath = "M50,10 L80,90 M30,90 L60,10 M35,60 L75,60"

  return (
    <div className="relative w-40 h-40">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Image
          src="/assets/logo.jpg"
          alt="Scents & Sparkle Atelier"
          width={160}
          height={64}
          className="h-auto w-auto max-h-20 invert"
        />
      </motion.div>

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <motion.path
          d={sPath}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          stroke="hsl(44,37%,49%)"
          strokeWidth={2}
          fill="transparent"
        />
        <motion.path
          d={aPath}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          stroke="white"
          strokeWidth={2}
          fill="transparent"
        />
      </svg>
    </div>
  )
}
