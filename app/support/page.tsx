import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Phone, 
  Mail, 
  MessageCircle, 
  BookOpen, 
  CreditCard, 
  Package, 
  Shield,
  HelpCircle,
  Clock,
  FileText
} from "lucide-react"

export const metadata: Metadata = {
  title: "Support | 9Yards Gear",
  description: "Get help with your 9Yards Gear rental. Browse help articles, contact support, or submit a ticket.",
}

const quickLinks = [
  { icon: BookOpen, title: "How to Book", description: "Step-by-step booking guide", href: "/how-it-works" },
  { icon: CreditCard, title: "Payment Methods", description: "Accepted payment options", href: "/faq#pricing" },
  { icon: FileText, title: "Rental Policies", description: "Terms and conditions", href: "/policies" },
  { icon: Shield, title: "Equipment Care", description: "Handle gear properly", href: "/equipment-care" },
  { icon: Package, title: "Browse Equipment", description: "View our inventory", href: "/inventory" },
  { icon: HelpCircle, title: "FAQ", description: "Common questions", href: "/faq" },
]

const popularArticles = [
  { title: "How do I book equipment?", href: "/how-it-works" },
  { title: "What payment methods do you accept?", href: "/faq" },
  { title: "What's included with each rental?", href: "/faq" },
  { title: "What happens if equipment is damaged?", href: "/policies" },
  { title: "Can I extend my rental?", href: "/faq" },
  { title: "Do you offer delivery?", href: "/faq" },
]

export default function SupportPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-background to-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How Can We Help?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers, get support, and learn how to make the most of your rental.
            </p>
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search for help..." 
                className="pl-12 py-6 text-lg bg-background"
              />
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Quick Links</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link) => (
                <Link key={link.title} href={link.href}>
                  <Card className="h-full hover:border-primary transition-colors cursor-pointer group">
                    <CardHeader>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                        <link.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Popular Articles</h2>
            <div className="space-y-3">
              {popularArticles.map((article) => (
                <Link 
                  key={article.title} 
                  href={article.href}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors group"
                >
                  <span className="text-foreground group-hover:text-primary transition-colors">{article.title}</span>
                  <span className="text-primary">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Contact Support</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <MessageCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-4">Fastest response time</p>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <a href="https://wa.me/256700488870" target="_blank" rel="noopener noreferrer">
                      Chat Now
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground mb-4">Mon-Fri 9AM-6PM</p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="tel:+256700488870">
                      0700 488 870
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground mb-4">Response within 24hrs</p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="mailto:gear@9yards.co.ug">
                      gear@9yards.co.ug
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Emergency */}
        <section className="py-12 bg-orange-500/10 border-y border-orange-500/20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <h3 className="font-semibold text-foreground">During-Rental Emergency?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Equipment malfunction during your shoot? We're here to help 24/7.
            </p>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <a href="tel:+256700488870">
                <Phone className="mr-2 h-4 w-4" />
                Emergency: 0700 488 870
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
