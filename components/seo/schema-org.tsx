import Script from "next/script"

type SchemaOrgProps = {
  type: "Organization" | "Product" | "WebSite" | "BreadcrumbList" | "LocalBusiness" | "FAQPage" | "Service"
  data: any
}

export function SchemaOrg({ type, data }: SchemaOrgProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  }

  return (
    <Script
      id={`schema-${type}-${Math.random().toString(36).substr(2, 9)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}

// Organization schema for homepage
export function OrganizationSchema() {
  return (
    <SchemaOrg
      type="Organization"
      data={{
        "@id": "https://gear.9yards.co.ug/#organization",
        name: "9Yards Gear",
        alternateName: ["9Yards Film Equipment Rental", "9Yards Film Gear", "9Yards Uganda"],
        url: "https://gear.9yards.co.ug",
        logo: "https://gear.9yards.co.ug/logo.png",
        description: "Premium film and production equipment rental in Uganda. Part of 9Yards Film production company.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kampala",
          addressLocality: "Kampala",
          addressRegion: "Central Region",
          addressCountry: "UG",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+256700488870",
          contactType: "customer service",
          availableLanguage: ["en", "sw"],
          areaServed: ["UG", "KE", "TZ", "RW"],
        },
        sameAs: [
          "https://www.instagram.com/9yards.ug",
          "https://www.tiktok.com/@9yards",
          "https://www.youtube.com/@9yardscontenthouse",
          "https://film.9yards.co.ug",
          "https://9yards.co.ug",
        ],
        isPartOf: {
          "@type": "Organization",
          "@id": "https://film.9yards.co.ug/#organization",
          name: "9Yards Film",
          url: "https://film.9yards.co.ug",
        },
      }}
    />
  )
}

// LocalBusiness schema
export function LocalBusinessSchema() {
  return (
    <SchemaOrg
      type="LocalBusiness"
      data={{
        "@id": "https://gear.9yards.co.ug/#localbusiness",
        name: "9Yards Gear",
        image: "https://gear.9yards.co.ug/og-image.jpg",
        telephone: "+256700488870",
        email: "gear@9yards.co.ug",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kampala",
          addressLocality: "Kampala",
          addressRegion: "Central Region",
          addressCountry: "UG",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 0.3476,
          longitude: 32.5825,
        },
        areaServed: [
          { "@type": "City", name: "Kampala" },
          { "@type": "Country", name: "Uganda" },
          { "@type": "Place", name: "East Africa" },
        ],
        priceRange: "UGX 10,000 - UGX 500,000",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "16:00",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
          reviewCount: "47",
        },
      }}
    />
  )
}

// WebSite schema with search
export function WebSiteSchema() {
  return (
    <SchemaOrg
      type="WebSite"
      data={{
        "@id": "https://gear.9yards.co.ug/#website",
        url: "https://gear.9yards.co.ug",
        name: "9Yards Gear - Film Equipment Rental Uganda",
        alternateName: "9Yards Film Gear",
        description: "Professional film and production equipment rental in Uganda. Rent cinema cameras, lenses, lighting, audio gear & drones in Kampala.",
        publisher: {
          "@id": "https://gear.9yards.co.ug/#organization",
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://film.9yards.co.ug/#website",
          name: "9Yards Film",
          url: "https://film.9yards.co.ug",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://gear.9yards.co.ug/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: "en-UG",
      }}
    />
  )
}

// Service schema for equipment rental
export function ServiceSchema() {
  return (
    <SchemaOrg
      type="Service"
      data={{
        "@id": "https://gear.9yards.co.ug/#service",
        name: "Film Equipment Rental",
        alternateName: ["Camera Rental", "Gear Rental", "Production Equipment Hire"],
        description: "Professional film and video production equipment rental service in Kampala, Uganda. We offer cinema cameras, lenses, lighting, audio gear, drones, and accessories for filmmakers, content creators, and production companies.",
        provider: {
          "@id": "https://gear.9yards.co.ug/#organization",
        },
        serviceType: "Equipment Rental",
        areaServed: [
          { "@type": "City", name: "Kampala" },
          { "@type": "Country", name: "Uganda" },
          { "@type": "Place", name: "East Africa" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Film Equipment Categories",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cinema Camera Rental" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lens Rental" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lighting Equipment Rental" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Audio Gear Rental" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drone Rental" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Production Accessories Rental" } },
          ],
        },
        termsOfService: "https://gear.9yards.co.ug/terms",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          bestRating: "5",
          reviewCount: "47",
        },
      }}
    />
  )
}

// FAQ Schema for rich snippets
export function FAQSchema() {
  const faqData = [
    {
      question: "How do I rent film equipment from 9Yards Gear in Kampala?",
      answer: "Simply browse our inventory, select your equipment, choose your rental dates, and submit a booking request. We'll confirm availability within 2 hours. You can pick up from our Kampala location or request delivery.",
    },
    {
      question: "What film equipment can I rent from 9Yards Gear Uganda?",
      answer: "We offer cinema cameras (Blackmagic, Sony, Canon), lenses, professional lighting, audio recording equipment, drones, and production accessories. Our catalog includes over 50 items from top brands.",
    },
    {
      question: "What are the rental prices for camera equipment in Uganda?",
      answer: "Our rental prices start from UGX 10,000 per day for basic accessories to UGX 500,000 per day for high-end cinema cameras. We offer weekly discounts of up to 40% off daily rates.",
    },
    {
      question: "Do you deliver film equipment in Kampala?",
      answer: "Yes, we offer equipment delivery within Kampala and surrounding areas. Delivery fees vary based on location. Same-day delivery is available for urgent productions.",
    },
    {
      question: "What is 9Yards Film and how is 9Yards Gear related?",
      answer: "9Yards Film is Uganda's premier film production company. 9Yards Gear is our equipment rental division, providing professional film gear to filmmakers across Uganda and East Africa.",
    },
    {
      question: "What payment methods do you accept for gear rental?",
      answer: "We accept Mobile Money (MTN, Airtel), bank transfers, and cash payments. A deposit is required for most rentals, refundable upon safe return of equipment.",
    },
  ]

  return (
    <SchemaOrg
      type="FAQPage"
      data={{
        mainEntity: faqData.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  )
}

// Breadcrumb schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <SchemaOrg
      type="BreadcrumbList"
      data={{
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  )
}

// Product schema for gear items
export function ProductSchema({ item }: { item: any }) {
  return (
    <SchemaOrg
      type="Product"
      data={{
        "@id": `https://gear.9yards.co.ug/gear/${item.id}`,
        name: item.name,
        description: item.description,
        image: item.image?.startsWith('http') ? item.image : `https://gear.9yards.co.ug${item.image}`,
        brand: {
          "@type": "Brand",
          name: item.brand || item.name.split(" ")[0],
        },
        category: item.category,
        offers: {
          "@type": "Offer",
          price: item.pricePerDay,
          priceCurrency: "UGX",
          availability: item.available
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: item.pricePerDay,
            priceCurrency: "UGX",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: "1",
              unitCode: "DAY",
            },
          },
          seller: {
            "@id": "https://gear.9yards.co.ug/#organization",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          bestRating: "5",
          reviewCount: "47",
        },
        isRelatedTo: {
          "@type": "Service",
          name: "Film Equipment Rental Uganda",
          provider: {
            "@id": "https://gear.9yards.co.ug/#organization",
          },
        },
      }}
    />
  )
}
