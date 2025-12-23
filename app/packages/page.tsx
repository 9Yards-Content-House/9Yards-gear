import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Camera, Video, Mic, Film, Sparkles, Check, ChevronRight, 
  Package, Zap, DollarSign, Phone, MessageCircle, Plane, Users, Laptop,
  LucideIcon
} from "lucide-react"
import { getAllPackages, type Package as PackageType } from "@/lib/airtable"

export const metadata: Metadata = {
  title: "Production Packages | Film Equipment Bundles Uganda",
  description: "Save up to 20% with curated production packages. Music video, documentary, commercial & aerial bundles. Everything you need in one rental. Book now.",
  openGraph: {
    title: "Production Packages - Save up to 20% | 9Yards Gear",
    description: "Curated film equipment bundles for music videos, documentaries, commercials & aerial productions. Save up to 20% vs individual rentals.",
    url: "https://gear.9yards.co.ug/packages",
  },
}

// Icon mapping for dynamic icons from Airtable
const iconMap: Record<string, LucideIcon> = {
  Camera,
  Video,
  Mic,
  Film,
  Sparkles,
  Package,
  Plane,
  Users,
  Laptop,
}

const faqs = [
  {
    question: "How much do I save with a package vs. renting items individually?",
    answer: "Package bundles save you 15-20% compared to renting each item separately. The exact savings depend on the package and rental duration. Weekly rentals save even more up to 23% total."
  },
  {
    question: "Can I swap items in a package?",
    answer: "Yes! Packages are starting points. You can swap equipment or add items based on your production needs. Contact us at 0700 488 870 and we'll customize the bundle while maintaining the discount."
  },
  {
    question: "Do packages include delivery and setup?",
    answer: "Packages include all listed equipment ready for pickup at our Kampala studio. Delivery is available for an additional fee (rates depend on location). Setup assistance can be arranged for larger packages contact us for pricing."
  },
  {
    question: "What if I need the package for multiple days or weeks?",
    answer: "All packages offer discounted multi-day rates: 3 Days (save an additional 10%), 1 Week (save up to 23% total), Monthly (custom pricing available)."
  },
  {
    question: "Is training included with equipment packages?",
    answer: "We provide a brief orientation during pickup covering basic operation and care guidelines. For in-depth training, we offer equipment training sessions (additional fee: USh 100,000 for 2-hour session)."
  },
  {
    question: "Can I add individual items to a package?",
    answer: "Absolutely! You can add any equipment from our inventory to your package booking. Bundle discount applies to add-on items when booked together with a package."
  },
  {
    question: "Do I still pay a deposit for package rentals?",
    answer: "Yes, a deposit of 50% of the total package value is required. This is fully refundable after equipment inspection upon return."
  },
]

function formatPrice(amount: number) {
  return `USh ${amount.toLocaleString()}`
}

function PackageCard({ pkg }: { pkg: PackageType }) {
  const IconComponent = iconMap[pkg.icon] || Package

  return (
    <Card className={`relative overflow-hidden ${pkg.badge ? 'border-primary' : ''}`}>
      {pkg.badge && (
        <div className="absolute top-4 right-4">
          <Badge className={`${pkg.badgeColor || 'bg-primary'} text-white`}>{pkg.badge}</Badge>
        </div>
      )}
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{pkg.name}</CardTitle>
        <p className="text-muted-foreground text-sm">{pkg.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Includes List */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">What&apos;s Included:</h4>
          <ul className="space-y-2">
            {pkg.includes.slice(0, 6).map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
            {pkg.includes.length > 6 && (
              <li className="text-sm text-primary">+{pkg.includes.length - 6} more items</li>
            )}
          </ul>
        </div>

        {/* Pricing Box */}
        <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(pkg.individualPrice)}/day
            </span>
            <Badge variant="secondary" className="bg-green-500/10 text-green-600">
              Save {pkg.savings}%
            </Badge>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">{formatPrice(pkg.bundlePrice)}</span>
            <span className="text-muted-foreground">/day</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Weekly: {formatPrice(pkg.weeklyPrice)} (save more!)
          </p>
        </div>

        {/* Note if applicable */}
        {pkg.note && (
          <p className="text-xs text-muted-foreground bg-primary/5 rounded-lg p-3">
            💡 {pkg.note}
          </p>
        )}

        {/* Best For */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Best for:</strong> {pkg.bestFor}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <Button asChild className="flex-1">
            <Link href="/contact">Book This Package</Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent">
            <a href={`https://wa.me/256700488870?text=${encodeURIComponent(`Hi! I'm interested in the ${pkg.name}. Is it available?`)}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function PackagesPage() {
  // Fetch packages from Airtable
  const packages = await getAllPackages()

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
              <span className="text-foreground font-medium">Packages</span>
            </nav>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="text-primary font-medium">Curated Bundles</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Save Up to 20% with Production Packages
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Pre-curated equipment bundles for every production type. Get everything you need in one booking cameras, lenses, lighting, audio, and support gear at bundle pricing.
              </p>

              {/* Key Benefits Bar */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Save 15-20%</p>
                    <p className="text-xs text-muted-foreground">vs. individual rentals</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Everything Included</p>
                    <p className="text-xs text-muted-foreground">Camera, lenses, accessories</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">One-Click Booking</p>
                    <p className="text-xs text-muted-foreground">Simplified rental process</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Can&apos;t find the perfect package? Call{" "}
                <a href="tel:+256700488870" className="text-primary font-medium hover:underline">0700 488 870</a>
                {" "}or scroll down to request a custom quote.
              </p>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section id="packages" className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{packages.length} packages</strong>
              </p>
            </div>

            {packages.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {packages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Packages Available</h3>
                <p className="text-muted-foreground mb-6">
                  We&apos;re updating our packages. Contact us for custom bundles.
                </p>
                <Button asChild>
                  <a href="tel:+256700488870">
                    <Phone className="mr-2 h-4 w-4" />
                    Call 0700 488 870
                  </a>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Custom Package CTA */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Need Something Custom?</h2>
              <p className="text-muted-foreground mb-6">
                Every production is unique. Tell us what you&apos;re shooting, and we&apos;ll build the perfect equipment package for your needs at bundle pricing.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Tailored to your requirements</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Budget-conscious options</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Same 15-20% discount</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Request Custom Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent">
                  <a href="tel:+256700488870">
                    <Phone className="mr-2 h-4 w-4" />
                    0700 488 870
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Response time: Within 2 hours on business days</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Frequently Asked Questions About Packages
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center mt-6">
              <Link href="/faq" className="text-primary hover:underline text-sm">
                Have more questions? View all FAQs →
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Book Your Production Package?
              </h2>
              <p className="text-muted-foreground mb-8">
                Choose a package, check availability, and secure your equipment. Same-day pickup available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="#packages">Browse Packages</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent">
                  <Link href="/contact">Request Custom Quote</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Questions? Call <a href="tel:+256700488870" className="text-primary hover:underline">0700 488 870</a> or WhatsApp us anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
