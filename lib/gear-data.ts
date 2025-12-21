import gearData from "@/data/gear.json"

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

// ============ Synchronous Functions (JSON fallback - for client components) ============

export function getAllGear(): GearItem[] {
  return gearData.gear
}

export function getGearById(id: string): GearItem | undefined {
  return gearData.gear.find((item) => item.id === id)
}

export function getGearByCategory(categoryId: string): GearItem[] {
  return gearData.gear.filter((item) => item.category === categoryId)
}

export function getFeaturedGear(): GearItem[] {
  return gearData.gear.filter((item) => item.featured)
}

export function getAvailableGear(): GearItem[] {
  return gearData.gear.filter((item) => item.available)
}

export function getAllCategories(): GearCategory[] {
  return gearData.categories
}

export function getCategoryById(id: string): GearCategory | undefined {
  return gearData.categories.find((cat) => cat.id === id)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getRelatedGear(currentId: string, category: string, limit = 4): GearItem[] {
  return gearData.gear.filter((item) => item.id !== currentId && item.category === category).slice(0, limit)
}

// ============ Async Functions (Airtable - for server components) ============
// Import these when you want to use Airtable data in server components

import * as airtable from "./airtable"

const isAirtableConfigured = () => {
  return !!(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID)
}

export async function getAllGearAsync(): Promise<GearItem[]> {
  if (isAirtableConfigured()) {
    try {
      const gear = await airtable.getAllGear()
      if (gear.length > 0) return gear
    } catch (error) {
      console.warn("Airtable fetch failed, using JSON fallback:", error)
    }
  }
  return gearData.gear
}

export async function getGearByIdAsync(id: string): Promise<GearItem | undefined> {
  if (isAirtableConfigured()) {
    try {
      const gear = await airtable.getGearById(id)
      if (gear) return gear
    } catch (error) {
      console.warn("Airtable fetch failed, using JSON fallback:", error)
    }
  }
  return gearData.gear.find((item) => item.id === id)
}

export async function getGearByCategoryAsync(categoryId: string): Promise<GearItem[]> {
  if (isAirtableConfigured()) {
    try {
      const gear = await airtable.getGearByCategory(categoryId)
      if (gear.length > 0) return gear
    } catch (error) {
      console.warn("Airtable fetch failed, using JSON fallback:", error)
    }
  }
  return gearData.gear.filter((item) => item.category === categoryId)
}

export async function getFeaturedGearAsync(): Promise<GearItem[]> {
  if (isAirtableConfigured()) {
    try {
      const gear = await airtable.getFeaturedGear()
      if (gear.length > 0) return gear
    } catch (error) {
      console.warn("Airtable fetch failed, using JSON fallback:", error)
    }
  }
  return gearData.gear.filter((item) => item.featured)
}

export async function getAvailableGearAsync(): Promise<GearItem[]> {
  if (isAirtableConfigured()) {
    try {
      const gear = await airtable.getAvailableGear()
      if (gear.length > 0) return gear
    } catch (error) {
      console.warn("Airtable fetch failed, using JSON fallback:", error)
    }
  }
  return gearData.gear.filter((item) => item.available)
}

export async function getAllCategoriesAsync(): Promise<GearCategory[]> {
  if (isAirtableConfigured()) {
    try {
      const categories = await airtable.getAllCategories()
      if (categories.length > 0) return categories
    } catch (error) {
      console.warn("Airtable fetch failed, using JSON fallback:", error)
    }
  }
  return gearData.categories
}

export async function getCategoryByIdAsync(id: string): Promise<GearCategory | undefined> {
  if (isAirtableConfigured()) {
    try {
      const category = await airtable.getCategoryById(id)
      if (category) return category
    } catch (error) {
      console.warn("Airtable fetch failed, using JSON fallback:", error)
    }
  }
  return gearData.categories.find((cat) => cat.id === id)
}

export async function getRelatedGearAsync(currentId: string, category: string, limit = 4): Promise<GearItem[]> {
  if (isAirtableConfigured()) {
    try {
      const gear = await airtable.getRelatedGear(currentId, category, limit)
      if (gear.length > 0) return gear
    } catch (error) {
      console.warn("Airtable fetch failed, using JSON fallback:", error)
    }
  }
  return gearData.gear
    .filter((item) => item.id !== currentId && item.category === category)
    .slice(0, limit)
}

export async function searchGearAsync(query: string): Promise<GearItem[]> {
  if (isAirtableConfigured()) {
    try {
      return await airtable.searchGear(query)
    } catch (error) {
      console.warn("Airtable search failed, using JSON fallback:", error)
    }
  }
  const lowerQuery = query.toLowerCase()
  return gearData.gear.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  )
}

// Booking management - only works with Airtable
export { updateGearBookedDates, updateGearAvailability } from "./airtable"
