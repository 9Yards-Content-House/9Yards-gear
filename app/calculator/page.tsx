import type { Metadata } from "next"
import Link from "next/link"
import { RentalCalculator } from "@/components/calculator/rental-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Info, Clock, CreditCard, Truck, Sparkles, CheckCircle, 
  ChevronRight, Phone, Package, HelpCircle, Search, Calendar as CalendarIcon, FileText
} from "lucide-react"

export const metadata: Metadata = {
  title: "Film Equipment Rental Cost Calculator Uganda | 9Yards Gear",
  description: "Calculate your film equipment rental cost instantly in Uganda. Select cameras, lenses, lighting, audio gear - see transparent pricing with no hidden fees. Get your quote from 9Yards Gear Kampala.",
  keywords: [
    "film equipment rental cost Uganda",
    "camera rental price Kampala",
    "equipment rental calculator",
    "9Yards Gear pricing",
    "gear rental quote Uganda",
  ],
  openGraph: {
    title: "Equipment Rental Cost Calculator - 9Yards Gear Uganda",
    description: "Estimate your film equipment rental cost instantly. Select equipment, choose duration, see transparent pricing. Part of 9Yards Film.",
    url: "https://gear.9yards.co.ug/calculator",
  },
  alternates: {
    canonical: "https://gear.9yards.co.ug/calculator",
  },
}

const steps = [
  { 
    number: "1", 
    title: "Search & Select", 
    description: "Browse our inventory and add equipment to your quote list.",
    icon: Search 
  },
  { 
    number: "2", 
    title: "Set Dates", 
    description: "Choose your pickup and return dates to see accurate pricing.",
    icon: CalendarIcon 
  },
  { 
    number: "3", 
    title: "Get Quote", 
    description: "Review your estimate and submit a booking request instantly.",
    icon: FileText 
  },
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
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-12 bg-linear-to-b from-background to-card/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Calculator</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  <span className="gradient-heading">Estimate Your</span>
                  <br />
                  Rental Costs
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Plan your production budget with confidence. Select your equipment, choose your dates, and get an instant, transparent quote with no hidden fees.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-md" asChild>
                    <Link href="#calculator">Start Calculating</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-md" asChild>
                    <Link href="/how-it-works">How It Works</Link>
                  </Button>
                </div>
              </div>

              {/* Visual Steps */}
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {steps.map((step) => (
                  <Card key={step.number} className="bg-background/50 backdrop-blur border-primary/10">
                    <CardContent className="p-4 flex flex-col gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-snug">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section id="calculator" className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Calculator */}
              <div className="lg:col-span-2">
                <RentalCalculator />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Discount Banner */}
                <Card className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
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

                {/* Need Help? */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Need Help?</h3>
                      <p className="text-primary-foreground/80 text-sm">
                        Not sure what equipment you need? Our team can help you build the perfect package.
                      </p>
                    </div>
                    <Button variant="secondary" className="w-full" asChild>
                      <Link href="/contact">Contact Support</Link>
                    </Button>
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


      </main>
    </>
  )
}
