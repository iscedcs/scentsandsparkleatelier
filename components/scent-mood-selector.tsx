"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Product } from "@/components/product-grid"
import MaxWidthWrapper from "./shared/max-widthwrapper"

interface ScentMoodSelectorProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

type Mood = {
  name: string
  description: string
  image: string
  color: string
}

export function ScentMoodSelector({ products, onProductClick }: ScentMoodSelectorProps) {
  const [activeMood, setActiveMood] = useState<string | null>(null)

  const moods: Mood[] = [
    {
      name: "Relaxing",
      description: "Create a calm, peaceful atmosphere with these soothing scents",
      image: "/products/IMG_2337.JPG",
      color: "bg-blue-50",
    },
    {
      name: "Energizing",
      description: "Boost your mood and energy with these uplifting fragrances",
      image: "/products/photo_2025-04-13_22-16-01.jpg",
      color: "bg-yellow-50",
    },
    {
      name: "Romantic",
      description: "Set the mood for intimate moments with these warm scents",
      image: "/products/photo_2025-04-13_22-15-58.jpg",
      color: "bg-rose-50",
    },
    {
      name: "Fresh",
      description: "Bring the outdoors in with these clean, refreshing fragrances",
      image: "/products/photo_2025-04-13_22-16-33.jpg",
      color: "bg-green-50",
    },
  ]

  // Get products that match the selected mood
  const getMoodProducts = (mood: string) => {
    // This is a simplified matching logic - in a real app, you'd have mood tags for products
    const moodKeywords: Record<string, string[]> = {
      Relaxing: ["calm", "relax", "soothing", "lavender"],
      Energizing: ["energy", "fresh", "citrus", "burst"],
      Romantic: ["romantic", "warm", "cozy", "love", "spell"],
      Fresh: ["clean", "fresh", "ocean", "breeze"],
    }

    const keywords = moodKeywords[mood] || []
    return products
      .filter((product) =>
        keywords.some(
          (keyword) =>
            product.name.toLowerCase().includes(keyword) || product.description.toLowerCase().includes(keyword),
        ),
      )
      .slice(0, 3)
  }

  return (
    <section className="py-24 bg-muted/50">
      <MaxWidthWrapper>
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl">Shop By Mood</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Find the perfect scent to create your desired atmosphere and enhance your mood
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {moods.map((mood) => (
            <motion.div
              key={mood.name}
              className={`${mood.color} rounded-lg p-6 cursor-pointer ${
                activeMood === mood.name ? "ring-2 ring-primary" : ""
              }`}
              whileHover={{ y: -5 }}
              onClick={() => setActiveMood(activeMood === mood.name ? null : mood.name)}
            >
              <div className="relative w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src={mood.image || "/placeholder.svg"} alt={mood.name} fill className="object-cover" />
              </div>
              <h3 className="font-heading text-lg text-center mb-2">{mood.name}</h3>
              <p className="text-sm text-gray-600 text-center">{mood.description}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="font-heading text-2xl mb-6">{activeMood} Scents</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {getMoodProducts(activeMood).map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      className="cursor-pointer"
                      onClick={() => onProductClick(product)}
                    >
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-heading text-lg mb-1">{product.name}</h4>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                      <p className="text-primary font-medium">{product.price}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button className="bg-primary hover:bg-primary/90 text-white">View All {activeMood} Scents</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </MaxWidthWrapper>
    </section>
  )
}
