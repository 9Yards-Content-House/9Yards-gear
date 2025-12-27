// Gear Data Module - Hybrid (Local JSON + Airtable)
import * as airtable from "./airtable"
import * as localData from "./local-data"

// Logic to determine source
const USE_LOCAL_DATA = process.env.USE_LOCAL_DATA === "true" || process.env.NODE_ENV === "production";

console.log(`[GearData] Using ${USE_LOCAL_DATA ? "Local JSON" : "Live Airtable"} data source.`);

const dataSource = USE_LOCAL_DATA ? localData : airtable;

// Re-export types from airtable
export type { GearCategory, GearSpecs, GearItem, GearImage } from "./airtable"

// Re-export formatPrice utility
export { formatPrice } from "./airtable"

// ============ Data Functions ============

export async function getAllGear() {
  return await dataSource.getAllGear()
}

export async function getGearById(id: string) {
  return await dataSource.getGearById(id)
}

export async function getGearByCategory(categoryId: string) {
  return await dataSource.getGearByCategory(categoryId)
}

export async function getFeaturedGear() {
  return await dataSource.getFeaturedGear()
}

export async function getAvailableGear() {
  return await dataSource.getAvailableGear()
}

export async function getAllCategories() {
  return await dataSource.getAllCategories()
}

export async function getCategoryById(id: string) {
  return await dataSource.getCategoryById(id)
}

export async function getRelatedGear(currentId: string, category: string, limit = 4) {
  return await dataSource.getRelatedGear(currentId, category, limit)
}

export async function searchGear(query: string) {
  return await dataSource.searchGear(query)
}

// Write operations always go to Airtable (or get mocked/fail gracefully in local mode)
export const updateGearBookedDates = airtable.updateGearBookedDates;
export const updateGearAvailability = airtable.updateGearAvailability;
export const updateGearRentalStats = airtable.updateGearRentalStats;
export const getTopRentedGear = airtable.getTopRentedGear; // These might be empty in local
export const getRevenueByGear = airtable.getRevenueByGear;

// Legacy async function aliases
export const getAllGearAsync = getAllGear
export const getGearByIdAsync = getGearById
export const getGearByCategoryAsync = getGearByCategory
export const getFeaturedGearAsync = getFeaturedGear
export const getAvailableGearAsync = getAvailableGear
export const getAllCategoriesAsync = getAllCategories
export const getCategoryByIdAsync = getCategoryById
export const getRelatedGearAsync = getRelatedGear
export const searchGearAsync = searchGear
