// Admin Dashboard for Inventory and Booking Management
// Protected interface for admin users only

"use client"

import { useState, useEffect } from "react"
import { useAuth, isAdmin } from "@/lib/auth"
import { useGear, formatPrice, type GearItem } from "@/lib/gear-context"
import { getAllBookings, getBookingStats } from "@/lib/booking-manager"
import { getAllReviews, updateReviewStatus, type Review } from "@/lib/reviews"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Calendar, Package, Star, TrendingUp, Users, DollarSign } from "lucide-react"

export function AdminDashboard() {
  const { user, loading } = useAuth()
  const { gear: allGear, isLoading: gearLoading } = useGear()
  const [activeTab, setActiveTab] = useState("overview")

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!user || !isAdmin(user)) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Access denied. Admin privileges required.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage inventory, bookings, and reviews</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab allGear={allGear} isLoading={gearLoading} />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTab gear={allGear} isLoading={gearLoading} />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingsTab />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OverviewTab({ allGear, isLoading }: { allGear: GearItem[]; isLoading: boolean }) {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    if (isLoading) return
    const bookingStats = getBookingStats()
    const availableGear = allGear.filter((g: GearItem) => g.available).length

    setStats({
      ...bookingStats,
      totalGear: allGear.length,
      availableGear,
    })
  }, [allGear, isLoading])

  if (!stats) return <div>Loading stats...</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            Avg: {formatPrice(stats.averageBookingValue)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <p className="text-xs text-muted-foreground">
            {stats.upcomingBookings} upcoming
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Equipment</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalGear}</div>
          <p className="text-xs text-muted-foreground">
            {stats.availableGear} available
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingBookings}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting confirmation
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function InventoryTab({ gear, isLoading }: { gear: GearItem[]; isLoading: boolean }) {
  if (isLoading) {
    return <div>Loading inventory...</div>
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Equipment Inventory</h2>
        <Button>Add New Item</Button>
      </div>

      <div className="grid gap-4">
        {gear.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{formatPrice(item.pricePerDay)}/day</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={item.available ? "default" : "secondary"}>
                  {item.available ? "Available" : "Booked"}
                </Badge>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function BookingsTab() {
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings()
        setBookings(data)
      } catch (err) {
        console.error("Failed to fetch bookings", err)
      }
    }
    fetchBookings()
  }, [])

  return (
    <div className="mt-4 space-y-4">
      <h2 className="text-xl font-bold">Recent Bookings</h2>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{booking.customer_name}</h3>
                  <p className="text-sm text-muted-foreground">{booking.customer_email}</p>
                  <p className="text-sm mt-2">
                    {booking.start_date} → {booking.end_date}
                  </p>
                  <p className="text-sm font-medium mt-1">{formatPrice(booking.total_amount)}</p>
                </div>
                <Badge>{booking.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filter, setFilter] = useState<"pending" | "approved" | "all">("pending")

  useEffect(() => {
    loadReviews()
  }, [filter])

  const loadReviews = async () => {
    const data = await getAllReviews(filter === "all" ? undefined : filter)
    setReviews(data)
  }

  const handleApprove = async (reviewId: string) => {
    await updateReviewStatus(reviewId, "approved")
    loadReviews()
  }

  const handleReject = async (reviewId: string) => {
    await updateReviewStatus(reviewId, "rejected")
    loadReviews()
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Review Moderation</h2>
        <div className="flex gap-2">
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
            size="sm"
          >
            Pending
          </Button>
          <Button
            variant={filter === "approved" ? "default" : "outline"}
            onClick={() => setFilter("approved")}
            size="sm"
          >
            Approved
          </Button>
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.review_id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{review.user_name}</h3>
                    <Badge variant="secondary">{review.rating} ★</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.user_email}</p>
                </div>
                <Badge>{review.status}</Badge>
              </div>
              <h4 className="font-medium mt-2">{review.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
              {review.status === "pending" && (
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => review.review_id && handleApprove(review.review_id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => review.review_id && handleReject(review.review_id)}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
