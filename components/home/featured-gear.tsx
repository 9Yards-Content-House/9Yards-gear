import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GearCard } from "@/components/gear/gear-card"
import { getFeaturedGearAsync } from "@/lib/gear-data"

export async function FeaturedGear() {
  const allFeatured = await getFeaturedGearAsync()
  const featuredItems = allFeatured.slice(0, 6)

  return (
    <section className="pb-24 pt-4 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Featured Equipment</h2>
            <p className="text-muted-foreground mt-2">Cinema-quality gear trusted by Uganda&apos;s leading filmmakers</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/inventory">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <GearCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
