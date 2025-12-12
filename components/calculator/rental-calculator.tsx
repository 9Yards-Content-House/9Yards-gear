"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Calculator, Plus, Trash2, Calendar as CalendarIcon, Package, Send, FileText, Sparkles, CreditCard } from "lucide-react"
import { format, differenceInDays, addDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getAllGear, getAllCategories, formatPrice, type GearItem } from "@/lib/gear-data"
import { getQuoteItems, addToQuote, removeFromQuote, updateQuoteItemQuantity, clearQuote } from "@/lib/quote-utils"

type CartItem = {
  id: string
  item: GearItem
  quantity: number
}

const TAX_RATE = 0.18 // 18% VAT in Uganda
const INSURANCE_RATE = 0.05 // 5% insurance fee

export function RentalCalculator() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string>("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [paymentProcessing, setPaymentProcessing] = useState(false)

  const allGear = getAllGear()
  const categories = getAllCategories()

  // Load items from quote/localStorage on mount
  useEffect(() => {
    const quoteItems = getQuoteItems()
    if (quoteItems.length > 0) {
      const cartItems: CartItem[] = quoteItems.map((qi) => {
        const item = allGear.find((g) => g.id === qi.id)
        return item ? { id: qi.id, item, quantity: qi.quantity } : null
      }).filter(Boolean) as CartItem[]
      setCart(cartItems)
    }

    // Check for bundle from localStorage
    const bundleData = localStorage.getItem("calculatorBundle")
    if (bundleData) {
      try {
        const bundle = JSON.parse(bundleData)
        // You could pre-fill the calculator with bundle items
        localStorage.removeItem("calculatorBundle")
      } catch (e) {
        console.error("Failed to parse bundle data", e)
      }
    }
  }, [allGear])

  const filteredGear = categoryFilter === "all" ? allGear : allGear.filter((g) => g.category === categoryFilter)

  const days = useMemo(() => {
    if (!startDate || !endDate) return 1
    return Math.max(1, differenceInDays(endDate, startDate) + 1)
  }, [startDate, endDate])

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

  const { subtotal, weeklyDiscount, bundleDiscount, insurance, tax, total, depositAmount } = useMemo(() => {
    const sub = cart.reduce((sum, c) => sum + c.item.pricePerDay * c.quantity * days, 0)
    const weeklyDis = days >= 7 ? sub * (2 / 7) : 0
    const bundleDis = cart.length >= 3 ? sub * 0.1 : 0 // 10% discount for 3+ items
    const subtotalAfterDiscounts = sub - weeklyDis - bundleDis
    const ins = subtotalAfterDiscounts * INSURANCE_RATE
    const taxAmount = (subtotalAfterDiscounts + ins) * TAX_RATE
    const totalAmount = subtotalAfterDiscounts + ins + taxAmount
    const deposit = totalAmount * 0.5 // 50% deposit

    return {
      subtotal: sub,
      weeklyDiscount: weeklyDis,
      bundleDiscount: bundleDis,
      insurance: ins,
      tax: taxAmount,
      total: totalAmount,
      depositAmount: deposit,
    }
  }, [cart, days])

  const generateQuoteSummary = () => {
    const items = cart.map((c) => `${c.item.name} x${c.quantity}`).join("\n")
    const dateRange = startDate && endDate ? `\nDates: ${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}` : `\nDuration: ${days} day(s)`
    const message = `Hi! I'd like to get a quote for renting:\n\n${items}${dateRange}\n\nEstimated total: ${formatPrice(total)}\nDeposit (50%): ${formatPrice(depositAmount)}`
    return encodeURIComponent(message)
  }

  const handleFlutterwavePayment = async () => {
    if (cart.length === 0 || !startDate || !endDate) {
      alert("Please add items and select rental dates")
      return
    }

    setPaymentProcessing(true)

    // Flutterwave payment integration (test mode)
    const FlutterwaveCheckout = (window as any).FlutterwaveCheckout

    const paymentData = {
      public_key: "FLWPUBK_TEST-XXXXXXXXXXXXXXXX-X", // Replace with actual test key
      tx_ref: `9Y-${Date.now()}`,
      amount: depositAmount,
      currency: "UGX",
      payment_options: "card, mobilemoney, ussd",
      customer: {
        email: "customer@example.com",
        phone_number: "256700000000",
        name: "Customer Name",
      },
      customizations: {
        title: "9Yards Gear Rental Deposit",
        description: `Deposit for ${cart.length} item(s) rental`,
        logo: "https://gear.9yards.co.ug/logo.png",
      },
      callback: function (data: any) {
        console.log("Payment successful:", data)
        alert(`Payment successful! Ref: ${data.tx_ref}. We'll contact you to confirm your booking.`)
        setPaymentProcessing(false)
      },
      onclose: function () {
        console.log("Payment cancelled")
        setPaymentProcessing(false)
      },
    }

    if (FlutterwaveCheckout) {
      FlutterwaveCheckout(paymentData)
    } else {
      alert("Flutterwave is not loaded. Please refresh and try again.")
      setPaymentProcessing(false)
    }
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
        {/* Add Equipment */}
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

        {/* Date Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            Rental Period
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "MMM d, yyyy") : "Start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "MMM d, yyyy") : "End date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => !startDate || date < startDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {startDate && endDate && (
            <p className="text-sm text-muted-foreground">
              {days} day{days > 1 ? "s" : ""} rental
              {days >= 7 && (
                <span className="text-primary ml-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 inline" />
                  Weekly rate applies - 2 free days!
                </span>
              )}
            </p>
          )}
        </div>

        {/* Cart items */}
        {cart.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                Selected Equipment ({cart.length} items)
              </Label>
              {cart.length >= 3 && (
                <Badge variant="outline" className="text-primary border-primary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Bundle discount!
                </Badge>
              )}
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {cart.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-2 p-3 bg-secondary/50 rounded-lg text-sm border border-border">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{c.item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(c.item.pricePerDay)}/day × {c.quantity} × {days} days = {formatPrice(c.item.pricePerDay * c.quantity * days)}
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
          <div className="border-t border-border pt-4 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({days} day{days > 1 ? "s" : ""})
                </span>
                <span className="text-foreground">{formatPrice(subtotal)}</span>
              </div>
              {weeklyDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 dark:text-green-400">Weekly Discount (2 free days)</span>
                  <span className="text-green-600 dark:text-green-400">-{formatPrice(weeklyDiscount)}</span>
                </div>
              )}
              {bundleDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-primary">Bundle Discount (10%)</span>
                  <span className="text-primary">-{formatPrice(bundleDiscount)}</span>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Equipment Insurance (5%)</span>
                <span className="text-foreground">{formatPrice(insurance)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VAT (18%)</span>
                <span className="text-foreground">{formatPrice(tax)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-xl font-bold pt-2">
              <span className="text-foreground">Total Amount</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-medium text-foreground">Required Deposit (50%)</span>
                <span className="text-2xl font-bold text-primary">{formatPrice(depositAmount)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Pay remaining {formatPrice(total - depositAmount)} on pickup
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              * Final price confirmed upon booking approval. Includes insurance and VAT.
            </p>

            <div className="flex flex-col gap-2 pt-4">
              <Button
                onClick={handleFlutterwavePayment}
                size="lg"
                className="w-full"
                disabled={paymentProcessing || !startDate || !endDate}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {paymentProcessing ? "Processing..." : `Pay Deposit - ${formatPrice(depositAmount)}`}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="lg">
                  <a
                    href={`https://wa.me/256700000000?text=${generateQuoteSummary()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    WhatsApp Quote
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">
                    <FileText className="h-4 w-4 mr-2" />
                    Email Quote
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-2">
                We accept Mobile Money, Cards, and Bank Transfers via Flutterwave
              </p>
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
