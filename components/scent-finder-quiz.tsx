"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, RefreshCw } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/components/product-grid"
import MaxWidthWrapper from "./shared/max-widthwrapper"

interface ScentFinderQuizProps {
  products: Product[]
}

type QuizStep = {
  question: string
  options: {
    text: string
    value: string
  }[]
}

type UserSelections = {
  mood?: string
  intensity?: string
  space?: string
}

export function ScentFinderQuiz({ products }: ScentFinderQuizProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<UserSelections>({})
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null)

  const quizSteps: QuizStep[] = [
    {
      question: "What mood are you trying to create?",
      options: [
        { text: "Relaxing & Calming", value: "relaxing" },
        { text: "Energizing & Uplifting", value: "energizing" },
        { text: "Romantic & Cozy", value: "romantic" },
        { text: "Fresh & Clean", value: "fresh" },
      ],
    },
    {
      question: "What scent intensity do you prefer?",
      options: [
        { text: "Subtle & Delicate", value: "subtle" },
        { text: "Balanced & Moderate", value: "balanced" },
        { text: "Bold & Noticeable", value: "bold" },
      ],
    },
    {
      question: "Where will you use this scent?",
      options: [
        { text: "Living Room", value: "living" },
        { text: "Bedroom", value: "bedroom" },
        { text: "Kitchen", value: "kitchen" },
        { text: "Office", value: "office" },
      ],
    },
  ]

  const handleSelection = (value: string) => {
    const newSelections = { ...selections }

    if (currentStep === 0) {
      newSelections.mood = value
    } else if (currentStep === 1) {
      newSelections.intensity = value
    } else if (currentStep === 2) {
      newSelections.space = value
    }

    setSelections(newSelections)

    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Find a product based on selections
      // This is a simplified recommendation logic - in a real app, you'd have more sophisticated matching
      const recommended = findRecommendedProduct(newSelections)
      setRecommendedProduct(recommended)
    }
  }

  const findRecommendedProduct = (userSelections: UserSelections): Product => {
    // This is a simplified recommendation algorithm
    // In a real application, you would have more sophisticated matching logic

    // For demo purposes, just return a random product that somewhat matches the mood
    let matchingProducts = [...products]

    // Filter by mood if possible
    if (userSelections.mood) {
      // This assumes product descriptions contain keywords related to moods
      const moodKeywords: Record<string, string[]> = {
        relaxing: ["calm", "relax", "soothing"],
        energizing: ["energy", "fresh", "citrus"],
        romantic: ["romantic", "warm", "cozy"],
        fresh: ["clean", "fresh", "light"],
      }

      const keywords = moodKeywords[userSelections.mood] || []

      if (keywords.length > 0) {
        const filtered = matchingProducts.filter((product) =>
          keywords.some((keyword) => product.description.toLowerCase().includes(keyword)),
        )

        if (filtered.length > 0) {
          matchingProducts = filtered
        }
      }
    }

    // Return a random product from the matching ones
    return matchingProducts[Math.floor(Math.random() * matchingProducts.length)]
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setSelections({})
    setRecommendedProduct(null)
  }

  const toggleQuiz = () => {
    if (isOpen) {
      resetQuiz()
    }
    setIsOpen(!isOpen)
  }

  return (
    <section className="py-20">
      <MaxWidthWrapper>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl">Find Your Perfect Scent</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Not sure which scent is right for you? Take our quick quiz to discover the perfect fragrance for your
              space and mood.
            </p>
          </div>

          {!isOpen ? (
            <div className="text-center">
              <Button onClick={toggleQuiz} className="bg-primary hover:bg-primary/90 text-white" data-cursor-hover>
                Start Scent Finder Quiz
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-xl">Scent Finder Quiz</h3>
                <Button variant="ghost" size="sm" onClick={toggleQuiz}>
                  Close
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {recommendedProduct ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={recommendedProduct.image || "/placeholder.svg"}
                        alt={recommendedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="bg-primary/10 text-primary px-4 py-2 rounded-full inline-block mb-4">
                        Perfect Match!
                      </div>
                      <h4 className="font-heading text-2xl mb-2">{recommendedProduct.name}</h4>
                      <p className="text-gray-700 mb-4">{recommendedProduct.description}</p>
                      <p className="text-primary font-medium mb-6">{recommendedProduct.price}</p>
                      <div className="flex gap-4">
                        <Button className="bg-primary hover:bg-primary/90 text-white">View Product</Button>
                        <Button variant="outline" onClick={resetQuiz} className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Try Again
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">
                          Step {currentStep + 1} of {quizSteps.length}
                        </span>
                        <div className="flex gap-1">
                          {quizSteps.map((_, index) => (
                            <div
                              key={index}
                              className={`h-1 w-6 rounded-full ${index <= currentStep ? "bg-primary" : "bg-gray-200"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-heading text-xl mb-6">{quizSteps[currentStep].question}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {quizSteps[currentStep].options.map((option, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleSelection(option.value)}
                            className="p-4 border border-gray-200 rounded-lg text-left hover:border-primary hover:bg-primary/5 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                                {selections[currentStep === 0 ? "mood" : currentStep === 1 ? "intensity" : "space"] ===
                                  option.value && <Check className="h-3 w-3 text-primary" />}
                              </span>
                              {option.text}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {currentStep > 0 && (
                      <div className="flex justify-between">
                        <Button
                          variant="ghost"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="text-gray-600"
                        >
                          Back
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setCurrentStep(currentStep + 1)}
                          className="text-primary"
                          disabled={
                            currentStep === quizSteps.length - 1 ||
                            !(
                              (currentStep === 0 && selections.mood) ||
                              (currentStep === 1 && selections.intensity) ||
                              (currentStep === 2 && selections.space)
                            )
                          }
                        >
                          Skip <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
        </MaxWidthWrapper>
    </section>
  )
}
