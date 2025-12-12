"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { getAllCategories } from "@/lib/gear-data"
import { cn } from "@/lib/utils"

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")
  const categories = getAllCategories()

  const handleCategoryClick = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId) {
      params.set("category", categoryId)
    } else {
      params.delete("category")
    }
    router.push(`/inventory?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant="outline"
        className={cn(
          "cursor-pointer px-3 py-1.5 text-sm transition-colors",
          !currentCategory
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-transparent hover:bg-secondary border-border",
        )}
        onClick={() => handleCategoryClick(null)}
      >
        All
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant="outline"
          className={cn(
            "cursor-pointer px-3 py-1.5 text-sm transition-colors",
            currentCategory === category.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-transparent hover:bg-secondary border-border",
          )}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </Badge>
      ))}
    </div>
  )
}
