"use client"

import { FileText, X, Trash2, ArrowRight, Plus, Minus } from "lucide-react"
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
  const { items, itemCount, removeItem, totalEstimate, updateQuantity } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative"
          title="Open Rental Quote list"
        >
          <FileText className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs"
            >
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Open Quote</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="px-6">
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Your Rental Quote ({itemCount})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-hidden mt-6 relative px-6">
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 text-muted-foreground">
                    <FileText className="h-12 w-12 mb-4 opacity-20" />
                    <p className="font-medium text-foreground mb-1">Your quote is empty</p>
                    <p className="text-sm">Browse our pro gear to build your list.</p>
                    <Button variant="link" asChild onClick={() => setIsOpen(false)} className="mt-4">
                        <Link href="/inventory" className="text-primary">Explore Inventory</Link>
                    </Button>
                </div>
            ) : (
                <ScrollArea className="h-full -mr-2 pr-4">
                    <div className="space-y-6 pb-6">
                        {items.map((cartItem) => (
                            <div key={cartItem.id} className="flex gap-4 items-start">
                                <div className="h-20 w-24 flex-shrink-0 bg-secondary/50 rounded-lg overflow-hidden border border-border group relative">
                                    <img 
                                        src={cartItem.item.image} 
                                        alt={cartItem.item.name} 
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col min-h-[5rem] justify-between">
                                    <div className="flex justify-between gap-2 items-start">
                                        <h4 className="font-semibold text-sm line-clamp-2 leading-snug">{cartItem.item.name}</h4>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-7 w-7 -mt-1 -mr-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                                            onClick={() => removeItem(cartItem.id)}
                                            title="Remove from quote"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <div className="flex items-center bg-secondary/80 rounded-md border border-border overflow-hidden">
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-7 w-7 rounded-none hover:bg-background/50"
                                                onClick={() => updateQuantity(cartItem.id, Math.max(1, cartItem.quantity - 1))}
                                                title="Decrease quantity"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center text-xs font-bold">{cartItem.quantity}</span>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-7 w-7 rounded-none hover:bg-background/50"
                                                onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                                                title="Increase quantity"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <div className="text-sm font-bold text-primary">
                                            {formatPrice(cartItem.item.pricePerDay * cartItem.quantity)}
                                            <span className="text-[10px] uppercase tracking-wider font-normal text-muted-foreground ml-1">Daily</span>
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
            <div className="pt-6 mt-auto px-6 border-t border-border bg-background pb-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-center group cursor-default">
                        <span className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">Daily Estimate</span>
                        <span className="text-2xl font-bold text-primary tracking-tight">{formatPrice(totalEstimate)}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                        * Final cost involves rental duration, equipment insurance & 18% VAT.
                    </p>
                    <SheetFooter className="flex-col sm:flex-col gap-2 p-0 mt-2">
                        <Button className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all" size="lg" asChild onClick={() => setIsOpen(false)}>
                            <Link href="/calculator">
                                Proceed to Booking
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
