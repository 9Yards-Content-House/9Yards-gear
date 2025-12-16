"use client"

import { Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ViewToggleProps = {
  view: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center border border-border rounded-lg overflow-hidden">
      <Button
        variant="ghost"
        size="sm"
        className={cn("rounded-none px-3", view === "grid" && "bg-secondary")}
        onClick={() => onViewChange("grid")}
        aria-label="Grid view"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn("rounded-none px-3", view === "list" && "bg-secondary")}
        onClick={() => onViewChange("list")}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}
