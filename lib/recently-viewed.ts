// Recently viewed items tracking
export type RecentlyViewedItem = {
  id: string
  viewedAt: number
}

const STORAGE_KEY = "recentlyViewed"
const MAX_RECENT_ITEMS = 10

/**
 * Get recently viewed items
 */
export function getRecentlyViewed(): RecentlyViewedItem[] {
  if (typeof window === "undefined") return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Add item to recently viewed
 */
export function addToRecentlyViewed(itemId: string): void {
  const items = getRecentlyViewed()
  
  // Remove if already exists
  const filtered = items.filter((item) => item.id !== itemId)
  
  // Add to beginning
  filtered.unshift({
    id: itemId,
    viewedAt: Date.now(),
  })
  
  // Keep only max items
  const trimmed = filtered.slice(0, MAX_RECENT_ITEMS)
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  window.dispatchEvent(new CustomEvent("recentlyViewedUpdated"))
}

/**
 * Clear recently viewed
 */
export function clearRecentlyViewed(): void {
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new CustomEvent("recentlyViewedUpdated"))
}

/**
 * Get recently viewed gear IDs
 */
export function getRecentlyViewedIds(): string[] {
  return getRecentlyViewed().map((item) => item.id)
}
