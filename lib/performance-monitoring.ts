/**
 * Performance Monitoring and Optimization Utilities
 * Monitors Core Web Vitals and page performance
 */

export interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  cls?: number // Cumulative Layout Shift
  fid?: number // First Input Delay
  ttfb?: number // Time to First Byte
  tti?: number // Time to Interactive
}

let metrics: PerformanceMetrics = {}

/**
 * Initialize Web Vitals monitoring
 */
export function initializeWebVitalsMonitoring() {
  if (typeof window === 'undefined') return

  // Monitor Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        metrics.lcp = lastEntry.renderTime || lastEntry.loadTime
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Monitor Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
            metrics.cls = clsValue
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Monitor First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const firstEntry = entries[0] as any
        metrics.fid = firstEntry.processingDuration
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch (e) {
      console.warn('Web Vitals monitoring failed:', e)
    }
  }

  // Monitor Navigation Timing
  if ('performance' in window && (window.performance as any).timing) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = (window.performance as any).timing
        metrics.ttfb = timing.responseStart - timing.navigationStart
        metrics.tti = timing.loadEventEnd - timing.navigationStart
        metrics.fcp = getFirstContentfulPaint()

        // Send metrics to analytics if available
        if ((window as any).gtag) {
          Object.entries(metrics).forEach(([key, value]) => {
            if (value) {
              (window as any).gtag('event', 'page_view', {
                [`metric_${key}`]: Math.round(value as number),
              })
            }
          })
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('Performance Metrics:', metrics)
        }
      }, 0)
    })
  }
}

/**
 * Get First Contentful Paint
 */
function getFirstContentfulPaint(): number | undefined {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return undefined
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          return entry.startTime
        }
      }
    })
    observer.observe({ entryTypes: ['paint'] })
  } catch {
    return undefined
  }
}

/**
 * Log performance metrics
 */
export function logPerformanceMetrics(label: string, value: number) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${label}]: ${value.toFixed(2)}ms`)
  }
}

/**
 * Measure function execution time
 */
export function measurePerformance<T>(
  label: string,
  fn: () => T
): T {
  const start = performance.now()
  const result = fn()
  const duration = performance.now() - start
  logPerformanceMetrics(label, duration)
  return result
}

/**
 * Async version of performance measurement
 */
export async function measureAsyncPerformance<T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now()
  const result = await fn()
  const duration = performance.now() - start
  logPerformanceMetrics(label, duration)
  return result
}

/**
 * Get current performance metrics
 */
export function getMetrics(): PerformanceMetrics {
  return { ...metrics }
}

/**
 * Image optimization helper
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  priority = false
) {
  return {
    src,
    alt,
    priority,
    loading: priority ? 'eager' as const : 'lazy' as const,
    decoding: 'async' as const,
  }
}

/**
 * Debounce with performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle with performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Request Idle Callback polyfill with timeout
 */
export function scheduleIdleTask(
  callback: () => void,
  timeout = 2000
) {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, timeout)
  }
}
