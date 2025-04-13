"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import MaxWidthWrapper from "@/components/shared/max-widthwrapper"

interface FAQ {
  question: string
  answer: string
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const faqs: FAQ[] = [
    {
      question: "How long do your candles burn?",
      answer:
        "Our candles have an average burn time of 40-50 hours, depending on the size. For optimal burn time, we recommend burning your candle for 2-3 hours at a time and trimming the wick to 1/4 inch before each use.",
    },
    {
      question: "Are your candles made with natural ingredients?",
      answer:
        "Yes, all our candles are made with 100% natural soy wax, cotton wicks, and premium fragrance oils that are free from harmful chemicals. We prioritize quality and sustainability in all our products.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to select international destinations. Shipping costs and delivery times vary depending on the location. Please note that customers are responsible for any customs fees or import taxes that may apply.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 14 days of delivery for unused and unopened products in their original packaging. Please contact our customer service team to initiate a return. Custom orders are non-refundable.",
    },
    {
      question: "Do you offer custom or corporate orders?",
      answer:
        "Yes, we offer custom scents and packaging for special events, corporate gifts, and wholesale orders. Please contact our team at wholesale@scentsandsparkle.com for more information and pricing.",
    },
    {
      question: "How should I care for my candle?",
      answer:
        "For the best experience, always trim the wick to 1/4 inch before lighting, burn for at least 2 hours to ensure an even melt pool, keep away from drafts, and never leave a burning candle unattended. Store in a cool, dry place away from direct sunlight.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
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
          <h2 className="font-heading text-3xl md:text-4xl">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Find answers to our most commonly asked questions. If you can't find what you're looking for, please contact
            us directly.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-white rounded-b-lg shadow-sm px-6"
                  >
                    <div className="py-6 border-t border-gray-100">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        </MaxWidthWrapper>
    </section>
  )
}
