"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function AvailabilityFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const availableOnly = searchParams.get("available") === "true"

  const handleToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    if (checked) {
      params.set("available", "true")
    } else {
      params.delete("available")
    }
    router.push(`/inventory?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="available-only" className="text-sm font-medium text-foreground cursor-pointer">
        Available only
      </Label>
      <Switch id="available-only" checked={availableOnly} onCheckedChange={handleToggle} />
    </div>
  )
}
