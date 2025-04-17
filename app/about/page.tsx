"use client"

import { AboutHeroParallax } from "@/components/about-hero-parallax"
import { ImageReveal } from "@/components/image-reveal"
import { InteractiveBrandValues } from "@/components/interactive-brand-values"
import MaxWidthWrapper from "@/components/shared/max-widthwrapper"
import { SplitScreenScrolling } from "@/components/split-screen-scrolling"
import { StatsSection } from "@/components/stats-section"
import { SustainabilitySection } from "@/components/sustainability-section"
import { TeamSpotlightCarousel } from "@/components/team-spotlight-carousel"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutPageEnhanced() {
  return (
    <main className="min-h-screen flex flex-col overflow-clip">
      <AboutHeroParallax />
      <StatsSection />

      <section className="py-20">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl">Our Mission</h2>
              <div className="w-20 h-1 bg-primary mt-4 mb-6"></div>
              <p className="text-gray-700 mb-4">
                {`To redefine the Nigerian home fragrance experience one intentional scent at a time. We're committed to
                creating premium candles, diffusers and home sprays that are mood-boosting, eco-conscious, and
                sophisticated, helping people build homes that feel like love.`}
              </p>
              <p className="text-gray-700 mb-6">
                {`At Scents & Sparkle Atelier, every scent tells a story. What started as a simple love for personal
                fragrances grew into a passion for crafting warm, comforting spaces through high-quality, non-toxic
                scented candles and home fragrances.`}
              </p>
              <p className="text-gray-700 mb-6">
               {` Rooted in a deep appreciation for elegance, intention, and emotional connection, our mission is to bring
                premium, aesthetically curated scents into homes across Nigeria and beyond.`}
              </p>
            </motion.div>

            <ImageReveal src="/images/ceo.jpg" alt="Our mission" />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* New Split Screen Scrolling Section */}
      <SplitScreenScrolling />

      {/* Unique Selling Point Section */}
      <section className="py-20 bg-muted/50">
      <MaxWidthWrapper>
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl">What Sets Us Apart</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {`Our candles aren't just products—they're curated experiences. Inspired by real moods, moments, and
              memories, we blend deep research with high-end materials to craft balanced scents that are refined, never
              overpowering. From scent to packaging, we don't cut corners because you deserve the best.`}
            </p>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Sustainability Section */}
      <SustainabilitySection />

      {/* New Interactive Brand Values Section */}
      <InteractiveBrandValues />

      {/* New Team Spotlight Carousel */}
      <TeamSpotlightCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <MaxWidthWrapper>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl mb-6">Experience Our Scents</h2>
            <p className="max-w-2xl mx-auto mb-8">
              {`Discover our collection of premium, handcrafted candles and transform your space with intentional scents.`}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                data-cursor-hover
                asChild
              >
                <Link href='https://scentsandsparkleatelier.bumpa.shop/'>
                Shop Collection
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        </MaxWidthWrapper>
      </section>

    </main>
  )
}
