"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import MaxWidthWrapper from "./shared/max-widthwrapper"
import Link from "next/link"

export function StorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section ref={ref} className="py-20 bg-white">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl">Our Story</h2>
            <div className="w-20 h-1 bg-primary mt-4 mb-6"></div>
            <p className="text-gray-700 mb-4">
              {`At Scents & Sparkle Atelier, every scent tells a story. What started as a simple love for personal
              fragrances grew into a passion for crafting warm, comforting spaces through high-quality, non-toxic
              scented candles and home fragrances.`}
            </p>
            <p className="text-gray-700 mb-6">
              {`Rooted in a deep appreciation for elegance, intention, and emotional connection, our mission is to bring
              premium, aesthetically curated scents into homes across Nigeria and beyond.`}
            </p>
            <p className="text-gray-700 mb-6">
              {`We believe a beautiful scent can transform a space and a moment, helping people build homes that feel like
              love.`}
            </p>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link href='/about'>
              Learn More
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px]"
          >
            <div className="relative w-full h-full">
              <Image src="/products/IMG_2337.JPG" alt="Our premium candles" fill className="object-cover rounded-lg" />
            </div>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
