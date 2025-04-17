"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Mail, Phone, MessageSquare, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MaxWidthWrapper from "@/components/shared/max-widthwrapper"
import Link from "next/link"

type BubbleType = "email" | "phone" | "message" | "location" | null

export function FloatingContactBubbles() {
  const [activeBubble, setActiveBubble] = useState<BubbleType>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const bubbles = [
    { type: "message" as BubbleType, icon: <MessageSquare className="h-6 w-6" />, label: "Send Message" },
    { type: "email" as BubbleType, icon: <Mail className="h-6 w-6" />, label: "Email Us" },
    { type: "phone" as BubbleType, icon: <Phone className="h-6 w-6" />, label: "Call Us" },
    { type: "location" as BubbleType, icon: <MapPin className="h-6 w-6" />, label: "Find Us" },
  ]

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      <MaxWidthWrapper>
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl">Connect Your Way</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            {`Choose how you'd like to reach us. We're here to help in whatever way works best for you.`}
          </p>
        </motion.div>

        {/* Floating Bubbles */}
        <div className="flex justify-center items-center gap-8 flex-wrap mb-16">
          {bubbles.map((bubble, index) => (
            <motion.div
              key={bubble.type}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className={`relative cursor-pointer rounded-full ${
                activeBubble === bubble.type ? "bg-primary text-white" : "bg-primary/10 text-primary"
              } w-24 h-24 flex flex-col items-center justify-center transition-colors`}
              onClick={() => setActiveBubble(activeBubble === bubble.type ? null : bubble.type)}
            >
              {bubble.icon}
              <span className="text-xs mt-2 font-medium">{bubble.label}</span>

              {/* Pulse animation when active */}
              {activeBubble === bubble.type && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Content for active bubble */}
        <AnimatePresence mode="wait">
          {activeBubble && (
            <motion.div
              key={activeBubble}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 relative"
            >
              <button
                onClick={() => setActiveBubble(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>

              {activeBubble === "message" && (
                <div>
                  <h3 className="font-heading text-2xl mb-6">Send Us a Message</h3>
                  <form className="space-y-6">
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
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={6}
                        required
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <Button className="bg-primary hover:bg-primary/90 text-white">Send Message</Button>
                  </form>
                </div>
              )}

              {activeBubble === "email" && (
                <div>
                  <h3 className="font-heading text-2xl mb-6">Email Us</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-medium mb-2">For general inquiries:</p>
                      <Link href="mailto:info@scentsandsparkle.com" className="text-primary hover:underline text-lg">
                        info@scentsandsparkle.com
                      </Link>
                    </div>
                    <div>
                      <p className="font-medium mb-2">For wholesale inquiries:</p>
                      <Link href="mailto:wholesale@scentsandsparkle.com" className="text-primary hover:underline text-lg">
                        wholesale@scentsandsparkle.com
                      </Link>
                    </div>
                    {/* <div>
                      <p className="font-medium mb-2">For press and media:</p>
                      <Link href="mailto:press@scentsandsparkle.com" className="text-primary hover:underline text-lg">
                        press@scentsandsparkle.com
                      </Link>
                    </div> */}
                  </div>
                </div>
              )}

              {activeBubble === "phone" && (
                <div>
                  <h3 className="font-heading text-2xl mb-6">Call Us</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-medium mb-2">Customer Service:</p>
                      <Link href="tel:+2348060550787" className="text-primary hover:underline text-lg">
                      +2348060550787
                      </Link>
                      <p className="text-gray-600 mt-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Wholesale Department:</p>
                      <Link href="tel:+23408060550787" className="text-primary hover:underline text-lg">
                      +2348060550787
                      </Link>
                      <p className="text-gray-600 mt-1">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              )}

              {activeBubble === "location" && (
                <div>
                  <h3 className="font-heading text-2xl mb-6">Visit Our Studio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="font-medium mb-2">Address:</p>
                      <p className="text-gray-700">
                      Unity estate, block 34, 
                          <br />
                          Abiodun Lawson Cresent, Amuwo Odofin,
                          <br />
                          {`Lagos, Nigeria`}
                      </p>

                      <div className="mt-6">
                        <p className="font-medium mb-2">Business Hours:</p>
                        <p className="text-gray-700">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg overflow-hidden h-[200px]">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.406830819561!2d3.297275971921901!3d6.470039109488566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b892646649321%3A0x1c14381d512253e8!2s34%20Abiodun%20Lawson%20Cres%2C%20Amuwo%20Odofin%20Estate%2C%20Lagos%20102102%2C%20Lagos!5e0!3m2!1sen!2sng!4v1744843109574!5m2!1sen!2sng"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Scents & Sparkle Atelier Location"
                      ></iframe>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary/5 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/3 -z-10"></div>
      </MaxWidthWrapper>
    </section>
  )
}
