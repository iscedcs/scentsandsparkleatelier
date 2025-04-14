"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import MaxWidthWrapper from "./shared/max-widthwrapper"

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-muted/50">
      <MaxWidthWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              text: "“I lit this during a dinner date and the compliments wouldn’t stop.”",
              author: "Zee, Lagos",
            },
            {
              text: "“I love the packaging, but the scent? Even better.”",
              author: "Ada, Portharcourt",
            },
            {
              text: "“I’ve tried other candles but nothing lasts like this. The scent lingers for hours it’s insane.”",
              author: "Chinaza, Enugu",
            },
            {
              text: "“Someone walked into my living room and asked what perfume I sprayed. It was the diffuser.”",
              author: "Tolu, Abuja",
            },
            {
              text: "“It gave ‘rich auntie energy’ instantly. So soft, so luxe.”",
              author: "Olamide, Lagos",
            },
            {
              text: "“It’s the balance for me! Warm, clean, and not overwhelming. Just perfect.”",
              author: "Zainab, Lagos",
            },
          ].map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-white p-8 rounded-lg border">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="text-lg text-muted-foreground mb-4">{testimonial.text}</p>
              <p className="font-bold text-primary">{testimonial.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </section>
  )
}