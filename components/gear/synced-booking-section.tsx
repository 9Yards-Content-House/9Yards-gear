"use client"

import { useState } from "react"
import { AvailabilityCalendar } from "./availability-calendar"
import { BookingForm } from "./booking-form"
import type { GearItem } from "@/lib/gear-data"

type SyncedBookingSectionProps = {
  item: GearItem
}

export function SyncedBookingSection({ item }: SyncedBookingSectionProps) {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  const handleCalendarSelect = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)
  }

  const handleFormDateChange = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <>
      <AvailabilityCalendar
        bookedDates={item.bookedDates}
        onDateSelect={handleCalendarSelect}
        initialStartDate={startDate}
        initialEndDate={endDate}
      />
      <BookingForm item={item} startDate={startDate} endDate={endDate} onDateChange={handleFormDateChange} />
    </>
  )
}
