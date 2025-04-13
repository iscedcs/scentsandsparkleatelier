import { ClientLayout } from "@/components/layout/layout-content"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import type React from "react"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Scents & Sparkle Atelier",
  description: "Premium candles and home fragrances crafted to transform spaces with intentional scents.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
         <ClientLayout> {children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
