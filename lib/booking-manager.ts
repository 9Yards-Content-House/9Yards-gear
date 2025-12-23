/**
 * Advanced booking management system
 * Handles bookings, reservations, and conflict detection
 * Now integrated with Airtable for centralized management
 */

import {
  createBooking as createAirtableBooking,
  getBookingById as getAirtableBookingById,
  getBookingsByEmail,
  getBookingsByStatus,
  getAllBookingsFromAirtable,
  updateBookingStatus as updateAirtableBookingStatus,
  updateGearBookedDates,
  getOrCreateCustomer,
  updateCustomerStats,
  type Booking,
  type BookingItem,
} from "./airtable"

// Re-export types for backward compatibility
export type { Booking, BookingItem }

/**
 * Generate a unique booking ID
 */
function generateBookingId(): string {
  return `book_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Calculate deposit amount (50% of total)
 */
function calculateDeposit(totalAmount: number): number {
  return Math.round(totalAmount * 0.5)
}

/**
 * Create a new booking in Airtable
 */
export async function createBooking(
  bookingData: Omit<Booking, "id" | "airtableRecordId" | "booking_id" | "created_at" | "updated_at" | "deposit_amount">
): Promise<Booking | null> {
  const bookingId = generateBookingId()
  const depositAmount = calculateDeposit(bookingData.total_amount)

  // Create or get customer record
  await getOrCreateCustomer(
    bookingData.customer_email,
    bookingData.customer_phone,
    bookingData.customer_name
  )

  const booking = await createAirtableBooking({
    ...bookingData,
    booking_id: bookingId,
    deposit_amount: depositAmount,
  })

  if (booking) {
    // Update booked dates for each gear item
    for (const item of bookingData.gear_items) {
      const dates = getDateRange(bookingData.start_date, bookingData.end_date)
      // Note: This would need to merge with existing dates - simplified for now
      await updateGearBookedDates(item.gearId, dates)
    }
  }

  return booking
}

/**
 * Get all bookings (from Airtable)
 */
export async function getAllBookings(): Promise<Booking[]> {
  return getAllBookingsFromAirtable()
}

/**
 * Get booking by ID
 */
export async function getBooking(bookingId: string): Promise<Booking | undefined> {
  return getAirtableBookingById(bookingId)
}

/**
 * Get bookings for customer by email
 */
export async function getCustomerBookings(email: string): Promise<Booking[]> {
  return getBookingsByEmail(email)
}

/**
 * Get bookings for gear item
 */
export async function getGearBookings(gearId: string): Promise<Booking[]> {
  try {
    const allBookings = await getAllBookingsFromAirtable()
    return allBookings
      .filter(b => b.gear_items.some(item => item.gearId === gearId))
      .filter(b => ["pending", "confirmed", "in_progress"].includes(b.status))
  } catch (error) {
    console.error("Error fetching gear bookings:", error)
    return []
  }
}

/**
 * Check for booking conflicts
 */
export async function checkBookingConflict(
  gearId: string,
  startDate: string,
  endDate: string,
  excludeBookingId?: string
): Promise<Booking[]> {
  const bookings = await getGearBookings(gearId)
  const conflicts: Booking[] = []

  const newStart = new Date(startDate)
  const newEnd = new Date(endDate)

  bookings.forEach(booking => {
    if (excludeBookingId && booking.booking_id === excludeBookingId) return

    const existingStart = new Date(booking.start_date)
    const existingEnd = new Date(booking.end_date)

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
export async function updateBookingStatus(
  bookingId: string,
  status: Booking["status"],
  updates?: Partial<Pick<Booking, "payment_reference" | "notes">>
): Promise<Booking | null> {
  const booking = await updateAirtableBookingStatus(bookingId, status, updates)
  
  if (booking && status === "completed") {
    // Update customer stats when booking completes
    await updateCustomerStats(
      booking.customer_email,
      booking.total_amount,
      booking.gear_items[0]?.gearId // Track first category
    )
  }
  
  return booking
}

/**
 * Cancel booking
 */
export async function cancelBooking(bookingId: string, reason?: string): Promise<boolean> {
  const booking = await updateAirtableBookingStatus(bookingId, "cancelled", { notes: reason })
  return booking !== null
}

/**
 * Get booking statistics
 */
export async function getBookingStats() {
  try {
    const bookings = await getAllBookingsFromAirtable()

    return {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === "pending").length,
      confirmedBookings: bookings.filter(b => b.status === "confirmed").length,
      completedBookings: bookings.filter(b => b.status === "completed").length,
      cancelledBookings: bookings.filter(b => b.status === "cancelled").length,
      totalRevenue: bookings.reduce((sum, b) => sum + b.total_amount, 0),
      averageBookingValue: bookings.length > 0 ? bookings.reduce((sum, b) => sum + b.total_amount, 0) / bookings.length : 0,
      upcomingBookings: bookings.filter(b => {
        const startDate = new Date(b.start_date)
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
export async function exportBookingsToCSV(): Promise<string> {
  const bookings = await getAllBookingsFromAirtable()
  const headers = ["Booking ID", "Customer", "Email", "Phone", "Start Date", "End Date", "Total Amount", "Status", "Created At"]
  
  const rows = bookings.map(b => [
    b.booking_id,
    b.customer_name,
    b.customer_email,
    b.customer_phone,
    b.start_date,
    b.end_date,
    b.total_amount,
    b.status,
    b.created_at,
  ])

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n")

  return csv
}

/**
 * Get booking availability calendar
 */
export async function getAvailabilityCalendar(gearId: string, month: Date): Promise<Map<string, "available" | "booked">> {
  const bookings = await getGearBookings(gearId)
  const calendar = new Map<string, "available" | "booked">()

  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)

  for (let date = new Date(startOfMonth); date <= endOfMonth; date.setDate(date.getDate() + 1)) {
    const dateStr = date.toISOString().split("T")[0]
    calendar.set(dateStr, "available")
  }

  bookings.forEach(booking => {
    const start = new Date(booking.start_date)
    const end = new Date(booking.end_date)

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
 * Get date range between two dates
 */
function getDateRange(startDate: string, endDate: string): string[] {
  const dates: string[] = []
  const start = new Date(startDate)
  const end = new Date(endDate)

  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(date.toISOString().split("T")[0])
  }

  return dates
}

/**
 * Clear all booking data - DEPRECATED
 * Data is now in Airtable - use Airtable interface to manage
 */
export function clearAllBookings(): void {
  console.warn("clearAllBookings is deprecated. Manage bookings directly in Airtable.")
}
