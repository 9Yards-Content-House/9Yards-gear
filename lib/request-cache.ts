/**
 * Request deduplication and caching for network optimization
 * Prevents duplicate simultaneous requests and caches responses
 */

type CacheEntry<T> = {
  data: T
  timestamp: number
  ttl: number
}

type PendingRequest<T> = {
  promise: Promise<T>
  resolve: (value: T) => void
  reject: (error: Error) => void
}

const REQUEST_CACHE = new Map<string, CacheEntry<any>>()
const PENDING_REQUESTS = new Map<string, PendingRequest<any>>()
const DEFAULT_CACHE_TTL = 60 * 1000 // 1 minute

/**
 * Make a deduplicated request with caching
 */
export async function deduplicatedRequest<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = DEFAULT_CACHE_TTL
): Promise<T> {
  // Check cache first
  const cached = REQUEST_CACHE.get(key)
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data as T
  }

  // Check if request is already pending
  if (PENDING_REQUESTS.has(key)) {
    return PENDING_REQUESTS.get(key)!.promise
  }

  // Create new request
  let resolve!: (value: T) => void
  let reject!: (error: Error) => void
  
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  PENDING_REQUESTS.set(key, { promise, resolve, reject })

  try {
    const data = await fetcher()
    
    // Cache the result
    REQUEST_CACHE.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })

    resolve(data)
    return data
  } catch (error) {
    reject(error instanceof Error ? error : new Error(String(error)))
    throw error
  } finally {
    PENDING_REQUESTS.delete(key)
  }
}

/**
 * Batch multiple requests with deduplication
 */
export async function batchRequests<T>(
  requests: Array<{ key: string; fetcher: () => Promise<T>; ttl?: number }>
): Promise<Map<string, T>> {
  const results = new Map<string, T>()

  await Promise.all(
    requests.map(async ({ key, fetcher, ttl }) => {
      try {
        const data = await deduplicatedRequest(key, fetcher, ttl)
        results.set(key, data)
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn(`Request ${key} failed:`, error)
        }
      }
    })
  )

  return results
}

/**
 * Invalidate cache entry
 */
export function invalidateCache(key: string): void {
  REQUEST_CACHE.delete(key)
}

/**
 * Clear all cache
 */
export function clearCache(): void {
  REQUEST_CACHE.clear()
}

/**
 * Get cache size
 */
export function getCacheSize(): number {
  return REQUEST_CACHE.size
}

/**
 * Get pending requests count
 */
export function getPendingRequestsCount(): number {
  return PENDING_REQUESTS.size
}

/**
 * Cache statistics for monitoring
 */
export function getCacheStats() {
  let totalCachedSize = 0
  let expiredEntries = 0

  REQUEST_CACHE.forEach((entry) => {
    if (Date.now() - entry.timestamp > entry.ttl) {
      expiredEntries++
    } else {
      totalCachedSize += JSON.stringify(entry.data).length
    }
  })

  return {
    cachedEntries: REQUEST_CACHE.size,
    expiredEntries,
    totalCachedSize,
    pendingRequests: PENDING_REQUESTS.size,
    averageCacheSize: REQUEST_CACHE.size > 0 ? totalCachedSize / REQUEST_CACHE.size : 0,
  }
}

/**
 * Cleanup expired cache entries
 */
export function cleanupExpiredCache(): void {
  const now = Date.now()
  
  REQUEST_CACHE.forEach((entry, key) => {
    if (now - entry.timestamp > entry.ttl) {
      REQUEST_CACHE.delete(key)
    }
  })
}

/**
 * Setup automatic cache cleanup
 */
export function setupAutoCacheCleanup(intervalMs: number = 5 * 60 * 1000): () => void {
  const interval = setInterval(cleanupExpiredCache, intervalMs)
  
  // Return cleanup function
  return () => clearInterval(interval)
}
