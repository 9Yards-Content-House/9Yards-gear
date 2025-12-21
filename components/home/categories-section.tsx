import type React from "react"
import Link from "next/link"
import { Camera, Aperture, Lightbulb, Mic, Plane, Move, Package, Battery } from "lucide-react"
import { getAllCategoriesAsync, getGearByCategoryAsync } from "@/lib/gear-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Aperture,
  Lightbulb,
  Mic,
  Plane,
  Move,
  Package,
  Battery,
}

export async function CategoriesSection() {
  const categories = await getAllCategoriesAsync()
  
  // Get item counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const items = await getGearByCategoryAsync(category.id)
      return { ...category, itemCount: items.length }
    })
  )

  return (
    <section className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Browse by Category</h2>
          <p className="text-muted-foreground mt-2">Find the perfect equipment for your production needs</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoriesWithCounts.map((category) => {
            const Icon = iconMap[category.icon] || Package

            return (
              <Link
                key={category.id}
                href={`/inventory?category=${category.id}`}
                className="group p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.itemCount} {category.itemCount === 1 ? "item" : "items"} available
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
