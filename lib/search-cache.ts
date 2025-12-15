/**
 * Advanced search and filtering optimization
 * Provides caching and deduplication for search results
 */

import type { GearItem } from "./gear-data"

export type SearchMetrics = {
  query: string
  resultsCount: number
  executionTime: number
  timestamp: number
  filters: {
    category?: string
    minPrice?: number
    maxPrice?: number
    availability?: boolean
  }
}

const SEARCH_CACHE_KEY = "searchCache"
const SEARCH_METRICS_KEY = "searchMetrics"
const CACHE_DURATION_MS = 5 * 60 * 1000 // 5 minutes
const MAX_CACHE_ENTRIES = 20
const MAX_METRICS = 100

/**
 * Get cached search results
 */
export function getCachedResults(query: string, filters: any): GearItem[] | null {
  if (typeof window === "undefined") return null
  
  try {
    const cached = localStorage.getItem(SEARCH_CACHE_KEY)
    if (!cached) return null

    const cacheMap = JSON.parse(cached) as Record<string, { results: GearItem[]; timestamp: number }>
    const cacheKey = generateCacheKey(query, filters)
    const entry = cacheMap[cacheKey]

    if (entry && Date.now() - entry.timestamp < CACHE_DURATION_MS) {
      return entry.results
    }

    // Clean up expired entries
    Object.keys(cacheMap).forEach(key => {
      if (Date.now() - cacheMap[key].timestamp > CACHE_DURATION_MS) {
        delete cacheMap[key]
      }
    })

    localStorage.setItem(SEARCH_CACHE_KEY, JSON.stringify(cacheMap))
    return null
  } catch {
    return null
  }
}

/**
 * Cache search results
 */
export function cacheResults(query: string, filters: any, results: GearItem[]): void {
  try {
    const cacheMap = (() => {
      try {
        return JSON.parse(localStorage.getItem(SEARCH_CACHE_KEY) || "{}")
      } catch {
        return {}
      }
    })()

    // Limit cache size
    const keys = Object.keys(cacheMap)
    if (keys.length >= MAX_CACHE_ENTRIES) {
      // Remove oldest entry
      const oldestKey = keys.reduce((oldest, current) =>
        cacheMap[current].timestamp < cacheMap[oldest].timestamp ? current : oldest
      )
      delete cacheMap[oldestKey]
    }

    const cacheKey = generateCacheKey(query, filters)
    cacheMap[cacheKey] = { results, timestamp: Date.now() }
    localStorage.setItem(SEARCH_CACHE_KEY, JSON.stringify(cacheMap))
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to cache results", error)
    }
  }
}

/**
 * Record search metrics for analytics
 */
export function recordSearchMetric(metric: SearchMetrics): void {
  try {
    const metrics = (() => {
      try {
        return JSON.parse(localStorage.getItem(SEARCH_METRICS_KEY) || "[]")
      } catch {
        return []
      }
    })()

    metrics.push(metric)

    // Keep only recent metrics
    if (metrics.length > MAX_METRICS) {
      metrics.shift()
    }

    localStorage.setItem(SEARCH_METRICS_KEY, JSON.stringify(metrics))
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to record search metric", error)
    }
  }
}

/**
 * Get search analytics
 */
export function getSearchAnalytics() {
  try {
    const metrics = JSON.parse(localStorage.getItem(SEARCH_METRICS_KEY) || "[]") as SearchMetrics[]
    
    return {
      totalSearches: metrics.length,
      averageResultsPerSearch: metrics.length > 0 
        ? metrics.reduce((sum, m) => sum + m.resultsCount, 0) / metrics.length 
        : 0,
      averageExecutionTime: metrics.length > 0 
        ? metrics.reduce((sum, m) => sum + m.executionTime, 0) / metrics.length 
        : 0,
      topQueries: getTopQueries(metrics),
      topFilters: getTopFilters(metrics),
    }
  } catch {
    return {
      totalSearches: 0,
      averageResultsPerSearch: 0,
      averageExecutionTime: 0,
      topQueries: [],
      topFilters: [],
    }
  }
}

/**
 * Clear search cache and metrics
 */
export function clearSearchData(): void {
  try {
    localStorage.removeItem(SEARCH_CACHE_KEY)
    localStorage.removeItem(SEARCH_METRICS_KEY)
  } catch (error) {
    console.warn("Failed to clear search data", error)
  }
}

/**
 * Helper: Generate cache key from query and filters
 */
function generateCacheKey(query: string, filters: any): string {
  const filterStr = Object.entries(filters || {})
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}:${value}`)
    .join("|")
  return `${query}:${filterStr}`
}

/**
 * Helper: Get top search queries
 */
function getTopQueries(metrics: SearchMetrics[]): string[] {
  const queryCount = new Map<string, number>()
  
  metrics.forEach(m => {
    queryCount.set(m.query, (queryCount.get(m.query) || 0) + 1)
  })

  return Array.from(queryCount.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([query]) => query)
}

/**
 * Helper: Get top used filters
 */
function getTopFilters(metrics: SearchMetrics[]) {
  const filterCount = new Map<string, number>()
  
  metrics.forEach(m => {
    Object.entries(m.filters).forEach(([key, value]) => {
      if (value !== undefined) {
        const filterStr = `${key}:${value}`
        filterCount.set(filterStr, (filterCount.get(filterStr) || 0) + 1)
      }
    })
  })

  return Array.from(filterCount.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([filter]) => filter)
}
