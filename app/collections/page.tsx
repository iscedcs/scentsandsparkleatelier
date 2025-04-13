"use client"

import { CollectionCategoryTabs } from "@/components/collection-category-tabs"
import { CollectionMasonryGrid } from "@/components/collection-masonry-grid"
import { CollectionsHero } from "@/components/collections-hero"
import { FeaturedCollection } from "@/components/featured-collection"
import { ImmersiveProductShowcase } from "@/components/immersive-product-showcase"
import { ProductDetailModal } from "@/components/product-detail-modal"
import type { Product } from "@/components/product-grid"
import { ScentFinderQuiz } from "@/components/scent-finder-quiz"
import { ScentMoodSelector } from "@/components/scent-mood-selector"
import MaxWidthWrapper from "@/components/shared/max-widthwrapper"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // This would typically come from a database or API
  const products: Product[] = [
    {
      id: "1",
      name: "Love Spell",
      description: "A warm, inviting blend of vanilla and amber that creates a sense of comfort and intimacy.",
      image: "/products/IMG_2337.JPG",
      price: "₦8,500",
      category: "Signature",
    },
    {
      id: "2",
      name: "Sweet Lychee",
      description: "A bright, fruity fragrance that brings a refreshing energy to any space.",
      image: "/products/IMG_2337.JPG",
      price: "₦8,500",
      category: "Signature",
    },
    {
      id: "3",
      name: "Fruití",
      description: "A vibrant medley of citrus and tropical fruits that awakens the senses and brightens your space.",
      image: "/products/IMG_2337.JPG",
      price: "₦9,000",
      category: "Signature",
    },
    {
      id: "4",
      name: "Lavender Dreams",
      description: "A calming blend of lavender and chamomile, perfect for creating a relaxing atmosphere.",
      image: "/products/IMG_2337.JPG",
      price: "₦8,500",
      category: "Relaxing",
    },
    {
      id: "5",
      name: "Vanilla Dream",
      description: "A comforting scent of warm vanilla and creamy tonka bean that creates a cozy atmosphere.",
      image: "/products/IMG_2337.JPG",
      price: "₦8,500",
      category: "Classic",
    },
    {
      id: "6",
      name: "Citrus Burst",
      description: "An energizing blend of citrus notes that brings a fresh, clean scent to your space.",
      image: "/products/IMG_2337.JPG",
      price: "₦8,500",
      category: "Energizing",
    },
    {
      id: "7",
      name: "Ocean Breeze",
      description: "A fresh, clean scent reminiscent of a cool ocean breeze on a summer day.",
      image: "/products/IMG_2337.JPG",
      price: "₦9,000",
      category: "Fresh",
    },
    {
      id: "8",
      name: "Midnight Jasmine",
      description: "An elegant floral scent with notes of jasmine and lily that creates a sophisticated atmosphere.",
      image: "/products/IMG_2337.JPG",
      price: "₦8,500",
      category: "Floral",
    },
    {
      id: "9",
      name: "Autumn Spice",
      description: "A warm blend of cinnamon, clove, and nutmeg that evokes the cozy feeling of fall.",
      image: "/products/IMG_2337.JPG",
      price: "₦9,500",
      category: "Seasonal",
    },
  ]

  const categories = Array.from(new Set(products.map((product) => product.category).filter((category): category is string => category !== undefined)))

  const filteredProducts = activeCategory ? products.filter((product) => product.category === activeCategory) : products

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const closeProductDetail = () => {
    setSelectedProduct(null)
  }

  return (
    <main className="min-h-screen flex flex-col">

        <CollectionsHero />
      <div className="py-20">

        <ImmersiveProductShowcase products={products.slice(0, 4)} />

        <section className="py-24">
          <MaxWidthWrapper>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl">Our Collections</h2>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Explore our range of premium, handcrafted candles and home fragrances, designed to transform your space
                and elevate your everyday moments.
              </p>
            </div>

            {/* Category Tabs */}
            <CollectionCategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />

            {/* Featured Collections */}
            {activeCategory === null && (
              <div>
                <FeaturedCollection
                  title="Signature Collection"
                  description="Our most popular scents, carefully crafted to transform your space and elevate your everyday moments."
                  products={products}
                  category="Signature"
                  onProductClick={handleProductClick}
                />

                <FeaturedCollection
                  title="Relaxing Collection"
                  description="Create a calm, peaceful atmosphere with these soothing scents designed to help you unwind and de-stress."
                  products={products}
                  category="Relaxing"
                  onProductClick={handleProductClick}
                />

                <FeaturedCollection
                  title="Seasonal Collection"
                  description="Limited edition scents that capture the essence of each season, bringing the outdoors into your home."
                  products={products}
                  category="Seasonal"
                  onProductClick={handleProductClick}
                />
              </div>
            )}

            {/* Masonry Grid for filtered products */}
            {(activeCategory !== null || activeCategory === null) && (
              <CollectionMasonryGrid products={filteredProducts} onProductClick={handleProductClick} />
            )}
            </MaxWidthWrapper>
        </section>

        <ScentMoodSelector products={products} onProductClick={handleProductClick} />

        <ScentFinderQuiz products={products} />
      </div>

      <AnimatePresence>
        {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={closeProductDetail} />}
      </AnimatePresence>

    </main>
  )
}
