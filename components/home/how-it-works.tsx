import { Search, Calendar, Truck, Film } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Browse & Select",
    description: "Explore our professional inventory and find the perfect gear for your production.",
  },
  {
    icon: Calendar,
    title: "Check Availability",
    description: "View real-time availability and select your preferred rental dates.",
  },
  {
    icon: Truck,
    title: "Book & Pickup",
    description: "Complete your booking and pick up your gear from our Kampala location.",
  },
  {
    icon: Film,
    title: "Create & Return",
    description: "Capture your vision and return the equipment when your rental ends.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
          <p className="text-muted-foreground mt-2">Simple steps to get professional gear for your next project</p>
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
      </div>
    </section>
  )
}
