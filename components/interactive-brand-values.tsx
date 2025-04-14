"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Leaf, Recycle, Heart, Award, ChevronDown, ChevronUp } from "lucide-react"
import MaxWidthWrapper from "./shared/max-widthwrapper"

interface BrandValue {
  icon: React.ReactNode
  title: string
  shortDescription: string
  longDescription: string
  color: string
}

export function InteractiveBrandValues() {
  const [expandedValue, setExpandedValue] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const values: BrandValue[] = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Natural Ingredients",
      shortDescription: "We use only 100% natural soy wax and premium fragrance oils.",
      longDescription:
        "Our commitment to natural ingredients goes beyond just using soy wax. We meticulously source every component of our products, from the cotton wicks to the essential oils, ensuring they meet our strict standards for quality and sustainability. We regularly visit our suppliers and maintain transparency about where our materials come from, because we believe you deserve to know exactly what you're bringing into your home.",
      color: "bg-green-50 border-green-200 text-green-700",
    },
    {
      icon: <Recycle className="h-8 w-8" />,
      title: "Sustainability",
      shortDescription: "Eco-friendly practices and recyclable packaging.",
      longDescription:
        "Sustainability isn't just a buzzword for us—it's a core principle that guides every decision we make. From our recyclable glass containers to our plastic-free shipping materials, we're constantly looking for ways to reduce our environmental footprint. We've implemented a candle container return program where customers can send back their empty vessels for reuse, and we offset our carbon emissions through partnerships with environmental organizations.",
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Handcrafted With Love",
      shortDescription: "Each product is hand-poured in small batches.",
      longDescription:
        "The human touch makes all the difference. Our small team of artisans personally oversees every step of the candle-making process, from mixing and pouring to labeling and packaging. We believe this attention to detail creates a product with soul—something that can't be replicated in mass production. Each small batch is numbered and signed by the artisan who created it, establishing a personal connection between maker and customer.",
      color: "bg-rose-50 border-rose-200 text-rose-700",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Premium Quality",
      shortDescription: "We source the finest ingredients and materials.",
      longDescription:
        "Quality is non-negotiable for us. We test hundreds of fragrance combinations before selecting the perfect blend for each scent. Our candles undergo rigorous burn tests to ensure they perform flawlessly, with even melting and optimal scent throw. We've rejected materials that didn't meet our standards, even when it meant delays or higher costs. This uncompromising approach to quality means you can trust that every product bearing our name represents the very best we can create.",
      color: "bg-amber-50 border-amber-200 text-amber-700",
    },
  ]

  const toggleExpand = (index: number) => {
    setExpandedValue(expandedValue === index ? null : index)
  }

  return (
    <section ref={ref} className="py-24 bg-muted/50">
      <MaxWidthWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl">Our Values</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            These core principles guide everything we do, from product development to customer service.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`border rounded-lg overflow-hidden ${
                expandedValue === index ? value.color : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full p-6 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${expandedValue === index ? "bg-white/80" : "bg-primary/10"}`}>
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl">{value.title}</h3>
                    {expandedValue !== index && <p className="text-gray-600 text-sm mt-1">{value.shortDescription}</p>}
                  </div>
                </div>
                {expandedValue === index ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {expandedValue === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="w-16 h-0.5 bg-white/50 mb-4"></div>
                      <p className="text-base">{value.longDescription}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
