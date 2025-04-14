"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import type { Product } from "@/components/product-grid"

interface CollectionMasonryGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function CollectionMasonryGrid({ products, onProductClick }: CollectionMasonryGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  // Create columns for masonry layout
  const column1 = products.filter((_, i) => i % 3 === 0)
  const column2 = products.filter((_, i) => i % 3 === 1)
  const column3 = products.filter((_, i) => i % 3 === 2)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.6,
  //       ease: [0.22, 1, 0.36, 1],
  //     },
  //   },
  // }

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col gap-6"
      >
        {column1.map((product) => (
          <MasonryItem key={product.id} product={product} onClick={() => onProductClick(product)} />
        ))}
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col gap-6 mt-12 md:mt-24"
      >
        {column2.map((product) => (
          <MasonryItem key={product.id} product={product} onClick={() => onProductClick(product)} />
        ))}
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col gap-6 mt-0 md:mt-12"
      >
        {column3.map((product) => (
          <MasonryItem key={product.id} product={product} onClick={() => onProductClick(product)} />
        ))}
      </motion.div>
    </div>
  )
}

interface MasonryItemProps {
  product: Product
  onClick: () => void
}

function MasonryItem({ product, onClick }: MasonryItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      <h3 className="font-heading text-lg">{product.name}</h3>
      <p className="text-primary font-medium">{product.price}</p>
    </motion.div>
  )
}
