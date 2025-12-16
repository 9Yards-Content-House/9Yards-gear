// Netlify Function for SMS Notifications via Twilio
// Handles booking reminders, urgent alerts, and confirmations

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

interface SMSData {
  to: string
  message: string
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
    "Content-Type": "application/json",
  }

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" }
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    }
  }

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Twilio configuration missing" }),
    }
  }

  try {
    const smsData: SMSData = JSON.parse(event.body || "{}")

    if (!smsData.to || !smsData.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields: to, message" }),
      }
    }

    // Normalize phone number (add +256 if needed)
    let phoneNumber = smsData.to.replace(/\s+/g, "")
    if (phoneNumber.startsWith("0")) {
      phoneNumber = "+256" + phoneNumber.substring(1)
    } else if (!phoneNumber.startsWith("+")) {
      phoneNumber = "+256" + phoneNumber
    }

    // Create Twilio API request
    const params = new URLSearchParams({
      To: phoneNumber,
      From: TWILIO_PHONE_NUMBER,
      Body: smsData.message,
    })

    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: "Failed to send SMS", details: result }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, messageId: result.sid }),
    }
  } catch (error) {
    console.error("SMS function error:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error", message: error instanceof Error ? error.message : String(error) }),
    }
  }
}
