"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import MaxWidthWrapper from "./shared/max-widthwrapper"

export function ScentExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const scentExperiences = [
    {
      name: "Love Spell",
      description: "A warm, inviting blend of vanilla and amber that creates a sense of comfort and intimacy.",
      mood: "Romantic & Cozy",
      notes: ["Vanilla", "Amber", "Sandalwood"],
      image: "/products/IMG_2245.JPG",
      color: "bg-rose-50",
    },
    {
      name: "Sweet Lychee",
      description: "A bright, fruity fragrance that brings a refreshing energy to any space.",
      mood: "Uplifting & Energizing",
      notes: ["Lychee", "Rose", "Fresh Air"],
      image: "/products/IMG_2256.JPG",
      color: "bg-pink-50",
    },
    {
      name: "Fruití",
      description: "A vibrant medley of citrus and tropical fruits that awakens the senses and brightens your space.",
      mood: "Refreshing & Vibrant",
      notes: ["Orange", "Pineapple", "Mango"],
      image: "/products/IMG_2334.JPG",
      color: "bg-amber-50",
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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
          <h2 className="font-heading text-3xl md:text-4xl">Experience Our Scents</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Each of our scents is carefully crafted to create a unique atmosphere and evoke specific emotions. Discover
            the perfect fragrance for your space and mood.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {scentExperiences.map((scent, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`rounded-lg overflow-hidden ${scent.color} p-6 flex flex-col h-full`}
            >
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image src={scent.image || "/products/IMG_2337.JPG"} alt={scent.name} fill className="object-cover" />
              </div>

              <h3 className="font-heading text-2xl mb-2">{scent.name}</h3>
              <p className="text-gray-700 mb-4">{scent.description}</p>

              <div className="mt-auto">
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500">MOOD</span>
                  <p className="text-primary font-medium">{scent.mood}</p>
                </div>

                <div className="mb-6">
                  <span className="text-sm font-medium text-gray-500">TOP NOTES</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {scent.notes.map((note, i) => (
                      <span key={i} className="inline-block px-3 py-1 bg-white/80 text-sm rounded-full text-gray-700">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Explore Scent
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </section>
  )
}
