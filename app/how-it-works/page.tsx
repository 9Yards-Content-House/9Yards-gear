import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Search, Calendar, Package, Camera, CheckCircle, Phone, 
  ChevronRight, Clock, MapPin, CreditCard, Truck, 
  Shield, Users, Star, ArrowRight, Sparkles
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
      "View detailed equipment specifications",
      "Check availability for your dates",
      "Compare equipment specs side-by-side",
      "Estimate total rental cost instantly",
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
      "Review your rental summary",
      "Submit booking with contact details",
      "Receive confirmation via phone/WhatsApp",
    ],
    proTip: "We recommend booking at least 48 hours in advance for regular equipment, and 5-7 days for high-demand items.",
  },
  {
    number: "03",
    title: "Pick Up from Our Studio",
    icon: Package,
    description: "Come to our studio during pickup hours with your ID and deposit. We'll walk through the equipment together, inspect every item, and make sure you're comfortable using it before you leave.",
    features: [
      "Bring valid national ID or passport",
      "Pay deposit via mobile money/cash",
      "Receive fully tested equipment",
      "Get a quick tutorial if needed",
    ],
    proTip: "First-time renter? We'll give you a quick tutorial on operation basics and answer any questions.",
  },
  {
    number: "04",
    title: "Create & Return",
    icon: Camera,
    description: "Now the fun part—use the gear to bring your vision to life. When you're done, return everything during our business hours in the same condition you received it.",
    features: [
      "Treat the gear as if it were your own",
      "Contact us immediately if issues arise",
      "Return by agreed time",
      "Deposit refunded same day",
    ],
    proTip: "Need more time? Call us before your return time. If available, we'll extend your rental at the standard rate.",
  },
]

