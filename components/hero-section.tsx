"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  const slides = [
    {
      image: "/products/IMG_2245.JPG",
      title: "Transform Your Space",
      subtitle: "With Intentional Scents",
    },
    {
      image: "/products/IMG_2256.JPG",
      title: "Handcrafted With Love",
      subtitle: "Premium Natural Soy Candles",
    },
    {
      image: "/products/IMG_2334.JPG",
      title: "Elevate Your Moments",
      subtitle: "Luxury Home Fragrances",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 6000)
    return () => clearInterval(interval)
  }, [slides.length])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div className="relative w-full h-full">
              <Image src={slide.image || "/products/IMG_2337.JPG"} alt={slide.title} fill className="object-cover" priority />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white text-center px-4"
      >
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl mb-4"
          >
            {slides[currentSlide].title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 h-auto">
            <Link href='/collections'>
              Explore Collections
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-primary w-8" : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
