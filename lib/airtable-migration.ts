// Script to generate Airtable import data from your gear.json
// Run this in your browser console or as a Node.js script to prepare data for Airtable

import gearData from "@/data/gear.json"

// Generate CSV for Categories table
export function generateCategoriesCSV(): string {
  const headers = ["id", "name", "icon"]
  const rows = gearData.categories.map((cat) => [cat.id, cat.name, cat.icon].join(","))
  return [headers.join(","), ...rows].join("\n")
}

// Generate CSV for Gear table
export function generateGearCSV(): string {
  const headers = [
    "id",
    "name",
    "category",
    "pricePerDay",
    "pricePerWeek",
    "description",
    "specs",
    "image",
    "available",
    "featured",
    "bookedDates",
  ]

  const rows = gearData.gear.map((item) =>
    [
      item.id,
      `"${item.name.replace(/"/g, '""')}"`, // Escape quotes in name
      item.category,
      item.pricePerDay,
      item.pricePerWeek,
      `"${item.description.replace(/"/g, '""')}"`, // Escape quotes
      `"${JSON.stringify(item.specs).replace(/"/g, '""')}"`, // JSON specs
      item.image,
      item.available ? "true" : "false",
      item.featured ? "true" : "false",
      `"${JSON.stringify(item.bookedDates)}"`, // JSON array
    ].join(",")
  )

  return [headers.join(","), ...rows].join("\n")
}

// Generate formatted data for manual entry
export function generateAirtableData() {
  console.log("=== CATEGORIES ===")
  console.log("Copy these to your Airtable Categories table:\n")
  gearData.categories.forEach((cat) => {
    console.log(`id: ${cat.id}`)
    console.log(`name: ${cat.name}`)
    console.log(`icon: ${cat.icon}`)
    console.log("---")
  })

  console.log("\n=== GEAR ===")
  console.log("Copy these to your Airtable Gear table:\n")
  gearData.gear.forEach((item) => {
    console.log(`id: ${item.id}`)
    console.log(`name: ${item.name}`)
    console.log(`category: ${item.category}`)
    console.log(`pricePerDay: ${item.pricePerDay}`)
    console.log(`pricePerWeek: ${item.pricePerWeek}`)
    console.log(`description: ${item.description}`)
    console.log(`specs: ${JSON.stringify(item.specs, null, 2)}`)
    console.log(`image: ${item.image}`)
    console.log(`available: ${item.available}`)
    console.log(`featured: ${item.featured}`)
    console.log(`bookedDates: ${JSON.stringify(item.bookedDates)}`)
    console.log("---")
  })
}

// For use in the app - download CSVs
export function downloadCSVs() {
  if (typeof window === "undefined") return

  // Categories CSV
  const categoriesBlob = new Blob([generateCategoriesCSV()], { type: "text/csv" })
  const categoriesUrl = URL.createObjectURL(categoriesBlob)
  const categoriesLink = document.createElement("a")
  categoriesLink.href = categoriesUrl
  categoriesLink.download = "airtable-categories.csv"
  categoriesLink.click()

  // Gear CSV
  const gearBlob = new Blob([generateGearCSV()], { type: "text/csv" })
  const gearUrl = URL.createObjectURL(gearBlob)
  const gearLink = document.createElement("a")
  gearLink.href = gearUrl
  gearLink.download = "airtable-gear.csv"
  gearLink.click()
}

// Export raw data for reference
export const rawGearData = gearData
