/**
 * Application monitoring, error tracking, and health checks
 * Comprehensive diagnostics for platform reliability
 */

export type ErrorLog = {
  id: string
  timestamp: number
  message: string
  stack?: string
  context?: {
    url?: string
    userAgent?: string
    action?: string
  }
  severity: "info" | "warning" | "error" | "critical"
}

export type HealthCheck = {
  component: string
  status: "healthy" | "degraded" | "unhealthy"
  lastChecked: number
  message?: string
  details?: Record<string, any>
}

const ERROR_LOG_KEY = "errorLogs"
const HEALTH_CHECK_KEY = "healthChecks"
const MAX_ERROR_LOGS = 100

/**
 * Log an error
 */
export function logError(
  message: string,
  options?: {
    stack?: string
    context?: Record<string, any>
    severity?: ErrorLog["severity"]
  }
): ErrorLog {
  const error: ErrorLog = {
    id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    message,
    stack: options?.stack,
    context: {
      url: typeof window !== "undefined" ? window.location.href : undefined,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      ...options?.context,
    },
    severity: options?.severity || "error",
  }

  try {
    const logs = getAllErrorLogs()
    logs.push(error)
    if (logs.length > MAX_ERROR_LOGS) {
      logs.shift()
    }
    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(logs))
  } catch (e) {
    console.error("Failed to log error", e)
  }

  return error
}

/**
 * Get all error logs
 */
export function getAllErrorLogs(): ErrorLog[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(ERROR_LOG_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Get recent error logs
 */
export function getRecentErrors(limit: number = 10): ErrorLog[] {
  return getAllErrorLogs().slice(-limit)
}

/**
 * Clear error logs
 */
export function clearErrorLogs(): void {
  try {
    localStorage.removeItem(ERROR_LOG_KEY)
  } catch (error) {
    console.warn("Failed to clear error logs", error)
  }
}

/**
 * Record health check result
 */
export function recordHealthCheck(check: HealthCheck): void {
  try {
    const checks = getAllHealthChecks()
    const existingIndex = checks.findIndex(c => c.component === check.component)

    if (existingIndex >= 0) {
      checks[existingIndex] = check
    } else {
      checks.push(check)
    }

    localStorage.setItem(HEALTH_CHECK_KEY, JSON.stringify(checks))
  } catch (error) {
    console.warn("Failed to record health check", error)
  }
}

/**
 * Get all health checks
 */
export function getAllHealthChecks(): HealthCheck[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(HEALTH_CHECK_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Get system health status
 */
export function getSystemHealth(): {
  overall: "healthy" | "degraded" | "unhealthy"
  components: HealthCheck[]
  uptime?: number
} {
  const checks = getAllHealthChecks()
  
  const overall =
    checks.every(c => c.status === "healthy") ? "healthy" :
    checks.some(c => c.status === "unhealthy") ? "unhealthy" :
    "degraded"

  return {
    overall,
    components: checks,
  }
}

/**
 * Setup global error handler
 */
export function setupGlobalErrorHandler(): void {
  if (typeof window === "undefined") return

  window.addEventListener("error", (event) => {
    logError(event.message, {
      stack: event.error?.stack,
      context: {
        action: "global_error",
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
      severity: "error",
    })
  })

  window.addEventListener("unhandledrejection", (event) => {
    logError(String(event.reason), {
      context: {
        action: "unhandled_rejection",
      },
      severity: "error",
    })
  })
}

/**
 * Check localStorage availability
 */
export async function checkStorageHealth(): Promise<HealthCheck> {
  const startTime = performance.now()
  
  try {
    const testKey = `__storage_test_${Date.now()}`
    const testValue = "test"
    
    localStorage.setItem(testKey, testValue)
    const retrieved = localStorage.getItem(testKey)
    localStorage.removeItem(testKey)
    
    if (retrieved !== testValue) {
      throw new Error("Storage read/write mismatch")
    }

    const duration = performance.now() - startTime

    return {
      component: "localStorage",
      status: "healthy",
      lastChecked: Date.now(),
      details: {
        duration: `${duration.toFixed(2)}ms`,
      },
    }
  } catch (error) {
    return {
      component: "localStorage",
      status: "unhealthy",
      lastChecked: Date.now(),
      message: error instanceof Error ? error.message : "Storage check failed",
    }
  }
}

/**
 * Check network connectivity
 */
export async function checkNetworkHealth(): Promise<HealthCheck> {
  const startTime = performance.now()
  
  try {
    const response = await Promise.race([
      fetch("/manifest.json", { method: "HEAD" }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Network timeout")), 5000)
      ),
    ])

    const duration = performance.now() - startTime
    const status = response.ok ? "healthy" : "degraded"

    return {
      component: "network",
      status,
      lastChecked: Date.now(),
      message: `HTTP ${response.status}`,
      details: {
        duration: `${duration.toFixed(2)}ms`,
      },
    }
  } catch (error) {
    return {
      component: "network",
      status: "unhealthy",
      lastChecked: Date.now(),
      message: error instanceof Error ? error.message : "Network check failed",
    }
  }
}

/**
 * Run comprehensive system health check
 */
export async function runHealthCheck(): Promise<void> {
  const checks = await Promise.all([
    checkStorageHealth(),
    checkNetworkHealth(),
  ])

  checks.forEach(check => recordHealthCheck(check))
}

/**
 * Get performance metrics
 */
export function getPerformanceMetrics() {
  if (typeof window === "undefined" || !window.performance) {
    return null
  }

  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

  if (!navigation) return null

  return {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domInteractive: navigation.domInteractive - navigation.fetchStart,
    domComplete: navigation.domComplete - navigation.fetchStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
  }
}

/**
 * Export logs for debugging
 */
export function exportDiagnostics() {
  return {
    timestamp: new Date().toISOString(),
    errors: getRecentErrors(),
    health: getSystemHealth(),
    performance: getPerformanceMetrics(),
  }
}