const pricingTiers = [
  {
    label: "Daily Rate",
    description: "24-hour period from pickup. Perfect for single-day shoots.",
    example: "Sony FX6: UGX 300,000/day",
    highlight: false,
  },
  {
    label: "3-Day Rate",
    description: "Save 10-15% vs. daily rentals. Ideal for weekend productions.",
    example: "Save ~UGX 90,000 on FX6",
    highlight: false,
  },
  {
    label: "Weekly Rate",
    description: "7 days for the price of 5. Best value for longer shoots.",
    example: "Save ~UGX 420,000 on FX6",
    highlight: true,
  },
  {
    label: "Monthly Rate",
    description: "30+ days with significant discounts. Custom quotes available.",
    example: "Contact for pricing",
    highlight: false,
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
      <main id="main-content" className="min-h-screen pt-20 bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 -z-10" />
          
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">How It Works</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Renting Professional Gear <br className="hidden sm:block" />
              <span className="text-primary">Made Simple</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              From browsing to booking to shooting—here's exactly what to expect when you rent from 9Yards Gear. No confusing forms, no hidden fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/inventory">Browse Equipment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <Link href="/faq">Read FAQ</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 border-y border-border/50 bg-card/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {trustIndicators.map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps - Vertical Timeline */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">The Process</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Renting Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Getting professional gear for your production takes just four simple steps.
              </p>
            </div>

            <div className="relative space-y-12 lg:space-y-0 lg:before:absolute lg:before:inset-0 lg:before:ml-auto lg:before:mr-auto lg:before:w-0.5 lg:before:bg-border lg:before:h-full lg:before:z-0">
              {steps.map((step, index) => (
                <div key={step.number} className={`relative flex flex-col lg:flex-row items-center lg:gap-16 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Number Badge (Desktop Center) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary/10 items-center justify-center z-10 shadow-sm">
                    <span className="font-bold text-primary">{step.number}</span>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 z-10">
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-2 lg:hidden">
                          <span className="text-3xl font-bold text-primary/20">{step.number}</span>
                          <div className="h-px flex-1 bg-border" />
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                        <ul className="space-y-3">
                          {step.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
                          <p className="text-sm">
                            <strong className="text-primary flex items-center gap-2 mb-1">
                              <Sparkles className="h-3 w-3" /> Pro Tip
                            </strong>
                            <span className="text-muted-foreground block">{step.proTip}</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Empty Side for Layout Balance */}
                  <div className="w-full lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Pricing</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No hidden fees. Here's exactly how our rental rates work.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier) => (
                <Card key={tier.label} className={`relative h-full transition-all duration-300 hover:-translate-y-1 ${tier.highlight ? 'border-primary shadow-md' : 'border-border/50'}`}>
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Best Value
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{tier.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground min-h-[40px]">{tier.description}</p>
                    <div className="pt-4 border-t border-border/50">
                      <Badge variant="outline" className="w-full justify-center py-1 font-normal">
                        {tier.example}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/calculator">
                  <CreditCard className="h-4 w-4" />
                  Calculate Your Rental Cost
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Logistics Grid */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
              
              {/* Financials */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Shield className="h-6 w-6 text-primary" />
                    Deposits & Payments
                  </h2>
                  <div className="prose prose-sm text-muted-foreground">
                    <p className="mb-4">
                      All rentals require a refundable deposit to protect the equipment. Your deposit is fully refunded immediately after we inspect the returned gear.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="bg-card/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Deposit Rates</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span>Standard</span>
                        <span className="font-medium">50% value</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span>Small Items</span>
                        <span className="font-medium">200k UGX</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Lenses/Audio</span>
                        <span className="font-medium">100k UGX</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Payment Methods</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      {["Mobile Money", "Bank Transfer", "Cash (UGX/USD)", "Invoicing"].map((method) => (
                        <div key={method} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{method}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Pickup & Return Accordion */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  Pickup & Return Process
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="pickup">
                    <AccordionTrigger className="text-base">What to bring for pickup?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Valid national ID or passport</li>
                        <li>Deposit payment (mobile money, transfer, or cash)</li>
                        <li>Rental fee payment (or partial as agreed)</li>
                      </ul>
                      <p className="mt-2 text-sm font-medium text-primary">Total time: ~15-20 mins</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="inspection">
                    <AccordionTrigger className="text-base">How does inspection work?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      We check every item together—camera sensor, lens glass, light functionality, and audio connections. We document the condition to protect both parties.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="late">
                    <AccordionTrigger className="text-base">What if I'm late?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-2">We offer a <strong>1-hour grace period</strong>. After that, late fees apply.</p>
                      <p className="text-sm">Pro tip: Call us before your return time if you need an extension. We're flexible if the gear isn't booked!</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Hours */}
        <section className="py-24 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge variant="outline" className="mb-4 bg-background">Visit Us</Badge>
                <h2 className="text-3xl font-bold mb-6">Our Kampala Studio</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">9Yards Gear Equipment Rental House</p>
                      <p className="text-muted-foreground">Kampala, Uganda</p>
                      <p className="text-xs text-muted-foreground mt-1">Free parking available on-site</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0 shadow-sm">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Hours</h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted-foreground">
                        <span>Mon - Fri</span>
                        <span>9:00 AM - 6:00 PM</span>
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM</span>
                        <span>Sunday</span>
                        <span>Appointment Only</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0 shadow-sm">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Delivery Available</h3>
                      <p className="text-muted-foreground text-sm">
                        Starting from UGX 50,000 for Central Kampala.
                        <br />Same-day delivery for bookings before 12PM.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-card">
                {/* Placeholder for map or studio image */}
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
                  <div className="text-center p-6">
                    <MapPin className="h-12 w-12 text-primary/20 mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Map View</p>
                    <p className="text-sm text-muted-foreground/60 mt-2">Interactive map loading...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Production?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Browse our inventory of professional cameras, lenses, and lighting. 
              Book online or give us a call for a custom quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="h-14 px-8 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                <Link href="/inventory">Browse Equipment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <Link href="/faq" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">?</span>
                Check our FAQ
              </Link>
              <a href="tel:+256700488870" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Phone className="h-4 w-4" />
                </span>
                Call 0700 488 870
              </a>
              <Link href="/equipment-care" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Shield className="h-4 w-4" />
                </span>
                Care Guide
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

