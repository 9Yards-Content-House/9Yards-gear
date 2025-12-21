import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calendar, CreditCard, Truck, Camera, CheckCircle, Phone, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works | 9Yards Gear",
  description: "Learn how to rent professional film equipment from 9Yards Gear. Simple 4-step process: Browse, Book, Pickup, Return.",
}

const steps = [
  {
    number: "01",
    title: "Browse & Select",
    description: "Explore our inventory of professional cameras, lenses, lighting, audio, and more. Use filters to find exactly what you need for your production.",
    icon: Search,
  },
  {
    number: "02",
    title: "Book Your Dates",
    description: "Select your rental dates and add equipment to your quote. We offer daily and weekly rates with discounts for longer rentals.",
    icon: Calendar,
  },
  {
    number: "03",
    title: "Confirm & Pay",
    description: "Review your booking, pay a deposit to secure your equipment. We accept Mobile Money, bank transfers, and cash.",
    icon: CreditCard,
  },
  {
    number: "04",
    title: "Pickup & Create",
    description: "Collect your equipment from our Kampala studio. We'll walk you through everything and ensure you're ready to shoot.",
    icon: Camera,
  },
]

const pricingInfo = [
  { label: "Daily Rate", description: "Perfect for short shoots (1-3 days)" },
  { label: "Weekly Rate", description: "7 days for the price of 5 - great value for longer projects" },
  { label: "Package Deals", description: "Bundle equipment for additional discounts" },
]

const policies = [
  "Valid ID required for all rentals",
  "Deposit required (refundable on return)",
  "Equipment must be returned in original condition",
  "Late returns incur additional daily charges",
  "Damage/loss protection available",
]

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-background to-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Renting professional equipment from 9Yards Gear is simple. Follow these four easy steps to get the gear you need for your next production.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <Card key={step.number} className="relative overflow-hidden group hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-5xl font-bold text-primary/20 absolute top-4 right-4">
                      {step.number}
                    </span>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Info */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Pricing Structure</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Flexible pricing options to suit projects of any size
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {pricingInfo.map((item) => (
                <Card key={item.label} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-primary">{item.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link href="/calculator">Calculate Your Rental Cost</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Rental Requirements</h2>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{policy}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="outline">
                  <Link href="/policies">View Full Rental Policies</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary/10">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Browse our inventory or contact us directly to discuss your production needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/inventory">Browse Equipment</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
