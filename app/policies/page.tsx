import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock, CreditCard, Shield, Truck, ChevronRight, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Rental Policies | 9Yards Gear",
  description: "Rental terms, conditions, and policies for 9Yards Gear equipment rentals. Understand deposits, damage coverage, cancellations, and more.",
}

export default function PoliciesPage() {
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
              <span className="text-foreground font-medium">Policies</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                <span className="gradient-heading">Rental Policies & Terms</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe in transparency. Here are the clear terms and conditions to ensure a smooth, professional rental experience for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Cards */}
        <section className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
            
            {/* Booking & Deposits */}
            <Card className="border-primary/10 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Booking & Deposits</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-3 text-muted-foreground list-disc pl-4">
                  <li>A <strong>valid government ID</strong> is required for all rentals.</li>
                  <li>A security deposit is required before equipment pickup (amount varies by equipment value).</li>
                  <li>Deposits are <strong>fully refundable</strong> immediately when equipment is returned in original condition.</li>
                  <li>Full payment must be received before equipment release.</li>
                  <li>Bookings are confirmed only after payment is received.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Rental Period */}
            <Card className="border-primary/10 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Rental Period & Extensions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-3 text-muted-foreground list-disc pl-4">
                  <li><strong>Rental Day:</strong> 24 hours from the time of pickup.</li>
                  <li><strong>Weekly Rate:</strong> Pay for 5 days, keep it for 7 days.</li>
                  <li>Extensions must be requested <strong>before</strong> the original return time.</li>
                  <li>Extension availability depends on existing bookings for that gear.</li>
                  <li>Late returns without prior approval are charged at <strong>1.5x the daily rate</strong>.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Pickup & Return */}
            <Card className="border-primary/10 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Pickup & Return</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-3 text-muted-foreground list-disc pl-4">
                  <li><strong>Pickup Location:</strong> Our Kampala studio (address provided upon booking).</li>
                  <li><strong>Operating Hours:</strong> Mon-Fri 9AM-6PM, Sat 10AM-4PM.</li>
                  <li>Equipment must be returned with all accessories, cases, and cables organized.</li>
                  <li>A joint inspection is performed at both pickup and return.</li>
                  <li>Delivery is available within Kampala for an additional fee.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cancellation */}
            <Card className="border-primary/10 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Cancellation Policy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-3 text-muted-foreground list-disc pl-4">
                  <li><strong>48+ hours before pickup:</strong> Full refund.</li>
                  <li><strong>24-48 hours before pickup:</strong> 50% refund.</li>
                  <li><strong>Less than 24 hours:</strong> No refund (booking fee retained).</li>
                  <li>Rescheduling may be available depending on equipment availability.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Damage & Loss */}
            <Card className="border-orange-500/20 bg-orange-500/5 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                  </div>
                  <CardTitle className="text-xl">Damage & Loss</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-3 text-muted-foreground list-disc pl-4">
                  <li><strong>Normal Wear & Tear:</strong> Expected and not charged.</li>
                  <li><strong>Minor Damage:</strong> Assessed and deducted from the deposit.</li>
                  <li><strong>Major Damage:</strong> May require full or partial replacement cost.</li>
                  <li><strong>Loss or Theft:</strong> Renter is responsible for the full replacement value.</li>
                  <li>Please report any issues immediately upon discovery.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Damage Protection */}
            <Card className="border-green-500/20 bg-green-500/5 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <Shield className="h-6 w-6 text-green-500" />
                  </div>
                  <CardTitle className="text-xl">Damage Protection (Optional)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ul className="space-y-3 text-muted-foreground list-disc pl-4">
                  <li>Optional damage protection available at <strong>10% of rental value</strong>.</li>
                  <li>Covers accidental damage up to the equipment's replacement value.</li>
                  <li>Does <strong>not</strong> cover theft, loss, or intentional damage.</li>
                  <li>Must be purchased at the time of booking.</li>
                </ul>
              </CardContent>
            </Card>

            </div>
          </div>
        </section>

        {/* Agreement Notice */}
        <section className="py-16 bg-card border-t border-border">
          <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Ready to Rent?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              By renting equipment from 9Yards Gear, you agree to these terms and conditions. 
              A detailed rental agreement will be provided for you to sign at pickup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-md">
                <Link href="/contact">Contact Us With Questions</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-md">
                <Link href="/faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
