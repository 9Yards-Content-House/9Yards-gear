import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Battery, Camera, CheckCircle, Download, Headphones, Lightbulb, Phone, Shield, Thermometer, Droplets, Wind } from "lucide-react"

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
      <Header />
      <main id="main-content" className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-background to-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl gradient-heading mb-4">
              Equipment Care Guide
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Treat our gear like your own. Proper care ensures the best performance and helps you avoid damage fees.
            </p>
          </div>
        </section>

        {/* General Guidelines */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl gradient-heading mb-8 text-center">General Care Guidelines</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {generalGuidelines.map((item) => (
                <Card key={item.title} className="text-center">
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
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <h2 className="text-2xl gradient-heading mb-8 text-center">Category-Specific Guidelines</h2>
            <Tabs defaultValue="cameras" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="cameras">Cameras</TabsTrigger>
                <TabsTrigger value="lenses">Lenses</TabsTrigger>
                <TabsTrigger value="lighting">Lighting</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
              </TabsList>
              {Object.entries(categoryGuidelines).map(([key, category]) => (
                <TabsContent key={key} value={key}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <category.icon className="h-5 w-5 text-primary" />
                        {category.title} Care
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.guidelines.map((guideline) => (
                          <li key={guideline} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{guideline}</span>
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

        {/* Prohibited Actions */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl gradient-heading">Prohibited Actions</h2>
            </div>
            <Card className="border-orange-500/50">
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {prohibitedActions.map((action) => (
                    <li key={action} className="flex items-start gap-3">
                      <span className="text-orange-500 font-bold">✕</span>
                      <span className="text-muted-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Return Checklist */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <h2 className="text-2xl gradient-heading mb-8 text-center">Pre-Return Checklist</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {returnChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded border-2 border-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Emergency */}
        <section className="py-16 bg-primary/10">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-2xl gradient-heading mb-4">Something Went Wrong?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              If equipment malfunctions or gets damaged, contact us immediately. Don't attempt repairs yourself.
            </p>
            <Button asChild size="lg">
              <a href="tel:+256700488870">
                <Phone className="mr-2 h-4 w-4" />
                Call: 0700 488 870
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
