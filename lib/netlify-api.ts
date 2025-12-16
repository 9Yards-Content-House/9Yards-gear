// Client-side utility for interacting with Netlify Functions
// Provides type-safe API calls to serverless backend

export interface AirtableRequest {
  table: string
  action: "list" | "get" | "create" | "update" | "delete"
  recordId?: string
  data?: Record<string, any>
}

export interface EmailRequest {
  to: string
  subject: string
  text?: string
  html?: string
  templateId?: string
  dynamicData?: Record<string, any>
}

export interface SMSRequest {
  to: string
  message: string
}

/**
 * Call Airtable Netlify Function
 */
export async function callAirtable(request: AirtableRequest): Promise<any> {
  try {
    const response = await fetch("/.netlify/functions/airtable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Airtable request failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Airtable API error:", error)
    throw error
  }
}

/**
 * Send email via SendGrid
 */
export async function sendEmail(request: EmailRequest): Promise<void> {
  try {
    const response = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to send email")
    }
  } catch (error) {
    console.error("Email send error:", error)
    throw error
  }
}

/**
 * Send SMS via Twilio
 */
export async function sendSMS(request: SMSRequest): Promise<void> {
  try {
    const response = await fetch("/.netlify/functions/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to send SMS")
    }
  } catch (error) {
    console.error("SMS send error:", error)
    throw error
  }
}

/**
 * Booking notification helpers
 */
export async function sendBookingConfirmation(
  customerEmail: string,
  customerPhone: string,
  bookingDetails: {
    bookingId: string
    items: string[]
    startDate: string
    endDate: string
    totalAmount: number
  }
): Promise<void> {
  const emailHtml = `
    <h2>Booking Confirmation</h2>
    <p>Thank you for booking with 9Yards Gear!</p>
    <p><strong>Booking ID:</strong> ${bookingDetails.bookingId}</p>
    <p><strong>Items:</strong></p>
    <ul>${bookingDetails.items.map(item => `<li>${item}</li>`).join("")}</ul>
    <p><strong>Rental Period:</strong> ${bookingDetails.startDate} to ${bookingDetails.endDate}</p>
    <p><strong>Total Amount:</strong> UGX ${bookingDetails.totalAmount.toLocaleString()}</p>
    <p>We'll contact you shortly to arrange pickup.</p>
  `

  const smsMessage = `9Yards Gear: Booking ${bookingDetails.bookingId} confirmed! ${bookingDetails.items.length} item(s) from ${bookingDetails.startDate}. Total: UGX ${bookingDetails.totalAmount.toLocaleString()}`

  // Send both email and SMS in parallel
  await Promise.allSettled([
    sendEmail({
      to: customerEmail,
      subject: "Booking Confirmation - 9Yards Gear",
      html: emailHtml,
    }),
    sendSMS({
      to: customerPhone,
      message: smsMessage,
    }),
  ])
}

/**
 * Wishlist availability notification
 */
export async function sendWishlistAlert(
  customerEmail: string,
  itemName: string,
  availableDate: string
): Promise<void> {
  await sendEmail({
    to: customerEmail,
    subject: `${itemName} is now available!`,
    html: `
      <h2>Your Wishlisted Item is Available</h2>
      <p><strong>${itemName}</strong> is now available for rent starting ${availableDate}.</p>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/inventory">Browse Inventory</a></p>
    `,
  })
}
