
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { SidebarFilter } from "./sidebar-filter"

export function FeaturedFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isFeatured = searchParams.get("featured") === "true"
  const isMostRented = searchParams.get("sort") === "most-rented"

  const handleSelectionChange = (value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === "featured") {
      if (checked) params.set("featured", "true")
      else params.delete("featured")
    }
    
    // Sort is mutually exclusive mostly, but "Most Rented" is a sort order really. 
    // But user wants it as a filter checkbox "Most Rented".
    // If checked, we set sort=most-rented. If unchecked, we delete sort (default relevance).
    if (value === "most-rented") {
        if (checked) params.set("sort", "most-rented")
        else {
             if (params.get("sort") === "most-rented") params.delete("sort")
        }
    }

    router.push(`/inventory?${params.toString()}`, { scroll: false })
  }

  const options = [
    { label: "Featured Equipment", value: "featured" },
    { label: "Most Rented", value: "most-rented" }
  ]

  const selectedValues = []
  if (isFeatured) selectedValues.push("featured")
  if (isMostRented) selectedValues.push("most-rented")

  return (
    <SidebarFilter
      title="Featured & Popular"
      options={options}
      selectedValues={selectedValues}
      onSelectionChange={handleSelectionChange}
      onCreateFilterUrl={() => {}}
    />
  )
}
