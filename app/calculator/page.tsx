import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RentalCalculator } from "@/components/calculator/rental-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { 
  Info, Clock, CreditCard, Truck, Sparkles, CheckCircle, 
  ChevronRight, Phone, Package, HelpCircle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Rental Cost Calculator | Estimate Your Equipment Quote",
  description: "Calculate your film equipment rental cost instantly. Select gear, choose duration, see pricing. Transparent rates with no hidden fees. Start your quote now.",
  openGraph: {
    title: "Equipment Rental Cost Calculator - 9Yards Gear",
    description: "Estimate your rental cost instantly. Select equipment, choose duration, see transparent pricing with no hidden fees.",
    url: "https://gear.9yards.co.ug/calculator",
  },
}

const steps = [
  { number: "1", title: "Search and select", description: "the equipment you need for your production" },
  { number: "2", title: "Choose your rental duration", description: "daily, 3-day, weekly, or custom dates" },
  { number: "3", title: "Get your instant quote", description: "with line-item pricing and total cost" },
]

const tips = [
  {
    icon: Clock,
    title: "Weekly Rates",
    description: "Rent for 7+ days and get 2 days free automatically applied.",
  },
  {
    icon: Package,
    title: "Bundle Discount",
    description: "Add 3+ items to get an additional 10% discount on your order.",
  },
  {
    icon: CreditCard,
    title: "50% Deposit",
    description: "Secure your booking with 50% deposit, pay the rest on pickup.",
  },
  {
    icon: Truck,
    title: "Free Pickup",
    description: "Collect equipment from our Kampala location at no extra cost.",
  },
]

const pricingFaqs = [
  {
    question: "Are these prices final?",
    answer: "Yes, these are our current rates. Final pricing will be confirmed when we verify equipment availability for your dates. Prices shown include all standard accessories."
  },
  {
    question: "How is the deposit calculated?",
    answer: "Deposits are typically 50% of the rental cost. For example, if your rental total is UGX 1,000,000, your deposit is UGX 500,000. Deposits are fully refunded after equipment is returned in good condition."
  },
  {
    question: "Can I modify my booking after submitting?",
    answer: "Yes! Contact us at least 24 hours before pickup to add, remove, or change equipment. We'll recalculate your quote."
  },
  {
    question: "What if I need equipment for less than 24 hours?",
    answer: "We offer hourly rentals for select studio equipment. Contact us at 0700 488 870 for hourly availability and rates."
  },
  {
    question: "Do you offer discounts for students or nonprofits?",
    answer: "We offer case-by-case discounts for educational projects and registered nonprofits. Contact us with details about your project."
  },
  {
    question: "What happens if I return equipment late?",
    answer: "We offer a 1-hour grace period at no charge. After that, late fees are UGX 50,000 per hour, up to the full daily rate."
  },
]

const includedItems = [
  "Equipment rental for specified duration",
  "All standard accessories (batteries, cables, cases, memory cards)",
  "Equipment care guide",
  "24/7 emergency support during rental",
]

const notIncludedItems = [
  "Refundable deposit (50% of rental cost)",
  "Delivery fees (if delivery requested)",
  "Late return fees (if applicable)",
  "Damage or loss costs (if applicable)",
]

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-8 bg-gradient-to-b from-background to-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Calculator</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl gradient-heading mb-3">
                Estimate Your Rental Cost
              </h1>
              <p className="text-muted-foreground mb-4">
                Select your equipment and rental dates to get an instant quote. No signup required, no commitments just clear pricing so you can plan your production budget with confidence.
              </p>
              
              {/* How to use - inline steps */}
              <div className="flex flex-wrap gap-4 text-sm">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      {step.number}
                    </span>
                    <span>
                      <strong>{step.title}</strong> {step.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-8 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Calculator */}
              <div className="lg:col-span-2">
                <RentalCalculator />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Discount Banner */}
                <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">Save Up to 20%</h3>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>✓ 3-Day Rentals: Save 10-15%</li>
                          <li>✓ Weekly (7+ days): Save 15-20%</li>
                          <li>✓ Bundle 3+ items: Extra 10% off</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rental Tips */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      Rental Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
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
                  </CardContent>
                </Card>

                {/* What's Included */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">What&apos;s Included</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {includedItems.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* What's NOT Included */}
                <Card className="border-orange-500/20 bg-orange-500/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Not Included</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {notIncludedItems.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs">
                        <span className="text-orange-500 shrink-0">•</span>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Note */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Note:</strong> This calculator provides accurate estimates based on current rates. Final pricing will be confirmed when you submit your booking request.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-card">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <h2 className="text-2xl gradient-heading text-center mb-6 flex items-center justify-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Common Questions About Pricing
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {pricingFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-sm">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-8 bg-background border-t border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Transparent Pricing
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No Hidden Fees
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Same-Day Deposit Refunds
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Flexible Booking
              </span>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Questions? Call <a href="tel:+256700488870" className="text-primary hover:underline">0700 488 870</a> or{" "}
              <Link href="/contact" className="text-primary hover:underline">contact us</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
