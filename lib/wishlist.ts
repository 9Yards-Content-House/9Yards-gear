// Wishlist and Favorites System
// Allows users to save gear items for later with email notifications

"use client"

import { useState, useEffect } from "react"
import type { GearItem } from "./gear-data"
import { sendWishlistAlert } from "./netlify-api"

export interface WishlistItem {
  gearId: string
  addedAt: string
  notifyOnAvailable: boolean
}

const WISHLIST_KEY = "9yards_wishlist"
const MAX_WISHLIST_ITEMS = 50

/**
 * Get all wishlist items
 */
export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(WISHLIST_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Failed to load wishlist:", error)
    return []
  }
}

/**
 * Add item to wishlist
 */
export function addToWishlist(gearId: string, notifyOnAvailable = false): boolean {
  try {
    const wishlist = getWishlist()

    // Check if already in wishlist
    if (wishlist.some(item => item.gearId === gearId)) {
      return false
    }

    // Check limit
    if (wishlist.length >= MAX_WISHLIST_ITEMS) {
      throw new Error(`Wishlist limit (${MAX_WISHLIST_ITEMS}) reached`)
    }

    const newItem: WishlistItem = {
      gearId,
      addedAt: new Date().toISOString(),
      notifyOnAvailable,
    }

    wishlist.push(newItem)
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))

    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent("wishlistUpdated"))

    return true
  } catch (error) {
    console.error("Failed to add to wishlist:", error)
    return false
  }
}

/**
 * Remove item from wishlist
 */
export function removeFromWishlist(gearId: string): boolean {
  try {
    const wishlist = getWishlist()
    const filtered = wishlist.filter(item => item.gearId !== gearId)

    if (filtered.length === wishlist.length) {
      return false // Item wasn't in wishlist
    }

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered))
    window.dispatchEvent(new CustomEvent("wishlistUpdated"))

    return true
  } catch (error) {
    console.error("Failed to remove from wishlist:", error)
    return false
  }
}

/**
 * Check if item is in wishlist
 */
export function isInWishlist(gearId: string): boolean {
  const wishlist = getWishlist()
  return wishlist.some(item => item.gearId === gearId)
}

/**
 * Toggle item in wishlist
 */
export function toggleWishlist(gearId: string, notifyOnAvailable = false): boolean {
  if (isInWishlist(gearId)) {
    return removeFromWishlist(gearId)
  } else {
    return addToWishlist(gearId, notifyOnAvailable)
  }
}

/**
 * Clear all wishlist items
 */
export function clearWishlist(): void {
  try {
    localStorage.removeItem(WISHLIST_KEY)
    window.dispatchEvent(new CustomEvent("wishlistUpdated"))
  } catch (error) {
    console.error("Failed to clear wishlist:", error)
  }
}

/**
 * Get wishlist count
 */
export function getWishlistCount(): number {
  return getWishlist().length
}

/**
 * Export wishlist as shareable link
 */
export function getWishlistShareLink(): string {
  const wishlist = getWishlist()
  const gearIds = wishlist.map(item => item.gearId).join(",")
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  return `${baseUrl}/wishlist?items=${gearIds}`
}

/**
 * Import wishlist from URL params
 */
export function importWishlistFromUrl(gearIds: string[]): void {
  gearIds.forEach(gearId => {
    if (!isInWishlist(gearId)) {
      addToWishlist(gearId, false)
    }
  })
}

/**
 * Send availability notifications for wishlist items
 */
export async function checkWishlistAvailability(
  gearItems: GearItem[],
  userEmail: string
): Promise<void> {
  const wishlist = getWishlist()

  for (const wishlistItem of wishlist) {
    if (!wishlistItem.notifyOnAvailable) continue

    const gear = gearItems.find(g => g.id === wishlistItem.gearId)
    if (!gear || !gear.available) continue

    // Item is now available, send notification
    try {
      await sendWishlistAlert(
        userEmail,
        gear.name,
        new Date().toLocaleDateString()
      )

      // Update to not notify again
      const updatedWishlist = wishlist.map(item =>
        item.gearId === wishlistItem.gearId
          ? { ...item, notifyOnAvailable: false }
          : item
      )
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist))
    } catch (error) {
      console.error("Failed to send wishlist notification:", error)
    }
  }
}

/**
 * React hook for wishlist
 */
export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    // Load initial wishlist
    setItems(getWishlist())

    // Listen for updates
    const handleUpdate = () => {
      setItems(getWishlist())
    }

    window.addEventListener("wishlistUpdated" as any, handleUpdate)
    return () => window.removeEventListener("wishlistUpdated" as any, handleUpdate)
  }, [])

  return {
    items,
    count: items.length,
    add: addToWishlist,
    remove: removeFromWishlist,
    toggle: toggleWishlist,
    clear: clearWishlist,
    isInWishlist,
    shareLink: getWishlistShareLink(),
  }
}
