"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle } from "lucide-react"
import MaxWidthWrapper from "@/components/shared/max-widthwrapper"

interface ScentMood {
  name: string
  description: string
  image: string
  color: string
  formLabel: string
}

export function ScentInspiredContact() {
  const [selectedMood, setSelectedMood] = useState<ScentMood | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const moods: ScentMood[] = [
    {
      name: "Relaxing",
      description: "Questions about our calming scents",
      image: "/products/IMG_2337.JPG",
      color: "bg-blue-50 border-blue-200",
      formLabel: "Tell us how we can help you find the perfect relaxing scent",
    },
    {
      name: "Energizing",
      description: "Inquiries about our uplifting fragrances",
      image: "/images/candle-4.jpeg",
      color: "bg-yellow-50 border-yellow-200",
      formLabel: "What energizing scent experience are you looking for?",
    },
    {
      name: "Romantic",
      description: "Questions about our intimate scents",
      image: "/images/candle-1.jpeg",
      color: "bg-rose-50 border-rose-200",
      formLabel: "How can we help create your perfect romantic atmosphere?",
    },
    {
      name: "Business",
      description: "Wholesale and partnership inquiries",
      image: "/images/candle-5.jpeg",
      color: "bg-green-50 border-green-200",
      formLabel: "Tell us about your business inquiry",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setSelectedMood(null)
  }

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <MaxWidthWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl">What Brings You Here Today?</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Select the option that best matches your inquiry, and we'll tailor our response to your needs.
          </p>
        </motion.div>

        {!selectedMood && !isSubmitted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {moods.map((mood, index) => (
              <motion.div
                key={mood.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${mood.color} border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => setSelectedMood(mood)}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48">
                  <Image src={mood.image || "/placeholder.svg"} alt={mood.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-heading text-xl mb-2">{mood.name}</h3>
                  <p className="text-gray-600">{mood.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {!isSubmitted ? (
              <div className={`rounded-xl overflow-hidden border ${selectedMood?.color}`}>
                <div className="relative h-48">
                  <Image src={selectedMood?.image || ""} alt={selectedMood?.name || ""} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-heading text-3xl text-white">{selectedMood?.name}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {selectedMood?.formLabel}
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Your message here..."
                        rows={6}
                        required
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedMood(null)}
                        className="border-gray-300"
                      >
                        Back to Options
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                        data-cursor-hover
                      >
                        <Send className="h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-heading text-2xl mb-2">Thank You!</h3>
                <p className="text-gray-700 mb-6">
                  Your {selectedMood?.name.toLowerCase()} inquiry has been sent successfully. We'll get back to you as
                  soon as possible.
                </p>
                <Button onClick={resetForm} variant="outline" className="border-primary text-primary">
                  Send Another Inquiry
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
        </MaxWidthWrapper>
    </section>
  )
}
