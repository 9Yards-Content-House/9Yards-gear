import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type GearItem, formatPrice, getCategoryById } from "@/lib/gear-data"
import { ArrowRight } from "lucide-react"

type GearListItemProps = {
  item: GearItem
}

export function GearListItem({ item }: GearListItemProps) {
  const category = getCategoryById(item.category)

  return (
    <Link href={`/gear/${item.id}`} className="block">
      <div className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
        <div className="relative w-full sm:w-48 aspect-video sm:aspect-4/3 rounded-lg overflow-hidden shrink-0">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 192px"
          />
          {!item.available && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Booked
            </Badge>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between gap-2">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                {category && (
                  <Badge variant="secondary" className="mt-1">
                    {category.name}
                  </Badge>
                )}
              </div>
              <div className="text-right shrink-0">
                <div className="text-lg font-bold text-primary">{formatPrice(item.pricePerDay)}</div>
                <div className="text-xs text-muted-foreground">/day</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-wrap gap-2">
              {Object.entries(item.specs)
                .slice(0, 2)
                .map(([key, value]) => (
                  <span key={key} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                    {value}
                  </span>
                ))}
            </div>
            <Button variant="ghost" size="sm" className="text-primary transition-colors">
              View Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
