"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export interface Product {
  id: string
  name: string
  description: string
  image: string
  price: string
  category?: string
}

interface ProductGridProps {
  products: Product[]
  title?: string
  description?: string
}

export function ProductGrid({ products, title, description }: ProductGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section ref={ref} className="py-16">
      <div className="container">
        {(title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {title && <h2 className="font-heading text-3xl md:text-4xl">{title}</h2>}
            {title && <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>}
            {description && <p className="text-gray-700 max-w-2xl mx-auto">{description}</p>}
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg mb-4">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image src={product.image || "/products/IMG_2337.JPG"} alt={product.name} fill className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                  <Button className="w-full bg-white text-black hover:bg-primary hover:text-white border border-primary">
                    Quick View
                  </Button>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="font-heading text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-primary font-medium mt-auto">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
