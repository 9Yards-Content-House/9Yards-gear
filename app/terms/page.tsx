import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Auto-update date format
const lastUpdated = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })

export const metadata: Metadata = {
  title: "Terms of Service | Film Equipment Rental - 9Yards Gear Uganda",
  description: "Terms of service for 9Yards Gear film equipment rental services in Kampala, Uganda. Rental agreements, liability, and conditions for equipment hire.",
  alternates: {
    canonical: "https://gear.9yards.co.ug/terms",
  },
}

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>

          <h1 className="text-4xl gradient-heading mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl gradient-heading mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using 9Yards Gear&apos;s services, you accept and agree to be bound by these Terms
                of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">2. Rental Agreement</h2>
              <p className="text-muted-foreground mb-4">
                When renting equipment from 9Yards Gear, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate identification and contact information</li>
                <li>Pay all rental fees, deposits, and applicable charges</li>
                <li>Return equipment on time and in the same condition as received</li>
                <li>Use equipment only for lawful purposes</li>
                <li>Not sub-rent or transfer equipment to third parties without written consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">3. Booking and Payment</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>A 50% deposit is required to confirm your booking</li>
                <li>Full payment must be completed before equipment pickup</li>
                <li>We accept Mobile Money (MTN, Airtel), bank transfers, and cash</li>
                <li>International clients can pay via Flutterwave</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">4. Cancellation Policy</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Cancellations 48+ hours before pickup: Full refund</li>
                <li>Cancellations within 48 hours: 25% of rental fee forfeited</li>
                <li>No-shows: Full deposit forfeited</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">5. Equipment Care and Liability</h2>
              <p className="text-muted-foreground mb-4">
                The renter is responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Proper care and handling of all rented equipment</li>
                <li>Full cost of repair or replacement for damaged, lost, or stolen equipment</li>
                <li>Reporting any damage or malfunction immediately</li>
                <li>Returning equipment clean and in proper carrying cases</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">6. Insurance</h2>
              <p className="text-muted-foreground">
                Optional insurance coverage is available at 10% of the rental value. This covers accidental damage
                but does not cover theft, loss, or damage due to negligence or misuse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">7. Late Returns</h2>
              <p className="text-muted-foreground">
                Equipment must be returned by 6 PM on the rental end date. Late returns will incur additional day
                charges at the standard daily rate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                9Yards Gear shall not be liable for any indirect, incidental, or consequential damages arising from
                the use of rented equipment. Our liability is limited to the rental fees paid.
              </p>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">9. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms are governed by the laws of Uganda. Any disputes shall be resolved in Ugandan courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">10. Contact</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, contact us at{" "}
                <a href="mailto:gear@9yards.co.ug" className="text-primary hover:underline">
                  gear@9yards.co.ug
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
