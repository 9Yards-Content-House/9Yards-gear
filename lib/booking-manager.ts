/**
 * Advanced booking management system
 * Handles bookings, reservations, and conflict detection
 */

export type Booking = {
  id: string
  customerId: string
  customerEmail: string
  customerPhone: string
  customerName: string
  items: {
    gearId: string
    gearName: string
    quantity: number
    pricePerDay: number
  }[]
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  totalAmount: number
  depositAmount: number
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  paymentTx?: string
  createdAt: number
  updatedAt: number
  notes?: string
  estimatedPickupTime?: string
  estimatedReturnTime?: string
}

const BOOKINGS_KEY = "bookings"
const BOOKING_CONFLICTS_KEY = "bookingConflicts"

/**
 * Create a new booking
 */
export function createBooking(booking: Omit<Booking, "id" | "createdAt" | "updatedAt">): Booking {
  const newBooking: Booking = {
    ...booking,
    id: `book_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  try {
    const bookings = getAllBookings()
    bookings.push(newBooking)
    saveBookings(bookings)
  } catch (error) {
    console.warn("Failed to create booking", error)
  }

  return newBooking
}

/**
 * Get all bookings
 */
export function getAllBookings(): Booking[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(BOOKINGS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Get booking by ID
 */
export function getBooking(id: string): Booking | undefined {
  return getAllBookings().find(b => b.id === id)
}

/**
 * Get bookings for customer
 */
export function getCustomerBookings(customerId: string): Booking[] {
  return getAllBookings().filter(b => b.customerId === customerId)
}

/**
 * Get bookings for gear item
 */
export function getGearBookings(gearId: string): Booking[] {
  return getAllBookings()
    .filter(b => b.items.some(item => item.gearId === gearId))
    .filter(b => ["pending", "confirmed", "in_progress"].includes(b.status))
}

/**
 * Check for booking conflicts
 */
export function checkBookingConflict(
  gearId: string,
  startDate: string,
  endDate: string,
  excludeBookingId?: string
): Booking[] {
  const bookings = getGearBookings(gearId)
  const conflicts: Booking[] = []

  const newStart = new Date(startDate)
  const newEnd = new Date(endDate)

  bookings.forEach(booking => {
    if (excludeBookingId && booking.id === excludeBookingId) return

    const existingStart = new Date(booking.startDate)
    const existingEnd = new Date(booking.endDate)

    // Check for overlap
    if (newStart <= existingEnd && newEnd >= existingStart) {
      conflicts.push(booking)
    }
  })

  return conflicts
}

/**
 * Update booking status
 */
export function updateBookingStatus(
  id: string,
  status: Booking["status"],
  updates?: Partial<Booking>
): Booking | null {
  try {
    const bookings = getAllBookings()
    const index = bookings.findIndex(b => b.id === id)

    if (index === -1) return null

    bookings[index] = {
      ...bookings[index],
      ...updates,
      status,
      updatedAt: Date.now(),
    }

    saveBookings(bookings)
    return bookings[index]
  } catch (error) {
    console.warn("Failed to update booking status", error)
    return null
  }
}

/**
 * Cancel booking
 */
export function cancelBooking(id: string, reason?: string): boolean {
  const booking = updateBookingStatus(id, "cancelled", { notes: reason })
  return booking !== null
}

/**
 * Get booking statistics
 */
export function getBookingStats() {
  try {
    const bookings = getAllBookings()

    return {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === "pending").length,
      confirmedBookings: bookings.filter(b => b.status === "confirmed").length,
      completedBookings: bookings.filter(b => b.status === "completed").length,
      cancelledBookings: bookings.filter(b => b.status === "cancelled").length,
      totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
      averageBookingValue: bookings.length > 0 ? bookings.reduce((sum, b) => sum + b.totalAmount, 0) / bookings.length : 0,
      upcomingBookings: bookings.filter(b => {
        const startDate = new Date(b.startDate)
        return startDate > new Date() && ["pending", "confirmed"].includes(b.status)
      }).length,
    }
  } catch {
    return {
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
      totalRevenue: 0,
      averageBookingValue: 0,
      upcomingBookings: 0,
    }
  }
}

/**
 * Export bookings to CSV format
 */
export function exportBookingsToCSV(): string {
  const bookings = getAllBookings()
  const headers = ["Booking ID", "Customer", "Email", "Phone", "Start Date", "End Date", "Total Amount", "Status", "Created At"]
  
  const rows = bookings.map(b => [
    b.id,
    b.customerName,
    b.customerEmail,
    b.customerPhone,
    b.startDate,
    b.endDate,
    b.totalAmount,
    b.status,
    new Date(b.createdAt).toISOString(),
  ])

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n")

  return csv
}

/**
 * Get booking availability calendar
 */
export function getAvailabilityCalendar(gearId: string, month: Date): Map<string, "available" | "booked"> {
  const bookings = getGearBookings(gearId)
  const calendar = new Map<string, "available" | "booked">()

  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)

  for (let date = new Date(startOfMonth); date <= endOfMonth; date.setDate(date.getDate() + 1)) {
    const dateStr = date.toISOString().split("T")[0]
    calendar.set(dateStr, "available")
  }

  bookings.forEach(booking => {
    const start = new Date(booking.startDate)
    const end = new Date(booking.endDate)

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split("T")[0]
      if (calendar.has(dateStr)) {
        calendar.set(dateStr, "booked")
      }
    }
  })

  return calendar
}

/**
 * Helper: Save bookings to localStorage
 */
function saveBookings(bookings: Booking[]): void {
  try {
    // Keep only last 5000 bookings
    const recentBookings = bookings.slice(-5000)
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(recentBookings))
  } catch (error) {
    console.warn("Failed to save bookings", error)
  }
}

/**
 * Clear all booking data (careful!)
 */
export function clearAllBookings(): void {
  try {
    localStorage.removeItem(BOOKINGS_KEY)
    localStorage.removeItem(BOOKING_CONFLICTS_KEY)
  } catch (error) {
    console.warn("Failed to clear bookings", error)
  }
}
