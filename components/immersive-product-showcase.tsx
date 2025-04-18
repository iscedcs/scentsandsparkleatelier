"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/components/product-grid"
import MaxWidthWrapper from "./shared/max-widthwrapper"
import Link from "next/link"

interface ImmersiveProductShowcaseProps {
  products: Product[]
}

export function ImmersiveProductShowcase({ products }: ImmersiveProductShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const constraintsRef = useRef(null)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (autoplay) {
      interval = setInterval(() => {
        handleNext()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoplay, currentIndex,])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  const currentProduct = products[currentIndex]

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <section className="py-12 md:py-20 bg-muted/50">
        <MaxWidthWrapper>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl md:text-4xl">Featured Collection</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
            {`Explore our most popular scents, crafted with premium ingredients and designed to transform your space.`}
          </p>
        </div>

        <div
          className="relative overflow-hidden"
          ref={constraintsRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center"
            >
              <div className="relative aspect-[4/3] md:aspect-square rounded-lg overflow-hidden">
                <Image
                  src={currentProduct.image || "/placeholder.svg"}
                  alt={currentProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="font-heading text-2xl md:text-3xl mb-2">{currentProduct.name}</h3>
                <p className="text-primary text-lg md:text-xl font-medium mb-6">{currentProduct.price}</p>
                <div className="w-16 h-0.5 bg-primary mb-4 md:mb-6"></div>
                <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">{currentProduct.description}</p>

                <div className="mb-4 md:mb-8">
                  <h4 className="font-medium mb-3 text-sm md:text-base">Features:</h4>
                  <ul className="space-y-2 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>100% Natural Soy Wax</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Premium Fragrance Oils</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>40+ Hour Burn Time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Handcrafted in Small Batches</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                  <Link href='https://scentsandsparkleatelier.bumpa.shop/'>
                  Order Now
                  </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handlePrevious}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-primary hover:text-white transition-colors z-10"
            aria-label="Previous product"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-primary hover:text-white transition-colors z-10"
            aria-label="Next product"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
        </MaxWidthWrapper>
    </section>
  )
}
