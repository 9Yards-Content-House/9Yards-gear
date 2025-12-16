"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { formatPrice } from "@/lib/gear-data"

const MAX_PRICE = 350000

export function PriceFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const minPrice = Number(searchParams.get("minPrice")) || 0
  const maxPrice = Number(searchParams.get("maxPrice")) || MAX_PRICE

  const handlePriceChange = (values: number[]) => {
    const params = new URLSearchParams(searchParams.toString())
    if (values[0] > 0) {
      params.set("minPrice", values[0].toString())
    } else {
      params.delete("minPrice")
    }
    if (values[1] < MAX_PRICE) {
      params.set("maxPrice", values[1].toString())
    } else {
      params.delete("maxPrice")
    }
    router.push(`/inventory?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium text-foreground">Price Range (per day)</Label>
        <span className="text-sm text-muted-foreground">
          {formatPrice(minPrice)} - {formatPrice(maxPrice)}
        </span>
      </div>
      <Slider
        min={0}
        max={MAX_PRICE}
        step={10000}
        value={[minPrice, maxPrice]}
        onValueChange={handlePriceChange}
        className="w-full"
      />
    </div>
  )
}
