"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ShoppingCart, Heart, Share2 } from "lucide-react"
import type { Product } from "@/components/product-grid"

interface ProductDetailModalProps {
  product: Product
  onClose: () => void
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="p-8 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs text-primary uppercase tracking-wider mb-2 block">{product.category}</span>
                <h3 className="font-heading text-3xl">{product.name}</h3>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-2xl text-primary font-medium mb-4">{product.price}</p>
              <div className="w-16 h-0.5 bg-primary mb-4"></div>
              <p className="text-gray-700 mb-6">{product.description}</p>
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

            <div className="mb-8">
              <h4 className="font-medium mb-3">Quantity:</h4>
              <div className="flex items-center border border-gray-300 rounded-md w-32">
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">-</button>
                <input type="text" value="1" readOnly className="w-full text-center border-0 focus:ring-0" />
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">+</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Button className="col-span-2 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" className="border-gray-300">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-gray-300">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>SKU: {product.id}</span>
                <span>Free shipping on orders over ₦20,000</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
