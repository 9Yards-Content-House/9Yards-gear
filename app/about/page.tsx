import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Shield, Clock, Award, Users, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | 9Yards Gear",
  description:
    "Learn about 9Yards Gear - Uganda's premier film equipment rental house. Our story, rental terms, and commitment to the creative community.",
}

const values = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every piece of equipment is professionally maintained and tested before each rental.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "Flexible rental periods and quick turnaround to meet your production schedule.",
  },
  {
    icon: Award,
    title: "Professional Grade",
    description: "Access to cinema-quality cameras, lenses, and accessories used in top productions.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Our team of experienced filmmakers is here to help you choose the right gear.",
  },
]

const rentalTerms = [
  {
    title: "Booking Process",
    content:
      "Submit a booking request through our website or contact us directly. We'll confirm availability within 24 hours and provide payment instructions. A 50% deposit is required to secure your booking.",
  },
  {
    title: "Pickup & Return",
    content:
      "Equipment pickup is available from our Kampala location during business hours. Return equipment by 6 PM on your rental end date. Late returns incur additional day charges.",
  },
  {
    title: "Identification Requirements",
    content:
      "Valid government-issued ID and proof of address are required for all rentals. Corporate clients may provide company registration documents instead.",
  },
  {
    title: "Damage & Insurance",
    content:
      "Renters are responsible for equipment during the rental period. Optional insurance coverage is available at 10% of rental value. Report any damage immediately upon return.",
  },
  {
    title: "Cancellation Policy",
    content:
      "Cancel 48+ hours before pickup for a full refund. Cancellations within 48 hours forfeit 25% of the rental fee. No-shows forfeit the full deposit.",
  },
  {
    title: "Payment Methods",
    content:
      "We accept Mobile Money (MTN, Airtel), bank transfers, and cash. International clients can pay via Flutterwave. Full payment required before pickup.",
  },
]

const faqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 1 week in advance for standard equipment and 2-3 weeks for popular items like cinema cameras and drone packages. Last-minute bookings are subject to availability.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Yes, we offer delivery within Kampala for an additional fee. Delivery outside Kampala can be arranged for larger productions. Contact us for a quote.",
  },
  {
    question: "Can I extend my rental period?",
    answer:
      "Extensions are possible if the equipment isn't already booked. Contact us at least 24 hours before your return date to request an extension.",
  },
  {
    question: "Do you provide operators with equipment?",
    answer:
      "We can connect you with experienced operators and technicians for an additional fee. Let us know your requirements when booking.",
  },
  {
    question: "What if equipment malfunctions during my rental?",
    answer:
      "Contact us immediately. We'll troubleshoot remotely or arrange for a replacement. We do not charge for equipment failures that are not caused by misuse.",
  },
  {
    question: "Do you offer discounts for longer rentals?",
    answer:
      "Yes! Weekly rates are approximately 5x the daily rate (saving you 2 days). Monthly and production package rates are available upon request.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/film-production-crew-working-dark-studio.jpg"
              alt="Film production"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Empowering Uganda&apos;s Creators</h1>
              <p className="text-xl text-muted-foreground mb-8">
                9Yards Gear is a division of 9Yards Film, dedicated to providing professional film equipment to
                Uganda&apos;s growing creative community. We believe great stories deserve great tools.
              </p>
              <Button asChild size="lg">
                <Link href="/inventory">
                  Explore Our Equipment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    9Yards Film started as a passion project by Ugandan filmmakers who understood the challenges of
                    accessing quality equipment for local productions. We&apos;ve since grown into one of Uganda&apos;s
                    leading production houses.
                  </p>
                  <p>
                    9Yards Gear was born from our desire to share our professional equipment with the broader creative
                    community. Whether you&apos;re shooting a music video, documentary, commercial, or feature film, we
                    have the gear you need.
                  </p>
                  <p>
                    We&apos;re not just a rental house – we&apos;re filmmakers who understand your needs. Our team can
                    help you choose the right equipment for your project and provide technical support when you need it.
                  </p>
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src="/ugandan-film-crew-professional-equipment.jpg"
                  alt="9Yards Film team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We&apos;re committed to supporting your creative vision with reliable equipment and exceptional service.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Rental Terms */}
        <section id="terms" className="py-16 bg-card scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Rental Terms</h2>
                <p className="text-muted-foreground">
                  Please review our rental policies before booking. Contact us if you have any questions.
                </p>
              </div>
              <div className="space-y-4">
                {rentalTerms.map((term, index) => (
                  <div key={index} className="bg-background rounded-xl p-6 border border-border">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{term.title}</h3>
                        <p className="text-sm text-muted-foreground">{term.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Find answers to common questions about our rental services.</p>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card border border-border rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse our equipment inventory or get in touch to discuss your production needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/inventory">Browse Equipment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
