import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock, CreditCard, Shield, Truck } from "lucide-react"

export const metadata: Metadata = {
  title: "Rental Policies | 9Yards Gear",
  description: "Rental terms, conditions, and policies for 9Yards Gear equipment rentals. Understand deposits, damage coverage, cancellations, and more.",
}

export default function PoliciesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-background to-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Rental Policies
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Clear terms and conditions to ensure a smooth rental experience for everyone
            </p>
          </div>
        </section>

        {/* Policy Cards */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-4 lg:px-8 space-y-8">
            
            {/* Booking & Deposits */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Booking & Deposits</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-2 text-muted-foreground">
                  <li>A <strong>valid government ID</strong> is required for all rentals</li>
                  <li>A security deposit is required before equipment pickup (amount varies by equipment value)</li>
                  <li>Deposits are <strong>fully refundable</strong> when equipment is returned in original condition</li>
                  <li>Full payment must be received before equipment release</li>
                  <li>Bookings are confirmed only after payment is received</li>
                </ul>
              </CardContent>
            </Card>

            {/* Rental Period */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Rental Period & Extensions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-2 text-muted-foreground">
                  <li>Rental day = 24 hours from pickup time</li>
                  <li>Weekly rate = 7 days for the price of 5 days</li>
                  <li>Extensions must be requested <strong>before</strong> the original return time</li>
                  <li>Extension availability depends on existing bookings</li>
                  <li>Late returns without prior approval: charged at <strong>1.5x daily rate</strong></li>
                </ul>
              </CardContent>
            </Card>

            {/* Pickup & Return */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Pickup & Return</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Pickup Location:</strong> Our Kampala studio (address provided upon booking)</li>
                  <li><strong>Operating Hours:</strong> Mon-Fri 9AM-6PM, Sat 10AM-4PM</li>
                  <li>Equipment must be returned with all accessories, cases, and cables</li>
                  <li>Inspection is performed at pickup and return</li>
                  <li>Delivery available within Kampala for additional fee</li>
                </ul>
              </CardContent>
            </Card>

            {/* Damage & Loss */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  </div>
                  <CardTitle>Damage & Loss</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Normal wear & tear:</strong> Expected and not charged</li>
                  <li><strong>Minor damage:</strong> Assessed and deducted from deposit</li>
                  <li><strong>Major damage:</strong> May require full or partial replacement cost</li>
                  <li><strong>Loss or theft:</strong> Renter is responsible for full replacement value</li>
                  <li>Report any issues immediately upon discovery</li>
                </ul>
              </CardContent>
            </Card>

            {/* Damage Protection */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle>Damage Protection (Optional)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-2 text-muted-foreground">
                  <li>Optional damage protection available at 10% of rental value</li>
                  <li>Covers accidental damage up to equipment replacement value</li>
                  <li>Does <strong>not</strong> cover theft, loss, or intentional damage</li>
                  <li>Must be purchased at time of booking</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cancellation */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Cancellation Policy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>48+ hours before pickup:</strong> Full refund</li>
                  <li><strong>24-48 hours before pickup:</strong> 50% refund</li>
                  <li><strong>Less than 24 hours:</strong> No refund (booking fee retained)</li>
                  <li>Rescheduling may be available depending on equipment availability</li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Agreement Notice */}
        <section className="py-12 bg-card">
          <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              By renting equipment from 9Yards Gear, you agree to these terms and conditions. 
              A rental agreement will be signed at pickup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">Contact Us With Questions</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
