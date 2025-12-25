"use client"

import * as React from "react"
import { ShoppingCart, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { type GearItem } from "@/lib/gear-context"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: GearItem
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showLabel?: boolean
}

export function AddToCartButton({ 
  item, 
  className, 
  variant = "default", 
  size = "default",
  showLabel = true,
  ...props 
}: AddToCartButtonProps) {
  const { items, addItem } = useCart()
  const [isAdded, setIsAdded] = React.useState(false)
  const cartItem = items.find((i) => i.id === item.id)
  const isInCart = !!cartItem

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if used inside a link
    e.stopPropagation()
    
    addItem(item)
    
    // Show temporary success state
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  // Effect to sync state if added from elsewhere
  React.useEffect(() => {
    if (isInCart && !isAdded) {
       // Optional: could set isAdded true initially if we wanted to show it's in cart always
       // But typically we want the "Add" button to turn into "Added" momentarily or show quantity.
    }
  }, [isInCart])

  return (
    <Button
      variant={isAdded ? "secondary" : variant}
      size={size}
      className={cn("transition-all duration-300", className)}
      onClick={handleAdd}
      disabled={isAdded || !item.available}
      {...props}
    >
      {isAdded ? (
        <>
          <Check className={cn("h-4 w-4", showLabel && "mr-2")} />
          {showLabel && "Added"}
        </>
      ) : (
        <>
          <ShoppingCart className={cn("h-4 w-4", showLabel && "mr-2")} />
          {showLabel && "Add to Cart"}
        </>
      )}
    </Button>
  )
}
