"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import MaxWidthWrapper from "./shared/max-widthwrapper"

export function NewsletterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section ref={ref} className="py-20 bg-muted/50">
        <MaxWidthWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Join Our Scent Community</h2>
          <p className="text-gray-700 mb-6">
            Subscribe to our newsletter for exclusive offers, new product announcements, and scent inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md flex-grow text-black"
            />
            <Button className="bg-primary hover:bg-primary/90 text-white">Subscribe</Button>
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  )
}
