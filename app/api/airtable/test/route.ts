import { NextResponse } from "next/server"
import * as airtable from "@/lib/airtable"

// Force dynamic for API routes with static export
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Check if Airtable is configured
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json(
        {
          status: "not_configured",
          message: "Airtable credentials not found in environment variables",
          required: ["AIRTABLE_API_KEY", "AIRTABLE_BASE_ID"],
        },
        { status: 200 }
      )
    }

    // Try to fetch data
    const [categories, gear] = await Promise.all([
      airtable.getAllCategories(),
      airtable.getAllGear(),
    ])

    return NextResponse.json({
      status: "connected",
      message: "Successfully connected to Airtable",
      data: {
        categoriesCount: categories.length,
        gearCount: gear.length,
        categories: categories.map((c) => c.name),
        sampleGear: gear.slice(0, 3).map((g) => ({ id: g.id, name: g.name })),
      },
    })
  } catch (error) {
    console.error("Airtable test error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
