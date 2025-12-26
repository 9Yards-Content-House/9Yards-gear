import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Search, Calendar, Package, Camera, CheckCircle, Phone, 
  ChevronRight, Clock, MapPin, CreditCard, Truck, 
  Shield, Users, Star, MessageCircle, ArrowRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "How to Rent Film Equipment | Simple 4-Step Process",
  description: "Renting professional gear is easy: Browse, Book, Pickup, Create. Learn our process, pricing, deposit requirements & rental policies. Call: 0700488870",
  openGraph: {
    title: "How to Rent Film Equipment - 9Yards Gear",
    description: "Simple 4-step rental process: Browse, Book, Pickup, Create. Learn everything about renting professional film gear in Kampala.",
    url: "https://gear.9yards.co.ug/how-it-works",
  },
}

const steps = [
  {
    number: "01",
    title: "Browse & Select Your Gear",
    icon: Search,
    description: "Explore our complete inventory of cameras, lenses, lighting, audio equipment, and accessories. Use filters to find exactly what you need, check real-time availability on our calendar, and compare specs side-by-side.",
    features: [
      "View detailed equipment specifications and photos",
      "Check availability for your production dates",
      "Compare equipment specs side-by-side",
      "Use our calculator to estimate your total rental cost",
    ],
    proTip: "Not sure what you need? Browse our categories or contact us for recommendations based on your project type.",
  },
  {
    number: "02",
    title: "Book Your Dates",
    icon: Calendar,
    description: "Once you've selected your equipment, choose your rental dates and submit your booking request. We'll review your booking and confirm availability within 2 hours during business hours.",
    features: [
      "Select your pickup and return dates",
      "Review your rental summary and total cost",
      "Submit your booking with contact details",
      "Receive confirmation via phone call or WhatsApp",
    ],
    proTip: "We recommend booking at least 48 hours in advance for regular equipment, and 5-7 days for high-demand items during peak season.",
  },
  {
    number: "03",
    title: "Pick Up from Our Kampala Studio",
    icon: Package,
    description: "Come to our studio during pickup hours with your ID and deposit. We'll walk through the equipment together, inspect every item, and make sure you're comfortable using it before you leave.",
    features: [
      "Bring valid national ID or passport",
      "Pay deposit via mobile money, bank transfer, or cash",
      "Receive fully tested and charged equipment",
      "Get a quick tutorial if you're new to the gear",
    ],
    proTip: "First-time renter? We'll give you a quick tutorial on operation basics and answer any questions. No question is too simple.",
  },
  {
    number: "04",
    title: "Create Amazing Work, Return on Time",
    icon: Camera,
    description: "Now the fun part use the gear to bring your vision to life. When you're done, return everything during our business hours in the same condition you received it.",
    features: [
      "Treat the gear as if it were your own",
      "Contact us immediately if anything malfunctions",
      "Return by agreed time (1-hour grace period)",
      "Deposit refunded same day after inspection",
    ],
    proTip: "Need more time? Call us before your return time. If the equipment is available, we'll extend your rental at the standard daily rate with zero late fees.",
  },
]

const pricingTiers = [
  {
    label: "Daily Rate",
    description: "24-hour period from pickup. Perfect for single-day shoots, events, or music videos.",
    example: "Sony FX6: UGX 300,000/day",
  },
  {
    label: "3-Day Rate",
    description: "Save 10-15% vs. three separate daily rentals. Ideal for weekend productions.",
    example: "Sony FX6: UGX 810,000 (save UGX 90,000)",
  },
  {
    label: "Weekly Rate",
    description: "7 days, save up to 20%. Great for documentaries, multi-location shoots.",
    example: "Sony FX6: UGX 1,680,000 (save UGX 420,000)",
  },
  {
    label: "Monthly Rate",
    description: "30+ days with significant discounts. Contact us for custom pricing.",
    example: "Custom quote available",
  },
]

