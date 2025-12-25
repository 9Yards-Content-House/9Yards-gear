"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { GearItem } from "./gear-context"
import { getQuoteItems, addToQuote as addToLocalQuote, removeFromQuote as removeFromLocalQuote, updateQuoteItemQuantity as updateLocalQuoteQuantity, clearQuote as clearLocalQuote } from "./quote-utils"

export type CartItem = {
  id: string
  item: GearItem
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: GearItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  isEmpty: boolean
  totalEstimate: number // Daily total estimate
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Initialize from localStorage on mount
  useEffect(() => {
    // We need to fetch the full gear details to rehydrate the cart nicely. 
    // Ideally we'd validte IDs against the gear context, but for now we'll trust the stored data 
    // and maybe enrich it later if we want to be strict.
    // However, quote-utils stores minimal info. Let's look at `quote-utils.ts` again. 
    // It stores { id, name, pricePerDay, quantity, image }. This maps well to GearItem roughly.
    // For now we will rely on quote-utils as the source of truth for persistence.
    
    // Better strategy: sync with the `quoteUpdated` event from quote-utils so we stay indifferent to who updates it.
    const loadItems = () => {
       const quoteItems = getQuoteItems()
       // Transform QuoteItem to CartItem. Note: QuoteItem is a subset of GearItem. 
       // We might need to map it carefully or just cast it if we are sure it's compatible enough for display.
       // The calculator reconstructs it by finding it in `allGear`. 
       // But global context might not have easy access to `allGear` immediately without circular dependency or wait.
       // For this implementation, we will store the essential display data in the cart items.
       
       const cartItems: CartItem[] = quoteItems.map(q => ({
         id: q.id,
         quantity: q.quantity,
         item: {
            id: q.id,
            name: q.name,
            pricePerDay: q.pricePerDay,
            image: q.image,
            // Defaults for fields missing in QuoteItem but present in GearItem
            category: "",
            pricePerWeek: q.pricePerDay * 4, // Rough estimate if missing
            description: "",
            specs: {},
            available: true,
            featured: false,
            bookedDates: []
         } as GearItem
       }))
       setItems(cartItems)
    }

    loadItems()

    const handleStorageChange = () => {
        loadItems()
    }
    
    // Listen for our custom event from quote-utils
    window.addEventListener("quoteUpdated", handleStorageChange)
    
    return () => {
        window.removeEventListener("quoteUpdated", handleStorageChange)
    }
  }, [])

  const addItem = useCallback((item: GearItem) => {
    addToLocalQuote({
        id: item.id,
        name: item.name,
        pricePerDay: item.pricePerDay,
        image: item.image
    })
    // The event listener will update the state
  }, [])

  const removeItem = useCallback((id: string) => {
    removeFromLocalQuote(id)
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    updateLocalQuoteQuantity(id, quantity)
  }, [])

  const clearCart = useCallback(() => {
    clearLocalQuote()
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const isEmpty = items.length === 0
  const totalEstimate = items.reduce((sum, item) => sum + (item.item.pricePerDay * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      isEmpty,
      totalEstimate
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
