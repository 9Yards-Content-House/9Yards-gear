import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { FloatingActions } from "@/components/ui/floating-actions"
import { PWARegister } from "@/components/pwa-register"
import { GearProvider } from "@/lib/gear-context"
import { CartProvider } from "@/lib/cart-context"
import { getAllGear, getAllCategories } from "@/lib/gear-data"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const siteUrl = "https://gear.9yards.co.ug"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Professional Film Equipment Rental Kampala | 9Yards Gear",
    template: "%s | 9Yards Gear"
  },
  description:
    "Rent cinema cameras, lenses, lighting & audio gear in Kampala. Trusted by 200+ productions. Transparent pricing, well-maintained equipment. Book now: 0700488870",
  keywords: [
    "film equipment rental Uganda",
    "camera rental Kampala",
    "cinema camera rental",
    "production equipment Uganda",
    "ARRI rental Uganda",
    "Sony FX6 rental",
    "video equipment Kampala",
    "lighting rental Uganda",
    "audio gear rental",
    "drone rental Kampala",
    "9Yards Gear",
    "9Yards Film",
    "gear rental Uganda",
    "equipment hire Kampala",
    "film production Uganda",
    "video production equipment Uganda",
    "Blackmagic rental Uganda",
    "RED camera rental Uganda",
    "film gear hire East Africa",
    "professional camera rental Uganda",
    "movie equipment rental Kampala",
    "broadcast equipment Uganda",
    "9Yards content house",
    "9Yards Uganda",
    "hire film equipment Kampala"
  ],
  authors: [{ name: "9Yards Film", url: "https://film.9yards.co.ug" }],
  creator: "9Yards Gear",
  publisher: "9Yards",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: siteUrl,
    siteName: "9Yards Gear",
    title: "Professional Film Equipment Rental Kampala | 9Yards Gear",
    description: "Uganda's premier film equipment rental house. Cinema cameras, lighting, audio gear & more. Trusted by 200+ productions. Book professional gear today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "9Yards Gear - Professional Film Equipment Rental in Kampala, Uganda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Film Equipment Rental Kampala | 9Yards Gear",
    description: "Rent cinema cameras, lenses, lighting & audio gear. Trusted by 200+ Uganda productions.",
    images: ["/twitter-card.jpg"],
    creator: "@9yards_ug",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "QDT0bvNomFsJHjx50qFwFZJc0MgLW_ULO3JolmgDxds",
  },
  category: "Film Equipment Rental",
  other: {
    "geo.region": "UG-C",
    "geo.placename": "Kampala",
    "geo.position": "0.3476;32.5825",
    "ICBM": "0.3476, 32.5825",
  },
}

export const viewport: Viewport = {
  themeColor: "#D4AF37",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD Schema for the entire site
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#organization`,
  name: "9Yards Gear",
  alternateName: ["9Yards Film Equipment Rental", "9Yards Film Gear", "9Yards Uganda Gear"],
  description: "Professional film equipment rental in Kampala, Uganda. Cinema cameras, lenses, lighting, audio gear & drones for filmmakers and content creators. Part of 9Yards Film production company.",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.jpg`,
  telephone: "+256700488870",
  email: "gear@9yards.co.ug",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kampala",
    addressLocality: "Kampala",
    addressRegion: "Central Region",
    postalCode: "256",
    addressCountry: "UG"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "0.3476",
    longitude: "32.5825"
  },
  areaServed: [
    { "@type": "City", name: "Kampala" },
    { "@type": "Country", name: "Uganda" },
    { "@type": "Place", name: "East Africa" }
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00"
    }
  ],
  priceRange: "UGX 10,000 - UGX 500,000",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "47"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Film Equipment Rental Catalog",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Cinema Cameras", description: "Professional cinema cameras for film production" },
      { "@type": "OfferCatalog", name: "Lenses", description: "Cinema and photography lenses" },
      { "@type": "OfferCatalog", name: "Lighting", description: "Professional lighting equipment" },
      { "@type": "OfferCatalog", name: "Audio", description: "Audio recording equipment" },
      { "@type": "OfferCatalog", name: "Drones", description: "Professional aerial filming drones" },
      { "@type": "OfferCatalog", name: "Accessories", description: "Production accessories and grip equipment" }
    ]
  },
  sameAs: [
    "https://www.instagram.com/9yards.ug",
    "https://www.tiktok.com/@9yards",
    "https://www.youtube.com/@9yardscontenthouse",
    "https://film.9yards.co.ug",
    "https://9yards.co.ug"
  ],
  isPartOf: {
    "@type": "Organization",
    "@id": "https://film.9yards.co.ug/#organization",
    name: "9Yards Film",
    url: "https://film.9yards.co.ug",
    description: "Uganda's premier film production company"
  },
  parentOrganization: {
    "@type": "Organization",
    name: "9Yards",
    url: "https://9yards.co.ug"
  },
  knowsAbout: [
    "Film Production",
    "Video Production",
    "Camera Equipment",
    "Cinematography",
    "Film Equipment Rental",
    "Uganda Film Industry"
  ]
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch initial data on the server
  const [initialGear, initialCategories] = await Promise.all([
    getAllGear(),
    getAllCategories(),
  ])

  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5TQZXSDWSF"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5TQZXSDWSF');
            `,
          }}
        />
        {/* Flutterwave */}
        <script src="https://checkout.flutterwave.com/v3.js"></script>
        {/* Netlify Identity Widget */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Favicons - explicit links for browser compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
          Skip to main content
        </a>
        <GearProvider initialGear={initialGear} initialCategories={initialCategories}>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </GearProvider>
        <FloatingActions />
        <PWARegister />
      </body>
    </html>
  )
}
