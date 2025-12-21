"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar, User, Mail, Phone, MessageSquare, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatPrice, type GearItem } from "@/lib/gear-context"
import { hasDateConflict, isDateInPast, formatDateRange } from "@/lib/date-utils"
import { cn } from "@/lib/utils"

type BookingFormProps = {
  item: GearItem
  startDate?: string
  endDate?: string
  onDateChange?: (startDate: string, endDate: string) => void
}

type ValidationErrors = {
  name?: string
  email?: string
  phone?: string
  startDate?: string
  endDate?: string
}

export function BookingForm({ item, startDate, endDate, onDateChange }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: startDate || "",
    endDate: endDate || "",
    quantity: "1",
    notes: "",
  })

  useEffect(() => {
    if (startDate && startDate !== formData.startDate) {
      setFormData((prev) => ({ ...prev, startDate }))
    }
  }, [startDate])

  useEffect(() => {
    if (endDate && endDate !== formData.endDate) {
      setFormData((prev) => ({ ...prev, endDate }))
    }
  }, [endDate])

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters"
        break
      case "email":
        if (!value.trim()) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email"
        break
      case "phone":
        if (!value.trim()) return "Phone number is required"
        if (!/^[\d\s+()-]{10,}$/.test(value.replace(/\s/g, ""))) return "Please enter a valid phone number"
        break
      case "startDate":
        if (!value) return "Start date is required"
        if (isDateInPast(new Date(value))) return "Start date cannot be in the past"
        break
      case "endDate":
        if (!value) return "End date is required"
        if (formData.startDate && new Date(value) < new Date(formData.startDate)) {
          return "End date must be after start date"
        }
        // Check for date conflicts with booked dates
        if (formData.startDate && item.bookedDates?.length > 0) {
          const conflict = hasDateConflict(new Date(formData.startDate), new Date(value), item.bookedDates)
          if (conflict.hasConflict) {
            return `Dates unavailable. Already booked: ${conflict.conflictDates.join(", ")}`
          }
        }
        break
    }
    return undefined
  }

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name as keyof typeof formData])
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0
    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    if (end < start) return 0
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const days = calculateDays()
  const quantity = Math.max(1, Number.parseInt(formData.quantity) || 1)
  const subtotal = item.pricePerDay * days * quantity
  const weeklyDiscount = days >= 7 ? subtotal * (2 / 7) : 0
  const totalPrice = subtotal - weeklyDiscount

  const handleDateChange = (name: "startDate" | "endDate", value: string) => {
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)

    if (newFormData.startDate && newFormData.endDate && onDateChange) {
      onDateChange(newFormData.startDate, newFormData.endDate)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: ValidationErrors = {}
    const fields = ["name", "email", "phone", "startDate", "endDate"] as const

    fields.forEach((field) => {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}))
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Booking Request Sent!</h3>
        <p className="text-sm text-muted-foreground mb-4">
          We&apos;ll review your request and get back to you within 24 hours to confirm availability and payment
          details.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Make Another Booking
        </Button>
      </div>
    )
  }

  const getInputClassName = (fieldName: string) =>
    cn(
      "pl-10",
      touched[fieldName] &&
        errors[fieldName as keyof ValidationErrors] &&
        "border-destructive focus-visible:ring-destructive",
    )

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Request Booking</h3>

      {item.bookedDates && item.bookedDates.length > 0 && (
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-sm text-yellow-500">
            This item has some dates already booked. Please select available dates.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              placeholder="Your name"
              className={getInputClassName("name")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onBlur={() => handleBlur("name")}
            />
          </div>
          {touched.name && errors.name && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+256 700 000 000"
              className={getInputClassName("phone")}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onBlur={() => handleBlur("phone")}
            />
          </div>
          {touched.phone && errors.phone && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="stuartmuyambi@gmail.com"
            className={getInputClassName("email")}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur("email")}
          />
        </div>
        {touched.email && errors.email && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="startDate"
              type="date"
              className={getInputClassName("startDate")}
              value={formData.startDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleDateChange("startDate", e.target.value)}
              onBlur={() => handleBlur("startDate")}
            />
          </div>
          {touched.startDate && errors.startDate && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.startDate}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="endDate"
              type="date"
              className={getInputClassName("endDate")}
              value={formData.endDate}
              min={formData.startDate || new Date().toISOString().split("T")[0]}
              onChange={(e) => handleDateChange("endDate", e.target.value)}
              onBlur={() => handleBlur("endDate")}
            />
          </div>
          {touched.endDate && errors.endDate && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.endDate}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            max="10"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Textarea
            id="notes"
            placeholder="Any special requirements or questions..."
            className="pl-10 min-h-20"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
      </div>

      {days > 0 && (
        <div className="bg-secondary rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {formatPrice(item.pricePerDay)} x {days} day{days > 1 ? "s" : ""} x {quantity}
            </span>
            <span className="text-foreground">{formatPrice(subtotal)}</span>
          </div>
          {weeklyDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-primary">Weekly discount (7+ days)</span>
              <span className="text-primary">-{formatPrice(weeklyDiscount)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold border-t border-border pt-2">
            <span className="text-foreground">Total Estimate</span>
            <span className="text-primary">{formatPrice(totalPrice)}</span>
          </div>
          <p className="text-xs text-muted-foreground">* Final price confirmed upon booking approval</p>
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request Booking"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to our rental terms and conditions
      </p>
    </form>
  )
}
