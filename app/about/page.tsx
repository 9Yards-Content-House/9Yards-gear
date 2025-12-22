import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRight, Shield, Clock, Award, Users, CheckCircle, 
  Package, DollarSign, Headphones, Star, Zap, Wrench,
  ChevronRight, Phone, Mail, ExternalLink, Camera
} from "lucide-react"

export const metadata: Metadata = {
  title: "About 9Yards Gear | Uganda's Premier Equipment Rental House",
  description:
    "Part of 9Yards Film. 50+ professional equipment pieces, 200+ productions supported. Empowering Uganda's storytellers with cinema-quality gear since 2020.",
  openGraph: {
    title: "About 9Yards Gear - Uganda's Premier Film Equipment Rental",
    description: "Empowering Uganda's storytellers since 2020. 50+ equipment pieces, 200+ productions supported. Learn our story.",
    url: "https://gear.9yards.co.ug/about",
  },
}

const whyChooseUs = [
  {
    icon: Package,
    title: "Largest Inventory in Kampala",
    description: "Over 50 pieces of professional equipment across every category you need cinema cameras, lenses, lighting, audio, drones, gimbals, and accessories.",
    benefit: "One-stop rental. Build your complete package from a single, trusted inventory."
  },
  {
    icon: Wrench,
    title: "Meticulously Maintained Equipment",
    description: "Every item is inspected after each rental, cleaned professionally, and maintained on a strict schedule. Sensors cleaned. Firmware updated. Batteries tested.",
    benefit: "Equipment that works flawlessly not something that 'should be fine.'"
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing, Zero Hidden Fees",
    description: "Our prices are listed clearly on every equipment page. What you see is what you pay. No surprise fees, no fine print that doubles your cost.",
    benefit: "Budget with confidence. Plan knowing exactly what gear will cost."
  },
  {
    icon: Headphones,
    title: "Expert Support Team",
    description: "Our team are filmmakers, cinematographers, and production specialists who've been on set. We'll actually help recommend what you need.",
    benefit: "Rent from people who understand your production, not just your credit card."
  },
  {
    icon: Users,
    title: "Trusted by Uganda's Leading Creators",
    description: "From Spice Diana's music videos to corporate documentaries for international brands, our gear has been on set for Uganda's most-watched content.",
    benefit: "Use the same equipment trusted by the professionals you admire."
  },
]

const stats = [
  { value: "50+", label: "Professional Equipment", description: "Cinema cameras, lenses, lighting, audio, drones, and accessories" },
  { value: "200+", label: "Productions Supported", description: "Music videos, commercials, documentaries across Uganda" },
  { value: "24/7", label: "Emergency Support", description: "Call us anytime during your rental period" },
  { value: "5-Star", label: "Client Rating", description: "Based on feedback from filmmakers and production houses" },
  { value: "Same-Day", label: "Deposit Refunds", description: "Return your gear, get refunded within hours" },
  { value: "100%", label: "Equipment Uptime", description: "We've never had a no-show or double-booking" },
]

