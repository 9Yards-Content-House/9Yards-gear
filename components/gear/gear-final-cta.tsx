"use client"

import Link from "next/link"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GearFinalCTAProps {
  itemName: string
  pricePerDay: number
}

export function GearFinalCTA({ itemName, pricePerDay }: GearFinalCTAProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "256700488870"
  const message = `Hi! I'd like to book the ${itemName}. Is it available?`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <section className="mt-16 py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Ready to Book the {itemName}?
        </h2>
        <p className="text-muted-foreground mb-8">
          Check availability, select your dates, and secure this equipment for your production.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-base" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Book Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </a>
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Not sure if this is the right equipment?{" "}
          <a href="tel:+256700488870" className="text-primary hover:underline">
            Call 0700 488 870
          </a>{" "}
          and we&apos;ll help you choose.
        </p>
      </div>
    </section>
  )
}
