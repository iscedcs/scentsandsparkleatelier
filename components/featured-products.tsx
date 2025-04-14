"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import MaxWidthWrapper from "./shared/max-widthwrapper"

export function FeaturedProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const products = [
    {
      name: "Love Spell",
      description: "100% Natural Soy Candle, hand poured with love",
      image: "/products/IMG_2245.JPG",
    },
    {
      name: "Sweet Lychee",
      description: "100% Natural Soy Candle, hand poured with love",
      image: "/products/IMG_2256.JPG",
    },
    {
      name: "Fruití",
      description: "100% Natural Soy Candle with dried fruit pieces",
      image: "/products/IMG_2334.JPG",
    },
    {
      name: "Love Spell",
      description: "100% Natural Soy Candle, hand poured with love",
      image: "/products/IMG_2336.JPG",
    },
  ]

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
    <section ref={ref} className="py-20 bg-white">
        <MaxWidthWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl">Our Signature Collection</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            {`Discover our most loved scents, carefully crafted to transform your space and elevate your everyday moments.`}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
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
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link href="/collections">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              View All Collections
            </Button>
          </Link>
        </div>
        </MaxWidthWrapper>
    </section>
  )
}
