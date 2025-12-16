import { Header } from "@/components/layout/header"
import { Skeleton } from "@/components/ui/skeleton"

export default function GearDetailLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Breadcrumb skeleton */}
          <nav className="flex items-center gap-2 mb-8">
            <Skeleton className="h-4 w-32" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-20" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-40" />
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left column - Image skeleton */}
            <div className="space-y-6">
              <Skeleton className="aspect-4/3 w-full rounded-xl" />
              
              {/* Specs skeleton */}
              <div className="rounded-xl border border-border p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Info skeleton */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-20 w-full" />
              </div>

              {/* Price skeleton */}
              <div className="rounded-xl border border-border p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-6 w-40" />
                </div>
              </div>

              {/* Booking form skeleton */}
              <div className="rounded-xl border border-border p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
