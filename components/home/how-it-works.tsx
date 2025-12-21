import Link from "next/link"
import { Search, Calendar, Package, Film } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Search,
    title: "Browse & Select",
    description: "Explore our inventory and check real-time availability. Compare specs and find the perfect gear for your project.",
  },
  {
    icon: Calendar,
    title: "Book Online",
    description: "Select your dates, review pricing, and complete your booking. We'll confirm within 2 hours via call or WhatsApp.",
  },
  {
    icon: Package,
    title: "Pick Up Your Gear",
    description: "Visit our Kampala studio with your ID and deposit. We'll inspect the equipment together and provide care guidelines.",
  },
  {
    icon: Film,
    title: "Create & Return",
    description: "Use the gear to bring your vision to life. Return on time, pass inspection, and get your deposit back the same day.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground">How Renting Works</h2>
          <p className="text-muted-foreground mt-2">Getting professional gear for your production is simple</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center lg:left-1/2 lg:translate-x-6">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/how-it-works">See Full Rental Guide</Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Need help choosing equipment? Call us at{" "}
            <a href="tel:+256700488870" className="text-primary font-medium hover:underline">
              0700 488 870
            </a>{" "}
            or WhatsApp anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

