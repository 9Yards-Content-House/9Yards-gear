// Quote management utilities for localStorage
export type QuoteItem = {
  id: string
  name: string
  pricePerDay: number
  quantity: number
  image: string
}

export function getQuoteItems(): QuoteItem[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("quoteItems")
  return stored ? JSON.parse(stored) : []
}

export function addToQuote(item: Omit<QuoteItem, "quantity">): void {
  try {
    const items = getQuoteItems()
    if (items.length >= 50) {
      // Prevent unbounded growth
      items.shift()
    }
    const existingIndex = items.findIndex((i) => i.id === item.id)

    if (existingIndex >= 0) {
      items[existingIndex].quantity = Math.min(items[existingIndex].quantity + 1, 10)
    } else {
      items.push({ ...item, quantity: 1 })
    }

    localStorage.setItem("quoteItems", JSON.stringify(items))
    
    // Dispatch custom event for other components to listen
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("quoteUpdated"))
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to add to quote", error)
    }
  }
}

export function removeFromQuote(id: string): void {
  try {
    const items = getQuoteItems().filter((i) => i.id !== id)
    localStorage.setItem("quoteItems", JSON.stringify(items))
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("quoteUpdated"))
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to remove from quote", error)
    }
  }
}

export function updateQuoteItemQuantity(id: string, quantity: number): void {
  try {
    const items = getQuoteItems()
    const item = items.find((i) => i.id === id)
    if (item) {
      item.quantity = Math.max(1, Math.min(quantity, 10))
      localStorage.setItem("quoteItems", JSON.stringify(items))
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("quoteUpdated"))
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to update quote quantity", error)
    }
  }
}

export function clearQuote(): void {
  try {
    localStorage.removeItem("quoteItems")
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("quoteUpdated"))
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to clear quote", error)
    }
  }
}

export function getQuoteTotal(): number {
  const items = getQuoteItems()
  return items.reduce((sum, item) => sum + item.pricePerDay * item.quantity, 0)
}
