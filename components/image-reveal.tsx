"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

interface ImageRevealProps {
  src: string
  alt: string
}

export function ImageReveal({ src, alt }: ImageRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="relative h-[500px] rounded-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-primary"
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ originX: 1 }}
      />

      <div className="relative w-full h-full">
      <Image
                src="/products/photo_2025-04-13_22-16-04.jpg"
                alt="Sustainable candle making"
                fill
                className="object-cover rounded-lg"
              />      </div>
    </motion.div>
  )
}
