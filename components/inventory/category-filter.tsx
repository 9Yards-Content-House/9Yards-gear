
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useGear } from "@/lib/gear-context"
import { SidebarFilter } from "./sidebar-filter"

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")
  const { categories, isLoading } = useGear()

  // Currently supporting single select for category to match existing logic basics, 
  // but UI looks like multi-select. 
  // Let's keep it strictly single select power for now but UI checkbox.
  // Actually, Amazon allows multi-select "Include Out of Stock" but categories are usually drill-down links.
  // User requested: "CATEGORY (checkboxes)" -> implying multi-select.
  // BUT the data logic might expect one category. Let's assume multi-select logic in URL is hard to change immediately if backend doesn't support it.
  // For now, I'll simulate single select behavior with checkboxes (radio behavior) OR update logic to allow multiple.
  // The prompt says "CATEGORY... Checkboxes", implying multi-category filtering.
  // I will implement multi-select logic in URL (comma separated) but I should check if InventoryResults supports it.
  // InventoryResults currently does: `item.category === category`.
  // I will need to update InventoryResults to use `included(item.category)` to support multi-select.

  const currentCategories = currentCategory?.split(",").filter(Boolean) || []

  const handleSelectionChange = (categoryId: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    let newCategories = [...currentCategories]

    if (checked) {
      newCategories.push(categoryId)
    } else {
      newCategories = newCategories.filter((c) => c !== categoryId)
    }

    if (newCategories.length > 0) {
      params.set("category", newCategories.join(","))
    } else {
      params.delete("category")
    }

    router.push(`/inventory?${params.toString()}`, { scroll: false })
  }

  if (isLoading) return null

  return (
    <SidebarFilter
      title="Category"
      options={categories.map((c) => ({ label: c.name, value: c.id }))}
      selectedValues={currentCategories}
      onSelectionChange={handleSelectionChange}
      onCreateFilterUrl={() => {}}
    />
  )
}
