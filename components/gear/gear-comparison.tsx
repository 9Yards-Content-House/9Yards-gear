"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ArrowLeft, Scale, TrendingDown, Star, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  getComparisonItems,
  removeFromComparison,
  clearComparison,
  compareGearItems,
  getValuePropositions,
} from "@/lib/comparison-utils"
import { getGearById, formatPrice } from "@/lib/gear-data"
import { trackEvent } from "@/lib/analytics"

export function GearComparison() {
  const [comparisonIds, setComparisonIds] = useState<string[]>([])

  useEffect(() => {
    const updateComparison = () => {
      const items = getComparisonItems()
      setComparisonIds(items.map((item) => item.id))
    }

    updateComparison()
    window.addEventListener("comparisonUpdated" as any, updateComparison)
    return () => window.removeEventListener("comparisonUpdated" as any, updateComparison)
  }, [])

  const gearItems = comparisonIds.map((id) => getGearById(id)).filter(Boolean) as any[]

  if (gearItems.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="text-center">
            <Scale className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No Items to Compare</h2>
            <p className="text-muted-foreground mb-6">
              Add items to comparison from the inventory page to compare specs and pricing
            </p>
            <Button asChild>
              <Link href="/inventory">Browse Inventory</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const comparison = compareGearItems(gearItems)
  const valueProps = getValuePropositions(gearItems)

  const handleRemove = (itemId: string) => {
    removeFromComparison(itemId)
    trackEvent("comparison_item_removed", { item_id: itemId })
  }

  const handleClear = () => {
    clearComparison()
    trackEvent("comparison_cleared", { items_count: gearItems.length })
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/inventory">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Compare Equipment</h1>
              <p className="text-muted-foreground mt-1">
                Comparing {gearItems.length} item{gearItems.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleClear}>
            Clear All
          </Button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${gearItems.length}, 1fr)` }}>
              {/* Header Row - Item Cards */}
              <div className="font-semibold text-foreground self-end pb-4">Compare</div>
              {gearItems.map((item) => (
                <Card key={item.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => handleRemove(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardContent className="p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-4/3 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-foreground mb-2 pr-8">{item.name}</h3>
                    {valueProps.get(item.id) && (
                      <div className="space-y-1">
                        {valueProps.get(item.id)!.map((prop) => (
                          <Badge key={prop} variant="secondary" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            {prop}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Pricing Section */}
              <div className="col-span-full">
                <Separator className="my-6" />
                <h3 className="text-lg font-semibold text-foreground mb-4">Pricing</h3>
              </div>

              <div className="font-medium text-muted-foreground">Daily Rate</div>
              {comparison.priceComparison.map((item) => (
                <div key={`daily-${item.id}`} className="text-lg font-semibold text-foreground">
                  {formatPrice(item.pricePerDay)}
                </div>
              ))}

              <div className="font-medium text-muted-foreground">Weekly Rate</div>
              {comparison.priceComparison.map((item) => (
                <div key={`weekly-${item.id}`} className="text-lg font-semibold text-foreground">
                  {formatPrice(item.pricePerWeek)}
                </div>
              ))}

              <div className="font-medium text-muted-foreground">Weekly Savings</div>
              {comparison.priceComparison.map((item) => {
                const dailyTotal = item.pricePerDay * 7
                const savings = dailyTotal - item.pricePerWeek
                const savingsPercent = ((savings / dailyTotal) * 100).toFixed(0)
                return (
                  <div key={`savings-${item.id}`} className="flex items-center gap-2 text-primary">
                    <TrendingDown className="h-4 w-4" />
                    <span className="font-medium">
                      {formatPrice(savings)} ({savingsPercent}%)
                    </span>
                  </div>
                )
              })}

              {/* Availability */}
              <div className="col-span-full">
                <Separator className="my-6" />
                <h3 className="text-lg font-semibold text-foreground mb-4">Availability</h3>
              </div>

              <div className="font-medium text-muted-foreground">Status</div>
              {gearItems.map((item) => (
                <div key={`availability-${item.id}`}>
                  {item.available ? (
                    <Badge variant="default" className="bg-green-500">
                      <Check className="h-3 w-3 mr-1" />
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Currently Booked</Badge>
                  )}
                </div>
              ))}

              {/* Specifications */}
              <div className="col-span-full">
                <Separator className="my-6" />
                <h3 className="text-lg font-semibold text-foreground mb-4">Specifications</h3>
              </div>

              {Array.from(comparison.specs.entries()).map(([specKey, specValues]) => (
                <>
                  <div key={specKey} className="font-medium text-muted-foreground capitalize">
                    {specKey.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  {gearItems.map((item) => (
                    <div key={`${specKey}-${item.id}`} className="text-foreground">
                      {specValues.get(item.id) || "N/A"}
                    </div>
                  ))}
                </>
              ))}

              {/* Actions */}
              <div className="col-span-full mt-6">
                <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${gearItems.length}, 1fr)` }}>
                  <div />
                  {gearItems.map((item) => (
                    <Button key={`action-${item.id}`} asChild className="w-full">
                      <Link href={`/gear/${item.id}`}>View Details</Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
