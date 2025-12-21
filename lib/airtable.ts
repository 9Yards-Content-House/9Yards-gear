// Airtable Integration for 9Yards Gear
// This module handles all communication with Airtable API

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

// Types matching your existing gear-data.ts
export type GearCategory = {
  id: string
  name: string
  icon: string
}

export type GearSpecs = {
  [key: string]: string | undefined
}

export type GearItem = {
  id: string
  name: string
  category: string
  pricePerDay: number
  pricePerWeek: number
  description: string
  specs: GearSpecs
  image: string
  available: boolean
  featured: boolean
  bookedDates: string[]
}

// Airtable record types
type AirtableRecord<T> = {
  id: string
  createdTime: string
  fields: T
}

type AirtableResponse<T> = {
  records: AirtableRecord<T>[]
  offset?: string
}

type AirtableCategoryFields = {
  id: string
  name: string
  icon: string
}

type AirtableGearFields = {
  id: string
  name: string
  category: string | string[] // Can be linked record or plain text
  pricePerDay: number
  pricePerWeek: number
  description: string
  specs: string // JSON string
  image: { url: string }[] | string // Attachment array or URL string
  available: boolean
  featured: boolean
  bookedDates?: string // JSON array or comma-separated
}

// Fetch helper with caching
async function fetchAirtable<T>(
  tableName: string,
  options: { filterByFormula?: string; sort?: { field: string; direction: "asc" | "desc" }[] } = {}
): Promise<AirtableRecord<T>[]> {
  const params = new URLSearchParams()
  
  if (options.filterByFormula) {
    params.append("filterByFormula", options.filterByFormula)
  }
  
  if (options.sort) {
    options.sort.forEach((s, i) => {
      params.append(`sort[${i}][field]`, s.field)
      params.append(`sort[${i}][direction]`, s.direction)
    })
  }

  const url = `${AIRTABLE_API_URL}/${encodeURIComponent(tableName)}?${params.toString()}`
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    // Cache for 60 seconds in production, no cache in development
    next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("Airtable API error:", error)
    throw new Error(`Airtable API error: ${response.status}`)
  }

  const data: AirtableResponse<T> = await response.json()
  
  // Handle pagination if needed
  let allRecords = data.records
  let offset = data.offset
  
  while (offset) {
    const nextUrl = `${url}&offset=${offset}`
    const nextResponse = await fetch(nextUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    })
    const nextData: AirtableResponse<T> = await nextResponse.json()
    allRecords = [...allRecords, ...nextData.records]
    offset = nextData.offset
  }

  return allRecords
}

// Transform Airtable gear record to GearItem
function transformGearRecord(record: AirtableRecord<AirtableGearFields>): GearItem {
  const fields = record.fields
  
  // Parse specs from JSON string
  let specs: GearSpecs = {}
  try {
    if (fields.specs) {
      specs = JSON.parse(fields.specs)
    }
  } catch {
    console.warn(`Failed to parse specs for gear ${fields.id}`)
  }

  // Parse bookedDates
  let bookedDates: string[] = []
  try {
    if (fields.bookedDates) {
      // Support both JSON array and comma-separated
      if (fields.bookedDates.startsWith("[")) {
        bookedDates = JSON.parse(fields.bookedDates)
      } else {
        bookedDates = fields.bookedDates.split(",").map((d) => d.trim()).filter(Boolean)
      }
    }
  } catch {
    console.warn(`Failed to parse bookedDates for gear ${fields.id}`)
  }

  // Handle image - can be attachment or URL
  let image = "/gear/placeholder.jpg"
  if (fields.image) {
    if (Array.isArray(fields.image) && fields.image.length > 0) {
      // Airtable attachment
      image = fields.image[0].url
    } else if (typeof fields.image === "string") {
      // Direct URL
      image = fields.image
    }
  }

  // Handle category - can be linked record array or plain text
  const category = Array.isArray(fields.category) ? fields.category[0] : fields.category

  return {
    id: fields.id,
    name: fields.name,
    category: category || "",
    pricePerDay: fields.pricePerDay || 0,
    pricePerWeek: fields.pricePerWeek || 0,
    description: fields.description || "",
    specs,
    image,
    available: fields.available ?? true,
    featured: fields.featured ?? false,
    bookedDates,
  }
}

