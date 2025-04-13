import { AmbientAudioPlayer } from "@/components/ambient-audio-player"
import { FeaturedProducts } from "@/components/featured-products"
import { HeroSection } from "@/components/hero-section"
import { HorizontalProductShowcase } from "@/components/horizontal-product-showcase"
import { NewsletterSection } from "@/components/newsletter-section"
import { ScentExperienceSection } from "@/components/scent-experience-section"
import { ScentStoryTimeline } from "@/components/scent-story-timeline"
import { StorySection } from "@/components/story-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { VideoBackgroundSection } from "@/components/video-background-section"

const products = [
  {
    id: "1",
    name: "Love Spell",
    description: "A warm, inviting blend of vanilla and amber that creates a sense of comfort and intimacy.",
    image: "/products/IMG_2245.JPG",
    price: "₦8,500",
    category: "Signature",
  },
  {
    id: "2",
    name: "Sweet Lychee",
    description: "A bright, fruity fragrance that brings a refreshing energy to any space.",
    image: "/products/IMG_2256.JPG",
    price: "₦8,500",
    category: "Signature",
  },
  {
    id: "3",
    name: "Fruití",
    description: "A vibrant medley of citrus and tropical fruits that awakens the senses and brightens your space.",
    image: "/products/IMG_2334.JPG",
    price: "₦9,000",
    category: "Signature",
  },
  {
    id: "4",
    name: "Lavender Dreams",
    description: "A calming blend of lavender and chamomile, perfect for creating a relaxing atmosphere.",
    image: "/products/IMG_2336.JPG",
    price: "₦8,500",
    category: "Relaxing",
  },
  {
    id: "5",
    name: "Vanilla Dream",
    description: "A comforting scent of warm vanilla and creamy tonka bean that creates a cozy atmosphere.",
    image: "/products/IMG_2337.JPG",
    price: "₦8,500",
    category: "Classic",
  },
]

export default function HomeEnhanced() {
  return (
    <div className="relative overflow-clip">
      <div className="fixed inset-0 z-0">
        <HeroSection />
      </div>

      <div className="relative z-10">

        <div className="h-screen w-full"></div>

        <div className="bg-white relative z-10 rounded-t-[40px] shadow-lg">
          <FeaturedProducts />

          <HorizontalProductShowcase products={products} />

          <ScentExperienceSection />
          <VideoBackgroundSection />

          <ScentStoryTimeline />

          <StorySection />
          <TestimonialsSection />
          <NewsletterSection />
        </div>
      </div>

      <AmbientAudioPlayer />
    </div>
  )
}
