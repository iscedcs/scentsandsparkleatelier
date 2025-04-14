"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import type { Product } from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

function useProductTransform(scrollYProgress: any, index: number, totalProducts: number) {
  const startProgress = index * (1 / totalProducts)
  const endProgress = startProgress + 0.5

  const opacity = useTransform(scrollYProgress, [startProgress, Math.min(startProgress + 0.1, 1)], [0, 1])
  const xOffset = useTransform(scrollYProgress, [startProgress, endProgress], [0, ((index % 3) - 1) * 120])
  const yOffset = useTransform(scrollYProgress, [startProgress, endProgress], [0, Math.floor(index / 3) * 120])
  const scale = useTransform(scrollYProgress, [startProgress, endProgress], [0.8, 1])
  const rotate = useTransform(scrollYProgress, [startProgress, endProgress], [index % 2 === 0 ? -5 : 5, 0])
  const zIndex = useTransform(scrollYProgress, [0, 1], [totalProducts - index, 1])

  return { opacity, xOffset, yOffset, scale, rotate, zIndex }
}

interface ProductCardProps {
  product: Product
  index: number
  totalProducts: number
  scrollYProgress: any 
  onClick: () => void
}

function ProductCard({ product, index, totalProducts, scrollYProgress, onClick }: ProductCardProps) {
  const transforms = useProductTransform(scrollYProgress, index, totalProducts)

  return (
    <motion.div
      key={product.id}
      className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
      style={{
        opacity: transforms.opacity,
        scale: transforms.scale,
        zIndex: transforms.zIndex,
        x: transforms.xOffset,
        y: transforms.yOffset,
        rotate: transforms.rotate,
        position: "absolute",
        width: "calc(100% - 2rem)",
        left: "50%",
        top: "50%",
        translateX: "-50%",
        translateY: "-50%",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
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
      <div className="p-6">
        <h3 className="font-heading text-xl mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">{product.price}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
        </div>
      </div>
    </motion.div>
  )
}

interface StackingProductGridEnhancedProps {
  products: Product[]
  title?: string
  subtitle?: string
}

export function StackingProductGridEnhanced({ products, title, subtitle }: StackingProductGridEnhancedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const closeProductDetail = () => {
    setSelectedProduct(null)
  }

  return (
    <section className="py-24 bg-white" ref={containerRef}>
      <div className="container">
        {title && (
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl">{title}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
            {subtitle && <p className="text-gray-700 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <div className="relative h-[200vh]">
          <div className="sticky top-20 h-screen flex items-center justify-center overflow-hidden">
            <div className="relative w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    totalProducts={products.length}
                    scrollYProgress={scrollYProgress}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeProductDetail}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square">
                  <Image
                    src={selectedProduct.image || "/products/IMG_2337.JPG"}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-xs text-primary uppercase tracking-wider mb-2 block">
                        {selectedProduct.category}
                      </span>
                      <h3 className="font-heading text-3xl">{selectedProduct.name}</h3>
                    </div>
                    <button
                      onClick={closeProductDetail}
                      className="text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className="text-2xl text-primary font-medium mb-4">{selectedProduct.price}</p>
                    <div className="w-16 h-0.5 bg-primary mb-4"></div>
                    <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-medium mb-3">Features:</h4>
                    <ul className="space-y-2">
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
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">Add to Cart</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}