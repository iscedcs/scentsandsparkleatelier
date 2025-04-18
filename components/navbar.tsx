"use client"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"
import MobileMenu from "./layout/mobile-menu"
import MaxWidthWrapper from "./shared/max-widthwrapper"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"


export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    router.push(href)
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 md:backdrop-blur-sm md:shadow-sm" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center"
            data-cursor-hover
            onClick={(e) => handleNavigation(e, "/")}
          >
            <Image
              src="/assets/logo-trans.png"
              alt="Scents & Sparkle Atelier"
              width={100}
              height={100}
              className={cn("h-auto w-auto transition-opacity", scrolled ? "md:opacity-100" : "opacity-90")}
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium tracking-wider transition-colors",
                scrolled ? "text-black hover:text-primary" : "text-white hover:text-primary/90",
              )}
              data-cursor-hover
              onClick={(e) => handleNavigation(e, "/")}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium tracking-wider transition-colors",
                scrolled ? "text-black hover:text-primary" : "text-white hover:text-primary/90",
              )}
              data-cursor-hover
              onClick={(e) => handleNavigation(e, "/about")}
            >
              ABOUT
            </Link>
            <Link
              href="/collections"
              className={cn(
                "text-sm font-medium tracking-wider transition-colors",
                scrolled ? "text-black hover:text-primary" : "text-white hover:text-primary/90",
              )}
              data-cursor-hover
              onClick={(e) => handleNavigation(e, "/collections")}
            >
              COLLECTIONS
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium tracking-wider transition-colors",
                scrolled ? "text-black hover:text-primary" : "text-white hover:text-primary/90",
              )}
              data-cursor-hover
              onClick={(e) => handleNavigation(e, "/contact")}
            >
              CONTACT
            </Link>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className={cn("w-12 h-12 md:hidden", scrolled ? "text-black" : "text-white")}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} handleNavigation={handleNavigation} />
        </div>
      </MaxWidthWrapper>
    </motion.header>
  )
}

