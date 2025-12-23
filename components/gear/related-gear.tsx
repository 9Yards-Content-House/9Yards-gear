"use client"

import { useMemo } from "react"
import { Sparkles } from "lucide-react"
import { useGear, type GearItem } from "@/lib/gear-context"
import { GearCard } from "./gear-card"

type RelatedGearProps = {
  currentId: string
  category: string
}

// Client-side recommendation algorithm using context data
function getRelatedGear(currentItem: GearItem, allGear: GearItem[], limit = 6): GearItem[] {
  if (!currentItem || !allGear.length) return []
  
  const scoredGear: Array<{ item: GearItem; score: number }> = []
  
  allGear.forEach((item) => {
    if (item.id === currentItem.id) return
    
    let score = 0
    
    // Same category gets points
    if (item.category === currentItem.category) {
      score += 3
    }
    
    // Available items get priority
    if (item.available) {
      score += 2
    }
    
    // Featured items get slight boost
    if (item.featured) {
      score += 1
    }
    
    // Similar price range (within 50%)
    const priceDiff = Math.abs(item.pricePerDay - currentItem.pricePerDay)
    const avgPrice = (item.pricePerDay + currentItem.pricePerDay) / 2
    if (avgPrice > 0 && priceDiff / avgPrice < 0.5) {
      score += 1
    }
    
    if (score > 0) {
      scoredGear.push({ item, score })
    }
  })
  
  // Sort by score and return top N
  return scoredGear
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(sg => sg.item)
}

export function RelatedGear({ currentId, category }: RelatedGearProps) {
  const { gear, getGearById } = useGear()
  const currentItem = getGearById(currentId)
  
  // Memoize recommendations to avoid recalculating on every render
  const relatedItems = useMemo(
    () => currentItem ? getRelatedGear(currentItem, gear, 6) : [],
    [currentItem, gear]
  )
  
  if (!currentItem || relatedItems.length === 0) return null
  
  return (
    <section className="mt-16 pt-16 border-t border-border">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">Recommended for You</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">You May Also Like</h2>
        <p className="text-muted-foreground mt-1">Gear that works perfectly with {currentItem.name}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedItems.map((item: GearItem) => (
          <GearCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
