"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Calculator, Plus, Trash2, Calendar, Package, Send, FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllGear, getAllCategories, formatPrice, type GearItem } from "@/lib/gear-data"

type CartItem = {
  id: string
  item: GearItem
  quantity: number
}

export function RentalCalculator() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string>("")
  const [days, setDays] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const allGear = getAllGear()
  const categories = getAllCategories()

  const filteredGear = categoryFilter === "all" ? allGear : allGear.filter((g) => g.category === categoryFilter)

  const addItem = () => {
    if (!selectedItemId) return
    const item = allGear.find((g) => g.id === selectedItemId)
    if (!item) return

    const existing = cart.find((c) => c.id === selectedItemId)
    if (existing) {
      setCart(cart.map((c) => (c.id === selectedItemId ? { ...c, quantity: c.quantity + 1 } : c)))
    } else {
      setCart([...cart, { id: selectedItemId, item, quantity: 1 }])
    }
    setSelectedItemId("")
  }

  const removeItem = (id: string) => {
    setCart(cart.filter((c) => c.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setCart(cart.map((c) => (c.id === id ? { ...c, quantity } : c)))
  }

  const { subtotal, weeklyDiscount, total } = useMemo(() => {
    const sub = cart.reduce((sum, c) => sum + c.item.pricePerDay * c.quantity * days, 0)
    const discount = days >= 7 ? sub * (2 / 7) : 0
    return {
      subtotal: sub,
      weeklyDiscount: discount,
      total: sub - discount,
    }
  }, [cart, days])

  const generateQuoteSummary = () => {
    const items = cart.map((c) => `${c.item.name} x${c.quantity}`).join(", ")
    const message = `Hi! I'd like to get a quote for renting:\n\n${items}\n\nFor ${days} day(s).\n\nEstimated total: ${formatPrice(total)}`
    return encodeURIComponent(message)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Rental Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedItemId} onValueChange={setSelectedItemId}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select equipment..." />
            </SelectTrigger>
            <SelectContent>
              {filteredGear.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  <span className="flex items-center gap-2">
                    {item.name}
                    <span className="text-muted-foreground">{formatPrice(item.pricePerDay)}/day</span>
                    {!item.available && (
                      <Badge variant="secondary" className="text-xs">
                        Booked
                      </Badge>
                    )}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addItem} disabled={!selectedItemId}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Rental duration */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Rental Duration (days)
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              min="1"
              max="90"
              value={days}
              onChange={(e) => setDays(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="flex-1"
            />
            <div className="flex gap-1">
              {[1, 3, 7, 14].map((d) => (
                <Button
                  key={d}
                  variant={days === d ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDays(d)}
                  className="w-10"
                >
                  {d}
                </Button>
              ))}
            </div>
          </div>
          {days >= 7 && (
            <p className="text-xs text-primary flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Weekly rate applied - 2 free days!
            </p>
          )}
        </div>

        {/* Cart items */}
        {cart.length > 0 && (
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              Selected Equipment ({cart.length} items)
            </Label>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {cart.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-2 p-3 bg-secondary rounded-lg text-sm">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{c.item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(c.item.pricePerDay)}/day = {formatPrice(c.item.pricePerDay * c.quantity * days)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={c.quantity}
                      onChange={(e) => updateQuantity(c.id, Number.parseInt(e.target.value) || 1)}
                      className="w-16 h-8 text-center"
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(c.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {cart.length > 0 && (
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({days} day{days > 1 ? "s" : ""})
              </span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
            {weeklyDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-primary">Weekly Discount</span>
                <span className="text-primary">-{formatPrice(weeklyDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span className="text-foreground">Estimated Total</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">* Final price confirmed upon booking approval</p>

            <div className="flex gap-2 pt-4">
              <Button asChild className="flex-1">
                <a
                  href={`https://wa.me/256700000000?text=${generateQuoteSummary()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Get Quote via WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  <FileText className="h-4 w-4 mr-2" />
                  Request Formal Quote
                </Link>
              </Button>
            </div>
          </div>
        )}

        {cart.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calculator className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Add equipment to calculate rental costs</p>
            <p className="text-sm mt-1">Select a category and item above to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
