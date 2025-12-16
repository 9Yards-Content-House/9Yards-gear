"use client"

import { useEffect } from "react"
import { addToRecentlyViewed } from "@/lib/recently-viewed"
import { trackGearView } from "@/lib/analytics"
import type { GearItem } from "@/lib/gear-data"

type GearViewTrackerProps = {
  item: GearItem
}

export function GearViewTracker({ item }: GearViewTrackerProps) {
  useEffect(() => {
    // Track recently viewed
    addToRecentlyViewed(item.id)
    
    // Track with analytics
    trackGearView(item.id, item.name, item.category, item.pricePerDay)
  }, [item.id, item.name, item.category, item.pricePerDay])

  return null
}
