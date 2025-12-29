import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Search, Calendar, Package, Camera, CheckCircle, Phone, 
  ChevronRight, Clock, CreditCard, 
  Shield, Users, Star, Sparkles
} from "lucide-react"

export const metadata: Metadata = {
  title: "How to Rent Film Equipment | Simple 4-Step Process",
  description: "Renting professional gear is easy: Browse, Book, Pickup, Create. Learn our simple 4-step process and pickup requirements. Call: 0700488870",
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

const trustIndicators = [
  { icon: Users, label: "50+ Productions", description: "Supported" },
  { icon: CreditCard, label: "Same-Day", description: "Deposit Refunds" },
  { icon: Shield, label: "Well-Maintained", description: "Equipment" },
  { icon: Star, label: "5-Star", description: "Client Rating" },
]

export default function HowItWorksPage() {
  return (
    <>
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

            <h1 className="text-4xl md:text-6xl tracking-tight mb-6 gradient-heading pb-2">
              Renting Professional Gear <br className="hidden sm:block" />
              Made Simple
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              From browsing to booking to shooting, here's exactly what to expect when you rent from 9Yards Films. No confusing forms, no hidden fees.
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
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
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
              <h2 className="text-3xl md:text-4xl mb-4 gradient-heading pb-1">How Renting Works</h2>
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

        {/* Pickup & Return Process */}
        <section className="py-24 bg-secondary/20">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Logistics</Badge>
              <h2 className="text-3xl md:text-4xl mb-4 gradient-heading pb-1">Pickup & Return Process</h2>
              <p className="text-muted-foreground">
                Everything you need to know about getting your gear.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full bg-card rounded-xl border border-border/50 shadow-sm">
              <AccordionItem value="pickup" className="px-4">
                <AccordionTrigger className="text-base py-6">What to bring for pickup?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  <ul className="list-disc pl-4 space-y-1 mb-4">
                    <li>Valid national ID or passport</li>
                    <li>Deposit payment (mobile money, transfer, or cash)</li>
                    <li>Rental fee payment (or partial as agreed)</li>
                  </ul>
                  <p className="text-sm font-medium text-primary flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Total time: ~15-20 mins
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="inspection" className="px-4">
                <AccordionTrigger className="text-base py-6">How does inspection work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  We check every item together: camera sensor, lens glass, light functionality, and audio connections. We document the condition to protect both parties.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="late" className="px-4 border-b-0">
                <AccordionTrigger className="text-base py-6">What if I'm late?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  <p className="mb-2">We offer a <strong>1-hour grace period</strong>. After that, late fees apply.</p>
                  <p className="text-sm bg-secondary/50 p-3 rounded-md">
                    <span className="font-semibold text-foreground">Pro tip:</span> Call us before your return time if you need an extension. We're flexible if the gear isn't booked!
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl mb-6 gradient-heading pb-1">Ready to Start Your Production?</h2>
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
    </>
  )
}

