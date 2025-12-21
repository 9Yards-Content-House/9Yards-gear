"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Fuse from "fuse.js"
import { SlidersHorizontal, X, LayoutGrid, ChevronRight, Search, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SearchBar } from "./search-bar"
import { CategoryFilter } from "./category-filter"
import { PriceFilter } from "./price-filter"
import { AvailabilityFilter } from "./availability-filter"
import { ViewToggle } from "./view-toggle"
import { SortSelect } from "./sort-select"
import { GearCard } from "@/components/gear/gear-card"
import { GearListItem } from "./gear-list-item"
import { InventorySkeleton } from "./gear-skeleton"
import { CantFindCTA } from "./cant-find-cta"
import { useGear, type GearItem } from "@/lib/gear-context"
import { trackSearch, trackFilterUsage } from "@/lib/analytics"

function InventoryResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { gear: allGear, categories, isLoading } = useGear()

  const filteredGear = useMemo(() => {
    let results: GearItem[] = allGear

    const query = searchParams.get("q")
    if (query) {
      const fuse = new Fuse(allGear, {
        keys: ["name", "description", "category"],
        threshold: 0.3,
      })
      results = fuse.search(query).map((r) => r.item)
      trackSearch(query, results.length)
    }

    const category = searchParams.get("category")
    if (category) {
      results = results.filter((item) => item.category === category)
      trackFilterUsage("category", category)
    }

    const minPrice = Number(searchParams.get("minPrice")) || 0
    const maxPrice = Number(searchParams.get("maxPrice")) || Number.POSITIVE_INFINITY
    if (minPrice > 0 || maxPrice < Number.POSITIVE_INFINITY) {
      results = results.filter((item) => item.pricePerDay >= minPrice && item.pricePerDay <= maxPrice)
    }

    const availableOnly = searchParams.get("available") === "true"
    if (availableOnly) {
      results = results.filter((item) => item.available)
      trackFilterUsage("availability", "available-only")
    }

    // Apply sorting
    const sortBy = searchParams.get("sort") || "featured"
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.pricePerDay - b.pricePerDay)
        break
      case "price-high":
        results.sort((a, b) => b.pricePerDay - a.pricePerDay)
        break
      case "name-asc":
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        results.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "newest":
        // Assumes items added more recently have higher IDs or use a timestamp if available
        results.sort((a, b) => b.id.localeCompare(a.id))
        break
      case "featured":
      default:
        // Featured items first, then available, then by price
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          if (a.available && !b.available) return -1
          if (!a.available && b.available) return 1
          return a.pricePerDay - b.pricePerDay
        })
        break
    }

    return results
  }, [allGear, searchParams])

  const hasActiveFilters =
    searchParams.has("q") ||
    searchParams.has("category") ||
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice") ||
    searchParams.has("available")

  const clearFilters = () => {
    window.location.href = "/inventory"
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Categories</h3>
        <CategoryFilter />
      </div>
      <div>
        <PriceFilter />
      </div>
      <div>
        <AvailabilityFilter />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Inventory</span>
          </nav>
          
          <h1 className="text-3xl font-bold text-foreground">Browse Equipment</h1>
          <p className="text-muted-foreground mt-2">
            Explore Uganda&apos;s most comprehensive film equipment inventory. From cinema cameras to professional audio, find the perfect gear for your production.
          </p>
        </div>

        {/* Search and filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2">
            <SortSelect />
            <ViewToggle view={view} onViewChange={setView} />

            {/* Mobile filter trigger */}
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden relative bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                  {hasActiveFilters && <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      className="w-full mt-6 bg-transparent"
                      onClick={() => {
                        setFiltersOpen(false)
                        clearFilters()
                      }}
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6 p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Filters</h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                    <X className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
              <FiltersContent />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {isLoading ? (
                  "Loading..."
                ) : (
                  <>
                    {filteredGear.length} {filteredGear.length === 1 ? "item" : "items"} found
                  </>
                )}
              </p>
              {hasActiveFilters && <p className="text-xs text-primary">Filters applied</p>}
            </div>

            {isLoading ? (
              <InventorySkeleton view={view} />
            ) : filteredGear.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-xl">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-lg text-foreground font-medium mb-2">No equipment found</p>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className="text-sm text-muted-foreground">Popular searches:</span>
                  <button onClick={() => router.push('/inventory?q=ARRI')} className="text-sm text-primary hover:underline">ARRI cameras</button>
                  <button onClick={() => router.push('/inventory?q=Sony FX6')} className="text-sm text-primary hover:underline">Sony FX6</button>
                  <button onClick={() => router.push('/inventory?q=LED')} className="text-sm text-primary hover:underline">LED lighting</button>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                  <Button asChild>
                    <Link href="/contact">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredGear.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
                  >
                    <GearCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGear.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
                  >
                    <GearListItem item={item} />
                  </div>
                ))}
              </div>
            )}

            {/* CTA Section */}
            {!isLoading && filteredGear.length > 0 && <CantFindCTA />}
          </div>
        </div>
      </div>
    </div>
  )
}

export function InventoryContent() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-20">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Equipment Inventory</h1>
              <p className="text-muted-foreground mt-2">Browse our professional film and production equipment</p>
            </div>
            <InventorySkeleton view="grid" />
          </div>
        </div>
      }
    >
      <InventoryResults />
    </Suspense>
  )
}