const trustIndicators = [
  { icon: Users, label: "200+ Productions", description: "Supported" },
  { icon: CreditCard, label: "Same-Day", description: "Deposit Refunds" },
  { icon: Shield, label: "Well-Maintained", description: "Equipment" },
  { icon: Star, label: "5-Star", description: "Client Rating" },
]

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-background to-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">How It Works</span>
            </nav>

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl gradient-heading mb-4">
                Renting Professional Gear Made Simple
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                From browsing to booking to shooting here&apos;s exactly what to expect when you rent from 9Yards Gear.
              </p>
              <p className="text-sm text-muted-foreground">
                No confusing forms. No hidden fees. Just straightforward access to the equipment you need.
              </p>
            </div>
          </div>
        </section>

        {/* 4-Step Process */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl gradient-heading mb-4">How Renting Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Getting professional gear for your production takes just four simple steps. Whether you&apos;re a first-time renter or a returning client, here&apos;s the complete process.
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <Card key={step.number} className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-0">
                    <CardHeader className="bg-primary/5 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                          <step.icon className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="md:col-span-2 p-6">
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <div className="grid sm:grid-cols-2 gap-2 mb-4">
                        {step.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-primary/5 rounded-lg p-3">
                        <p className="text-sm">
                          <strong className="text-primary">Pro Tip:</strong>{" "}
                          <span className="text-muted-foreground">{step.proTip}</span>
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Explained */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl gradient-heading mb-4">Understanding Our Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transparent pricing, no surprises. Here&apos;s exactly how our rental rates work.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {pricingTiers.map((tier) => (
                <Card key={tier.label} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-primary text-lg">{tier.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                    <Badge variant="secondary" className="text-xs">{tier.example}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Deposit & Payment */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Deposit Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    All rentals require a refundable deposit to protect the equipment. Your deposit is fully refunded after we inspect the returned gear.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Standard:</strong> 50% of equipment value</p>
                    <p><strong>Small items:</strong> Flat UGX 200,000 deposit</p>
                    <p><strong>Lenses/Audio:</strong> Flat UGX 100,000 deposit</p>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <p className="text-sm text-green-600">
                      <strong>Same-day refund:</strong> Deposit returned immediately after inspection via mobile money or bank transfer.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">We accept multiple payment methods for your convenience:</p>
                  <div className="space-y-2">
                    {["Mobile Money (MTN, Airtel)", "Bank Transfer", "Cash (UGX or USD)", "Business Invoicing"].map((method) => (
                      <div key={method} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{method}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm text-muted-foreground">
                      <strong>Payment timing:</strong> Deposit at pickup, rental fee (50% at pickup, 50% at return) or full payment upfront.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link href="/calculator">Calculate Your Rental Cost</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pickup & Return */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Pickup */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Package className="h-6 w-6 text-primary" />
                  Your Pickup Day
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="bring">
                    <AccordionTrigger>What to Bring</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                      <p>• Valid national ID or passport</p>
                      <p>• Deposit payment (mobile money, transfer, or cash)</p>
                      <p>• Rental fee payment (or partial as agreed)</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="receive">
                    <AccordionTrigger>What You&apos;ll Receive</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                      <p>• All selected equipment, fully tested and charged</p>
                      <p>• Batteries, cables, memory cards, and carrying cases</p>
                      <p>• Equipment care guide specific to your rental</p>
                      <p>• Our 24/7 emergency contact number</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="inspection">
                    <AccordionTrigger>The Inspection Process</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      We&apos;ll check every item together camera sensor, lens glass, light functionality, audio connections and document the condition. This protects both you and us. Takes about 5-10 minutes.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Total pickup time:</strong> 15-20 minutes on average
                </p>
              </div>

              {/* Return */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <ArrowRight className="h-6 w-6 text-primary" />
                  Returning Your Equipment
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="process">
                    <AccordionTrigger>Return Process</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                      <p>• Arrive before your agreed return time</p>
                      <p>• Bring all equipment, accessories, and cases</p>
                      <p>• We inspect everything together (10-15 minutes)</p>
                      <p>• Deposit refunded immediately after inspection</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="late">
                    <AccordionTrigger>Late Returns</AccordionTrigger>
                    <AccordionContent className="space-y-2 text-muted-foreground">
                      <p>• <strong>Grace period:</strong> 1 hour late = no charge (just call us)</p>
                      <p>• <strong>After grace:</strong> UGX 50,000/hour up to full daily rate</p>
                      <p>• <strong>Pro tip:</strong> Call before your return time for an extension at regular rates</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="refund">
                    <AccordionTrigger>Deposit Refund</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Same-day refund via mobile money or bank transfer if you return during business hours. After-hours returns are processed first thing the next business day.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Total return time:</strong> 10-15 minutes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Hours */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl gradient-heading mb-4">Visit Our Kampala Studio</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Pickup & Return Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">By appointment only</span>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm text-muted-foreground">
                      <strong>After-hours pickup:</strong> Available Mon-Sat 6PM-9PM with 24hr notice (+UGX 50,000 fee)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Delivery Option
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Can&apos;t make it to our studio? We offer equipment delivery:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Central Kampala</span>
                      <span>UGX 50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Greater Kampala (15km)</span>
                      <span>UGX 75,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entebbe, Wakiso, Mukono</span>
                      <span>UGX 100,000</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Same-day delivery for bookings confirmed by 12PM
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                <MapPin className="inline h-4 w-4 mr-1" />
                9Yards Gear Equipment Rental House, Kampala, Uganda
              </p>
              <p className="text-sm text-muted-foreground">
                Free parking available on-site. Safe vehicle access for loading/unloading equipment.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-foreground">Why Rent from 9Yards Gear?</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustIndicators.map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl gradient-heading mb-4">Ready to Book Your Equipment?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Now that you know exactly how it works, browse our inventory and find the perfect gear for your production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg">
                <Link href="/inventory">Browse Equipment</Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link href="/faq" className="hover:text-primary transition-colors">
                Still have questions? → Check our FAQ
              </Link>
              <a href="tel:+256700488870" className="hover:text-primary transition-colors">
                <Phone className="inline h-4 w-4 mr-1" />
                Call 0700 488 870
              </a>
              <Link href="/equipment-care" className="hover:text-primary transition-colors">
                First-time renter? → Equipment Care Guide
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
