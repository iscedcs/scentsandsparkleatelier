"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import MaxWidthWrapper from "./shared/max-widthwrapper"

export function SplitScreenScrolling() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform values for left side
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const leftY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  // Transform values for right side (slightly delayed)
  const rightOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0])
  const rightY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [100, 0, 0, -100])

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <MaxWidthWrapper>
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl">Our Craft & Process</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover the meticulous process behind our handcrafted scents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[100vh] relative">
          <div className="sticky top-32 h-[80vh] overflow-hidden">
            <motion.div style={{ opacity: leftOpacity, y: leftY }} className="h-full w-full flex flex-col gap-8">
              <div className="relative flex-1 rounded-lg overflow-hidden">
                <video src="/video/IMG_6172.mp4" autoPlay loop muted playsInline></video>
                {/* <Image src="/products/sweet.jpeg" alt="Selecting premium ingredients" fill className="object-cover" /> */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                  <h3 className="font-heading text-xl">Selecting Premium Ingredients</h3>
                </div>
              </div>
              <div className="relative flex-1 rounded-lg overflow-hidden">
                <Image src="/products/IMG_2337.JPG" alt="Crafting by hand" fill className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                  <h3 className="font-heading text-xl">Crafting By Hand</h3>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="sticky top-32 h-[100vh] overflow-y-auto">
            {" "}
            <motion.div
              style={{ opacity: rightOpacity, y: rightY }}
              className="h-full flex flex-col justify-center py-4" 
            >
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-2xl mb-4">1. Sourcing the Finest Materials</h3>
                  <p className="text-gray-700">
                    We begin by sourcing the highest quality ingredients from sustainable suppliers. Our soy wax is 100%
                    natural and our fragrance oils are premium quality, free from harmful chemicals and phthalates. We
                    believe that exceptional scents start with exceptional ingredients.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-2xl mb-4">2. Artisanal Blending</h3>
                  <p className="text-gray-700">
                    Our master craftspeople carefully blend fragrance oils to create unique, balanced scents that evoke
                    specific moods and atmospheres. Each scent undergoes multiple iterations and testing to ensure the
                    perfect balance and throw.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-2xl mb-4">3. Hand Pouring</h3>
                  <p className="text-gray-700">
                    Every candle is hand-poured in small batches to ensure quality and attention to detail. We carefully
                    monitor temperature and setting conditions to create the perfect candle every time. This artisanal
                    approach allows us to maintain the highest standards of quality.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-2xl mb-4">4. Curing & Quality Control</h3>
                  <p className="text-gray-700">
                    After pouring, our candles cure for at least 48 hours to allow the fragrance to properly bind with
                    the wax. Each candle undergoes rigorous quality control checks before being packaged in our
                    eco-friendly, elegant packaging.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        </MaxWidthWrapper>
    </section>
  )
}
