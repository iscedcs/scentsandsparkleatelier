"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type React from "react"
import Image from "next/image"
import { Button } from "../ui/button"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleNavigation: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export default function MobileMenu({ isOpen, setIsOpen, handleNavigation }: MobileMenuProps) {
  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
  }

  const backdropVariants = {
    open: { opacity: 0.5, transition: { duration: 0.2 } },
    closed: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <>
    <motion.div
    className={cn(
      "fixed inset-0 bg-black/20 backdrop-blur-lg shadow-sm z-30 md:hidden",
      isOpen ? "pointer-events-auto" : "pointer-events-none",
    )}
    initial="closed"
    animate={isOpen ? "open" : "closed"}
    variants={backdropVariants}
  />
    <motion.div
      className={cn(
        "fixed top-0 right-0 bottom-0 w-[80%] rounded-l-3xl bg-primary z-40 md:hidden flex flex-col",
        isOpen ? "pointer-events-auto " : "pointer-events-none",
      )}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
    >
      <div className="flex justify-end p-4">
        <Button
          className="w-12 h-12 flex items-center justify-center text-white hover:text-gray-200"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-8 w-8" />
        </Button>
      </div>
      <nav className="flex flex-col text-background gap-4 items-center justify-center flex-1">
        <Link href='/'
        className="flex items-center"
        data-cursor-hover
        onClick={(e) => handleNavigation(e, "/")}
        >
            <Image
                src="/assets/logo-trans.png"
                alt="Scents & Sparkle Atelier"
                width={120}
                height={120}
                className={cn("h-auto w-auto transition-opacity")}
            />
	    </Link>
        <Link
          href="/"
          className="text-lg font-medium tracking-wider hover:text-primary transition-colors py-2"
          onClick={(e) => handleNavigation(e, "/")}
          aria-label="Navigate to Home"
        >
          HOME
        </Link>
        <Link
          href="/about"
          className="text-lg font-medium tracking-wider hover:text-primary transition-colors py-2"
          onClick={(e) => handleNavigation(e, "/about")}
          aria-label="Navigate to About"
        >
          ABOUT
        </Link>
        <Link
          href="/collections"
          className="text-lg font-medium tracking-wider hover:text-primary transition-colors py-2"
          onClick={(e) => handleNavigation(e, "/collections")}
          aria-label="Navigate to Collections"
        >
          COLLECTIONS
        </Link>
        <Link
          href="/contact"
          className="text-lg font-medium tracking-wider hover:text-primary transition-colors py-2"
          onClick={(e) => handleNavigation(e, "/contact")}
          aria-label="Navigate to Contact"
        >
          CONTACT
        </Link>
      </nav>
    </motion.div>
    </>
  )
}