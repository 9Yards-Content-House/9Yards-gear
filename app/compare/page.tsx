import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GearComparison } from "@/components/gear/gear-comparison"

export const metadata: Metadata = {
  title: "Compare Equipment | Side-by-Side Comparison",
  description: "Compare film equipment specs, pricing, and availability side-by-side. Make informed decisions about cameras, lenses, and gear for your production.",
  openGraph: {
    title: "Compare Equipment - 9Yards Gear",
    description: "Compare film equipment specs, pricing, and availability side-by-side.",
    url: "https://gear.9yards.co.ug/compare",
  },
}

export default function ComparePage() {
  return (
    <>
      <Header />
      <main>
        <GearComparison />
      </main>
      <Footer />
    </>
  )
}
