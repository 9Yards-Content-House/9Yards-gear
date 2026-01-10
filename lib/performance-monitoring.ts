/**
 * Performance Monitoring and Optimization Utilities
 * Monitors Core Web Vitals and page performance for production
 */

export interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  cls?: number // Cumulative Layout Shift
  fid?: number // First Input Delay
  inp?: number // Interaction to Next Paint (new metric)
  ttfb?: number // Time to First Byte
  tti?: number // Time to Interactive
}

export interface WebVitalThresholds {
  good: number
  needsImprovement: number
}

// Core Web Vitals thresholds (in ms, except CLS which is unitless)
const THRESHOLDS: Record<keyof PerformanceMetrics, WebVitalThresholds> = {
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  fcp: { good: 1800, needsImprovement: 3000 },
  ttfb: { good: 800, needsImprovement: 1800 },
  inp: { good: 200, needsImprovement: 500 },
  tti: { good: 3800, needsImprovement: 7300 },
}

let metrics: PerformanceMetrics = {}
let observersInitialized = false

/**
 * Get rating for a metric value
 */
function getRating(metric: keyof PerformanceMetrics, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metric]
  if (!threshold) return 'good'
  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

/**
 * Send metric to Google Analytics 4
 */
function sendToAnalytics(name: string, value: number, rating: string) {
  if (typeof window === 'undefined') return
  
  const gtag = (window as any).gtag
  if (gtag) {
    gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: rating,
      value: Math.round(name === 'CLS' ? value * 1000 : value), // CLS needs scaling
      non_interaction: true,
    })
  }
}

/**
 * Initialize Web Vitals monitoring
 */
export function initializeWebVitalsMonitoring() {
  if (typeof window === 'undefined' || observersInitialized) return
  observersInitialized = true

  if (!('PerformanceObserver' in window)) {
    console.warn('PerformanceObserver not supported')
    return
  }

  try {
    // Monitor Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      const value = lastEntry.renderTime || lastEntry.loadTime
      metrics.lcp = value
      sendToAnalytics('LCP', value, getRating('lcp', value))
    })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0
    let clsEntries: any[] = []
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsEntries.push(entry)
          clsValue += (entry as any).value
          metrics.cls = clsValue
        }
      }
    })
    clsObserver.observe({ type: 'layout-shift', buffered: true })

    // Monitor First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const firstEntry = entries[0] as any
      const value = firstEntry.processingStart - firstEntry.startTime
      metrics.fid = value
      sendToAnalytics('FID', value, getRating('fid', value))
    })
    fidObserver.observe({ type: 'first-input', buffered: true })

    // Monitor Interaction to Next Paint (INP) - new metric replacing FID
    const inpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const value = (entry as any).duration
        if (!metrics.inp || value > metrics.inp) {
          metrics.inp = value
        }
      }
    })
    // Use type assertion for newer PerformanceObserver options
    inpObserver.observe({ type: 'event', buffered: true } as PerformanceObserverInit)

    // Monitor First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          const value = entry.startTime
          metrics.fcp = value
          sendToAnalytics('FCP', value, getRating('fcp', value))
        }
      }
    })
    fcpObserver.observe({ type: 'paint', buffered: true })

    // Send final metrics on page hide
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // Send final CLS
        if (metrics.cls !== undefined) {
          sendToAnalytics('CLS', metrics.cls, getRating('cls', metrics.cls))
        }
        // Send final INP
        if (metrics.inp !== undefined) {
          sendToAnalytics('INP', metrics.inp, getRating('inp', metrics.inp))
        }
      }
    })

  } catch (e) {
    console.warn('Web Vitals monitoring failed:', e)
  }

  // Monitor Navigation Timing for TTFB
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          metrics.ttfb = navigation.responseStart - navigation.requestStart
          sendToAnalytics('TTFB', metrics.ttfb, getRating('ttfb', metrics.ttfb))
        }

        if (process.env.NODE_ENV === 'development') {
          console.group('📊 Performance Metrics')
          Object.entries(metrics).forEach(([key, value]) => {
            const rating = getRating(key as keyof PerformanceMetrics, value as number)
            const icon = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌'
            console.log(`${icon} ${key.toUpperCase()}: ${value?.toFixed(2)}${key === 'cls' ? '' : 'ms'} (${rating})`)
          })
          console.groupEnd()
        }
      }, 0)
    })
  }
}

/**
 * Log performance metrics
 */
export function logPerformanceMetrics(label: string, value: number) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`⏱️ [${label}]: ${value.toFixed(2)}ms`)
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
  let timeout: ReturnType<typeof setTimeout> | null = null

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
  let inThrottle = false
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
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, Math.min(timeout, 50))
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: 'image' | 'script' | 'style' | 'font') {
  if (typeof document === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (as === 'font') {
    link.crossOrigin = 'anonymous'
  }
  document.head.appendChild(link)
}

/**
 * Prefetch a page for faster navigation
 */
export function prefetchPage(href: string) {
  if (typeof document === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  document.head.appendChild(link)
}
