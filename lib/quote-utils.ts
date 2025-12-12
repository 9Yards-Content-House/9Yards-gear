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
  const items = getQuoteItems()
  const existingIndex = items.findIndex((i) => i.id === item.id)

  if (existingIndex >= 0) {
    items[existingIndex].quantity += 1
  } else {
    items.push({ ...item, quantity: 1 })
  }

  localStorage.setItem("quoteItems", JSON.stringify(items))
  
  // Dispatch custom event for other components to listen
  window.dispatchEvent(new CustomEvent("quoteUpdated"))
}

export function removeFromQuote(id: string): void {
  const items = getQuoteItems().filter((i) => i.id !== id)
  localStorage.setItem("quoteItems", JSON.stringify(items))
  window.dispatchEvent(new CustomEvent("quoteUpdated"))
}

export function updateQuoteItemQuantity(id: string, quantity: number): void {
  const items = getQuoteItems()
  const item = items.find((i) => i.id === id)
  if (item) {
    item.quantity = Math.max(1, quantity)
    localStorage.setItem("quoteItems", JSON.stringify(items))
    window.dispatchEvent(new CustomEvent("quoteUpdated"))
  }
}

export function clearQuote(): void {
  localStorage.removeItem("quoteItems")
  window.dispatchEvent(new CustomEvent("quoteUpdated"))
}

export function getQuoteTotal(): number {
  const items = getQuoteItems()
  return items.reduce((sum, item) => sum + item.pricePerDay * item.quantity, 0)
}
