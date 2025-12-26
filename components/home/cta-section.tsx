import Link from "next/link"
import { ArrowRight, Calculator, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl gradient-heading text-balance">
          Ready to Bring Your Vision to Life?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Browse our inventory, check availability, and book professional gear in minutes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/inventory">
              Browse Equipment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8 bg-transparent">
            <Link href="/calculator">
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Rental Cost
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Need a custom quote? <a href="tel:+256700488870" className="text-primary font-medium hover:underline">Contact us at 0700 488 870</a>
        </p>
      </div>
    </section>
  )
}

