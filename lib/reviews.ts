// Reviews and Ratings System
// Handles submission, storage, and display of user reviews

"use client"

import { callAirtable } from "./netlify-api"

export interface Review {
  id?: string
  gearId: string
  userId: string
  userName: string
  userEmail: string
  rating: number // 1-5
  title: string
  comment: string
  photos?: string[]
  verified: boolean
  helpful: number
  createdAt: string
  status: "pending" | "approved" | "rejected"
}

const REVIEWS_TABLE = "Reviews"

/**
 * Submit a new review
 */
export async function submitReview(review: Omit<Review, "id" | "createdAt" | "status" | "helpful">): Promise<Review> {
  try {
    const result = await callAirtable({
      table: REVIEWS_TABLE,
      action: "create",
      data: {
        ...review,
        createdAt: new Date().toISOString(),
        status: "pending",
        helpful: 0,
      },
    })

    return result.fields as Review
  } catch (error) {
    console.error("Failed to submit review:", error)
    throw new Error("Failed to submit review")
  }
}

/**
 * Get reviews for a gear item
 */
export async function getGearReviews(gearId: string): Promise<Review[]> {
  try {
    const result = await callAirtable({
      table: REVIEWS_TABLE,
      action: "list",
      data: {
        filterByFormula: `AND({gearId}='${gearId}', {status}='approved')`,
      },
    })

    return result.records?.map((r: any) => ({ id: r.id, ...r.fields })) || []
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
    const filterFormula = status ? `{status}='${status}'` : ""

    const result = await callAirtable({
      table: REVIEWS_TABLE,
      action: "list",
      data: status ? { filterByFormula: filterFormula } : undefined,
    })

    return result.records?.map((r: any) => ({ id: r.id, ...r.fields })) || []
  } catch (error) {
    console.error("Failed to fetch reviews:", error)
    return []
  }
}

/**
 * Update review status (admin only)
 */
export async function updateReviewStatus(reviewId: string, status: "approved" | "rejected"): Promise<void> {
  try {
    await callAirtable({
      table: REVIEWS_TABLE,
      action: "update",
      recordId: reviewId,
      data: { status },
    })
  } catch (error) {
    console.error("Failed to update review status:", error)
    throw new Error("Failed to update review")
  }
}

/**
 * Mark review as helpful
 */
export async function markReviewHelpful(reviewId: string, currentCount: number): Promise<void> {
  try {
    await callAirtable({
      table: REVIEWS_TABLE,
      action: "update",
      recordId: reviewId,
      data: { helpful: currentCount + 1 },
    })
  } catch (error) {
    console.error("Failed to mark review helpful:", error)
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
 * Perform sentiment analysis (basic)
 */
export function analyzeSentiment(comment: string): "positive" | "neutral" | "negative" {
  const positiveWords = ["great", "excellent", "amazing", "perfect", "love", "best", "good", "fantastic"]
  const negativeWords = ["bad", "poor", "terrible", "worst", "disappointing", "broken", "awful"]

  const lowerComment = comment.toLowerCase()
  const positiveCount = positiveWords.filter(word => lowerComment.includes(word)).length
  const negativeCount = negativeWords.filter(word => lowerComment.includes(word)).length

  if (positiveCount > negativeCount) return "positive"
  if (negativeCount > positiveCount) return "negative"
  return "neutral"
}
