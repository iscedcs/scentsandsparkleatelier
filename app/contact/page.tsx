import { FAQSection } from "@/components/pages/contact/faq-section";
import { FloatingContactBubbles } from "@/components/pages/contact/floating-contact-bubbles";
import { ImmersiveContactHero } from "@/components/pages/contact/immersive-contact-hero";
import { InteractiveContactTabs } from "@/components/pages/contact/interactive-contact-tabs";
import { ScentInspiredContact } from "@/components/pages/contact/scent-inspired-contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
        <ImmersiveContactHero />
      <div className="pt-20">
        <InteractiveContactTabs />
        <ScentInspiredContact />
        <FloatingContactBubbles />
        <FAQSection />
      </div>
    </main>
  )
}
