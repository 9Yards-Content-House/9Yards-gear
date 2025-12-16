// Comparison utilities for gear items
import type { GearItem } from "./gear-data"

export type ComparisonItem = {
  id: string
  addedAt: number
}

const COMPARISON_STORAGE_KEY = "gearComparison"
const MAX_COMPARISON_ITEMS = 4

/**
 * Get items in comparison list
 */
export function getComparisonItems(): ComparisonItem[] {
  if (typeof window === "undefined") return []
  
  try {
    const stored = localStorage.getItem(COMPARISON_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Add item to comparison
 */
export function addToComparison(itemId: string): { success: boolean; message: string } {
  const items = getComparisonItems()
  
  if (items.length >= MAX_COMPARISON_ITEMS) {
    return {
      success: false,
      message: `Maximum ${MAX_COMPARISON_ITEMS} items can be compared at once`,
    }
  }
  
  if (items.some((item) => item.id === itemId)) {
    return {
      success: false,
      message: "Item is already in comparison",
    }
  }
  
  items.push({ id: itemId, addedAt: Date.now() })
  localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent("comparisonUpdated"))
  
  return {
    success: true,
    message: "Item added to comparison",
  }
}

/**
 * Remove item from comparison
 */
export function removeFromComparison(itemId: string): void {
  const items = getComparisonItems().filter((item) => item.id !== itemId)
  localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent("comparisonUpdated"))
}

/**
 * Clear comparison list
 */
export function clearComparison(): void {
  localStorage.removeItem(COMPARISON_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent("comparisonUpdated"))
}

/**
 * Check if item is in comparison
 */
export function isInComparison(itemId: string): boolean {
  return getComparisonItems().some((item) => item.id === itemId)
}

/**
 * Get comparison count
 */
export function getComparisonCount(): number {
  return getComparisonItems().length
}

/**
 * Compare gear items and return structured comparison data
 */
export function compareGearItems(items: GearItem[]): {
  specs: Map<string, Map<string, string>>
  priceComparison: Array<{ id: string; name: string; pricePerDay: number; pricePerWeek: number }>
  availability: Map<string, boolean>
  categories: Map<string, string>
} {
  // Collect all unique spec keys
  const allSpecKeys = new Set<string>()
  items.forEach((item) => {
    Object.keys(item.specs).forEach((key) => allSpecKeys.add(key))
  })

  // Build specs comparison matrix
  const specs = new Map<string, Map<string, string>>()
  allSpecKeys.forEach((specKey) => {
    const specValues = new Map<string, string>()
    items.forEach((item) => {
      specValues.set(item.id, item.specs[specKey] || "N/A")
    })
    specs.set(specKey, specValues)
  })

  // Price comparison
  const priceComparison = items.map((item) => ({
    id: item.id,
    name: item.name,
    pricePerDay: item.pricePerDay,
    pricePerWeek: item.pricePerWeek,
  }))

  // Availability
  const availability = new Map<string, boolean>()
  items.forEach((item) => {
    availability.set(item.id, item.available)
  })

  // Categories
  const categories = new Map<string, string>()
  items.forEach((item) => {
    categories.set(item.id, item.category)
  })

  return {
    specs,
    priceComparison,
    availability,
    categories,
  }
}

/**
 * Get value proposition for each item (which is best in what category)
 */
export function getValuePropositions(items: GearItem[]): Map<string, string[]> {
  const propositions = new Map<string, string[]>()

  if (items.length === 0) return propositions

  // Find cheapest per day
  const cheapestPerDay = items.reduce((min, item) => (item.pricePerDay < min.pricePerDay ? item : min))
  const props = propositions.get(cheapestPerDay.id) || []
  props.push("Most affordable (daily rate)")
  propositions.set(cheapestPerDay.id, props)

  // Find best value per week
  const bestWeeklyValue = items.reduce((min, item) => {
    const dailyFromWeekly = item.pricePerWeek / 7
    const minDailyFromWeekly = min.pricePerWeek / 7
    return dailyFromWeekly < minDailyFromWeekly ? item : min
  })
  const weeklyProps = propositions.get(bestWeeklyValue.id) || []
  weeklyProps.push("Best weekly value")
  propositions.set(bestWeeklyValue.id, weeklyProps)

  // Find featured items
  items.forEach((item) => {
    if (item.featured) {
      const featuredProps = propositions.get(item.id) || []
      featuredProps.push("Featured equipment")
      propositions.set(item.id, featuredProps)
    }
  })

  // Find available items
  const availableItems = items.filter((item) => item.available)
  if (availableItems.length === 1) {
    const availableProps = propositions.get(availableItems[0].id) || []
    availableProps.push("Currently available")
    propositions.set(availableItems[0].id, availableProps)
  }

  return propositions
}
