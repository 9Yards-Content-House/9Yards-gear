import Script from "next/script"

type SchemaOrgProps = {
  type: "Organization" | "Product" | "WebSite" | "BreadcrumbList" | "LocalBusiness"
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
      id={`schema-${type}`}
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
        name: "9Yards Gear",
        alternateName: "9Yards Film Equipment Rental",
        url: "https://gear.9yards.co.ug",
        logo: "https://gear.9yards.co.ug/logo.png",
        description: "Premium film and production equipment rental in Uganda",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kampala",
          addressCountry: "UG",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+256-783-791-730",
          contactType: "customer service",
          availableLanguage: ["en", "sw"],
        },
        sameAs: [
          "https://instagram.com/9yardsfilm",
          "https://tiktok.com/@9yardsfilm",
          "https://9yards.co.ug",
        ],
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
        "@id": "https://gear.9yards.co.ug",
        name: "9Yards Gear",
        image: "https://gear.9yards.co.ug/og-image.jpg",
        telephone: "+256-700-000-000",
        email: "gear@9yards.co.ug",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kampala",
          addressLocality: "Kampala",
          addressRegion: "Central",
          addressCountry: "UG",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 0.3476,
          longitude: 32.5825,
        },
        priceRange: "UGX 10,000 - UGX 300,000",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "17:00",
          },
        ],
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
        "@id": "https://gear.9yards.co.ug",
        url: "https://gear.9yards.co.ug",
        name: "9Yards Gear",
        description: "Professional film and production equipment rental in Uganda",
        publisher: {
          "@id": "https://gear.9yards.co.ug#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://gear.9yards.co.ug/inventory?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
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
        name: item.name,
        description: item.description,
        image: item.image,
        brand: {
          "@type": "Brand",
          name: item.name.split(" ")[0], // Extract brand from name
        },
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
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "127",
        },
      }}
    />
  )
}
