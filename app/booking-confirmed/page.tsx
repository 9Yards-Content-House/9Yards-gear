"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/gear-context"
import { 
  CheckCircle, Calendar, Phone, MessageCircle, 
  ArrowRight, Package, Clock, MapPin, Edit, ChevronRight
} from "lucide-react"
import { format } from "date-fns"

type BookingData = {
  items: Array<{ id: string; name: string; quantity: number; pricePerDay: number }>
  startDate: string
  endDate: string
  days: number
  total: number
  deposit: number
  customerName?: string
  customerEmail?: string
  customerPhone?: string
}

export default function BookingConfirmedPage() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  
  useEffect(() => {
    // Try to get booking data from localStorage
    const stored = localStorage.getItem("lastBooking")
    if (stored) {
      try {
        setBookingData(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse booking data", e)
      }
    }
  }, [])
  
  const handleAddToCalendar = () => {
    if (!bookingData) return
    
    const startDate = new Date(bookingData.startDate)
    const endDate = new Date(bookingData.endDate)
    
    const title = encodeURIComponent("9Yards Gear Rental Pickup")
    const details = encodeURIComponent(`Equipment rental from 9Yards Gear\n\nItems: ${bookingData.items.map(i => i.name).join(", ")}\n\nPickup at 9Yards Studio, Kampala`)
    const location = encodeURIComponent("9Yards Studio, Kampala, Uganda")
    const startStr = format(startDate, "yyyyMMdd")
    const endStr = format(endDate, "yyyyMMdd")
    
    // Google Calendar link
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startStr}/${endStr}`
    
    window.open(calendarUrl, "_blank")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-3xl gradient-heading mb-2">
              Booking Request Received!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your booking request. We&apos;ll contact you within 2 hours to confirm availability.
            </p>
          </div>

          {/* What Happens Next */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                What Happens Next
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge className="h-6 w-6 rounded-full flex items-center justify-center shrink-0">1</Badge>
                  <div>
                    <p className="font-medium text-foreground">Confirmation Call/Message</p>
                    <p className="text-sm text-muted-foreground">We&apos;ll call or WhatsApp you within 2 hours to confirm equipment availability.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="h-6 w-6 rounded-full flex items-center justify-center shrink-0">2</Badge>
                  <div>
                    <p className="font-medium text-foreground">Deposit Payment</p>
                    <p className="text-sm text-muted-foreground">Once confirmed, pay your 50% deposit via Mobile Money or bank transfer.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="h-6 w-6 rounded-full flex items-center justify-center shrink-0">3</Badge>
                  <div>
                    <p className="font-medium text-foreground">Pickup Day</p>
                    <p className="text-sm text-muted-foreground">Bring your ID to our Kampala studio. We&apos;ll inspect the gear together.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          {bookingData && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Booking Summary
                </h2>
                
                {/* Items */}
                <div className="space-y-3 mb-4">
                  {bookingData.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-foreground">{formatPrice(item.pricePerDay * item.quantity)}/day</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                {/* Dates */}
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {format(new Date(bookingData.startDate), "MMM d")} - {format(new Date(bookingData.endDate), "MMM d, yyyy")}
                    <span className="text-muted-foreground ml-2">({bookingData.days} days)</span>
                  </span>
                </div>
                
                <Separator className="my-4" />
                
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Rental</span>
                    <span className="text-foreground">{formatPrice(bookingData.total)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Deposit (50%)</span>
                    <span className="text-primary">{formatPrice(bookingData.deposit)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={handleAddToCalendar} variant="outline" className="bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/contact">
                <Edit className="h-4 w-4 mr-2" />
                Edit Booking
              </Link>
            </Button>
          </div>

          {/* Contact Options */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Questions about your booking?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We&apos;re here to help. Reach out anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button asChild>
                  <a href="tel:+256700488870">
                    <Phone className="h-4 w-4 mr-2" />
                    0700 488 870
                  </a>
                </Button>
                <Button asChild variant="outline" className="bg-transparent">
                  <a href="https://wa.me/256700488870" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Browse More */}
          <div className="text-center mt-8">
            <Button asChild variant="link">
              <Link href="/inventory">
                Browse More Equipment
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
