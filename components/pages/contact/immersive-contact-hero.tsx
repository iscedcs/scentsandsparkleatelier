"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function ImmersiveContactHero() {
  const ref = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate mouse position as percentage of window
      const x = (clientX / windowWidth - 0.5) * 2 // -1 to 1
      const y = (clientY / windowHeight - 0.5) * 2 // -1 to 1

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          opacity,
          scale,
          x: mousePosition.x * -20, // Subtle parallax effect
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="w-full h-full relative">
          <Image src="/products/IMG_2256.JPG" alt="Contact Us" fill className="object-cover" priority />
        </div>
      </motion.div>

      <div className="container relative z-20 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto rounded-full border-2 border-primary flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Image src="/assets/logo-trans.png" alt="Scents & Sparkle Atelier" width={50} height={50} className="invert" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="font-heading text-5xl md:text-7xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Let's Connect
          </motion.h1>

          <motion.p
            className="text-xl text-white/80 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We're here to answer your questions, hear your feedback, and help you find the perfect scent for your space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="text-white/80"
            >
              <ArrowDown className="h-8 w-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
