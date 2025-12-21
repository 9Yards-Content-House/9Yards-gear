import { Package, Film, Star, Shield } from "lucide-react"

const stats = [
  {
    icon: Package,
    value: "50+",
    label: "Equipment Pieces",
  },
  {
    icon: Film,
    value: "200+",
    label: "Productions Supported",
  },
  {
    icon: Star,
    value: "5-Star",
    label: "Average Rating",
  },
  {
    icon: Shield,
    value: "Same-Day",
    label: "Deposit Refund",
  },
]

export function TrustIndicators() {
  return (
    <section className="py-12 bg-primary/5 border-y border-primary/10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="w-12 h-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
