// Netlify Function for Airtable Integration
// Handles CRUD operations for gear inventory, bookings, and reviews

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

interface AirtableRecord {
  id?: string
  fields: Record<string, any>
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Content-Type": "application/json",
  }

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" }
  }

  // Validate API key
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Airtable configuration missing" }),
    }
  }

  try {
    const { table, action, recordId, data } = JSON.parse(event.body || "{}")

    if (!table || !action) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required parameters: table, action" }),
      }
    }

    const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}`
    const airtableHeaders = {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    }

    let response: Response

    switch (action) {
      case "list":
        // GET all records with optional filtering
        const filterParams = data?.filterByFormula ? `?filterByFormula=${encodeURIComponent(data.filterByFormula)}` : ""
        response = await fetch(`${baseUrl}${filterParams}`, {
          headers: airtableHeaders,
        })
        break

      case "get":
        // GET single record
        if (!recordId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "recordId required for get action" }),
          }
        }
        response = await fetch(`${baseUrl}/${recordId}`, {
          headers: airtableHeaders,
        })
        break

      case "create":
        // POST new record
        response = await fetch(baseUrl, {
          method: "POST",
          headers: airtableHeaders,
          body: JSON.stringify({ fields: data }),
        })
        break

      case "update":
        // PATCH existing record
        if (!recordId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "recordId required for update action" }),
          }
        }
        response = await fetch(`${baseUrl}/${recordId}`, {
          method: "PATCH",
          headers: airtableHeaders,
          body: JSON.stringify({ fields: data }),
        })
        break

      case "delete":
        // DELETE record
        if (!recordId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "recordId required for delete action" }),
          }
        }
        response = await fetch(`${baseUrl}/${recordId}`, {
          method: "DELETE",
          headers: airtableHeaders,
        })
        break

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Unknown action: ${action}` }),
        }
    }

    const result = await response.json()

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: result.error || "Airtable API error" }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    }
  } catch (error) {
    console.error("Airtable function error:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error", message: error instanceof Error ? error.message : String(error) }),
    }
  }
}
