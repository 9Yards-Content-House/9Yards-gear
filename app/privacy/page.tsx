import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | 9Yards Gear",
  description: "Privacy policy for 9Yards Gear - how we collect, use, and protect your personal information.",
}

export default function PrivacyPage() {
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

          <h1 className="text-4xl gradient-heading mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl gradient-heading mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                When you use 9Yards Gear, we may collect the following information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Booking and rental history</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication records from customer support interactions</li>
                <li>Device and browser information for website optimization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Process and manage your equipment rental bookings</li>
                <li>Communicate with you about your rentals and inquiries</li>
                <li>Send important updates about our services</li>
                <li>Improve our website and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. We may share your
                information with trusted service providers who assist us in operating our business, such as payment
                processors and delivery partners, subject to confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no method of transmission over the Internet
                is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">6. Cookies</h2>
              <p className="text-muted-foreground">
                Our website uses cookies to enhance your browsing experience. You can control cookie settings through
                your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl gradient-heading mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at{" "}
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
