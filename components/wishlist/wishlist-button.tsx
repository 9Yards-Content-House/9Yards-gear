"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toggleWishlist, isInWishlist } from "@/lib/wishlist"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface WishlistButtonProps {
  gearId: string
  variant?: "icon" | "full"
  className?: string
}

export function WishlistButton({ gearId, variant = "icon", className }: WishlistButtonProps) {
  const [inWishlist, setInWishlist] = useState(false)

  useEffect(() => {
    setInWishlist(isInWishlist(gearId))

    const handleUpdate = () => {
      setInWishlist(isInWishlist(gearId))
    }

    window.addEventListener("wishlistUpdated" as any, handleUpdate)
    return () => window.removeEventListener("wishlistUpdated" as any, handleUpdate)
  }, [gearId])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(gearId)
  }

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className={cn("hover:bg-accent", className)}
        title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-colors",
            inWishlist ? "fill-red-500 text-red-500" : "text-muted-foreground"
          )}
        />
      </Button>
    )
  }

  return (
    <Button
      variant={inWishlist ? "secondary" : "outline"}
      onClick={handleClick}
      className={className}
    >
      <Heart
        className={cn(
          "h-4 w-4 mr-2",
          inWishlist && "fill-red-500 text-red-500"
        )}
      />
      {inWishlist ? "Saved" : "Save to Wishlist"}
    </Button>
  )
}

export function WishlistCount() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCount = () => {
      const { getWishlist } = require("@/lib/wishlist")
      setCount(getWishlist().length)
    }

    updateCount()
    window.addEventListener("wishlistUpdated" as any, updateCount)
    return () => window.removeEventListener("wishlistUpdated" as any, updateCount)
  }, [])

  if (count === 0) return null

  return (
    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
      {count}
    </Badge>
  )
}
