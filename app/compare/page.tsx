import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GearComparison } from "@/components/gear/gear-comparison"

export const metadata: Metadata = {
  title: "Compare Equipment | 9Yards Gear",
  description: "Compare professional film and production equipment side-by-side. View specs, pricing, and availability.",
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
