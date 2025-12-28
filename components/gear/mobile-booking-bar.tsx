"use client"

import { useEffect, useState } from "react"
import { GearItem, formatPrice } from "@/lib/gear-context"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface MobileBookingBarProps {
  item: GearItem
}

export function MobileBookingBar({ item }: MobileBookingBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show bar when scrolled past a certain point (e.g., 400px)
      // and only on small/medium screens
      if (window.scrollY > 400 && window.innerWidth < 1024) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4 transition-transform duration-300 translate-y-full md:hidden flex items-center justify-between gap-4 safe-bottom",
        isVisible && "translate-y-0"
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative h-10 w-10 rounded-md overflow-hidden bg-secondary shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
          <p className="text-xs text-primary font-bold">{formatPrice(item.pricePerDay)}<span className="text-muted-foreground font-normal ml-0.5">/day</span></p>
        </div>
      </div>
      <AddToCartButton item={item} size="sm" className="shrink-0" />
    </div>
  )
}
