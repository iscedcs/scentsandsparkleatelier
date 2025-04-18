"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CollectionCategoryTabsProps {
  categories: string[]
  activeCategory: string | null
  onChange: (category: string | null) => void
}

export function CollectionCategoryTabs({ categories, activeCategory, onChange }: CollectionCategoryTabsProps) {
  return (
    <div className="relative mb-12 md:mb-16">
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center border-b border-gray-200 w-full md:inline-flex md:w-auto">
          <button
            className={cn(
              "relative px-4 py-2 md:px-6 md:py-3 text-base md:text-sm font-medium transition-colors min-w-[100px] text-center",
              activeCategory === null ? "text-primary" : "text-gray-500 hover:text-gray-800",
            )}
            onClick={() => onChange(null)}
          >
            All Collections
            {activeCategory === null && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
              />
            )}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={cn(
                "relative px-4 py-2 md:px-6 md:py-3 text-base md:text-sm font-medium transition-colors min-w-[100px] text-center",
                activeCategory === category ? "text-primary" : "text-gray-500 hover:text-gray-800",
              )}
              onClick={() => onChange(category)}
            >
              {category}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}