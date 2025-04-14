"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle } from "lucide-react"
import MaxWidthWrapper from "@/components/shared/max-widthwrapper"

type TabType = "message" | "info" | "location"

export function InteractiveContactTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("message")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setIsSubmitted(false)
  }

  return (
    <section ref={ref} className="py-24 bg-white">
      <MaxWidthWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            {`We'd love to hear from you. Choose how you'd like to connect with us.`}
          </p>
        </motion.div>

        {/* Interactive Tabs */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-muted/50 p-1 rounded-full">
              <TabButton
                active={activeTab === "message"}
                onClick={() => setActiveTab("message")}
                icon={<MessageSquare className="h-4 w-4 mr-2" />}
                label="Send Message"
              />
              <TabButton
                active={activeTab === "info"}
                onClick={() => setActiveTab("info")}
                icon={<Mail className="h-4 w-4 mr-2" />}
                label="Contact Info"
              />
              <TabButton
                active={activeTab === "location"}
                onClick={() => setActiveTab("location")}
                icon={<MapPin className="h-4 w-4 mr-2" />}
                label="Find Us"
              />
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "message" && (
              <motion.div
                key="message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="What is this regarding?"
                        required
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div className="mb-6">
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

                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                      data-cursor-hover
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-heading text-2xl mb-2">Thank You!</h3>
                    <p className="text-gray-700 mb-6">
                     {` Your message has been sent successfully. We'll get back to you as soon as possible.`}
                    </p>
                    <Button onClick={resetForm} variant="outline" className="border-primary text-primary">
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Email Us</h3>
                        <p className="text-gray-600 mb-1">For general inquiries:</p>
                        <a href="mailto:info@scentsandsparkle.com" className="text-primary hover:underline">
                          info@scentsandsparkle.com
                        </a>
                        <p className="text-gray-600 mt-2 mb-1">For wholesale inquiries:</p>
                        <a href="mailto:wholesale@scentsandsparkle.com" className="text-primary hover:underline">
                          wholesale@scentsandsparkle.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Call Us</h3>
                        <p className="text-gray-600 mb-1">Customer Service:</p>
                        <a href="tel:+2348012345678" className="text-primary hover:underline">
                          +234 801 234 5678
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Visit Our Studio</h3>
                        <p className="text-gray-600">
                          123 Elegance Avenue
                          <br />
                          Lekki Phase 1
                          <br />
                          {`Lagos, Nigeria`}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-4">Follow Us</h3>
                      <div className="flex gap-4">
                        <SocialIcon href="https://instagram.com" name="Instagram" />
                        <SocialIcon href="https://facebook.com" name="Facebook" />
                        <SocialIcon href="https://twitter.com" name="Twitter" />
                        <SocialIcon href="https://pinterest.com" name="Pinterest" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "location" && (
              <motion.div
                key="location"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <h3 className="font-heading text-xl mb-4">Our Location</h3>
                      <p className="text-gray-700 mb-4">
                        {`Visit our studio to experience our scents in person and meet our team.`}
                      </p>
                      <div className="mb-6">
                        <p className="font-medium">Address:</p>
                        <p className="text-gray-600">
                          123 Elegance Avenue
                          <br />
                          Lekki Phase 1
                          <br />
                          {`Lagos, Nigeria`}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Business Hours:</p>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-2 rounded-lg overflow-hidden h-[300px]">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7286885532443!2d3.4651!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53aec4dd92d%3A0x5e34fe6a84cdcd53!2sLekki%20Phase%201%2C%20Lekki%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </MaxWidthWrapper>
    </section>
  )
}

// Helper Components
function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-full flex items-center text-sm font-medium transition-all ${
        active ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function SocialIcon({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
      aria-label={name}
    >
      {name === "Instagram" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )}
      {name === "Facebook" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )}
      {name === "Twitter" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      )}
      {name === "Pinterest" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <line x1="12" x2="12" y1="17" y2="22" />
          <path d="M19 17c-2.3 2.3-5.7 2.3-8 0-2.3-2.3-2.3-5.7 0-8 2.3-2.3 5.7-2.3 8 0 1.7 1.7 2.2 4.2 1.4 6.3" />
          <path d="M8 17c-2.3 2.3-5.7 2.3-8 0s-2.3-5.7 0-8 5.7-2.3 8 0c1.7 1.7 2.2 4.2 1.4 6.3" />
        </svg>
      )}
    </a>
  )
}
