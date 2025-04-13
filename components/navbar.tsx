"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useScroll } from "framer-motion"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MaxWidthWrapper from "./shared/max-widthwrapper"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
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

    if (window.location.pathname !== href) {
      setTimeout(() => {
        router.push(href)
      }, 600)
    } else {
      router.push(href)
    }
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MaxWidthWrapper>
      <div className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" data-cursor-hover onClick={(e) => handleNavigation(e, "/")}>
          <Image
            src="/assets/logo-trans.png"
            alt="Scents & Sparkle Atelier"
            width={120}
            height={120}
            className={cn("h-auto w-auto transition-opacity", scrolled ? "opacity-100" : "opacity-90")}
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
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={cn(scrolled ? "text-black" : "text-white")}
              data-cursor-hover
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-6 mt-12">
              <Link
                href="/"
                className="text-lg font-medium tracking-wider hover:text-primary transition-colors"
                onClick={(e) => handleNavigation(e, "/")}
              >
                HOME
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium tracking-wider hover:text-primary transition-colors"
                onClick={(e) => handleNavigation(e, "/about")}
              >
                ABOUT
              </Link>
              <Link
                href="/collections"
                className="text-lg font-medium tracking-wider hover:text-primary transition-colors"
                onClick={(e) => handleNavigation(e, "/collections")}
              >
                COLLECTIONS
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium tracking-wider hover:text-primary transition-colors"
                onClick={(e) => handleNavigation(e, "/contact")}
              >
                CONTACT
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </MaxWidthWrapper>
    </motion.header>
  )
}
