"use client"

import { useState, useEffect } from "react"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { type Review, getGearReviews, calculateAverageRating, getRatingDistribution, markReviewHelpful } from "@/lib/reviews"
import { cn } from "@/lib/utils"

interface ReviewsListProps {
  gearId: string
}

export function ReviewsList({ gearId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent")

  useEffect(() => {
    loadReviews()
  }, [gearId])

  const loadReviews = async () => {
    setLoading(true)
    try {
      const data = await getGearReviews(gearId)
      setReviews(data)
    } catch (error) {
      console.error("Failed to load reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful_count - a.helpful_count
      case "rating":
        return b.rating - a.rating
      case "recent":
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })

  const avgRating = calculateAverageRating(reviews)
  const distribution = getRatingDistribution(reviews)

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading reviews...</div>
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 border border-border rounded-xl">
        <p className="text-muted-foreground">No reviews yet. Be the first to review this item!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-foreground">{avgRating}</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-4 w-4",
                      star <= avgRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{reviews.length} reviews</div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution[star as keyof typeof distribution]
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm w-8">{star}★</span>
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-8">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Button
          variant={sortBy === "recent" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSortBy("recent")}
        >
          Most Recent
        </Button>
        <Button
          variant={sortBy === "helpful" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSortBy("helpful")}
        >
          Most Helpful
        </Button>
        <Button
          variant={sortBy === "rating" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSortBy("rating")}
        >
          Highest Rating
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} onHelpful={loadReviews} />
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review, onHelpful }: { review: Review; onHelpful: () => void }) {
  const [marking, setMarking] = useState(false)

  const handleHelpful = async () => {
    if (!review.review_id) return
    setMarking(true)
    try {
      await markReviewHelpful(review.review_id)
      onHelpful()
    } catch (error) {
      console.error("Failed to mark helpful:", error)
    } finally {
      setMarking(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">{review.user_name}</span>
            {review.verified && (
              <Badge variant="secondary" className="text-xs">
                Verified Renter
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-4 w-4",
                    star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
      <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{review.comment}</p>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHelpful}
          disabled={marking}
          className="text-muted-foreground hover:text-foreground"
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Helpful ({review.helpful_count})
        </Button>
      </div>
    </div>
  )
}
