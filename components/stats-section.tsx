"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AnimatedCounter } from "./animated-counter"

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    { value: 100, suffix: "%", label: "Natural Ingredients" },
    { value: 50, suffix: "+", label: "Unique Scents" },
    { value: 2000, suffix: "+", label: "Happy Customers" },
    { value: 3, suffix: "", label: "Years of Excellence" },
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
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-black text-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
    </section>
  )
}
