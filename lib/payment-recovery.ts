/**
 * Payment recovery and retry system
 * Handles failed payment recovery with exponential backoff
 */

export type PaymentAttempt = {
  tx_ref: string
  amount: number
  timestamp: number
  customerEmail: string
  customerPhone: string
  customerName: string
  attempt: number
  lastError?: string
}

const PAYMENT_ATTEMPTS_KEY = "paymentAttempts"
const MAX_RETRY_ATTEMPTS = 3
const RETRY_DELAY_MS = 2000 // Start with 2 seconds

/**
 * Get all pending payment attempts
 */
export function getPendingPayments(): PaymentAttempt[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(PAYMENT_ATTEMPTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Store a payment attempt for recovery
 */
export function storePaymentAttempt(attempt: PaymentAttempt): void {
  try {
    const attempts = getPendingPayments()
    // Only keep attempts less than 24 hours old
    const validAttempts = attempts.filter(a => Date.now() - a.timestamp < 24 * 60 * 60 * 1000)
    validAttempts.push(attempt)
    localStorage.setItem(PAYMENT_ATTEMPTS_KEY, JSON.stringify(validAttempts))
  } catch (error) {
    console.warn("Failed to store payment attempt", error)
  }
}

/**
 * Remove a completed payment attempt
 */
export function removePaymentAttempt(tx_ref: string): void {
  try {
    const attempts = getPendingPayments().filter(a => a.tx_ref !== tx_ref)
    localStorage.setItem(PAYMENT_ATTEMPTS_KEY, JSON.stringify(attempts))
  } catch (error) {
    console.warn("Failed to remove payment attempt", error)
  }
}

/**
 * Calculate retry delay with exponential backoff
 */
export function getRetryDelay(attemptNumber: number): number {
  return RETRY_DELAY_MS * Math.pow(2, attemptNumber - 1)
}

/**
 * Check if a payment can be retried
 */
export function canRetryPayment(attempt: PaymentAttempt): boolean {
  if (attempt.attempt >= MAX_RETRY_ATTEMPTS) return false
  if (!attempt.customerEmail || !attempt.customerPhone) return false
  return true
}

/**
 * Get all retryable payments
 */
export function getRetryablePayments(): PaymentAttempt[] {
  return getPendingPayments().filter(canRetryPayment)
}

/**
 * Cleanup old payment attempts (>24 hours)
 */
export function cleanupOldPayments(): void {
  try {
    const attempts = getPendingPayments()
    const cutoffTime = Date.now() - 24 * 60 * 60 * 1000
    const validAttempts = attempts.filter(a => a.timestamp > cutoffTime)
    localStorage.setItem(PAYMENT_ATTEMPTS_KEY, JSON.stringify(validAttempts))
  } catch (error) {
    console.warn("Failed to cleanup old payments", error)
  }
}
