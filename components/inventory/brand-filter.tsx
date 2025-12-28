
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useGear } from "@/lib/gear-context"
import { SidebarFilter } from "./sidebar-filter"

export function BrandFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentBrands = searchParams.get("brands")?.split(",").filter(Boolean) || []
  const { brands, isLoading } = useGear()

  const handleSelectionChange = (brand: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    let newBrands = [...currentBrands]

    if (checked) {
      newBrands.push(brand)
    } else {
      newBrands = newBrands.filter((b) => b !== brand)
    }

    if (newBrands.length > 0) {
      params.set("brands", newBrands.join(","))
    } else {
      params.delete("brands")
    }

    // Reset pagination
    // params.delete("page") 

    router.push(`/inventory?${params.toString()}`, { scroll: false })
  }

  if (isLoading || brands.length === 0) return null

  return (
    <SidebarFilter
      title="Brand"
      options={brands.map((b) => ({ label: b, value: b }))}
      selectedValues={currentBrands}
      onSelectionChange={handleSelectionChange}
      onCreateFilterUrl={() => {}} 
    />
  )
}
