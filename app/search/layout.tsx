import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Film Equipment | 9Yards Gear Uganda",
  description:
    "Search our inventory of professional film equipment for rent in Kampala, Uganda. Find cameras, lenses, lighting, audio gear, drones, and accessories from 9Yards Gear.",
  keywords: [
    "search film equipment Uganda",
    "find camera rental Kampala",
    "9Yards Gear search",
    "equipment search Uganda",
  ],
  openGraph: {
    title: "Search Equipment - 9Yards Gear Uganda",
    description:
      "Search 50+ professional film equipment items for rent. Cameras, lenses, lighting, audio gear & more in Kampala.",
    url: "https://gear.9yards.co.ug/search",
  },
  alternates: {
    canonical: "https://gear.9yards.co.ug/search",
  },
  robots: {
    index: false, // Search pages with dynamic content shouldn't be indexed
    follow: true,
  },
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
