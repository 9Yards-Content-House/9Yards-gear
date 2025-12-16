// Netlify Function for Email Notifications via SendGrid
// Handles booking confirmations, availability alerts, and promotional emails

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@9yardsgear.com"

interface EmailData {
  to: string
  subject: string
  text?: string
  html?: string
  templateId?: string
  dynamicData?: Record<string, any>
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

  if (!SENDGRID_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "SendGrid API key not configured" }),
    }
  }

  try {
    const emailData: EmailData = JSON.parse(event.body || "{}")

    if (!emailData.to || !emailData.subject) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields: to, subject" }),
      }
    }

    // Build SendGrid request
    const sgRequest: any = {
      personalizations: [
        {
          to: [{ email: emailData.to }],
          subject: emailData.subject,
        },
      ],
      from: { email: FROM_EMAIL, name: "9Yards Gear" },
      content: [],
    }

    // Add template or content
    if (emailData.templateId) {
      sgRequest.template_id = emailData.templateId
      if (emailData.dynamicData) {
        sgRequest.personalizations[0].dynamic_template_data = emailData.dynamicData
      }
    } else {
      if (emailData.html) {
        sgRequest.content.push({ type: "text/html", value: emailData.html })
      }
      if (emailData.text) {
        sgRequest.content.push({ type: "text/plain", value: emailData.text })
      }
    }

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sgRequest),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("SendGrid error:", error)
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: "Failed to send email", details: error }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "Email sent successfully" }),
    }
  } catch (error) {
    console.error("Email function error:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error", message: error instanceof Error ? error.message : String(error) }),
    }
  }
}
