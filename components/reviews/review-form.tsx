"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth"
import { submitReview } from "@/lib/reviews"
import { cn } from "@/lib/utils"

interface ReviewFormProps {
  gearId: string
  gearName: string
  onSuccess?: () => void
}

export function ReviewForm({ gearId, gearName, onSuccess }: ReviewFormProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!user) {
    return (
      <Alert>
        <AlertDescription>
          Please log in to submit a review.
        </AlertDescription>
      </Alert>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (!title.trim() || !comment.trim()) {
      setError("Please provide a title and comment")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await submitReview({
        gear_id: gearId,
        user_email: user.email,
        user_name: user.user_metadata?.full_name || user.email.split("@")[0],
        rating,
        title,
        comment,
      })

      setSuccess(true)
      setTitle("")
      setComment("")
      setRating(0)
      onSuccess?.()

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError("Failed to submit review. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Write a Review for {gearName}
      </h3>

      {success && (
        <Alert className="mb-4 bg-green-500/10 border-green-500/50">
          <AlertDescription className="text-green-600 dark:text-green-400">
            Review submitted! It will appear after moderation.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Stars */}
        <div>
          <Label>Rating *</Label>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-8 w-8",
                    (hoverRating || rating) >= star
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {rating > 0 && `${rating} out of 5 stars`}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="review-title">Review Title *</Label>
          <Input
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sum up your experience"
            maxLength={100}
            required
          />
        </div>

        {/* Comment */}
        <div>
          <Label htmlFor="review-comment">Your Review *</Label>
          <Textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this equipment..."
            rows={6}
            maxLength={1000}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            {comment.length}/1000 characters
          </p>
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  )
}
