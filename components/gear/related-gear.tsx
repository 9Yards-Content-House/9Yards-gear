import { getRelatedGear } from "@/lib/gear-data"
import { GearCard } from "./gear-card"

type RelatedGearProps = {
  currentId: string
  category: string
}

export function RelatedGear({ currentId, category }: RelatedGearProps) {
  const relatedItems = getRelatedGear(currentId, category, 3)

  if (relatedItems.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-foreground mb-6">Related Equipment</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedItems.map((item) => (
          <GearCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
