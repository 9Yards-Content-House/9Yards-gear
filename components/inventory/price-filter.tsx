
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { formatPrice } from "@/lib/gear-data"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"

const PRICE_RANGES = [
  { label: "Under 50,000", min: 0, max: 50000 },
  { label: "50,000 - 100,000", min: 50000, max: 100000 },
  { label: "100,000 - 200,000", min: 100000, max: 200000 },
  { label: "200,000+", min: 200000, max: null },
]

export function PriceFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // URL state
  const minParam = searchParams.get("minPrice")
  const maxParam = searchParams.get("maxPrice")

  // Local state for slider to avoid URL thrashing
  const [sliderValue, setSliderValue] = useState([0, 300000])

  useEffect(() => {
    // Sync local state from URL on mount/update if present
    const min = minParam ? Number(minParam) : 0
    const max = maxParam ? Number(maxParam) : 300000
    setSliderValue([min, max])
  }, [minParam, maxParam])

  const updatePriceParams = (min: number | null, max: number | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (min !== null && min > 0) params.set("minPrice", min.toString())
    else params.delete("minPrice")

    if (max !== null && max < Number.POSITIVE_INFINITY) params.set("maxPrice", max.toString())
    else params.delete("maxPrice")

    router.push(`/inventory?${params.toString()}`, { scroll: false })
  }

  const handleRangeSelect = (rangeLabel: string) => {
    const range = PRICE_RANGES.find(r => r.label === rangeLabel)
    if (range) {
      updatePriceParams(range.min, range.max || null) // Use null for Infinity in URL logic
    }
  }

  const handleSliderCommit = (value: number[]) => {
    updatePriceParams(value[0], value[1])
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm text-foreground">Price Per Day</h3>
      
      {/* Quick Ranges */}
      <RadioGroup onValueChange={handleRangeSelect} className="space-y-2">
         {PRICE_RANGES.map((range) => {
           const isSelected = 
             (minParam === range.min.toString() || (!minParam && range.min === 0)) &&
             (range.max ? maxParam === range.max.toString() : !maxParam)

           return (
            <div key={range.label} className="flex items-center space-x-2">
              <RadioGroupItem value={range.label} id={range.label} checked={isSelected} />
              <Label htmlFor={range.label} className="font-normal text-sm cursor-pointer">{range.label}</Label>
            </div>
           )
         })}
      </RadioGroup>

      {/* Slider */}
      <div className="pt-4 px-1">
        <Slider
          defaultValue={[0, 200000]}
          value={sliderValue}
          min={0}
          max={500000} // Increase max range for high-end gear
          step={10000}
          onValueChange={setSliderValue}
          onValueCommit={handleSliderCommit}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(sliderValue[0])}</span>
          <span>{formatPrice(sliderValue[1])}+</span>
        </div>
      </div>
    </div>
  )
}
