"use client"

import type React from "react"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import type { Product } from "@/components/product-grid"
import MaxWidthWrapper from "./shared/max-widthwrapper"
import Link from "next/link"

interface HorizontalProductShowcaseProps {
  products: Product[]
  onProductClick?: (product: Product) => void
}

export function HorizontalProductShowcase({ products, onProductClick }: HorizontalProductShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  // Handle manual scrolling with buttons
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: "smooth" })
      updateActiveIndex()
    }
  }

  const scrollLeftHandler = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: "smooth" })
      updateActiveIndex()
    }
  }

  // Update active index based on scroll position
  const updateActiveIndex = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft
      const itemWidth = containerRef.current.offsetWidth / 2.5 // Approximate width of each item
      const newIndex = Math.round(scrollPosition / itemWidth)
      setActiveIndex(Math.min(newIndex, products.length - 1))
    }
  }

  // Handle mouse drag for scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Scroll speed multiplier
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    updateActiveIndex()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      updateActiveIndex()
    }
  }

  // Handle scroll events
  const handleScroll = () => {
    updateActiveIndex()
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <MaxWidthWrapper>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl">Explore Our Collection</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            {`Scroll horizontally to discover our premium handcrafted candles and home fragrances`}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeftHandler}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-primary hover:text-white transition-colors shadow-md"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-primary hover:text-white transition-colors shadow-md"
            aria-label="Next products"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Horizontal Scrolling Container */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory py-8 px-4 -mx-4"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onScroll={handleScroll}
          >
            {/* Spacer for better UX */}
            <div className="flex-shrink-0 w-[10vw]"></div>

            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className={`flex-shrink-0 w-[80vw] md:w-[30vw] lg:w-[25vw] snap-center px-4 transition-all duration-300 ${
                  activeIndex === index ? "scale-105" : "scale-95 opacity-70"
                }`}
                onClick={() => onProductClick && onProductClick(product)}
                whileHover={{ scale: activeIndex === index ? 1.08 : 1 }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col cursor-pointer">
                  <div className="relative md:aspect-[3/4] aspect-[4/4] overflow-hidden">
                    <Image
                      src={product.image || "/products/IMG_2337.JPG"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-full p-2"
                      >
                        <Plus className="h-6 w-6 text-primary" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-heading text-xl mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        <Link href='/collections'>
                        View
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Spacer for better UX */}
            <div className="flex-shrink-0 w-[10vw]"></div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (containerRef.current) {
                  const itemWidth = containerRef.current.offsetWidth / 2.5
                  containerRef.current.scrollTo({
                    left: itemWidth * index,
                    behavior: "smooth",
                  })
                  setActiveIndex(index)
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === index ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
