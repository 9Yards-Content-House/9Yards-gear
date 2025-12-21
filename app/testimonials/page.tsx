import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, Film, Music, Building2, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Testimonials | 9Yards Gear",
  description: "See what Uganda's top creators say about renting from 9Yards Gear. Trusted by filmmakers, musicians, and brands.",
}

const testimonials = [
  {
    name: "David Mukisa",
    title: "Director, Fenon Films",
    type: "filmmaker",
    image: "/testimonials/david.jpg",
    quote: "The ARRI Alexa Mini from 9Yards was in pristine condition. The team walked me through everything and were available 24/7 during our shoot. Highly recommend!",
    project: "Commercial Campaign",
    rating: 5,
  },
  {
    name: "Sarah Nalwoga",
    title: "Music Video Director",
    type: "musician",
    image: "/testimonials/sarah.jpg",
    quote: "I've rented from 9Yards for 3 music videos now. Their equipment is always reliable, and the pricing is fair. The production packages save me so much time.",
    project: "Music Video",
    rating: 5,
  },
  {
    name: "James Okello",
    title: "Documentary Filmmaker",
    type: "filmmaker",
    image: "/testimonials/james.jpg",
    quote: "Shot my entire documentary with gear from 9Yards. From cameras to audio, everything worked flawlessly. They even helped me choose the right lenses for my style.",
    project: "Documentary",
    rating: 5,
  },
  {
    name: "Media Solutions Ltd",
    title: "Corporate Production",
    type: "brand",
    image: "/testimonials/media-solutions.jpg",
    quote: "We use 9Yards Gear for all our corporate video productions. Professional equipment, transparent pricing, and excellent customer service. They're our go-to rental house.",
    project: "Corporate Content",
    rating: 5,
  },
  {
    name: "Patricia Amony",
    title: "Content Creator",
    type: "individual",
    image: "/testimonials/patricia.jpg",
    quote: "As a solo creator, I was nervous about renting expensive gear. The 9Yards team made it so easy and even gave me tips on using the equipment. Will definitely be back!",
    project: "YouTube Content",
    rating: 5,
  },
  {
    name: "Victor Films",
    title: "Production Company",
    type: "filmmaker",
    image: "/testimonials/victor.jpg",
    quote: "The quality of equipment rivals what you'd find in Nairobi or Johannesburg. It's amazing to have this level of gear available locally in Kampala.",
    project: "Feature Film",
    rating: 5,
  },
]

const stats = [
  { value: "200+", label: "Projects Supported" },
  { value: "50+", label: "Happy Creators" },
  { value: "5.0", label: "Average Rating" },
  { value: "24/7", label: "Support Available" },
]

function getTypeIcon(type: string) {
  switch (type) {
    case "filmmaker": return Film
    case "musician": return Music
    case "brand": return Building2
    default: return User
  }
}

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-background to-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Trusted by Uganda's Top Creators
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From music videos to documentaries, see what creators say about renting from 9Yards Gear.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-primary/10">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => {
                const TypeIcon = getTypeIcon(testimonial.type)
                return (
                  <Card key={testimonial.name} className="relative">
                    <CardContent className="pt-6">
                      <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                      
                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <p className="text-muted-foreground mb-6 italic">
                        "{testimonial.quote}"
                      </p>
                      
                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <TypeIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                      
                      {/* Project Badge */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Project: <span className="text-primary">{testimonial.project}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Community of Creators</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Ready to experience the 9Yards difference? Browse our equipment and start your next project today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/inventory">Browse Equipment</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
