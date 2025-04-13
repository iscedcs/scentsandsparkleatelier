"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Product } from "@/components/product-grid"

interface FeaturedCollectionProps {
  title: string
  description: string
  products: Product[]
  category: string
  onProductClick: (product: Product) => void
}

export function FeaturedCollection({
  title,
  description,
  products,
  category,
  onProductClick,
}: FeaturedCollectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  // Filter products by category
  const filteredProducts = products.filter((product) => product.category === category).slice(0, 3)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-3xl mb-4"
          >
            {title}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "4rem" } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-0.5 bg-primary mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-700 mb-8"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              View {category} Collection
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              whileHover={{ y: -10 }}
              className="cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <h4 className="font-medium text-sm">{product.name}</h4>
              <p className="text-primary text-sm">{product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
