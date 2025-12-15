// Google Analytics 4 event tracking utilities

type EventParams = {
  [key: string]: string | number | boolean | undefined
}

/**
 * Send a custom event to Google Analytics
 */
export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window === "undefined") return

  try {
    const gtag = (window as any).gtag
    if (gtag) {
      gtag("event", eventName, params)
    }
  } catch (error) {
    console.warn("Analytics tracking failed:", error)
  }
}

/**
 * Track page views
 */
export function trackPageView(url: string, title?: string): void {
  trackEvent("page_view", {
    page_path: url,
    page_title: title || document.title,
  })
}

/**
 * Track search queries
 */
export function trackSearch(searchTerm: string, resultsCount?: number): void {
  trackEvent("search", {
    search_term: searchTerm,
    ...(resultsCount !== undefined && { results_count: resultsCount }),
  })
}

/**
 * Track gear item views
 */
export function trackGearView(gearId: string, gearName: string, category: string, price: number): void {
  trackEvent("view_item", {
    item_id: gearId,
    item_name: gearName,
    item_category: category,
    price: price,
    currency: "UGX",
  })
}

/**
 * Track add to quote actions
 */
export function trackAddToQuote(gearId: string, gearName: string, quantity: number, price: number): void {
  trackEvent("add_to_cart", {
    item_id: gearId,
    item_name: gearName,
    quantity: quantity,
    price: price,
    currency: "UGX",
  })
}

/**
 * Track quote/booking requests
 */
export function trackQuoteRequest(
  items: Array<{ id: string; name: string; quantity: number; price: number }>,
  totalValue: number,
  rentalDays?: number
): void {
  trackEvent("begin_checkout", {
    value: totalValue,
    currency: "UGX",
    items: items.length,
    ...(rentalDays && { rental_days: rentalDays }),
  })
}

/**
 * Track booking form submissions
 */
export function trackBookingSubmit(gearId: string, gearName: string, rentalDays: number): void {
  trackEvent("generate_lead", {
    item_id: gearId,
    item_name: gearName,
    rental_days: rentalDays,
    lead_type: "booking_request",
  })
}

/**
 * Track payment initiations
 */
export function trackPaymentInitiated(amount: number, items: number): void {
  trackEvent("add_payment_info", {
    value: amount,
    currency: "UGX",
    items: items,
  })
}

/**
 * Track successful payments
 */
export function trackPaymentSuccess(
  transactionId: string,
  amount: number,
  items: Array<{ id: string; name: string; quantity: number }>
): void {
  trackEvent("purchase", {
    transaction_id: transactionId,
    value: amount,
    currency: "UGX",
    items_count: items.length,
  })
}

/**
 * Track filter usage
 */
export function trackFilterUsage(filterType: string, filterValue: string): void {
  trackEvent("filter_applied", {
    filter_type: filterType,
    filter_value: filterValue,
  })
}

/**
 * Track social shares
 */
export function trackShare(method: string, contentType: string, itemId?: string): void {
  trackEvent("share", {
    method: method,
    content_type: contentType,
    ...(itemId && { item_id: itemId }),
  })
}

/**
 * Track WhatsApp quick book clicks
 */
export function trackWhatsAppClick(gearId: string, gearName: string): void {
  trackEvent("whatsapp_click", {
    item_id: gearId,
    item_name: gearName,
    contact_method: "whatsapp",
  })
}

/**
 * Track calculator usage
 */
export function trackCalculatorUsage(itemsCount: number, rentalDays: number, totalValue: number): void {
  trackEvent("calculator_used", {
    items_count: itemsCount,
    rental_days: rentalDays,
    total_value: totalValue,
    currency: "UGX",
  })
}

/**
 * Track errors
 */
export function trackError(errorType: string, errorMessage: string, context?: string): void {
  trackEvent("exception", {
    description: `${errorType}: ${errorMessage}`,
    fatal: false,
    ...(context && { context }),
  })
}

/**
 * Track outbound link clicks
 */
export function trackOutboundLink(url: string, linkText?: string): void {
  trackEvent("click", {
    link_url: url,
    link_text: linkText,
    outbound: true,
  })
}
