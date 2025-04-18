"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Instagram, Mail, Linkedin } from "lucide-react"
import MaxWidthWrapper from "./shared/max-widthwrapper"
import Link from "next/link"
import { Button } from "./ui/button"

interface TeamMember {
  name: string
  position: string
  bio: string
  image: string
  socialLinks: {
    instagram?: string
    email?: string
    linkedin?: string
  }
}

export function TeamSpotlightCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const teamMembers: TeamMember[] = [
    {
      name: "Phyona Eneh",
      position: "Founder & Creative Director",
      bio: "Phyona's passion for scents began in her grandmother's garden, where she learned about the emotional power of fragrances. With a background in aromatherapy and product design, she founded Scents & Sparkle Atelier to create intentional scents that transform spaces and evoke memories.",
      image: "/images/ceo.jpg?height=400&width=400&text=Amara",
      socialLinks: {
        instagram: "https://www.instagram.com/scentsandsparkle_atelier?igsh=bHpuc2J2anMwdHgz&utm_source=qr",
        email: "mailto:amara@scentsandsparkle.com",
      },
    },
    // {
    //   name: "Daniel Eze",
    //   position: "Master Chandler",
    //   bio: "Daniel brings over a decade of experience in candle making to our team. His meticulous attention to detail and commitment to quality ensures that every product meets our exacting standards. He leads our production team and constantly experiments with new techniques and materials.",
    //   image: "/products/IMG_2337.JPG?height=400&width=400&text=Daniel",
    //   socialLinks: {
    //     instagram: "https://instagram.com",
    //     email: "mailto:daniel@scentsandsparkle.com",
    //   },
    // },
    // {
    //   name: "Zainab Bello",
    //   position: "Scent Developer",
    //   bio: "With a background in perfumery and chemistry, Zainab is the nose behind our signature scents. She travels the world sourcing the finest fragrance oils and constantly experiments with new combinations to create unique, evocative scent profiles that tell a story.",
    //   image: "/products/IMG_2337.JPG?height=400&width=400&text=Zainab",
    //   socialLinks: {
    //     instagram: "https://instagram.com",
    //     email: "mailto:zainab@scentsandsparkle.com",
    //     linkedin: "https://linkedin.com",
    //   },
    // },
    // {
    //   name: "Chidi Okonkwo",
    //   position: "Sustainability Manager",
    //   bio: "Chidi ensures that our commitment to sustainability is reflected in every aspect of our business. From sourcing eco-friendly materials to implementing waste reduction strategies, he works tirelessly to minimize our environmental footprint while maximizing our positive impact.",
    //   image: "/products/IMG_2337.JPG?height=400&width=400&text=Chidi",
    //   socialLinks: {
    //     email: "mailto:chidi@scentsandsparkle.com",
    //     linkedin: "https://linkedin.com",
    //   },
    // },
  ]

  // Handle autoplay
  // useEffect(() => {
  //   if (autoplay) {
  //     autoplayTimerRef.current = setInterval(() => {
  //       setDirection(1)
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length)
  //     }, 5000)
  //   }

  //   return () => {
  //     if (autoplayTimerRef.current) {
  //       clearInterval(autoplayTimerRef.current)
  //     }
  //   }
  // }, [autoplay, teamMembers.length])

  // const handleNext = () => {
  //   if (autoplayTimerRef.current) {
  //     clearInterval(autoplayTimerRef.current)
  //   }
  //   setAutoplay(false)
  //   setDirection(1)
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length)
  // }

  // const handlePrevious = () => {
  //   if (autoplayTimerRef.current) {
  //     clearInterval(autoplayTimerRef.current)
  //   }
  //   setAutoplay(false)
  //   setDirection(-1)
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length)
  // }

  // const variants = {
  //   enter: (direction: number) => ({
  //     x: direction > 0 ? 1000 : -1000,
  //     opacity: 0,
  //     scale: 0.8,
  //   }),
  //   center: {
  //     x: 0,
  //     opacity: 1,
  //     scale: 1,
  //   },
  //   exit: (direction: number) => ({
  //     x: direction < 0 ? 1000 : -1000,
  //     opacity: 0,
  //     scale: 0.8,
  //   }),
  // }

  return (
    <section className="py-24 bg-white">
      <MaxWidthWrapper>
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl">Meet Our Team</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            The passionate people behind Scents & Sparkle Atelier who bring our vision to life.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          {/* <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-primary hover:text-white transition-colors shadow-md"
            aria-label="Previous team member"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-primary hover:text-white transition-colors shadow-md"
            aria-label="Next team member"
          >
            <ChevronRight className="h-5 w-5" />
          </button> */}

          {/* Team Member Carousel */}
          <div className="relative overflow-hidden xl:h-[500px] h-screen rounded-xl bg-muted/20">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                // variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 p-8"
              >
                {/* Team Member Image */}
                <div className="relative rounded-lg overflow-hidden h-[200px] md:h-full">
                  <Image
                    src={teamMembers[currentIndex].image || "/products/IMG_2337.JPG"}
                    alt={teamMembers[currentIndex].name}
                    fill
                    className="object-cover object-top md:project-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex gap-3">
                      {teamMembers[currentIndex].socialLinks.instagram && (
                        <Link href={teamMembers[currentIndex].socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 p-2 rounded-full hover:bg-primary transition-colors"
                          aria-label={`${teamMembers[currentIndex].name}'s Instagram`}
                        >
                          <Instagram className="h-5 w-5" />
                        </Link>
                      )}
                      {teamMembers[currentIndex].socialLinks.email && (
                        <Link href={teamMembers[currentIndex].socialLinks.email}
                          className="bg-white/20 p-2 rounded-full hover:bg-primary transition-colors"
                          aria-label={`Email ${teamMembers[currentIndex].name}`}
                        >
                          <Mail className="h-5 w-5" />
                        </Link>
                      )}
                      {teamMembers[currentIndex].socialLinks.linkedin && (
                        <Link href={teamMembers[currentIndex].socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 p-2 rounded-full hover:bg-primary transition-colors"
                          aria-label={`${teamMembers[currentIndex].name}'s LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Team Member Details */}
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h3 className="font-heading text-3xl mb-2">{teamMembers[currentIndex].name}</h3>
                    <p className="text-primary font-medium mb-6">{teamMembers[currentIndex].position}</p>
                    <div className="w-16 h-0.5 bg-primary mb-6"></div>
                    <p className="text-gray-700 leading-relaxed">{teamMembers[currentIndex].bio}</p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {teamMembers.map((_, index) => (
              <Button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                  setAutoplay(false)
                  if (autoplayTimerRef.current) {
                    clearInterval(autoplayTimerRef.current)
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to team member ${index + 1}`}
              ></Button>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
