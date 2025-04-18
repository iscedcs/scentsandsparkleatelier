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

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const timelineEvents: TimelineEvent[] = [
    {
      year: "2021",
      title: "The Beginning",
      description:
        "Our journey began with a simple passion for creating warm, comforting spaces through high-quality scented candles.",
      image: "/products/sweet.jpeg",
    },
    {
      year: "2022",
      title: "First Collection",
      description:
        "We launched our signature collection, featuring hand-poured soy candles with premium fragrance oils.",
      image: "/products/IMG_2337.JPG",
    },
    {
      year: "2023",
      title: "Expanding Horizons",
      description:
        "We introduced new product lines including reed diffusers and room sprays to complement our candle collection.",
      image: "/products/caramel.jpeg",
    },
    {
      year: "2024",
      title: "Sustainability Focus",
      description: "We committed to eco-friendly practices, using only sustainable materials and recyclable packaging.",
      image: "/products/IMG_2256.JPG",
    },
    {
      year: "2025",
      title: "Looking Forward",
      description:
        "Today, we continue to innovate and create new scent experiences while staying true to our commitment to quality and sustainability.",
      image: "/products/photo_2025-04-13_22-16-27.jpg",
    },
  ]

  return (
    <section ref={containerRef} className="py-12 md:py-24 bg-muted/50 relative">
      <MaxWidthWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-2xl md:text-4xl">Our Scent Journey</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
            Explore the evolution of our scents and the story behind our brand
          </p>
        </motion.div>

        {/* Timeline Track */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden md:block"></div>

          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-primary origin-top hidden md:block"
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
    <div
      ref={itemRef}
      className={`mb-12 md:mb-24 flex flex-col md:flex-row md:items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } relative`}
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-1/2 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary z-10 top-8 md:top-0"
      ></motion.div>

      {/* Year Marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute left-1/2 transform -translate-x-1/2 top-0 md:-top-10 bg-primary text-white px-4 py-1 rounded-full font-medium text-sm md:text-base"
      >
        {event.year}
      </motion.div>

      {/* Content */}
      <motion.div
        className={`w-full md:w-5/12 text-center md:text-left mt-12 md:mt-0 ${
          isEven ? "md:pr-16" : "md:pl-16 md:text-right"
        }`}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="font-heading text-xl md:text-2xl mb-2">{event.title}</h3>
        <p className="text-gray-700 text-sm md:text-base">{event.description}</p>
      </motion.div>

      {/* Image */}
      <motion.div
        className={`w-full md:w-5/12 mt-6 md:mt-0 ${isEven ? "md:pl-16" : "md:pr-16"}`}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image src={event.image || "/products/IMG_2337.JPG"} alt={event.title} fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}