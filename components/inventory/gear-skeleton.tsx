import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function GearCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden bg-card border-border">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
      </CardContent>
    </Card>
  )
}

export function GearListSkeleton() {
  return (
    <div className="flex gap-4 p-4 bg-card border border-border rounded-xl">
      <Skeleton className="w-32 h-24 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}

export function InventorySkeleton({ view = "grid" }: { view?: "grid" | "list" }) {
  return view === "grid" ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <GearCardSkeleton key={i} />
      ))}
    </div>
  ) : (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <GearListSkeleton key={i} />
      ))}
    </div>
  )
}
