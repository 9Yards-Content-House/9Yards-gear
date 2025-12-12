import { Header } from "@/components/layout/header"
import { Skeleton } from "@/components/ui/skeleton"

export default function InventoryLoading() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Header skeleton */}
          <div className="mb-8">
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>

          {/* Search and filters skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Skeleton className="h-10 flex-1" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar skeleton */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-6 p-4 rounded-xl border border-border">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full" />
                  ))}
                </div>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            </aside>

            {/* Grid skeleton */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-border overflow-hidden">
                    <Skeleton className="aspect-4/3 w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
