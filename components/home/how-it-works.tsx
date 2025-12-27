import Link from "next/link"
import { Search, Calendar, Package, Film } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Search,
    title: "Browse & Select",
    description: "Browse our inventory, check real-time availability, and compare specs to find your perfect setup.",
  },
  {
    icon: Calendar,
    title: "Book Online",
    description: "Select your dates, review pricing, and book online. We'll confirm within 2 hours via call or WhatsApp.",
  },
  {
    icon: Package,
    title: "Pick Up Your Gear",
    description: "Visit our office with your ID and deposit. We'll inspect equipment together and share care guidelines.",
  },
  {
    icon: Film,
    title: "Create & Return",
    description: "Create your project, return on time, pass inspection, get your deposit back same day.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl gradient-heading">How It Works</h2>
          <p className="text-muted-foreground mt-2">Professional gear in four simple steps. Browse online, pick up same day, create, and return.</p>
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

        <div className="flex justify-center mt-12">
          <Button asChild className="bg-[#ECECEC] hover:bg-white text-black rounded-md h-12 px-10 text-[14px] font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-transparent w-fit mt-0">
            <Link href="/how-it-works" className="flex items-center gap-2">
              View Complete Rental Guide 
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

