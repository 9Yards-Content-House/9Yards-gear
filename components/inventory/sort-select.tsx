"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUpDown, TrendingUp, TrendingDown, Star, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { trackFilterUsage } from "@/lib/analytics"

export type SortOption = "featured" | "price-low" | "price-high" | "name-asc" | "name-desc" | "newest"

const sortOptions = [
  { value: "featured", label: "Featured First", icon: Star },
  { value: "price-low", label: "Price: Low to High", icon: TrendingDown },
  { value: "price-high", label: "Price: High to Low", icon: TrendingUp },
  { value: "name-asc", label: "Name: A to Z", icon: ArrowUpDown },
  { value: "name-desc", label: "Name: Z to A", icon: ArrowUpDown },
  { value: "newest", label: "Newest First", icon: Clock },
]

export function SortSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort") || "featured"

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "featured") {
      params.set("sort", value)
    } else {
      params.delete("sort")
    }
    router.push(`/inventory?${params.toString()}`)
    trackFilterUsage("sort", value)
  }

  const currentOption = sortOptions.find((opt) => opt.value === currentSort)
  const Icon = currentOption?.icon || ArrowUpDown

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] sm:w-[200px] bg-secondary border-border px-3">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => {
            const OptionIcon = option.icon
            return (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <OptionIcon className="h-4 w-4" />
                  {option.label}
                </div>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
