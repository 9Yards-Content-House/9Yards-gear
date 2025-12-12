import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FloatingActions } from "@/components/ui/floating-actions"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "9Yards Gear | Professional Equipment Rental Uganda",
  description:
    "Premium film and production equipment rental in Uganda. Cameras, lenses, lighting, audio, drones and more for professional filmmakers and content creators.",
  keywords: ["gear rental", "film equipment", "camera rental", "Uganda", "production equipment", "9Yards"],
  authors: [{ name: "9Yards Film" }],
  openGraph: {
    title: "9Yards Gear | Professional Equipment Rental Uganda",
    description: "Premium film and production equipment rental in Uganda.",
    url: "https://gear.9yards.co.ug",
    siteName: "9Yards Gear",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased min-h-screen`}>
        {children}
        <FloatingActions />
        <Analytics />
      </body>
    </html>
  )
}
