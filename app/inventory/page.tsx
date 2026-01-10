import { Suspense } from "react"
import type { Metadata } from "next"
import { InventoryContent } from "@/components/inventory/inventory-content"
import { BreadcrumbSchema } from "@/components/seo/schema-org"

export const metadata: Metadata = {
  title: "Film Equipment Inventory | Cameras, Lenses & Lighting Rental Uganda",
  description:
    "Browse 50+ cinema cameras, lenses, lighting, audio gear & drones for rent in Kampala, Uganda. Real-time availability, transparent pricing. ARRI, RED, Sony, Blackmagic, Canon & more. Book professional film equipment today from 9Yards Gear.",
  keywords: [
    "film equipment rental Uganda",
    "camera rental Kampala",
    "cinema camera hire Uganda",
    "lighting rental Kampala",
    "audio gear rental Uganda",
    "drone rental Uganda",
    "9Yards Film equipment",
    "production gear Uganda",
  ],
  openGraph: {
    title: "Film Equipment Inventory - 9Yards Gear Uganda",
    description: "Browse 50+ professional cinema cameras, lenses, lighting, audio gear & drones. Real-time availability in Kampala. Rent from Uganda's trusted film equipment house.",
    url: "https://gear.9yards.co.ug/inventory",
  },
  alternates: {
    canonical: "https://gear.9yards.co.ug/inventory",
  },
}

// Enable ISR with 1-hour revalidation
export const revalidate = 3600 // Revalidate every hour

export default function InventoryPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://gear.9yards.co.ug" },
          { name: "Equipment Inventory", url: "https://gear.9yards.co.ug/inventory" },
        ]}
      />
      <main id="main-content">
        <Suspense fallback={<InventoryLoadingSkeleton />}>
          <InventoryContent />
        </Suspense>
      </main>
    </>
  )
}

function InventoryLoadingSkeleton() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="h-10 w-64 bg-secondary rounded animate-pulse mb-4" />
        <div className="h-6 w-96 bg-secondary rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-4/3 bg-secondary rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