// Transform Airtable category record to GearCategory
function transformCategoryRecord(record: AirtableRecord<AirtableCategoryFields>): GearCategory {
  return {
    id: record.fields.id,
    name: record.fields.name,
    icon: record.fields.icon,
  }
}

// ============ Public API Functions ============

export async function getAllGear(): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      sort: [{ field: "name", direction: "asc" }],
    })
    return records.map(transformGearRecord)
  } catch (error) {
    console.error("Error fetching gear from Airtable:", error)
    return []
  }
}

export async function getGearById(id: string): Promise<GearItem | undefined> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{id} = "${id}"`,
    })
    if (records.length === 0) return undefined
    return transformGearRecord(records[0])
  } catch (error) {
    console.error(`Error fetching gear ${id} from Airtable:`, error)
    return undefined
  }
}

export async function getGearByCategory(categoryId: string): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{category} = "${categoryId}"`,
      sort: [{ field: "name", direction: "asc" }],
    })
    return records.map(transformGearRecord)
  } catch (error) {
    console.error(`Error fetching gear for category ${categoryId}:`, error)
    return []
  }
}

export async function getFeaturedGear(): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{featured} = TRUE()`,
    })
    return records.map(transformGearRecord)
  } catch (error) {
    console.error("Error fetching featured gear:", error)
    return []
  }
}

export async function getAvailableGear(): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{available} = TRUE()`,
      sort: [{ field: "name", direction: "asc" }],
    })
    return records.map(transformGearRecord)
  } catch (error) {
    console.error("Error fetching available gear:", error)
    return []
  }
}

export async function getAllCategories(): Promise<GearCategory[]> {
  try {
    const records = await fetchAirtable<AirtableCategoryFields>("Categories", {
      sort: [{ field: "name", direction: "asc" }],
    })
    return records.map(transformCategoryRecord)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getCategoryById(id: string): Promise<GearCategory | undefined> {
  try {
    const records = await fetchAirtable<AirtableCategoryFields>("Categories", {
      filterByFormula: `{id} = "${id}"`,
    })
    if (records.length === 0) return undefined
    return transformCategoryRecord(records[0])
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error)
    return undefined
  }
}

export async function getRelatedGear(currentId: string, category: string, limit = 4): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `AND({category} = "${category}", {id} != "${currentId}")`,
    })
    return records.slice(0, limit).map(transformGearRecord)
  } catch (error) {
    console.error("Error fetching related gear:", error)
    return []
  }
}

// Search gear by name or description
export async function searchGear(query: string): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `OR(FIND(LOWER("${query}"), LOWER({name})), FIND(LOWER("${query}"), LOWER({description})))`,
    })
    return records.map(transformGearRecord)
  } catch (error) {
    console.error("Error searching gear:", error)
    return []
  }
}

// ============ Update Functions (for booking management) ============

export async function updateGearBookedDates(
  gearId: string,
  bookedDates: string[]
): Promise<boolean> {
  try {
    // First, find the Airtable record ID for this gear
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{id} = "${gearId}"`,
    })
    
    if (records.length === 0) {
      console.error(`Gear ${gearId} not found`)
      return false
    }

    const airtableRecordId = records[0].id
    
    const response = await fetch(`${AIRTABLE_API_URL}/Gear/${airtableRecordId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          bookedDates: JSON.stringify(bookedDates),
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Error updating booked dates:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error updating gear booked dates:", error)
    return false
  }
}

export async function updateGearAvailability(
  gearId: string,
  available: boolean
): Promise<boolean> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{id} = "${gearId}"`,
    })
    
    if (records.length === 0) {
      console.error(`Gear ${gearId} not found`)
      return false
    }

    const airtableRecordId = records[0].id
    
    const response = await fetch(`${AIRTABLE_API_URL}/Gear/${airtableRecordId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          available,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Error updating availability:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error updating gear availability:", error)
    return false
  }
}

// Format price utility (same as before)
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
