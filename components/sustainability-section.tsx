"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Leaf, Recycle, Heart, Award } from "lucide-react"
import MaxWidthWrapper from "./shared/max-widthwrapper"

export function SustainabilitySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const features = [
    {
      icon: <Leaf className="h-6 w-6 text-primary" />,
      title: "Natural Ingredients",
      description:
        "We use only 100% natural soy wax and premium fragrance oils that are free from harmful chemicals and toxins.",
    },
    {
      icon: <Recycle className="h-6 w-6 text-primary" />,
      title: "Eco-Friendly Packaging",
      description:
        "Our packaging is made from recycled materials and is fully recyclable, minimizing our environmental footprint.",
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Handcrafted With Love",
      description:
        "Each candle is hand-poured in small batches to ensure quality and attention to detail in every product.",
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Premium Quality",
      description: "We source the finest ingredients and materials to create luxury products that exceed expectations.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section ref={ref} className="py-20 bg-muted/50">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl">Sustainability & Craftsmanship</h2>
            <div className="w-20 h-1 bg-primary mt-4 mb-6"></div>
            <p className="text-gray-700 mb-8">
              {`At Scents & Sparkle Atelier, we believe that luxury and sustainability can go hand in hand. Our commitment
              to craftsmanship and environmental responsibility is at the heart of everything we do.`}
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    {feature.icon}
                    <h3 className="font-medium">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <video src="/video/bts.mp4" autoPlay loop muted playsInline className="object-cover " width={700}></video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-heading text-xl">
                  {`"We believe in creating products that are as kind to the planet as they are to your home."`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
