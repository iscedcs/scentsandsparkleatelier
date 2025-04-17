import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Mail } from "lucide-react"
import MaxWidthWrapper from "./shared/max-widthwrapper"
import { TiktokIcon } from "@/lib/icons"

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={`bg-black text-white py-12 ${className}`}>
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/assets/logo-trans.png"
              alt="Scents & Sparkle Atelier"
              width={150}
              height={60}
              className="h-auto w-auto invert"
            />
            <p className="text-sm text-gray-400 mt-4 text-center md:text-left">
              Redefining the Nigerian home fragrance experience one intentional scent at a time.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading text-xl mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm text-gray-400 hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/collections" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Collections
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading text-xl mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <Link href="https://www.instagram.com/scentsandsparkle_atelier?igsh=bHpuc2J2anMwdHgz&utm_source=qr" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.tiktok.com/@scentsandsparkle_atelier?_t=ZS-8vNB8ituytM&_r=1" className="text-gray-400 hover:text-primary transition-colors">
                {TiktokIcon}
                <span className="sr-only">Tiktok</span>
              </Link>
              <Link
                href="mailto:info@scentsandsparkle.com"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <p className="text-sm text-gray-400 text-center md:text-left">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Scents & Sparkle Atelier. All rights reserved.</p>
        </div>
        </MaxWidthWrapper>
    </footer>
  )
}
