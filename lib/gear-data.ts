// Gear Data Module - Airtable Only
// All data is fetched from Airtable - no local JSON storage

import * as airtable from "./airtable"

// Re-export types from airtable
export type { GearCategory, GearSpecs, GearItem, GearImage } from "./airtable"

// Re-export formatPrice utility
export { formatPrice } from "./airtable"

// ============ All Functions are Async (Airtable) ============

export async function getAllGear() {
  return await airtable.getAllGear()
}

export async function getGearById(id: string) {
  return await airtable.getGearById(id)
}

export async function getGearByCategory(categoryId: string) {
  return await airtable.getGearByCategory(categoryId)
}

export async function getFeaturedGear() {
  return await airtable.getFeaturedGear()
}

export async function getAvailableGear() {
  return await airtable.getAvailableGear()
}

export async function getAllCategories() {
  return await airtable.getAllCategories()
}

export async function getCategoryById(id: string) {
  return await airtable.getCategoryById(id)
}

export async function getRelatedGear(currentId: string, category: string, limit = 4) {
  return await airtable.getRelatedGear(currentId, category, limit)
}

export async function searchGear(query: string) {
  return await airtable.searchGear(query)
}

// Booking and analytics management
export { 
  updateGearBookedDates, 
  updateGearAvailability, 
  updateGearRentalStats,
  getTopRentedGear,
  getRevenueByGear,
} from "./airtable"

// Legacy async function aliases (for backward compatibility)
export const getAllGearAsync = getAllGear
export const getGearByIdAsync = getGearById
export const getGearByCategoryAsync = getGearByCategory
export const getFeaturedGearAsync = getFeaturedGear
export const getAvailableGearAsync = getAvailableGear
export const getAllCategoriesAsync = getAllCategories
export const getCategoryByIdAsync = getCategoryById
export const getRelatedGearAsync = getRelatedGear
export const searchGearAsync = searchGear
