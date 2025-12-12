"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { type GearItem, formatPrice, getCategoryById } from "@/lib/gear-data"
import { QuickViewModal } from "./quick-view-modal"

type GearCardProps = {
  item: GearItem
}

export function GearCard({ item }: GearCardProps) {
  const [showQuickView, setShowQuickView] = useState(false)
  const category = getCategoryById(item.category)

  return (
    <>
      <Card className="group h-full overflow-hidden bg-card hover:bg-secondary/50 transition-all duration-300 border-border hover:border-primary/50">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Link href={`/gear/${item.id}`}>
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3 flex gap-2">
            {category && (
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                {category.name}
              </Badge>
            )}
            {!item.available && <Badge variant="destructive">Booked</Badge>}
          </div>
          {item.featured && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">Featured</Badge>
          )}

          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            onClick={(e) => {
              e.preventDefault()
              setShowQuickView(true)
            }}
          >
            <Eye className="h-4 w-4 mr-1" />
            Quick View
          </Button>
        </div>
        <CardContent className="p-4">
          <Link href={`/gear/${item.id}`}>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {item.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">{formatPrice(item.pricePerDay)}</span>
            <span className="text-xs text-muted-foreground">/day</span>
          </div>
        </CardContent>
      </Card>

      <QuickViewModal item={item} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  )
}
