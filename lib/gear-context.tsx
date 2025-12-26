"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

// Define types locally to avoid importing from server-side airtable.ts
export type GearSpecs = Record<string, string | number | boolean | undefined>

export type GearImage = {
  url: string
  filename?: string
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
  images?: GearImage[]
  whatsIncluded?: string[]
  available: boolean
  featured: boolean
  bookedDates: string[]
  totalRentals?: number
  totalRevenue?: number
  lastRentedAt?: string
}

export type GearCategory = {
  id: string
  name: string
  icon: string
  image?: string
}

// Price formatting utility
export function formatPrice(amount: number): string {
  return `USh ${amount.toLocaleString()}`
}

// Airtable API configuration (for client-side fetching - requires NEXT_PUBLIC_ env vars)
const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID

interface GearContextType {
  gear: GearItem[]
  categories: GearCategory[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  getGearById: (id: string) => GearItem | undefined
  getGearByCategory: (categoryId: string) => GearItem[]
  getFeaturedGear: () => GearItem[]
  getAvailableGear: () => GearItem[]
  getCategoryById: (id: string) => GearCategory | undefined
  getRelatedGear: (currentId: string, category: string, limit?: number) => GearItem[]
  searchGear: (query: string) => GearItem[]
  formatPrice: (price: number) => string
}

const GearContext = createContext<GearContextType | null>(null)

function transformGearRecord(record: any): GearItem {
  const fields = record.fields || record
  let specs: GearSpecs = {}
  
  if (fields.specs) {
    if (typeof fields.specs === "string") {
      try {
        specs = JSON.parse(fields.specs)
      } catch {
        specs = {}
      }
    } else if (typeof fields.specs === "object") {
      specs = fields.specs
    }
  }
  
  // Handle image - could be Airtable attachment or URL string
  let image = "/placeholder.svg"
  if (fields.image) {
    if (Array.isArray(fields.image) && fields.image[0]?.url) {
      image = fields.image[0].url
    } else if (typeof fields.image === "string") {
      image = fields.image
    }
  }
  
  // Handle booked dates
  let bookedDates: string[] = []
  if (fields.bookedDates) {
    if (Array.isArray(fields.bookedDates)) {
      bookedDates = fields.bookedDates
    } else if (typeof fields.bookedDates === "string") {
      try {
        bookedDates = JSON.parse(fields.bookedDates)
      } catch {
        bookedDates = fields.bookedDates.split(",").map((d: string) => d.trim()).filter(Boolean)
      }
    }
  }
  
  return {
    id: fields.id || record.id,
    name: fields.name || "",
    category: fields.category || "",
    pricePerDay: Number(fields.pricePerDay) || 0,
    pricePerWeek: Number(fields.pricePerWeek) || 0,
    description: fields.description || "",
    specs,
    image,
    available: Boolean(fields.available),
    featured: Boolean(fields.featured),
    bookedDates,
  }
}

// Transform Airtable record to GearCategory
function transformCategoryRecord(record: any): GearCategory {
  const fields = record.fields || record
  
  // Handle category image
  let image = undefined
  if (fields.image) {
    if (Array.isArray(fields.image) && fields.image[0]?.url) {
      image = fields.image[0].url
    } else if (typeof fields.image === "string") {
      image = fields.image
    }
  }

  return {
    id: fields.id || record.id,
    name: fields.name || "",
    icon: fields.icon || "Package",
    image,
  }
}

// Fetch from Airtable API directly (client-side) - only works with NEXT_PUBLIC_ env vars
async function fetchFromAirtable(table: string, options?: { filterByFormula?: string }) {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn("Client-side Airtable not configured. Set NEXT_PUBLIC_AIRTABLE_API_KEY and NEXT_PUBLIC_AIRTABLE_BASE_ID for client-side fetching.")
    return []
  }

  let url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`
  
  if (options?.filterByFormula) {
    url += `?filterByFormula=${encodeURIComponent(options.filterByFormula)}`
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Airtable error: ${response.status}`)
  }

  const data = await response.json()
  return data.records || []
}

interface GearProviderProps {
  children: React.ReactNode
  initialGear?: GearItem[]
  initialCategories?: GearCategory[]
}

export function GearProvider({ children, initialGear, initialCategories }: GearProviderProps) {
  const [gear, setGear] = useState<GearItem[]>(initialGear || [])
  const [categories, setCategories] = useState<GearCategory[]>(initialCategories || [])
  const [isLoading, setIsLoading] = useState(!initialGear)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    // Skip fetching if we already have initial data
    if (initialGear && initialGear.length > 0) {
      setIsLoading(false)
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      // Fetch gear and categories in parallel
      const [gearRecords, categoryRecords] = await Promise.all([
        fetchFromAirtable("Gear"),
        fetchFromAirtable("Categories"),
      ])
      
      if (gearRecords.length > 0) {
        setGear(gearRecords.map(transformGearRecord))
      }
      if (categoryRecords.length > 0) {
        setCategories(categoryRecords.map(transformCategoryRecord))
      }
    } catch (err) {
      console.error("Failed to fetch from Airtable:", err)
      setError(err instanceof Error ? err.message : "Failed to load gear data")
    } finally {
      setIsLoading(false)
    }
  }, [initialGear])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Helper functions that work with loaded data
  const getGearById = useCallback(
    (id: string) => gear.find((item) => item.id === id),
    [gear]
  )

  const getGearByCategory = useCallback(
    (categoryId: string) => gear.filter((item) => item.category === categoryId),
    [gear]
  )

  const getFeaturedGear = useCallback(
    () => gear.filter((item) => item.featured),
    [gear]
  )

  const getAvailableGear = useCallback(
    () => gear.filter((item) => item.available),
    [gear]
  )

  const getCategoryById = useCallback(
    (id: string) => categories.find((cat) => cat.id === id),
    [categories]
  )

  const getRelatedGear = useCallback(
    (currentId: string, category: string, limit = 4) =>
      gear.filter((item) => item.id !== currentId && item.category === category).slice(0, limit),
    [gear]
  )

  const searchGear = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase()
      return gear.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery) ||
          item.category.toLowerCase().includes(lowerQuery)
      )
    },
    [gear]
  )

  const value: GearContextType = {
    gear,
    categories,
    isLoading,
    error,
    refetch: fetchData,
    getGearById,
    getGearByCategory,
    getFeaturedGear,
    getAvailableGear,
    getCategoryById,
    getRelatedGear,
    searchGear,
    formatPrice,
  }

  return <GearContext.Provider value={value}>{children}</GearContext.Provider>
}

// Hook to use gear context
export function useGear() {
  const context = useContext(GearContext)
  if (!context) {
    throw new Error("useGear must be used within a GearProvider")
  }
  return context
}

// Convenience hook for a single gear item
export function useGearItem(id: string) {
  const { getGearById, isLoading, error } = useGear()
  return { item: getGearById(id), isLoading, error }
}

// Convenience hook for categories
export function useCategories() {
  const { categories, isLoading, error } = useGear()
  return { categories, isLoading, error }
}
