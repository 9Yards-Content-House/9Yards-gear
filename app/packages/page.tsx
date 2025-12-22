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
  Package, Zap, DollarSign, Phone, MessageCircle, Plane, Users, Laptop
} from "lucide-react"

export const metadata: Metadata = {
  title: "Production Packages | Film Equipment Bundles Uganda",
  description: "Save up to 20% with curated production packages. Music video, documentary, commercial & aerial bundles. Everything you need in one rental. Book now.",
  openGraph: {
    title: "Production Packages - Save up to 20% | 9Yards Gear",
    description: "Curated film equipment bundles for music videos, documentaries, commercials & aerial productions. Save up to 20% vs individual rentals.",
    url: "https://gear.9yards.co.ug/packages",
  },
}

const packages = [
  {
    id: "music-video-starter",
    name: "Music Video Starter Package",
    description: "Everything you need for a professional music video shoot from smooth camera movement to cinematic lighting.",
    icon: Video,
    badge: "Most Popular",
    badgeColor: "bg-yellow-500",
    includes: [
      "Sony FX6 Full-Frame Camera",
      "Sony 24-70mm f/2.8 GM II Lens",
      "DJI RS 3 Pro Gimbal",
      "Aputure Amaran 200d LED Panel",
      "Aputure MC RGBWW Mini Lights (4-pack)",
      "SmallHD Focus 5\" Monitor",
      "Rode VideoMic NTG",
      "4x V-Mount Batteries",
      "Memory Cards (512GB total)",
      "All Cables & Accessories",
      "Protective Cases",
    ],
    individualPrice: 650000,
    bundlePrice: 520000,
    weeklyPrice: 2800000,
    savings: 20,
    bestFor: "Music videos, social content, branded videos",
  },
  {
    id: "documentary-run-gun",
    name: "Documentary Run-and-Gun Package",
    description: "Lightweight, versatile setup for solo documentary filmmakers and on-the-go content creators.",
    icon: Film,
    badge: null,
    includes: [
      "Canon C70 Cinema Camera",
      "Canon RF 24-105mm f/4L Lens",
      "Sennheiser G4 Wireless Lav System",
      "Rode NTG3 Shotgun Microphone",
      "Zoom F6 Audio Recorder",
      "Manfrotto MVH502A Tripod",
      "Aputure MC 4-Light Kit",
      "3x Canon LP-E6NH Batteries",
      "Memory Cards (256GB total)",
      "Audio Cables & XLR Kit",
      "Padded Backpack",
    ],
    individualPrice: 480000,
    bundlePrice: 400000,
    weeklyPrice: 2100000,
    savings: 17,
    bestFor: "Documentaries, interviews, event coverage",
  },
  {
    id: "cinema-production-pro",
    name: "Cinema Production Pro Package",
    description: "Hollywood-grade equipment for commercials, narrative films, and premium content requiring the highest image quality.",
    icon: Camera,
    badge: "Best Value",
    badgeColor: "bg-orange-500",
    includes: [
      "ARRI Alexa Mini LF Cinema Camera",
      "ARRI Signature Prime Lens Set (25mm, 50mm, 85mm)",
      "ARRI SkyPanel S60-C (2 units)",
      "DJI Ronin 2 3-Axis Gimbal",
      "Teradek Bolt 4K Wireless Video System",
      "SmallHD 1703 HDR Monitor",
      "Sennheiser MKH 416 Shotgun Mic",
      "6x V-Mount Batteries (150Wh)",
      "CFexpress Memory Cards (1TB total)",
      "Manfrotto Tripod with Fluid Head",
      "All Cables, Cases & Accessories",
    ],
    individualPrice: 1850000,
    bundlePrice: 1450000,
    weeklyPrice: 7500000,
    savings: 22,
    bestFor: "High-end commercials, music videos, narrative films",
  },
  {
    id: "aerial-cinematography",
    name: "Aerial Cinematography Package",
    description: "Professional drone setup for stunning aerial shots, real estate videos, documentaries, and music videos.",
    icon: Plane,
    badge: null,
    includes: [
      "DJI Inspire 3 Drone (8K full-frame)",
      "DJI RC Plus Controller",
      "8x TB51 Intelligent Batteries",
      "DJI Charging Hub",
      "ND Filter Set (ND8, ND16, ND32, ND64)",
      "512GB SSD",
      "Spare Propellers (2 sets)",
      "Landing Pad",
      "Hard-Shell Carrying Case",
    ],
    individualPrice: 380000,
    bundlePrice: 320000,
    weeklyPrice: 1680000,
    savings: 16,
    bestFor: "Aerial shots, real estate, documentaries",
    note: "Pilot certification required or hire our licensed drone operator (+USh 200,000/day)",
  },
  {
    id: "event-coverage",
    name: "Event Coverage Essentials Package",
    description: "Multi-camera setup for weddings, conferences, concerts, and live events.",
    icon: Users,
    badge: null,
    includes: [
      "2x Sony A7S III Cameras",
      "Sony 24-70mm f/2.8 GM II Lens",
      "Sony 70-200mm f/2.8 GM II Lens",
      "2x DJI RS 3 Gimbals",
      "Sennheiser EW 112P G4 Wireless Lav (2 units)",
      "Zoom H6 Audio Recorder",
      "Aputure Amaran 200x Bi-Color LED (2 units)",
      "8x NP-FZ100 Batteries",
      "Memory Cards (512GB per camera)",
      "2x Manfrotto Tripods",
      "Rolling Equipment Case",
    ],
    individualPrice: 720000,
    bundlePrice: 600000,
    weeklyPrice: 3150000,
    savings: 17,
    bestFor: "Weddings, conferences, concerts, live events",
  },
  {
    id: "podcast-interview",
    name: "Podcast & Interview Studio Package",
    description: "Complete audio and video setup for podcasts, interviews, and talk shows.",
    icon: Mic,
    badge: "New",
    badgeColor: "bg-green-500",
    includes: [
      "2x Sony A7 IV Cameras",
      "2x Sony 35mm f/1.8 Lenses",
      "ATEM Mini Pro ISO Video Switcher",
      "4x Shure SM7B Microphones",
      "Rode Rodecaster Pro II",
      "4x Mic Boom Arms with Shock Mounts",
      "Aputure Amaran 100d LED (4 units)",
      "Elgato Stream Deck",
      "Headphones (4 sets)",
      "All Cables (HDMI, XLR, USB)",
    ],
    individualPrice: 550000,
    bundlePrice: 450000,
    weeklyPrice: 2350000,
    savings: 18,
    bestFor: "Podcasts, interviews, YouTube content",
    note: "Bundle with our Studio rental: Total USh 550,000/day",
  },
  {
    id: "indie-filmmaker",
    name: "Indie Filmmaker Starter Package",
    description: "Budget-friendly cinema setup for emerging filmmakers, student projects, and low-budget narratives.",
    icon: Sparkles,
    badge: null,
    includes: [
      "Blackmagic Pocket Cinema Camera 6K",
      "Sigma 18-35mm f/1.8 Lens",
      "Zhiyun Crane 3S Gimbal",
      "2x Godox SL60W LED Lights",
      "Rode VideoMic Pro+",
      "Zoom H5 Audio Recorder",
      "Manfrotto Tripod",
      "4x Canon LP-E6 Batteries",
      "CFast 2.0 Cards (256GB total)",
      "Backpack",
    ],
    individualPrice: 320000,
    bundlePrice: 270000,
    weeklyPrice: 1400000,
    savings: 16,
    bestFor: "Student films, indie projects, low-budget narratives",
    note: "Student filmmakers get an additional 10% off with valid ID",
  },
  {
    id: "social-media-kit",
    name: "Social Media Content Kit",
    description: "Portable setup for Instagram Reels, TikTok videos, YouTube content, and influencer shoots.",
    icon: Laptop,
    badge: "Creator Favorite",
    badgeColor: "bg-blue-500",
    includes: [
      "Sony ZV-E1 Camera",
      "Sony 16-35mm f/4 Lens",
      "DJI OM 6 Smartphone Gimbal",
      "Rode Wireless GO II",
      "Elgato Key Light Air (2 units)",
      "Neewer 5-in-1 Reflector",
      "Portable Tripod with Phone Mount",
      "2x NP-FZ100 Batteries",
      "SD Cards (128GB)",
      "Compact Shoulder Bag",
    ],
    individualPrice: 280000,
    bundlePrice: 230000,
    weeklyPrice: 1200000,
    savings: 18,
    bestFor: "Instagram, TikTok, YouTube, influencer content",
  },
]

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

export default function PackagesPage() {
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
              <p className="text-sm text-muted-foreground">Showing <strong>{packages.length} packages</strong></p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {packages.map((pkg) => (
                <Card key={pkg.id} className={`relative overflow-hidden ${pkg.badge ? 'border-primary' : ''}`}>
                  {pkg.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge className={`${pkg.badgeColor || 'bg-primary'} text-white`}>{pkg.badge}</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <pkg.icon className="h-6 w-6 text-primary" />
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
              ))}
            </div>
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
