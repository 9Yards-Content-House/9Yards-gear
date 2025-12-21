import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Video, Mic, Film, Sparkles, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Production Packages | 9Yards Gear",
  description: "Pre-configured equipment bundles for music videos, documentaries, commercials, and more. Save time and money with our curated packages.",
}

const packages = [
  {
    name: "Music Video Package",
    description: "Everything you need for a professional music video production",
    icon: Video,
    popular: true,
    includes: [
      "Cinema Camera (ARRI/RED/Blackmagic)",
      "2-3 Prime Lenses",
      "Gimbal Stabilizer",
      "2x LED Panels",
      "Wireless Audio Kit",
      "Batteries & Media",
    ],
    idealFor: "Music videos, short films, branded content",
    savings: "Save 15%",
  },
  {
    name: "Documentary Kit",
    description: "Compact and versatile setup for documentary filmmaking",
    icon: Film,
    popular: false,
    includes: [
      "Mirrorless Cinema Camera",
      "Versatile Zoom Lens",
      "Portable LED Light",
      "Shotgun Mic + Lav Kit",
      "Tripod with Fluid Head",
      "Extended Battery Kit",
    ],
    idealFor: "Documentaries, interviews, event coverage",
    savings: "Save 12%",
  },
  {
    name: "Commercial Package",
    description: "High-end setup for commercial and advertising productions",
    icon: Camera,
    popular: false,
    includes: [
      "ARRI Alexa Mini LF",
      "4-5 Premium Lenses",
      "Full Lighting Kit",
      "Wireless Follow Focus",
      "Director's Monitor",
      "Professional Audio",
    ],
    idealFor: "TV commercials, corporate videos, high-end content",
    savings: "Save 20%",
  },
  {
    name: "Podcast/Interview Setup",
    description: "Perfect audio and video for podcasts and interviews",
    icon: Mic,
    popular: false,
    includes: [
      "2x Camera Bodies",
      "2x Lenses",
      "3-Point Lighting",
      "2x Lavalier Mics",
      "Audio Recorder",
      "Backdrops Available",
    ],
    idealFor: "Podcasts, interviews, YouTube content",
    savings: "Save 10%",
  },
]

export default function PackagesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-background to-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-primary font-medium">Curated Bundles</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Production Packages
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pre-configured equipment bundles designed for specific production needs. Save time on planning and money with our package discounts.
            </p>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {packages.map((pkg) => (
                <Card key={pkg.name} className={`relative overflow-hidden ${pkg.popular ? 'border-primary' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <pkg.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {pkg.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Ideal for:</p>
                        <p className="text-sm text-foreground">{pkg.idealFor}</p>
                      </div>
                      <Badge variant="secondary" className="text-primary">
                        {pkg.savings}
                      </Badge>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/contact">Request This Package</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Package CTA */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Need a Custom Package?</h2>
              <p className="text-muted-foreground mb-8">
                Don't see exactly what you need? We can create a custom equipment bundle tailored to your specific production requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Get Custom Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/inventory">Browse All Equipment</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
