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
  const { items, addItem, removeItem } = useCart()
  const [isAdded, setIsAdded] = React.useState(false)
  const cartItem = items.find((i) => i.id === item.id)
  const isInCart = !!cartItem

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault() 
    e.stopPropagation()
    
    if (isInCart) {
      // If already in cart, maybe remove it? Or just open cart?
      // For now, let's allow toggling off or just do nothing if we want to be strict.
      // User said: "notifiy them that the item is already in the card"
      // Let's toggle it off to be consistent with "Added" state allowing reversal,
      // OR better, just show it's added and maybe open the sheet?
      // Simple toggle is intuitive.
      removeItem(item.id)
    } else {
      addItem(item)
      // Show temporary success state logic is handled by isInCart now
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  return (
    <Button
      variant={isInCart ? "secondary" : variant}
      size={size}
      className={cn(
        "transition-all duration-300", 
        isInCart && "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 border-transparent",
        className
      )}
      onClick={handleAdd}
      disabled={!item.available}
      {...props}
    >
      {isInCart ? (
        <>
          <Check className={cn("h-4 w-4", showLabel && "mr-2")} />
          {showLabel && "In Quote"}
        </>
      ) : (
        <>
          <div className="relative">
             <Plus className={cn("h-4 w-4", showLabel && "mr-2")} />
          </div>
          {showLabel && "Add to Quote"}
        </>
      )}
    </Button>
  )
}
