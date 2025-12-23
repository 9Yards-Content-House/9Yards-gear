/**
 * Reviews and Ratings System
 * Handles submission, storage, and display of user reviews
 * Integrated with Airtable - only verified renters can leave reviews
 */

"use client"

import {
  verifyReviewEligibility,
  submitReview as submitAirtableReview,
  getGearReviews as getAirtableGearReviews,
  getAllReviewsFromAirtable,
  updateReviewStatus as updateAirtableReviewStatus,
  incrementReviewHelpful,
  type Review,
} from "./airtable"

// Re-export types
export type { Review }

/**
 * Check if user is eligible to leave a review (has completed rental)
 */
export async function checkReviewEligibility(
  email: string,
  gearId: string
): Promise<{ eligible: boolean; bookingId?: string; message?: string }> {
  try {
    const result = await verifyReviewEligibility(email, gearId)
    
    if (result.eligible) {
      return {
        eligible: true,
        bookingId: result.bookingId,
      }
    } else {
      return {
        eligible: false,
        message: "Only customers who have completed a rental of this item can leave a review.",
      }
    }
  } catch (error) {
    console.error("Error checking review eligibility:", error)
    return {
      eligible: false,
      message: "Unable to verify rental history. Please try again later.",
    }
  }
}

/**
 * Submit a new review
 * Only verified renters can submit reviews
 */
export async function submitReview(
  review: Omit<Review, "id" | "airtableRecordId" | "review_id" | "created_at" | "status" | "helpful_count" | "verified"> & { userId?: string }
): Promise<{ success: boolean; review?: Review; error?: string }> {
  try {
    // Verify eligibility first
    const eligibility = await checkReviewEligibility(review.user_email, review.gear_id)
    
    if (!eligibility.eligible) {
      return {
        success: false,
        error: eligibility.message || "You must complete a rental to leave a review.",
      }
    }

    const result = await submitAirtableReview({
      ...review,
      booking_id: eligibility.bookingId,
    })

    if (result) {
      return { success: true, review: result }
    } else {
      return { success: false, error: "Failed to submit review. Please try again." }
    }
  } catch (error) {
    console.error("Failed to submit review:", error)
    return { success: false, error: "An error occurred while submitting your review." }
  }
}

/**
 * Get approved reviews for a gear item
 */
export async function getGearReviews(gearId: string): Promise<Review[]> {
  try {
    return await getAirtableGearReviews(gearId)
  } catch (error) {
    console.error("Failed to fetch reviews:", error)
    return []
  }
}

/**
 * Get all reviews (for moderation)
 */
export async function getAllReviews(status?: "pending" | "approved" | "rejected"): Promise<Review[]> {
  try {
    return await getAllReviewsFromAirtable(status)
  } catch (error) {
    console.error("Failed to fetch reviews:", error)
    return []
  }
}

/**
 * Update review status (admin only)
 */
export async function updateReviewStatus(reviewId: string, status: "approved" | "rejected"): Promise<boolean> {
  try {
    return await updateAirtableReviewStatus(reviewId, status)
  } catch (error) {
    console.error("Failed to update review status:", error)
    return false
  }
}

/**
 * Mark review as helpful
 */
export async function markReviewHelpful(reviewId: string): Promise<boolean> {
  try {
    return await incrementReviewHelpful(reviewId)
  } catch (error) {
    console.error("Failed to mark review helpful:", error)
    return false
  }
}

/**
 * Calculate average rating for gear
 */
export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

/**
 * Get rating distribution
 */
export function getRatingDistribution(reviews: Review[]): Record<number, number> {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach(review => {
    distribution[review.rating as keyof typeof distribution]++
  })
  return distribution
}

/**
 * Get review stats for a gear item
 */
export async function getGearReviewStats(gearId: string): Promise<{
  averageRating: number
  totalReviews: number
  distribution: Record<number, number>
  verifiedCount: number
}> {
  const reviews = await getGearReviews(gearId)
  
  return {
    averageRating: calculateAverageRating(reviews),
    totalReviews: reviews.length,
    distribution: getRatingDistribution(reviews),
    verifiedCount: reviews.filter(r => r.verified).length,
  }
}

/**
 * Perform sentiment analysis (basic)
 */
export function analyzeSentiment(comment: string): "positive" | "neutral" | "negative" {
  const positiveWords = ["great", "excellent", "amazing", "perfect", "love", "best", "good", "fantastic", "wonderful", "superb"]
  const negativeWords = ["bad", "poor", "terrible", "worst", "disappointing", "broken", "awful", "horrible", "useless"]

  const lowerComment = comment.toLowerCase()
  const positiveCount = positiveWords.filter(word => lowerComment.includes(word)).length
  const negativeCount = negativeWords.filter(word => lowerComment.includes(word)).length

  if (positiveCount > negativeCount) return "positive"
  if (negativeCount > positiveCount) return "negative"
  return "neutral"
}
