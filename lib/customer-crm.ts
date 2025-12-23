/**
 * Premium customer relationship management (CRM)
 * Tracks customer behavior, preferences, and loyalty
 * Integrated with Airtable for centralized management
 */

import {
  getOrCreateCustomer as getOrCreateAirtableCustomer,
  getCustomerByEmail as getAirtableCustomerByEmail,
  updateCustomerStats as updateAirtableCustomerStats,
  getAllCustomersFromAirtable,
  getBookingsByEmail,
  type Customer,
} from "./airtable"

// Re-export types
export type { Customer }

export type CustomerActivity = {
  customerId: string
  action: "view" | "add_to_cart" | "remove_from_cart" | "payment" | "booking"
  itemId?: string
  itemName?: string
  amount?: number
  timestamp: number
  sessionId: string
}

const ACTIVITIES_KEY = "customerActivities"
const MAX_ACTIVITIES = 1000

/**
 * Get or create customer profile in Airtable
 */
export async function getOrCreateCustomer(email: string, phone: string, name: string): Promise<Customer | null> {
  try {
    return await getOrCreateAirtableCustomer(email, phone, name)
  } catch (error) {
    console.error("Failed to get/create customer:", error)
    return null
  }
}

/**
 * Get customer by email
 */
export async function getCustomerByEmail(email: string): Promise<Customer | undefined> {
  try {
    return await getAirtableCustomerByEmail(email)
  } catch (error) {
    console.error("Failed to get customer:", error)
    return undefined
  }
}

/**
 * Record customer activity (stored in localStorage for session tracking)
 * For persistent tracking, use updateCustomerStats in Airtable
 */
export function recordActivity(activity: CustomerActivity): void {
  if (typeof window === "undefined") return
  
  try {
    const activities = (() => {
      try {
        return JSON.parse(localStorage.getItem(ACTIVITIES_KEY) || "[]")
      } catch {
        return []
      }
    })()

    activities.push(activity)

    // Keep size bounded
    if (activities.length > MAX_ACTIVITIES) {
      activities.splice(0, activities.length - MAX_ACTIVITIES)
    }

    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities))
  } catch (error) {
    console.warn("Failed to record activity", error)
  }
}

/**
 * Get customer activity from session (localStorage)
 */
export function getSessionActivity(customerId: string, limit: number = 50): CustomerActivity[] {
  if (typeof window === "undefined") return []
  
  try {
    const activities = (() => {
      try {
        return JSON.parse(localStorage.getItem(ACTIVITIES_KEY) || "[]")
      } catch {
        return []
      }
    })() as CustomerActivity[]

    return activities
      .filter(a => a.customerId === customerId)
      .slice(-limit)
  } catch {
    return []
  }
}

/**
 * Update customer preferences based on category
 */
export async function updateCustomerPreferences(email: string, category: string): Promise<boolean> {
  try {
    return await updateAirtableCustomerStats(email, 0, category)
  } catch (error) {
    console.error("Failed to update customer preferences:", error)
    return false
  }
}

/**
 * Update customer lifetime value after a booking
 */
export async function updateCustomerLTV(email: string, amount: number, category?: string): Promise<boolean> {
  try {
    return await updateAirtableCustomerStats(email, amount, category)
  } catch (error) {
    console.error("Failed to update customer LTV:", error)
    return false
  }
}

/**
 * Get customer insights combining Airtable data and session activity
 */
export async function getCustomerInsights(email: string) {
  try {
    const customer = await getAirtableCustomerByEmail(email)
    if (!customer) return null

    const bookings = await getBookingsByEmail(email)
    const sessionActivities = getSessionActivity(customer.customer_id, 100)

    const viewEvents = sessionActivities.filter(a => a.action === "view").length
    const cartEvents = sessionActivities.filter(a => a.action === "add_to_cart").length
    const paymentEvents = bookings.filter(b => b.status === "completed").length
    const conversionRate = viewEvents > 0 ? (paymentEvents / viewEvents) * 100 : 0

    // Calculate days since last booking
    const lastBookingDate = bookings.length > 0 
      ? new Date(bookings[0].created_at) 
      : customer.first_booking 
        ? new Date(customer.first_booking) 
        : new Date()

    return {
      customer,
      bookings,
      metrics: {
        viewCount: viewEvents,
        cartAddCount: cartEvents,
        paymentCount: paymentEvents,
        conversionRate,
        avgOrderValue: paymentEvents > 0 ? customer.total_spent / paymentEvents : 0,
        daysSinceLastVisit: Math.floor((Date.now() - lastBookingDate.getTime()) / (1000 * 60 * 60 * 24)),
      },
    }
  } catch (error) {
    console.error("Failed to get customer insights:", error)
    return null
  }
}

/**
 * Get top customers by spending (from Airtable)
 */
export async function getTopCustomers(limit: number = 10): Promise<Customer[]> {
  try {
    const customers = await getAllCustomersFromAirtable()
    return customers.slice(0, limit)
  } catch {
    return []
  }
}

/**
 * Get all customers (from Airtable)
 */
export async function getAllCustomers(): Promise<Customer[]> {
  try {
    return await getAllCustomersFromAirtable()
  } catch {
    return []
  }
}

/**
 * Get customer cohort analytics
 */
export async function getCohortAnalytics() {
  try {
    const customers = await getAllCustomersFromAirtable()
    const cohorts = new Map<string, { count: number; totalSpent: number; avgSpent: number }>()

    customers.forEach(customer => {
      const firstBooking = customer.first_booking ? new Date(customer.first_booking) : new Date()
      const daysSinceFirstVisit = Math.floor((Date.now() - firstBooking.getTime()) / (1000 * 60 * 60 * 24))
      
      // Group into cohort buckets
      let cohortKey: string
      if (daysSinceFirstVisit < 7) cohortKey = "0-7 days"
      else if (daysSinceFirstVisit < 30) cohortKey = "7-30 days"
      else if (daysSinceFirstVisit < 90) cohortKey = "30-90 days"
      else cohortKey = "90+ days"

      const cohort = cohorts.get(cohortKey) || { count: 0, totalSpent: 0, avgSpent: 0 }
      cohort.count += 1
      cohort.totalSpent += customer.total_spent
      cohort.avgSpent = cohort.totalSpent / cohort.count
      cohorts.set(cohortKey, cohort)
    })

    return Object.fromEntries(cohorts)
  } catch {
    return {}
  }
}

/**
 * Clear session activity data
 */
export function clearSessionActivity(): void {
  if (typeof window === "undefined") return
  
  try {
    localStorage.removeItem(ACTIVITIES_KEY)
  } catch (error) {
    console.warn("Failed to clear session activity", error)
  }
}

/**
 * DEPRECATED: Customer data is now in Airtable
 */
export function clearAllCustomerData(): void {
  console.warn("clearAllCustomerData is deprecated. Manage customers directly in Airtable.")
  clearSessionActivity()
}
