// Social Sharing and Referral System
// Share gear listings and track referrals

"use client"

export interface ReferralCode {
  code: string
  userId: string
  createdAt: string
  uses: number
  discount: number // percentage
}

/**
 * Generate unique referral code
 */
export function generateReferralCode(userId: string): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  const userPart = userId.substring(0, 4).toUpperCase()
  return `${userPart}${random}`
}

/**
 * Share on social media
 */
export function shareOnSocial(
  platform: "facebook" | "twitter" | "whatsapp" | "linkedin",
  url: string,
  title: string,
  description?: string
): void {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDesc = encodeURIComponent(description || "")

  let shareUrl = ""

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      break
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
      break
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
      break
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
      break
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "width=600,height=400")
  }
}

/**
 * Copy link to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to copy:", error)
    }
    return false
  }
}

/**
 * Track referral click
 */
export function trackReferral(referralCode: string): void {
  try {
    const existing = localStorage.getItem("referralCode")
    if (!existing) {
      localStorage.setItem("referralCode", referralCode)
      localStorage.setItem("referralDate", new Date().toISOString())

      // Track in analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "referral_click", {
          referral_code: referralCode,
        })
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to track referral:", error)
    }
  }
}

/**
 * Get active referral code from URL or storage
 */
export function getActiveReferralCode(): string | null {
  if (typeof window === "undefined") return null

  // Check URL first
  const params = new URLSearchParams(window.location.search)
  const urlCode = params.get("ref")
  if (urlCode) {
    trackReferral(urlCode)
    return urlCode
  }

  // Check localStorage
  return localStorage.getItem("referralCode")
}

/**
 * Apply referral discount to price
 */
export function applyReferralDiscount(price: number, discountPercent: number): number {
  return Math.round(price * (1 - discountPercent / 100))
}

/**
 * Get referral stats (admin/user view)
 */
export function getReferralStats(userId: string): {
  totalReferrals: number
  totalEarnings: number
  pendingEarnings: number
} {
  // In production, this would fetch from Airtable
  try {
    const stats = localStorage.getItem(`referral_stats_${userId}`)
    return stats ? JSON.parse(stats) : { totalReferrals: 0, totalEarnings: 0, pendingEarnings: 0 }
  } catch {
    return { totalReferrals: 0, totalEarnings: 0, pendingEarnings: 0 }
  }
}

/**
 * Share via native Web Share API
 */
export async function nativeShare(data: {
  title: string
  text: string
  url: string
}): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.share) {
    return false
  }

  try {
    await navigator.share(data)
    return true
  } catch (error) {
    // User cancelled or error occurred
    return false
  }
}
