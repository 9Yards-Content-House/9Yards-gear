"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/gear-data"
import { BundleModal } from "./bundle-modal"

const bundles = [
  {
    id: "music-video",
    name: "Music Video Package",
    description: "Everything you need for a professional music video production",
    items: ["Sony FX6 Cinema Camera", "Sigma 18-35mm f/1.8 Art", "Aputure 600d Pro LED", "DJI RS 3 Pro Gimbal"],
    pricePerDay: 350000,
    savings: 60000,
    image: "/music-video-production-equipment.jpg",
    popular: true,
  },
  {
    id: "documentary",
    name: "Documentary Kit",
    description: "Capture compelling stories with this run-and-gun setup",
    items: ["Canon EOS R5 Camera Body", "Canon RF 24-70mm f/2.8L", "Sennheiser MKH 416", "Sachtler Ace XL Tripod"],
    pricePerDay: 250000,
    savings: 40000,
    image: "/documentary-filming-equipment.jpg",
    popular: false,
  },
  {
    id: "commercial",
    name: "Commercial Production",
    description: "High-end gear for advertising and commercial work",
    items: [
      "RED Komodo 6K",
      "Canon CN-E 50mm T1.3",
      "ARRI SkyPanel S60-C",
      "SmallHD Cine 7 Monitor",
      "Sound Devices MixPre-6 II",
    ],
    pricePerDay: 600000,
    savings: 110000,
    image: "/commercial-film-production-gear.jpg",
    popular: true,
  },
  {
    id: "aerial",
    name: "Aerial Production",
    description: "Stunning aerial shots for any production",
    items: ["DJI Inspire 3", "DJI Mavic 3 Pro Cine", "iPad Pro Directors Kit"],
    pricePerDay: 450000,
    savings: 50000,
    image: "/drone-aerial-filming-equipment.jpg",
    popular: false,
  },
]

export function GearBundles() {
  const [selectedBundle, setSelectedBundle] = useState<(typeof bundles)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBundleClick = (bundle: (typeof bundles)[0]) => {
    setSelectedBundle(bundle)
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="py-24 bg-card">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">AI Recommended</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">Production Bundles</h2>
              <p className="text-muted-foreground mt-2">
                Curated packages for different production types - save up to 20%
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/inventory">
                Browse All Gear
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map((bundle) => (
              <Card
                key={bundle.id}
                className="bg-background border-border overflow-hidden group cursor-pointer hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                onClick={() => handleBundleClick(bundle)}
              >
                <div className="relative aspect-[2/1]">
                  <Image
                    src={bundle.image || "/placeholder.svg"}
                    alt={bundle.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  {bundle.popular && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white mb-1">{bundle.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">{bundle.description}</p>

                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">Includes:</p>
                    {bundle.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </div>
                    ))}
                    {bundle.items.length > 3 && (
                      <div className="text-xs text-primary font-medium">+{bundle.items.length - 3} more items...</div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-2xl font-bold text-primary">{formatPrice(bundle.pricePerDay)}</div>
                      <div className="text-xs text-green-500 font-medium">
                        Save {formatPrice(bundle.savings)}
                      </div>
                    </div>
                    <Button onClick={(e) => {
                      e.stopPropagation()
                      handleBundleClick(bundle)
                    }}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <BundleModal bundle={selectedBundle} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
