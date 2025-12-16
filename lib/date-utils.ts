// Date utilities for booking validation
import { format, parseISO, isWithinInterval, addDays, startOfDay } from "date-fns"

/**
 * Check if a date is already booked
 */
export function isDateBooked(date: Date, bookedDates: string[]): boolean {
  const dateString = format(date, "yyyy-MM-dd")
  return bookedDates.includes(dateString)
}

/**
 * Check if a date range overlaps with any booked dates
 */
export function hasDateConflict(
  startDate: Date,
  endDate: Date,
  bookedDates: string[]
): { hasConflict: boolean; conflictDates: string[] } {
  const conflictDates: string[] = []
  const normalizedStart = startOfDay(startDate)
  const normalizedEnd = startOfDay(endDate)

  for (const bookedDateStr of bookedDates) {
    try {
      const bookedDate = startOfDay(parseISO(bookedDateStr))
      
      if (isWithinInterval(bookedDate, { start: normalizedStart, end: normalizedEnd })) {
        conflictDates.push(bookedDateStr)
      }
    } catch (error) {
      console.warn(`Invalid booked date format: ${bookedDateStr}`)
    }
  }

  return {
    hasConflict: conflictDates.length > 0,
    conflictDates,
  }
}

/**
 * Get disabled dates for calendar (booked dates)
 */
export function getDisabledDates(bookedDates: string[]): Date[] {
  return bookedDates
    .map((dateStr) => {
      try {
        return parseISO(dateStr)
      } catch {
        return null
      }
    })
    .filter((date): date is Date => date !== null)
}

/**
 * Format date range for display
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  const isSameMonth = startDate.getMonth() === endDate.getMonth()
  const isSameYear = startDate.getFullYear() === endDate.getFullYear()

  if (isSameMonth && isSameYear) {
    return `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`
  } else if (isSameYear) {
    return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`
  } else {
    return `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`
  }
}

/**
 * Check if date is in the past
 */
export function isDateInPast(date: Date): boolean {
  const today = startOfDay(new Date())
  return startOfDay(date) < today
}

/**
 * Get next available date (after booked dates)
 */
export function getNextAvailableDate(bookedDates: string[]): Date {
  const today = startOfDay(new Date())
  let nextDate = today

  // Check next 90 days for an available slot
  for (let i = 0; i < 90; i++) {
    const checkDate = addDays(today, i)
    if (!isDateBooked(checkDate, bookedDates)) {
      nextDate = checkDate
      break
    }
  }

  return nextDate
}

/**
 * Calculate rental duration in days
 */
export function calculateRentalDuration(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}
