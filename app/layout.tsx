import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FloatingActions } from "@/components/ui/floating-actions"
import { PWARegister } from "@/components/pwa-register"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "9Yards Gear | Professional Equipment Rental Uganda",
  description:
    "Premium film and production equipment rental in Uganda. Cameras, lenses, lighting, audio, drones and more for professional filmmakers and content creators.",
  keywords: ["gear rental", "film equipment", "camera rental", "Uganda", "production equipment", "9Yards", "cinema camera rental", "video equipment Kampala"],
  authors: [{ name: "9Yards Film" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "9Yards Gear | Professional Equipment Rental Uganda",
    description: "Premium film and production equipment rental in Uganda.",
    url: "https://gear.9yards.co.ug",
    siteName: "9Yards Gear",
    type: "website",
    locale: "en_UG",
  },
  twitter: {
    card: "summary_large_image",
    title: "9Yards Gear | Professional Equipment Rental Uganda",
    description: "Premium film and production equipment rental in Uganda.",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        {/* Flutterwave */}
        <script src="https://checkout.flutterwave.com/v3.js"></script>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4AF37" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
          Skip to main content
        </a>
        {children}
        <FloatingActions />
        <PWARegister />
        <Analytics />
      </body>
    </html>
  )
}