const networkSites = [
  { 
    name: "9Yards Film", 
    href: "https://film.9yards.co.ug", 
    icon: "🎬",
    description: "Full-service video production music videos, commercials, documentaries" 
  },
  { 
    name: "9Yards Content House", 
    href: "https://contenthouse.9yards.co.ug", 
    icon: "🎨",
    description: "Digital marketing, graphic design, social media management" 
  },
  { 
    name: "9Yards Food", 
    href: "https://food.9yards.co.ug", 
    icon: "🍽️",
    description: "Authentic Ugandan cuisine delivered across Kampala" 
  },
  { 
    name: "9Yards", 
    href: "https://9yards.co.ug", 
    icon: "🏢",
    description: "The parent company connecting it all" 
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-background to-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">About Us</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Empowering Uganda&apos;s Storytellers with Professional Gear
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                We believe great stories shouldn&apos;t be held back by equipment limitations. That&apos;s why we built Uganda&apos;s premier film equipment rental house making cinema-quality gear accessible to every creator.
              </p>
              <p className="text-muted-foreground mb-8">
                From first-time filmmakers to established production houses, we&apos;re here to help you create work you&apos;re proud of.
              </p>
              <Button asChild size="lg">
                <Link href="/inventory">
                  Explore Our Equipment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-foreground mb-8">How 9Yards Gear Began</h2>
              
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">The Problem We Saw</h3>
                  <p>
                    As part of the 9Yards Film division, we&apos;ve produced music videos, commercials, documentaries, and film projects across Uganda for years. Time and again, we met talented creators with powerful stories to tell but they were held back by one thing: access to professional equipment.
                  </p>
                  <p className="mt-2">
                    Renting cinema cameras meant dealing with unclear pricing, poorly maintained gear, or traveling outside Uganda entirely. Buying equipment? That&apos;s a UGX 50 million investment most creators simply can&apos;t make. The result? Great ideas stayed just that ideas.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Our Solution</h3>
                  <p>
                    In 2023, we asked ourselves a simple question: <em>What if accessing professional gear was as easy as booking a studio session?</em>
                  </p>
                  <p className="mt-2">
                    So we built 9Yards Gear Uganda&apos;s most comprehensive film equipment rental house. We assembled a curated inventory of cinema cameras, professional lighting, audio gear, and accessories, all maintained to international standards. We created transparent pricing, simple booking, and real support from people who actually understand production.
                  </p>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">Our Mission</h3>
                  <p className="text-foreground">
                    Democratize access to professional filmmaking equipment. Every creator whether you&apos;re shooting your first music video or your tenth commercial deserves tools that match your vision.
                  </p>
                  <p className="mt-2 text-foreground">
                    We&apos;re not just renting gear. We&apos;re removing barriers. We&apos;re saying &quot;yes, you can make that&quot; to filmmakers who&apos;ve been told their budgets aren&apos;t big enough.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Creators Choose 9Yards Gear</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We&apos;re not the only equipment rental house in Uganda but we&apos;re the one filmmakers trust and recommend.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item) => (
                <Card key={item.title} className="group hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <p className="text-sm text-primary font-medium">{item.benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* By The Numbers */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">9Yards Gear in Numbers</h2>
              <p className="text-muted-foreground">Here&apos;s what we&apos;ve built since opening our doors.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4">
                  <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="font-semibold text-foreground text-sm">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment Standards */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">How We Maintain Professional Standards</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Renting equipment is an act of trust. Here&apos;s how we earn that trust.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Regular Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>After every rental:</strong> Full inspection, cleaning, functionality test</p>
                  <p><strong>Monthly:</strong> Deep cleaning, sensor cleaning, firmware updates</p>
                  <p><strong>Quarterly:</strong> Professional calibration and performance testing</p>
                  <p><strong>Annually:</strong> Full service by authorized technicians</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Insurance Coverage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>All our equipment is insured against theft, loss, and catastrophic damage.</p>
                  <p><strong>What this means:</strong> If something truly catastrophic happens, insurance covers it. You&apos;re not on the hook for replacing a UGX 30 million camera if your vehicle is stolen.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Replacement Guarantee</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Equipment can malfunction it&apos;s rare, but it happens. When it does, we don&apos;t leave you stranded.</p>
                  <p><strong>Our guarantee:</strong> If any rented equipment malfunctions due to a defect, we&apos;ll provide replacement gear immediately at no additional cost within 2 hours in Kampala.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 9Yards Network */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Part of the 9Yards Ecosystem</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                9Yards Gear is the equipment rental division of 9Yards Film, Uganda&apos;s leading video production house. We&apos;re part of a larger creative ecosystem.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {networkSites.map((site) => (
                <a 
                  key={site.name}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-background rounded-xl border border-border hover:border-primary transition-colors group"
                >
                  <span className="text-3xl mb-3 block">{site.icon}</span>
                  <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                    {site.name}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground">{site.description}</p>
                </a>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Need to rent gear <em>and</em> hire a production crew? Want to shoot a commercial <em>and</em> handle the social media rollout? We can make it happen all under one roof.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Create Something Extraordinary?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Now that you know who we are and what we stand for, let&apos;s talk about your next production.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">See What Creators Are Saying</h3>
                  <p className="text-sm text-muted-foreground mb-4">Read testimonials from filmmakers and brands who&apos;ve rented from us.</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/testimonials">View Testimonials</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-primary">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Browse Our Equipment</h3>
                  <p className="text-sm text-muted-foreground mb-4">Explore our complete inventory of cameras, lenses, lighting, and more.</p>
                  <Button asChild className="w-full">
                    <Link href="/inventory">View Inventory</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Talk to Our Team</h3>
                  <p className="text-sm text-muted-foreground mb-4">Have questions? Need advice on which gear to rent?</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8 text-sm text-muted-foreground">
              <a href="tel:+256700488870" className="hover:text-primary transition-colors">
                <Phone className="inline h-4 w-4 mr-1" /> 0700 488 870
              </a>
              <span className="mx-3">|</span>
              <a href="mailto:gear@9yards.co.ug" className="hover:text-primary transition-colors">
                <Mail className="inline h-4 w-4 mr-1" /> gear@9yards.co.ug
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
