import { Camera, DollarSign, Wrench, PhoneCall, Rocket, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: Camera,
    title: "Cinema-Quality Gear",
    description: "Professional-grade equipment from ARRI, RED, Sony, and more",
    detail: "The same cameras and lighting used in international productions, now accessible in Kampala."
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. What you see is what you pay.",
    detail: "Clear daily, weekly, and package rates with detailed breakdowns before you book."
  },
  {
    icon: Wrench,
    title: "Well-Maintained Equipment",
    description: "Every piece is inspected, cleaned, and tested before rental",
    detail: "We maintain our gear to cinema standards so you can focus on creating."
  },
  {
    icon: PhoneCall,
    title: "24/7 Support",
    description: "Questions during your shoot? We're here to help.",
    detail: "Reach us by phone or WhatsApp anytime even on weekends and evenings."
  },
  {
    icon: Rocket,
    title: "Fast Turnaround",
    description: "Book online and pick up the same day (subject to availability)",
    detail: "Last-minute shoots? We'll do our best to accommodate urgent requests."
  },
  {
    icon: Users,
    title: "Trusted by 200+ Productions",
    description: "From music videos to documentaries, we've supported Uganda's best creators",
    detail: "Join a community of filmmakers who rely on 9Yards Gear."
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl gradient-heading">Why Choose 9Yards Gear?</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            More than just equipment rental we&apos;re your production partner
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="group hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{benefit.description}</p>
                <p className="text-sm text-muted-foreground/80">{benefit.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
