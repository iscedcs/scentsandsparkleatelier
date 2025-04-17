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
    name: "Sweet Lychee",
    description: "A warm, inviting blend of vanilla and amber that creates a sense of comfort and intimacy.",
    image: "/products/sweet.jpeg",
    category: "Signature",
  },
  {
    id: "2",
    name: "Fruití",
    description: "A bright, fruity fragrance that brings a refreshing energy to any space.",
    image: "/products/IMG_2256.JPG",
    category: "Signature",
  },
  {
    id: "3",
    name: "Love Spell",
    description: "A vibrant medley of citrus and tropical fruits that awakens the senses and brightens your space.",
    image: "/products/IMG_2334.JPG",
    category: "Signature",
  },
  {
    id: "4",
    name: "Caramel Sundae",
    description: "Snuggle up with the rich, indulgent scent of caramel, maple, Irish sugar, and vanilla sugar. Handcrafted with a creamy blend of coconut and soy wax, this dessert candle looks as good as it smells—warm, sweet, and absolutely irresistible.",
    image: "/products/caramel.jpeg",
    category: "Relaxing",
  },
  {
    id: "5",
    name: "Dreamin’ Scented Candle",
    description: "Soft, airy, and effortlessly calming. Dreamin’ is the perfect escape. With a delicate blend of soothing notes, this candle sets the mood for relaxation, reflection, and deep, peaceful rest. Light it up, close your eyes, and drift away.",
    image: "/products/IMG_2337.JPG",
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
