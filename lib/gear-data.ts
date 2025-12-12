import gearData from "@/data/gear.json"

export type GearCategory = {
  id: string
  name: string
  icon: string
}

export type GearSpecs = {
  [key: string]: string
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
