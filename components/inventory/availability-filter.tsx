
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { SidebarFilter } from "./sidebar-filter"

export function AvailabilityFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const availableOnly = searchParams.get("available") === "true"

  const handleSelectionChange = (_: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    if (checked) {
      params.set("available", "true")
    } else {
      params.delete("available")
    }
    router.push(`/inventory?${params.toString()}`, { scroll: false })
  }

  // To simulate "Show All" vs "Available Now", we basically just toggle "Available Now".
  // If "Available Now" is unchecked, it implies "Show All".
  
  const options = [
    { label: "Available Now", value: "available" }
  ]

  return (
    <SidebarFilter
      title="Availability"
      options={options}
      selectedValues={availableOnly ? ["available"] : []}
      onSelectionChange={handleSelectionChange}
      onCreateFilterUrl={() => {}}
    />
  )
}
