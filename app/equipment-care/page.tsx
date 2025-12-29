import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Battery, Camera, CheckCircle, Download, Headphones, Lightbulb, Phone, Shield, Thermometer, Droplets, Wind, ChevronRight, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Equipment Care Guide | 9Yards Gear",
  description: "Learn how to properly handle and care for rental equipment. Guidelines for cameras, lenses, lighting, audio, and more.",
}

const generalGuidelines = [
  { icon: Shield, title: "Always Use Cases", description: "Keep equipment in provided cases when transporting" },
  { icon: Droplets, title: "Keep Dry", description: "Protect gear from rain, humidity, and liquids" },
  { icon: Thermometer, title: "Avoid Extremes", description: "Don't expose to extreme heat or cold" },
  { icon: Wind, title: "Handle Clean", description: "Clean, dry hands when handling equipment" },
]

const categoryGuidelines = {
  cameras: {
    icon: Camera,
    title: "Cameras",
    guidelines: [
      "Never touch the sensor - use lens cap when not in use",
      "Format memory cards in-camera, not on computer",
      "Remove batteries before storage overnight",
      "Use lens hood to protect front element",
      "Don't change lenses in dusty/windy conditions",
      "Keep firmware updates to our team only",
    ]
  },
  lenses: {
    icon: Camera,
    title: "Lenses",
    guidelines: [
      "Always use front and rear caps when not mounted",
      "Clean with microfiber cloth and lens solution only",
      "Never force focus or zoom rings",
      "Check for dust before mounting",
      "Store upright with front element facing up",
      "Handle by the barrel, not the glass",
    ]
  },
  lighting: {
    icon: Lightbulb,
    title: "Lighting",
    guidelines: [
      "Allow lights to cool before packing",
      "Never touch bulbs with bare hands (oils cause hotspots)",
      "Check stand locks before raising lights",
      "Use sandbags for stability outdoors",
      "Don't exceed rated wattage",
      "Keep away from flammable materials",
    ]
  },
  audio: {
    icon: Headphones,
    title: "Audio Equipment",
    guidelines: [
      "Test phantom power compatibility before connecting mics",
      "Coil cables properly (over-under method)",
      "Use pop filters and windscreens as provided",
      "Store lavs in protective cases",
      "Keep away from magnetic sources",
      "Check battery levels before shoots",
    ]
  },
}

const prohibitedActions = [
  "Underwater use (unless equipment is specifically rated)",
  "Any modification or disassembly of equipment",
  "Subletting or sharing equipment with third parties",
  "DIY repairs - contact us instead",
  "Using in extreme weather without protection",
  "Leaving equipment unattended in vehicles",
]

const returnChecklist = [
  "Wipe down all equipment surfaces",
  "Check all accessories are included",
  "Format memory cards (optional but appreciated)",
  "Charge all batteries to at least 50%",
  "Pack securely in original cases",
  "Report any issues, however minor",
]

export default function EquipmentCarePage() {
  return (
    <>
      <main id="main-content" className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-12 bg-linear-to-b from-background to-card/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Equipment Care</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                <span className="gradient-heading">Equipment Care</span>
                <br />
                Guide
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Treat our gear like your own. Proper care ensures the best performance for your shoot and helps you avoid unnecessary damage fees.
              </p>
            </div>
          </div>
        </section>

        {/* General Guidelines */}
        <section className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">General Care Guidelines</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {generalGuidelines.map((item) => (
                <Card key={item.title} className="text-center border-primary/10 hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Category-Specific */}
        <section className="py-12 bg-card/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Category-Specific Guidelines</h2>
            <Tabs defaultValue="cameras" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto p-1">
                <TabsTrigger value="cameras" className="py-3">Cameras</TabsTrigger>
                <TabsTrigger value="lenses" className="py-3">Lenses</TabsTrigger>
                <TabsTrigger value="lighting" className="py-3">Lighting</TabsTrigger>
                <TabsTrigger value="audio" className="py-3">Audio</TabsTrigger>
              </TabsList>
              {Object.entries(categoryGuidelines).map(([key, category]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <category.icon className="h-5 w-5 text-primary" />
                        </div>
                        {category.title} Care
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid sm:grid-cols-2 gap-4">
                        {category.guidelines.map((guideline) => (
                          <li key={guideline} className="flex items-start gap-3 bg-background/50 p-3 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{guideline}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Prohibited Actions & Checklist */}
        <section className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Prohibited Actions */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold">Prohibited Actions</h2>
                </div>
                <Card className="border-orange-500/20 bg-orange-500/5 h-full">
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      {prohibitedActions.map((action) => (
                        <li key={action} className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/20 text-orange-600 text-xs font-bold shrink-0 mt-0.5">✕</span>
                          <span className="text-muted-foreground text-sm">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Return Checklist */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold">Pre-Return Checklist</h2>
                </div>
                <Card className="border-green-500/20 bg-green-500/5 h-full">
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      {returnChecklist.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 text-green-600 text-xs font-bold shrink-0 mt-0.5">✓</div>
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency */}
        <section className="py-16 bg-card border-t border-border">
          <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Something Went Wrong?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              If equipment malfunctions or gets damaged, contact us immediately. Don't attempt repairs yourself.
            </p>
            <Button asChild size="lg" className="rounded-md">
              <a href="tel:+256700488870">
                Call Support: 0700 488 870
              </a>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
