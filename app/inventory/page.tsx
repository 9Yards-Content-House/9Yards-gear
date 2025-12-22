import { Suspense } from "react"
import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { InventoryContent } from "@/components/inventory/inventory-content"

export const metadata: Metadata = {
  title: "Film Equipment Inventory | Cameras, Lenses & Lighting",
  description:
    "Browse 50+ cinema cameras, lenses, lighting, audio gear & drones. Real-time availability, transparent pricing. ARRI, RED, Sony, Canon & more. Book today.",
  openGraph: {
    title: "Film Equipment Inventory - 9Yards Gear",
    description: "Browse 50+ professional cinema cameras, lenses, lighting, audio gear & drones. Real-time availability in Kampala.",
    url: "https://gear.9yards.co.ug/inventory",
  },
}

export default function InventoryPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Suspense fallback={<InventoryLoadingSkeleton />}>
          <InventoryContent />
        </Suspense>
      </main>
      <Footer />
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
