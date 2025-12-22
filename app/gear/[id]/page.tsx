import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, X } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { GearImageGallery } from "@/components/gear/gear-image-gallery"
import { SyncedBookingSection } from "@/components/gear/synced-booking-section"
import { RelatedGear } from "@/components/gear/related-gear"
import { AddToQuoteButton } from "@/components/gear/add-to-quote-button"
import { GearViewTracker } from "@/components/gear/gear-view-tracker"
import { WhatsIncluded, CareGuidelines, RentalTermsSummary } from "@/components/gear/gear-info-sections"
import { GearFinalCTA } from "@/components/gear/gear-final-cta"
import { ProductSchema } from "@/components/seo/schema-org"
import { 
  getGearByIdAsync, 
  getCategoryByIdAsync, 
  formatPrice, 
  getAllGearAsync 
} from "@/lib/gear-data"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const allGear = await getAllGearAsync()
  return allGear.map((item) => ({
    id: item.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const item = await getGearByIdAsync(id)

  if (!item) {
    return {
      title: "Equipment Not Found | 9Yards Gear",
    }
  }

  return {
    title: `${item.name} | 9Yards Gear`,
    description: item.description,
  }
}

export default async function GearDetailPage({ params }: Props) {
  const { id } = await params
  const item = await getGearByIdAsync(id)

  if (!item) {
    notFound()
  }

  const category = await getCategoryByIdAsync(item.category)

  return (
    <>
      <ProductSchema item={item} />
      <GearViewTracker item={item} />
      <Header />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/inventory" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="inline h-4 w-4 mr-1" />
              Back to Inventory
            </Link>
            <span className="text-muted-foreground">/</span>
            {category && (
              <>
                <Link
                  href={`/inventory?category=${category.id}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.name}
                </Link>
                <span className="text-muted-foreground">/</span>
              </>
            )}
            <span className="text-foreground">{item.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left column - Image and details */}
            <div className="space-y-6">
              <GearImageGallery image={item.image} name={item.name} />

              {/* Specs */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Technical Specifications</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(item.specs).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</dt>
                      <dd className="text-foreground font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* What's Included */}
              <WhatsIncluded itemName={item.name} category={item.category} />

              {/* Care Guidelines */}
              <CareGuidelines itemName={item.name} category={item.category} />
            </div>

            {/* Right column - Info and booking */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {category && <Badge variant="secondary">{category.name}</Badge>}
                    {item.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                  </div>
                  <Badge
                    variant={item.available ? "outline" : "destructive"}
                    className={item.available ? "border-green-500 text-green-500" : ""}
                  >
                    {item.available ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Available
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3 mr-1" />
                        Currently Booked
                      </>
                    )}
                  </Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{item.name}</h1>
                <p className="text-muted-foreground">{item.description}</p>
              </div>

              {/* Pricing */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Rental Pricing</h3>
                <div className="flex items-baseline gap-4">
                  <div>
                    <span className="text-3xl font-bold text-primary">{formatPrice(item.pricePerDay)}</span>
                    <span className="text-muted-foreground ml-1">/day</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    or {formatPrice(item.pricePerWeek)}
                    <span className="ml-1">/week</span>
                  </div>
                </div>
                <p className="text-xs text-primary mt-2">Book 7+ days and get 2 days free!</p>
              </div>

              <AddToQuoteButton item={item} />

              <SyncedBookingSection item={item} />

              {/* Rental Terms Summary */}
              <RentalTermsSummary dailyRate={item.pricePerDay} />
            </div>
          </div>

          {/* Related gear */}
          <RelatedGear currentId={item.id} category={item.category} />

          {/* Final CTA */}
          <GearFinalCTA itemName={item.name} pricePerDay={item.pricePerDay} />
        </div>
      </main>
      <Footer />
    </>
  )
}
