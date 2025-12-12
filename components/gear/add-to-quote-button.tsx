"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addToQuote } from "@/lib/quote-utils"
import type { GearItem } from "@/lib/gear-data"

type AddToQuoteButtonProps = {
  item: GearItem
}

export function AddToQuoteButton({ item }: AddToQuoteButtonProps) {
  const [added, setAdded] = useState(false)

  const handleAddToQuote = () => {
    addToQuote({
      id: item.id,
      name: item.name,
      pricePerDay: item.pricePerDay,
      image: item.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleAddToQuote}
      variant={added ? "outline" : "default"}
      size="lg"
      className="w-full"
      disabled={added}
    >
      {added ? (
        <>
          <Check className="h-5 w-5 mr-2" />
          Added to Quote
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Quote
        </>
      )}
    </Button>
  )
}
