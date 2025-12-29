import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRight, Shield, Zap, Wrench,
  ChevronRight, Phone, Mail, Camera
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

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 -z-10" />
          
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">About Us</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl gradient-heading mb-6 leading-tight">
                Empowering Uganda&apos;s Storytellers with Professional Gear
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We believe great stories shouldn&apos;t be held back by equipment limitations. That&apos;s why we built Uganda&apos;s premier film equipment rental house making cinema-quality gear accessible to every creator.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-12 px-8 text-base">
                  <Link href="/inventory">
                    Explore Our Equipment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Our Story */}
        <section className="py-20 bg-card border-y border-border/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              <div>
                <h2 className="text-3xl lg:text-4xl gradient-heading mb-8">How 9Yards Film Rental Division Began</h2>
                
                <div className="space-y-8 text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">The Problem We Saw</h3>
                    <p>
                      As part of the 9Yards Film, we&apos;ve produced music videos, Podcasts and documentaries across Uganda for a while. Time and again, we met talented creators with powerful stories to tell but they were held back by one thing: access to professional equipment.
                    </p>
                    <p className="mt-4">
                      Renting cinema cameras meant dealing with unclear pricing, poorly maintained gear, or traveling outside Uganda entirely. Buying equipment? That&apos;s a UGX 50 million investment most creators simply can&apos;t make. The result? Great ideas stayed just that ideas.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Our Solution</h3>
                    <p>
                      In 2023, we asked ourselves a simple question: <em>What if accessing professional gear was as easy as booking a studio session?</em>
                    </p>
                    <p className="mt-4">
                      So our rental division was built Uganda&apos;s most comprehensive film equipment rental house. We assembled a curated inventory of cinema cameras, professional lighting, audio gear, and accessories, all maintained to international standards. We created transparent pricing, simple booking, and real support from people who actually understand production.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Our Mission</h3>
                  <p className="text-foreground text-lg mb-4">
                    Democratize access to professional filmmaking equipment. Every creator whether you&apos;re shooting your first music video or your tenth commercial deserves tools that match your vision.
                  </p>
                  <p className="text-foreground/80">
                    We&apos;re not just renting gear. We&apos;re removing barriers. We&apos;re saying &quot;yes, you can make that&quot; to filmmakers who&apos;ve been told their budgets aren&apos;t big enough.
                  </p>
                </div>
                
                {/* Visual Element / Quote */}
                <div className="relative h-64 rounded-2xl overflow-hidden bg-secondary/20 flex items-center justify-center border border-border/50">
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                  <blockquote className="relative z-10 text-center px-8">
                    <p className="text-xl font-medium text-foreground italic mb-4">
                      &quot;We built the rental house we wished existed when we started.&quot;
                    </p>
                    <footer className="text-sm text-muted-foreground font-semibold">
                      — The 9Yards Team
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Standards */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl gradient-heading mb-4">How We Maintain Professional Standards</h2>
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

        {/* Final CTA */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl gradient-heading mb-4">Ready to Create Something Extraordinary?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Now that you know who we are and what we stand for, let&apos;s talk about your next production.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
    </>
  )
}
