"use client"
import Image from "next/image"
import Link from "next/link"
import { X, ExternalLink, Check, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type GearItem, formatPrice, getCategoryById } from "@/lib/gear-data"
import { cn } from "@/lib/utils"

type QuickViewModalProps = {
  item: GearItem
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ item, isOpen, onClose }: QuickViewModalProps) {
  const category = getCategoryById(item.category)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={cn(
          "relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden",
          "animate-in fade-in-0 zoom-in-95 duration-200",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-secondary">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            {!item.available && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <Badge variant="destructive" className="text-base px-4 py-2">
                  Currently Booked
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              {category && <Badge variant="secondary">{category.name}</Badge>}
              {item.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
            </div>

            <h2 className="text-xl font-bold text-foreground mb-2">{item.name}</h2>
            <p className="text-sm text-muted-foreground mb-4 grow">{item.description}</p>

            {/* Key specs */}
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              {Object.entries(item.specs)
                .slice(0, 4)
                .map(([key, value]) => (
                  <div key={key} className="bg-secondary rounded-lg px-3 py-2">
                    <span className="text-muted-foreground capitalize text-xs">{key.replace(/([A-Z])/g, " $1")}</span>
                    <p className="font-medium text-foreground truncate">{value}</p>
                  </div>
                ))}
            </div>

            {/* Pricing */}
            <div className="bg-secondary rounded-lg p-4 mb-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary">{formatPrice(item.pricePerDay)}</span>
                  <span className="text-muted-foreground text-sm ml-1">/day</span>
                </div>
                <div className="text-sm text-muted-foreground">{formatPrice(item.pricePerWeek)}/week</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button asChild className="flex-1">
                <Link href={`/gear/${item.id}`}>
                  {item.available ? (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </>
                  )}
                </Link>
              </Button>
            </div>

            {item.available && (
              <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
                <Check className="h-3 w-3 text-green-500" />
                Available for immediate booking
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
