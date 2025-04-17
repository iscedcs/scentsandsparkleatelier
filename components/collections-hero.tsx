"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import MaxWidthWrapper from "./shared/max-widthwrapper"

export function CollectionsHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative pt-20 min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, opacity, }}>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="w-full h-full relative">
          <video src="/video/IMG_6170.mp4" loop muted playsInline autoPlay className="object-cover w-full"></video>
          {/* <Image src="/products/IMG_2337.JPG" alt="Our Collections" fill className="object-cover" priority /> */}
        </div>
      </motion.div>

      {/* max-w-full mx-auto px-4  md:max-w-screen-md lg:max-w-7xl */}
      <div className=" md:max-w-screen-md ld:max-w-7xl max-w-full px-4 mx-px ">
      <div className="left-14  relative z-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <motion.p
            className="text-lg mb-2 text-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {`//Our Collections`}
          </motion.p>

          <motion.h1
            className="font-heading text-4xl md:text-6xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover Our Signature Scents
          </motion.h1>

          <motion.p
            className="text-lg text-white/80 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {`Explore our range of premium, handcrafted candles and home fragrances.`}
          </motion.p>
        </motion.div>
      </div>
      </div>
    </section>
  )
}
