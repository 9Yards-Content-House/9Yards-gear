"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Check, Calculator, MessageCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/gear-data"

type Bundle = {
  id: string
  name: string
  description: string
  items: string[]
  pricePerDay: number
  savings: number
  image: string
  popular: boolean
}

type BundleModalProps = {
  bundle: Bundle | null
  isOpen: boolean
  onClose: () => void
}

export function BundleModal({ bundle, isOpen, onClose }: BundleModalProps) {
  if (!bundle) return null

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${bundle.name} bundle (${formatPrice(bundle.pricePerDay)}/day). Can you tell me more?`
    const whatsappUrl = `https://wa.me/256700000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCalculator = () => {
    // Store bundle info in localStorage for calculator
    localStorage.setItem(
      "calculatorBundle",
      JSON.stringify({
        id: bundle.id,
        name: bundle.name,
        items: bundle.items,
        pricePerDay: bundle.pricePerDay,
      }),
    )
    window.location.href = "/calculator"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{bundle.name}</DialogTitle>
        </DialogHeader>

        {/* Bundle Image */}
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
          <Image
            src={bundle.image || "/placeholder.svg"}
            alt={bundle.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {bundle.popular && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Popular Choice</Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground">{bundle.description}</p>

        {/* Items Included */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            What's Included
          </h3>
          <div className="grid gap-2">
            {bundle.items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-secondary/50 p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Bundle Price (per day)</span>
            <span className="text-3xl font-bold text-primary">{formatPrice(bundle.pricePerDay)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">You Save</span>
            <span className="text-lg font-semibold text-green-500">-{formatPrice(bundle.savings)}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Save {Math.round((bundle.savings / (bundle.pricePerDay + bundle.savings)) * 100)}% compared to renting
            items individually
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleCalculator} className="flex-1" size="lg">
            <Calculator className="h-5 w-5 mr-2" />
            Calculate with Dates
          </Button>
          <Button onClick={handleWhatsApp} variant="outline" className="flex-1" size="lg">
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp Quote
          </Button>
        </div>

        {/* Additional Info */}
        <div className="bg-muted/30 p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> All equipment is professionally maintained and tested before rental. Insurance and
            deposit required. Delivery available in Kampala.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
