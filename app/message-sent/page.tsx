import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  CheckCircle, Clock, ArrowRight, Package, 
  Phone, MessageCircle, ChevronRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "Message Sent | 9Yards Gear",
  description: "Thank you for contacting 9Yards Gear. We'll respond within 24 hours.",
}

export default function MessageSentPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Thanks for Reaching Out!
            </h1>
            <p className="text-muted-foreground">
              We&apos;ve received your message and will get back to you soon.
            </p>
          </div>

          {/* Response Time */}
          <Card className="mb-8">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Expected Response Time
              </h2>
              <p className="text-3xl font-bold text-primary mb-2">Within 24 Hours</p>
              <p className="text-sm text-muted-foreground">
                Usually much sooner during business hours (Mon-Fri 9AM-6PM)
              </p>
            </CardContent>
          </Card>

          {/* Need Faster Response */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Need a Faster Response?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For urgent inquiries, reach us directly via phone or WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button asChild>
                  <a href="tel:+256700488870">
                    <Phone className="h-4 w-4 mr-2" />
                    Call: 0700 488 870
                  </a>
                </Button>
                <Button asChild variant="outline" className="bg-transparent">
                  <a href="https://wa.me/256700488870" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Meanwhile Section */}
          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-4">Meanwhile, explore:</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/inventory">
                  <Package className="h-4 w-4 mr-2" />
                  Browse Equipment
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/how-it-works">
                  See How It Works
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
