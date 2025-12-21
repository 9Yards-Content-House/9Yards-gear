"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { useGear, type GearItem } from "@/lib/gear-context"
import { getRecommendedGear } from "@/lib/recommendation-engine"
import { GearCard } from "./gear-card"

type RelatedGearProps = {
  currentId: string
  category: string
}

export function RelatedGear({ currentId, category }: RelatedGearProps) {
  const { getGearById } = useGear()
  const currentItem = getGearById(currentId)
  const [relatedItems, setRelatedItems] = useState<GearItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRelatedGear() {
      if (!currentItem) {
        setIsLoading(false)
        return
      }
      try {
        const items = await getRecommendedGear(currentItem, 6)
        setRelatedItems(items)
      } catch (error) {
        console.error("Failed to fetch related gear:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRelatedGear()
  }, [currentItem])

  if (!currentItem || isLoading) return null
  if (relatedItems.length === 0) return null

  return (
    <section className="mt-16 pt-16 border-t border-border">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">AI Recommended</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">People Also Rent</h2>
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
