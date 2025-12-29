import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, HelpCircle, MessageCircle, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ | 9Yards Gear",
  description: "Frequently asked questions about renting equipment from 9Yards Gear. Learn about booking, pricing, policies, and more.",
}

const faqs = [
  {
    category: "Booking & Reservations",
    questions: [
      {
        q: "How do I book equipment?",
        a: "You can browse our inventory online, add items to your quote, and contact us via WhatsApp, phone, or email to confirm your booking. We'll verify availability and send you a booking confirmation with payment details."
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend booking at least 3-5 days in advance for standard equipment, and 1-2 weeks for high-demand items like cinema cameras. Last-minute bookings may be possible depending on availability."
      },
      {
        q: "Can I extend my rental period?",
        a: "Yes! Contact us before your return date to extend. Extensions are subject to availability and will be charged at the daily rate."
      },
      {
        q: "Can I cancel my booking?",
        a: "Cancellations made 48+ hours before pickup receive a full refund. Cancellations within 48 hours may forfeit the deposit. See our full cancellation policy for details."
      },
    ]
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        q: "What are your payment methods?",
        a: "We accept Mobile Money (MTN, Airtel), bank transfers, and cash. Payment is required before equipment pickup."
      },
      {
        q: "Is a deposit required?",
        a: "Yes, a security deposit is required for all rentals. The amount varies based on the equipment value. Deposits are fully refundable when equipment is returned in original condition."
      },
      {
        q: "Do you offer discounts for longer rentals?",
        a: "Yes! Weekly rates are typically 5 days for the price of 7. We also offer package deals and discounts for repeat customers."
      },
      {
        q: "Do you have student or indie filmmaker discounts?",
        a: "We offer special rates for students and independent filmmakers. Contact us with proof of enrollment or project details to discuss."
      },
    ]
  },
  {
    category: "Equipment & Care",
    questions: [
      {
        q: "What condition is the equipment in?",
        a: "All our equipment is professionally maintained and tested before each rental. We only rent gear that meets professional standards."
      },
      {
        q: "What if equipment is damaged during my rental?",
        a: "Minor wear is expected, but significant damage will be assessed and charged accordingly. We offer damage protection coverage for an additional fee."
      },
      {
        q: "Are batteries and memory cards included?",
        a: "Yes, all camera rentals include batteries and memory cards. The specifics are listed on each equipment page."
      },
      {
        q: "Do you provide training on equipment use?",
        a: "We offer a quick walkthrough when you pickup. For in-depth training, we can arrange sessions for an additional fee."
      },
    ]
  },
  {
    category: "Pickup & Return",
    questions: [
      {
        q: "Where do I pickup equipment?",
        a: "Equipment is picked up from our Kampala studio. We'll provide the exact address when your booking is confirmed."
      },
      {
        q: "What are your operating hours?",
        a: "Monday-Friday: 9AM-6PM, Saturday: 10AM-4PM. Sunday pickups by appointment only."
      },
      {
        q: "Do you offer delivery?",
        a: "Yes, we offer delivery within Kampala for an additional fee. Contact us for delivery rates and availability."
      },
      {
        q: "What happens if I return late?",
        a: "Late returns are charged at the daily rate. If you need to extend, please contact us before your return time to avoid additional fees."
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <>
      <main id="main-content" className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-12 bg-linear-to-b from-background to-card/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">FAQ</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                <span className="gradient-heading">Frequently Asked</span>
                <br />
                Questions
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Everything you need to know about renting equipment from 9Yards Gear. If you can't find the answer here, our team is just a message away.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-12 bg-background">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            {faqs.map((section) => (
              <div key={section.category} className="mb-12 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{section.category}</h2>
                </div>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {section.questions.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`${section.category}-${index}`}
                      className="border border-primary/10 rounded-lg px-4 bg-card/50 hover:bg-card transition-colors"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4 text-base font-medium">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-card border-t border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Can't find what you're looking for? Our team is here to help you find the perfect gear for your production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-md">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md">
                <a href="https://wa.me/256700488870" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
