import type { Handler } from "@netlify/functions"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  }

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" }
  }

  try {
    // Check if Airtable is configured
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: "not_configured",
          message: "Airtable credentials not found in environment variables",
          required: ["AIRTABLE_API_KEY", "AIRTABLE_BASE_ID"],
        }),
      }
    }

    // Test fetching categories
    const categoriesResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Categories`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    )

    if (!categoriesResponse.ok) {
      const errorText = await categoriesResponse.text()
      throw new Error(`Categories fetch failed: ${categoriesResponse.status} - ${errorText}`)
    }

    const categoriesData = await categoriesResponse.json()

    // Test fetching gear
    const gearResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Gear`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    )

    if (!gearResponse.ok) {
      const errorText = await gearResponse.text()
      throw new Error(`Gear fetch failed: ${gearResponse.status} - ${errorText}`)
    }

    const gearData = await gearResponse.json()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "connected",
        message: "Successfully connected to Airtable",
        data: {
          categoriesCount: categoriesData.records?.length || 0,
          gearCount: gearData.records?.length || 0,
          categories: categoriesData.records?.map((r: any) => r.fields.name || r.fields.id) || [],
          sampleGear: gearData.records?.slice(0, 3).map((r: any) => ({
            id: r.fields.id,
            name: r.fields.name,
          })) || [],
        },
      }),
    }
  } catch (error) {
    console.error("Airtable test error:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    }
  }
}

export { handler }
