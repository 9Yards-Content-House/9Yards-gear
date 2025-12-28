
"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface SidebarFilterProps {
  title: string
  options: FilterOption[]
  selectedValues: string[]
  onCreateFilterUrl: (value: string, checked: boolean) => void // Callback to get the new URL/action
  onSelectionChange: (value: string, checked: boolean) => void
  showSearch?: boolean
}

export function SidebarFilter({
  title,
  options,
  selectedValues,
  onSelectionChange,
}: SidebarFilterProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      <ScrollArea className="h-full max-h-[200px] w-full pr-3">
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${title}-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={(checked) =>
                  onSelectionChange(option.value, checked as boolean)
                }
              />
              <Label
                htmlFor={`${title}-${option.value}`}
                className="text-sm font-normal text-muted-foreground cursor-pointer hover:text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
                {option.count !== undefined && (
                  <span className="ml-1 text-xs text-muted-foreground/50">({option.count})</span>
                )}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
