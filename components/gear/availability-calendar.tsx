"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AvailabilityCalendarProps = {
  bookedDates: string[]
  onDateSelect?: (startDate: string, endDate: string) => void
  initialStartDate?: string
  initialEndDate?: string
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function AvailabilityCalendar({
  bookedDates,
  onDateSelect,
  initialStartDate,
  initialEndDate,
}: AvailabilityCalendarProps) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedStart, setSelectedStart] = useState<string | null>(initialStartDate || null)
  const [selectedEnd, setSelectedEnd] = useState<string | null>(initialEndDate || null)

  useEffect(() => {
    if (initialStartDate) setSelectedStart(initialStartDate)
  }, [initialStartDate])

  useEffect(() => {
    if (initialEndDate) setSelectedEnd(initialEndDate)
  }, [initialEndDate])

  const bookedSet = new Set(bookedDates)

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const formatDate = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const isBooked = (day: number) => {
    return bookedSet.has(formatDate(day))
  }

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
  }

  const isSelected = (day: number) => {
    const dateStr = formatDate(day)
    return dateStr === selectedStart || dateStr === selectedEnd
  }

  const isInRange = (day: number) => {
    if (!selectedStart || !selectedEnd) return false
    const dateStr = formatDate(day)
    return dateStr > selectedStart && dateStr < selectedEnd
  }

  const isToday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return date.toDateString() === today.toDateString()
  }

  const handleDayClick = (day: number) => {
    if (isBooked(day) || isPast(day)) return

    const dateStr = formatDate(day)

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(dateStr)
      setSelectedEnd(null)
    } else if (dateStr > selectedStart) {
      const start = new Date(selectedStart)
      const end = new Date(dateStr)
      let hasBookedInRange = false

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const checkDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
        if (bookedSet.has(checkDate)) {
          hasBookedInRange = true
          break
        }
      }

      if (!hasBookedInRange) {
        setSelectedEnd(dateStr)
        onDateSelect?.(selectedStart, dateStr)
      }
    } else {
      setSelectedStart(dateStr)
      setSelectedEnd(null)
    }
  }

  const clearSelection = () => {
    setSelectedStart(null)
    setSelectedEnd(null)
  }

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

  const canGoPrev = currentYear > today.getFullYear() || currentMonth > today.getMonth()

  const calculateDays = () => {
    if (!selectedStart || !selectedEnd) return 0
    const start = new Date(selectedStart)
    const end = new Date(selectedEnd)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const rentalDays = calculateDays()

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Availability</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={goToPrevMonth} disabled={!canGoPrev} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-foreground min-w-[140px] text-center">
            {MONTHS[currentMonth]} {currentYear}
          </span>
          <Button variant="ghost" size="icon" onClick={goToNextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const booked = isBooked(day)
          const past = isPast(day)
          const selected = isSelected(day)
          const inRange = isInRange(day)
          const todayDate = isToday(day)

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={booked || past}
              className={cn(
                "aspect-square rounded-lg text-sm font-medium transition-all duration-200",
                "flex items-center justify-center relative",
                past && "text-muted-foreground/30 cursor-not-allowed",
                booked && "bg-destructive/20 text-destructive cursor-not-allowed line-through",
                !booked && !past && "hover:bg-secondary cursor-pointer hover:scale-105",
                selected &&
                  "bg-primary text-primary-foreground hover:bg-primary ring-2 ring-primary ring-offset-2 ring-offset-card",
                inRange && "bg-primary/20",
                todayDate && !selected && "ring-1 ring-primary/50",
              )}
            >
              {day}
              {todayDate && !selected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span className="text-xs text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-destructive/20" />
          <span className="text-xs text-muted-foreground">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary/20" />
          <span className="text-xs text-muted-foreground">Your Range</span>
        </div>
      </div>

      {selectedStart && (
        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">
                <span className="font-medium">
                  {selectedEnd ? `${rentalDays} day${rentalDays > 1 ? "s" : ""} selected` : "Select end date"}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {selectedStart}
                {selectedEnd && ` to ${selectedEnd}`}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={clearSelection} className="text-xs h-7">
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
