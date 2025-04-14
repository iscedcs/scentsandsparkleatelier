"use client"

import { useRef, useMemo, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import type { Product } from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { X, ShoppingCart } from "lucide-react"

interface GridToStackEffectEnhancedProps {
  products: Product[]
  title?: string
  subtitle?: string
}

interface ProductCardProps {
  product: Product
  transform: {
    startProgress: number
    endProgress: number
    xStart: number
    xEnd: number
    yStart: number
    yEnd: number
    scaleStart: number
    scaleEnd: number
    rotateXStart: number
    rotateXEnd: number
    rotateYStart: number
    rotateYEnd: number
    zIndexStart: number
    zIndexEnd: number
    opacityStart: number
    opacityEnd: number
    index: number
  }
  scrollYProgress: any // You can refine this type with MotionValue<number>
  onClick: () => void
}

function ProductCard({ product, transform, scrollYProgress, onClick }: ProductCardProps) {
  const x = useTransform(
    scrollYProgress,
    [transform.startProgress, transform.endProgress],
    [transform.xStart, transform.xEnd],
  )
  const y = useTransform(
    scrollYProgress,
    [transform.startProgress, transform.endProgress],
    [transform.yStart, transform.yEnd],
  )
  const scale = useTransform(
    scrollYProgress,
    [transform.startProgress, transform.endProgress],
    [transform.scaleStart, transform.scaleEnd],
  )
  const rotateX = useTransform(
    scrollYProgress,
    [transform.startProgress, transform.endProgress],
    [transform.rotateXStart, transform.rotateXEnd],
  )
  const rotateY = useTransform(
    scrollYProgress,
    [transform.startProgress, transform.endProgress],
    [transform.rotateYStart, transform.rotateYEnd],
  )
  const zIndex = useTransform(
    scrollYProgress,
    [transform.startProgress, transform.endProgress],
    [transform.zIndexStart, transform.zIndexEnd],
  )
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, transform.startProgress - 0.1), transform.startProgress],
    [transform.opacityStart, transform.opacityEnd],
  )
  const isStacked = useTransform(scrollYProgress, (value: number) => value >= transform.endProgress)

  return (
    <motion.div
      className="absolute bg-white rounded-lg overflow-hidden shadow-lg w-[300px] cursor-pointer"
      style={{
        x,
        y,
        scale,
        rotateX,
        rotateY,
        zIndex,
        opacity,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: isStacked.get() ? 1.05 : 1.02,
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
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg mb-1">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-primary font-medium">{product.price}</p>
          <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function GridToStackEffectEnhanced({ products, title, subtitle }: GridToStackEffectEnhancedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const productTransforms = useMemo(() => {
    const totalRows = Math.ceil(products.length / 3)

    return products.map((product, index) => {
      const row = Math.floor(index / 3)
      const col = index % 3
      const rowFromBottom = totalRows - 1 - row
      const startProgress = rowFromBottom * 0.15
      const endProgress = startProgress + 0.15
      const xStart = (col - 1) * 110
      const xEnd = 0
      const yStart = row * 110
      const yEnd = -5 * index
      const scaleStart = 1
      const scaleEnd = 1 + index * 0.01
      const rotateXStart = 0
      const rotateXEnd = -2
      const rotateYStart = 0
      const rotateYEnd = col === 0 ? 2 : col === 2 ? -2 : 0
      const zIndexStart = 1
      const zIndexEnd = products.length - index
      const opacityStart = 0
      const opacityEnd = 1

      return {
        startProgress,
        endProgress,
        xStart,
        xEnd,
        yStart,
        yEnd,
        scaleStart,
        scaleEnd,
        rotateXStart,
        rotateXEnd,
        rotateYStart,
        rotateYEnd,
        zIndexStart,
        zIndexEnd,
        opacityStart,
        opacityEnd,
        index,
      }
    })
  }, [products])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const closeProductDetail = () => {
    setSelectedProduct(null)
  }

  return (
    <section className="relative h-[200vh]" ref={containerRef}>
      <div className="sticky top-0 pt-32 pb-8 bg-white z-10">
        <div className="container">
          {title && (
            <div className="text-center">
              <h2 className="font-heading text-3xl md:text-4xl">{title}</h2>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
              {subtitle && <p className="text-gray-700 max-w-2xl mx-auto">{subtitle}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="sticky top-0 h-screen pt-32">
        <div className="container">
          <div className="relative h-[70vh] flex items-center justify-center perspective">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                transform={productTransforms[index]}
                scrollYProgress={scrollYProgress}
                onClick={() => handleProductClick(product)}
              />
            ))}
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
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}