"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export function AboutHeroParallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative pt-20 min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="w-full h-full relative">
          <Image
            src="/products/photo_2025-04-13_22-16-15.jpg"
            alt="About Scents & Sparkle Atelier"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      <div className=" left-4 relative z-20 text-white">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="text-lg mb-2 text-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {`//Our Story`}
          </motion.p>

          <motion.h1
            className="font-heading text-4xl md:text-6xl lg:text-6xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {`Crafting Intentional Scents For Every Space`}
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              "We focus on creating premium, high-quality candles that stand the test of time.",
              "Our scents blend modern aesthetics with functional solutions to enhance any space.",
              "We use eco-friendly materials to create sustainable, responsible home fragrances.",
            ].map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="w-12 h-0.5 bg-primary mb-4"></div>
                <p className="text-white/90">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
