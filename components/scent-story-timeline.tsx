"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import MaxWidthWrapper from "./shared/max-widthwrapper"

interface TimelineEvent {
  year: string
  title: string
  description: string
  image: string
}

export function ScentStoryTimeline() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Timeline progress animation
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const timelineEvents: TimelineEvent[] = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Our journey began with a simple passion for creating warm, comforting spaces through high-quality scented candles.",
      image: "/products/IMG_2245.JPG",
    },
    {
      year: "2021",
      title: "First Collection",
      description:
        "We launched our signature collection, featuring hand-poured soy candles with premium fragrance oils.",
      image: "/products/IMG_2337.JPG",
    },
    {
      year: "2022",
      title: "Expanding Horizons",
      description:
        "We introduced new product lines including reed diffusers and room sprays to complement our candle collection.",
      image: "/products/IMG_2336.JPG",
    },
    {
      year: "2023",
      title: "Sustainability Focus",
      description: "We committed to eco-friendly practices, using only sustainable materials and recyclable packaging.",
      image: "/products/IMG_2256.JPG",
    },
    {
      year: "2024",
      title: "Looking Forward",
      description:
        "Today, we continue to innovate and create new scent experiences while staying true to our commitment to quality and sustainability.",
      image: "/products/IMG_2334.JPG",
    },
  ]

  return (
    <section ref={containerRef} className="py-24 bg-muted/30 relative">
      <MaxWidthWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl">Our Scent Journey</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore the evolution of our scents and the story behind our brand
          </p>
        </motion.div>

        {/* Timeline Track */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-primary origin-top"
            style={{ height: "100%", scaleY: scaleProgress }}
          ></motion.div>

          {/* Timeline Events */}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

interface TimelineItemProps {
  event: TimelineEvent
  index: number
}

function TimelineItem({ event, index }: TimelineItemProps) {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: false, amount: 0.5 })

  const isEven = index % 2 === 0

  return (
    <div ref={itemRef} className={`mb-24 flex items-center ${isEven ? "flex-row" : "flex-row-reverse"} relative`}>
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary z-10"
      ></motion.div>

      {/* Year Marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-primary text-white px-4 py-1 rounded-full font-medium"
      >
        {event.year}
      </motion.div>

      {/* Content */}
      <motion.div
        className={`w-5/12 ${isEven ? "pr-16 text-right" : "pl-16 text-left"}`}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="font-heading text-2xl mb-2">{event.title}</h3>
        <p className="text-gray-700">{event.description}</p>
      </motion.div>

      {/* Image */}
      <motion.div
        className={`w-5/12 ${isEven ? "pl-16" : "pr-16"}`}
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image src={event.image || "/products/IMG_2337.JPG"} alt={event.title} fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}
