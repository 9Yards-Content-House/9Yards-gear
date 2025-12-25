"use client"

import { ShoppingCart, X, Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/gear-context"
import { useState } from "react"

export function CartSheet() {
  const { items, itemCount, removeItem, totalEstimate } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs"
            >
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Open Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Equipment Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-hidden mt-6 relative">
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
                    <p className="font-medium mb-1">Your cart is empty</p>
                    <p className="text-sm">Browsed our gear yet?</p>
                    <Button variant="link" asChild onClick={() => setIsOpen(false)} className="mt-4">
                        <Link href="/packages">View Packages</Link>
                    </Button>
                </div>
            ) : (
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-4 pb-6">
                        {items.map((cartItem) => (
                            <div key={cartItem.id} className="flex gap-4">
                                <div className="h-20 w-20 flex-shrink-0 bg-secondary rounded-md overflow-hidden border border-border">
                                    <img 
                                        src={cartItem.item.image} 
                                        alt={cartItem.item.name} 
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between gap-2">
                                        <h4 className="font-medium text-sm line-clamp-2">{cartItem.item.name}</h4>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0"
                                            onClick={() => removeItem(cartItem.id)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-xs text-muted-foreground">
                                            Qty: {cartItem.quantity}
                                        </div>
                                        <div className="text-sm font-semibold">
                                            {formatPrice(cartItem.item.pricePerDay * cartItem.quantity)}
                                            <span className="text-xs font-normal text-muted-foreground">/day</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>

        {items.length > 0 && (
            <div className="pt-6 mt-auto">
                <Separator className="mb-4" />
                <div className="space-y-4">
                    <div className="flex justify-between items-center font-medium">
                        <span>Daily Total Estimate</span>
                        <span className="text-xl">{formatPrice(totalEstimate)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        * Final cost depends on rental duration, insurance & VAT.
                    </p>
                    <SheetFooter className="flex-col sm:flex-col gap-2">
                        <Button className="w-full" size="lg" asChild onClick={() => setIsOpen(false)}>
                            <Link href="/calculator">
                                Proceed to Checkout
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </SheetFooter>
                </div>
            </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
