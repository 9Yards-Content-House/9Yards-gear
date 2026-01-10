import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact 9Yards Gear | Film Equipment Rental Kampala Uganda",
  description:
    "Get in touch with 9Yards Gear for professional film equipment rental in Kampala, Uganda. WhatsApp: 0700488870, Email: gear@9yards.co.ug. Part of 9Yards Film production company. Quick response within 2 hours.",
  keywords: [
    "contact 9Yards Gear",
    "9Yards Film contact",
    "film equipment rental contact Uganda",
    "camera rental Kampala contact",
    "9Yards Uganda phone",
    "gear rental inquiry Kampala",
  ],
  openGraph: {
    title: "Contact 9Yards Gear - Film Equipment Rental Uganda",
    description:
      "Get in touch for professional film equipment rental in Kampala. WhatsApp, email, or visit our studio. Part of 9Yards Film.",
    url: "https://gear.9yards.co.ug/contact",
  },
  alternates: {
    canonical: "https://gear.9yards.co.ug/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
