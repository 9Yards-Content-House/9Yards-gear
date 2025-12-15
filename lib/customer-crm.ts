/**
 * Premium customer relationship management (CRM)
 * Tracks customer behavior, preferences, and loyalty
 */

export type Customer = {
  id: string
  email: string
  phone: string
  name: string
  firstVisit: number
  lastVisit: number
  visitCount: number
  totalSpent: number
  favoriteCategories: string[]
  preferredPaymentMethod?: string
  notes?: string
}

export type CustomerActivity = {
  customerId: string
  action: "view" | "add_to_cart" | "remove_from_cart" | "payment" | "booking"
  itemId?: string
  itemName?: string
  amount?: number
  timestamp: number
  sessionId: string
}

const CUSTOMERS_KEY = "customers"
const ACTIVITIES_KEY = "customerActivities"
const MAX_ACTIVITIES = 1000

/**
 * Get or create customer profile
 */
export function getOrCreateCustomer(email: string, phone: string, name: string): Customer {
  try {
    const customers = getAllCustomers()
    let customer = customers.find(c => c.email === email)

    if (!customer) {
      customer = {
        id: `cust_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        phone,
        name,
        firstVisit: Date.now(),
        lastVisit: Date.now(),
        visitCount: 1,
        totalSpent: 0,
        favoriteCategories: [],
      }
      customers.push(customer)
      saveCustomers(customers)
    } else {
      customer.lastVisit = Date.now()
      customer.visitCount += 1
      saveCustomers(customers)
    }

    return customer
  } catch (error) {
    console.warn("Failed to get/create customer", error)
    return {
      id: `cust_temp_${Date.now()}`,
      email,
      phone,
      name,
      firstVisit: Date.now(),
      lastVisit: Date.now(),
      visitCount: 1,
      totalSpent: 0,
      favoriteCategories: [],
    }
  }
}

/**
 * Get all customers
 */
function getAllCustomers(): Customer[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(CUSTOMERS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Save customers to localStorage
 */
function saveCustomers(customers: Customer[]): void {
  try {
    // Keep only last 1000 customers
    const recentCustomers = customers.slice(-1000)
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(recentCustomers))
  } catch (error) {
    console.warn("Failed to save customers", error)
  }
}

/**
 * Record customer activity
 */
export function recordActivity(activity: CustomerActivity): void {
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
 * Get customer activity
 */
export function getCustomerActivity(customerId: string, limit: number = 50): CustomerActivity[] {
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
 * Update customer preferences based on viewing history
 */
export function updateCustomerPreferences(customerId: string, category: string): void {
  try {
    const customers = getAllCustomers()
    const customer = customers.find(c => c.id === customerId)

    if (customer) {
      if (!customer.favoriteCategories.includes(category)) {
        customer.favoriteCategories.push(category)
      }
      // Keep top 5 categories
      if (customer.favoriteCategories.length > 5) {
        // This is simplified - in production, you'd track frequency
        customer.favoriteCategories = customer.favoriteCategories.slice(-5)
      }
      saveCustomers(customers)
    }
  } catch (error) {
    console.warn("Failed to update customer preferences", error)
  }
}

/**
 * Update customer lifetime value
 */
export function updateCustomerLTV(customerId: string, amount: number): void {
  try {
    const customers = getAllCustomers()
    const customer = customers.find(c => c.id === customerId)

    if (customer) {
      customer.totalSpent += amount
      saveCustomers(customers)
    }
  } catch (error) {
    console.warn("Failed to update customer LTV", error)
  }
}

/**
 * Get customer insights
 */
export function getCustomerInsights(customerId: string) {
  try {
    const customers = getAllCustomers()
    const customer = customers.find(c => c.id === customerId)
    const activities = getCustomerActivity(customerId, 100)

    if (!customer) {
      return null
    }

    const viewEvents = activities.filter(a => a.action === "view").length
    const cartEvents = activities.filter(a => a.action === "add_to_cart").length
    const paymentEvents = activities.filter(a => a.action === "payment").length
    const conversionRate = viewEvents > 0 ? (paymentEvents / viewEvents) * 100 : 0

    return {
      customer,
      metrics: {
        viewCount: viewEvents,
        cartAddCount: cartEvents,
        paymentCount: paymentEvents,
        conversionRate,
        avgOrderValue: paymentEvents > 0 ? customer.totalSpent / paymentEvents : 0,
        daysSinceLastVisit: Math.floor((Date.now() - customer.lastVisit) / (1000 * 60 * 60 * 24)),
      },
    }
  } catch (error) {
    console.warn("Failed to get customer insights", error)
    return null
  }
}

/**
 * Get top customers by spending
 */
export function getTopCustomers(limit: number = 10) {
  try {
    const customers = getAllCustomers()
    return customers
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, limit)
  } catch {
    return []
  }
}

/**
 * Get customer cohort analytics
 */
export function getCohortAnalytics() {
  try {
    const customers = getAllCustomers()
    const cohorts = new Map<string, { count: number; totalSpent: number; avgSpent: number }>()

    customers.forEach(customer => {
      const daysSinceFistVisit = Math.floor((Date.now() - customer.firstVisit) / (1000 * 60 * 60 * 24))
      const cohortKey = `${daysSinceFistVisit}d`

      const cohort = cohorts.get(cohortKey) || { count: 0, totalSpent: 0, avgSpent: 0 }
      cohort.count += 1
      cohort.totalSpent += customer.totalSpent
      cohort.avgSpent = cohort.totalSpent / cohort.count
      cohorts.set(cohortKey, cohort)
    })

    return Object.fromEntries(cohorts)
  } catch {
    return {}
  }
}

/**
 * Clear all customer data (privacy)
 */
export function clearAllCustomerData(): void {
  try {
    localStorage.removeItem(CUSTOMERS_KEY)
    localStorage.removeItem(ACTIVITIES_KEY)
  } catch (error) {
    console.warn("Failed to clear customer data", error)
  }
}
