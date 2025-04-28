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
    description: "Juicy, vibrant, and irresistibly sweet. Sweet Lychee fills your space with the fresh, tropical aroma of bergamot, vetiver leathery undertone and floral scent of ylang ylang. One light, and your room transforms into a sweet escape.",
    image: "/products/sweet.jpeg",
    category: "Signature",
  },
  {
    id: "2",
    name: "Fruiti",
    description: "Citrus scents are known to reduce stress and anxiety, promoting a sense of calm and well-being. invigorating aroma of citrus scented candles, expertly crafted to uplift and revitalize your space. These candles combine the natural essence of citrus fruits – lemons, limes, oranges, and grapefruits – to create a refreshing ambiance that's perfect for any room.",
    image: "/images/fruiti.jpg",
    category: "Signature",
  },
  {
    id: "3",
    name: "Love Spell",
    description: "Soft, romantic, and enchanting. Love Spell wraps your space in a dreamy blend of sweet notes of cashmere vanilla, pomegranate, blueberry muffin and many more creating an atmosphere of warmth and affection. One light, and it’s love at first scent",
    image: "/products/IMG_2334.JPG",
    category: "Signature",
  },
  {
    id: "4",
    name: "Caramel Sundae",
    description: "Snuggle up with the sweetness of our dessert candle, it is a decorative candle whipped with coconut and soy candle wax. They are divine and as edible as it looks. it brings warmth to your heart and fills the room. This candle smells like caramel, maple, Irish sugar and vanilla sugar. Perfect for rainy and cloudy days.",
    image: "/products/caramel.jpeg",
    category: "Relaxing",
  },
  {
    id: "5",
    name: "Dreamin’ Scented Candle",
    description: "Soft, airy, and effortlessly calming. Dreamin’ is the perfect escape. With a delicate blend of soothing notes, this candle sets the mood for relaxation, reflection, and deep, peaceful rest. Light it up, close your eyes, and drift away. ",
    image: "/products/dreamin.jpeg",
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
