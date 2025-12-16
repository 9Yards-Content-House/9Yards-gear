import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RentalCalculator } from "@/components/calculator/rental-calculator"
import { Card, CardContent } from "@/components/ui/card"
import { Info, Clock, CreditCard, Truck } from "lucide-react"

export const metadata: Metadata = {
  title: "Rental Calculator | 9Yards Gear",
  description: "Estimate your equipment rental costs with our interactive calculator. Plan your production budget.",
}

const tips = [
  {
    icon: Clock,
    title: "Weekly Rates",
    description: "Rent for 7+ days and get 2 days free with our weekly rate.",
  },
  {
    icon: CreditCard,
    title: "50% Deposit",
    description: "Secure your booking with a 50% deposit, pay the rest on pickup.",
  },
  {
    icon: Truck,
    title: "Free Pickup",
    description: "Collect equipment from our Kampala location at no extra cost.",
  },
]

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Rental Calculator</h1>
            <p className="text-muted-foreground mt-2">
              Plan your production budget by estimating equipment rental costs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RentalCalculator />
            </div>

            <div className="space-y-6">
              {/* Tips */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Rental Tips
                  </h3>
                  <div className="space-y-4">
                    {tips.map((tip) => (
                      <div key={tip.title} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <tip.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm">{tip.title}</h4>
                          <p className="text-xs text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Note */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> This calculator provides estimates only. Final
                    pricing is confirmed upon booking approval and may include additional fees for delivery, insurance,
                    or extended hours.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
