"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X, Download, RefreshCw, Database, FileJson } from "lucide-react"
import gearData from "@/data/gear.json"

type ConnectionStatus = "idle" | "loading" | "connected" | "not_configured" | "error"

interface TestResult {
  status: string
  message: string
  data?: {
    categoriesCount: number
    gearCount: number
    categories: string[]
    sampleGear: { id: string; name: string }[]
  }
}

export default function AirtableMigrationPage() {
  const [status, setStatus] = useState<ConnectionStatus>("idle")
  const [result, setResult] = useState<TestResult | null>(null)
  const [apiKey, setApiKey] = useState("")
  const [baseId, setBaseId] = useState("")

  const testConnection = async () => {
    if (!apiKey || !baseId) {
      setStatus("not_configured")
      setResult({
        status: "not_configured",
        message: "Please enter your Airtable API Key and Base ID above",
      })
      return
    }

    setStatus("loading")
    try {
      // Test directly against Airtable API
      const [categoriesRes, gearRes] = await Promise.all([
        fetch(`https://api.airtable.com/v0/${baseId}/Categories`, {
          headers: { Authorization: `Bearer ${apiKey}` },
        }),
        fetch(`https://api.airtable.com/v0/${baseId}/Gear`, {
          headers: { Authorization: `Bearer ${apiKey}` },
        }),
      ])

      if (!categoriesRes.ok) {
        const error = await categoriesRes.json()
        throw new Error(`Categories table error: ${error.error?.message || categoriesRes.status}`)
      }

      if (!gearRes.ok) {
        const error = await gearRes.json()
        throw new Error(`Gear table error: ${error.error?.message || gearRes.status}`)
      }

      const categoriesData = await categoriesRes.json()
      const gearData = await gearRes.json()

      setResult({
        status: "connected",
        message: "Successfully connected to Airtable!",
        data: {
          categoriesCount: categoriesData.records?.length || 0,
          gearCount: gearData.records?.length || 0,
          categories: categoriesData.records?.map((r: any) => r.fields.name || r.fields.id) || [],
          sampleGear: gearData.records?.slice(0, 3).map((r: any) => ({
            id: r.fields.id,
            name: r.fields.name,
          })) || [],
        },
      })
      setStatus("connected")
    } catch (error) {
      setStatus("error")
      setResult({
        status: "error",
        message: error instanceof Error ? error.message : "Failed to connect",
      })
    }
  }

  const downloadCategoriesCSV = () => {
    const headers = ["id", "name", "icon"]
    const rows = gearData.categories.map((cat) => 
      [cat.id, cat.name, cat.icon].join(",")
    )
    const csv = [headers.join(","), ...rows].join("\n")
    
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "airtable-categories.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadGearCSV = () => {
    const headers = [
      "id",
      "name",
      "category",
      "pricePerDay",
      "pricePerWeek",
      "description",
      "specs",
      "image",
      "available",
      "featured",
      "bookedDates",
    ]

    const rows = gearData.gear.map((item) =>
      [
        item.id,
        `"${item.name.replace(/"/g, '""')}"`,
        item.category,
        item.pricePerDay,
        item.pricePerWeek,
        `"${item.description.replace(/"/g, '""')}"`,
        `"${JSON.stringify(item.specs).replace(/"/g, '""')}"`,
        item.image,
        item.available ? "true" : "false",
        item.featured ? "true" : "false",
        `"${JSON.stringify(item.bookedDates)}"`,
      ].join(",")
    )

    const csv = [headers.join(","), ...rows].join("\n")
    
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "airtable-gear.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const statusColors = {
    idle: "bg-gray-500",
    loading: "bg-yellow-500",
    connected: "bg-green-500",
    not_configured: "bg-orange-500",
    error: "bg-red-500",
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Airtable Migration</h1>
          <p className="text-muted-foreground mt-2">
            Set up and migrate your gear data to Airtable for easier management
          </p>
        </div>

        {/* Step 1: Set Up Airtable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                1
              </span>
              Set Up Airtable Base
            </CardTitle>
            <CardDescription>
              Create your Airtable base with the correct structure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">Create two tables in your Airtable base:</p>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-primary">Table 1: Categories</p>
                  <p className="text-muted-foreground">
                    Fields: id (text), name (text), icon (text)
                  </p>
                </div>
                <div>
                  <p className="font-medium text-primary">Table 2: Gear</p>
                  <p className="text-muted-foreground">
                    Fields: id (text), name (text), category (text), pricePerDay (number), 
                    pricePerWeek (number), description (long text), specs (long text), 
                    image (attachment or URL), available (checkbox), featured (checkbox), 
                    bookedDates (long text)
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadCategoriesCSV}>
                <Download className="h-4 w-4 mr-2" />
                Download Categories CSV
              </Button>
              <Button variant="outline" onClick={downloadGearCSV}>
                <Download className="h-4 w-4 mr-2" />
                Download Gear CSV
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Import these CSV files into your Airtable tables to populate them with your existing data
            </p>
          </CardContent>
        </Card>

        {/* Step 2: Get API Credentials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                2
              </span>
              Get API Credentials
            </CardTitle>
            <CardDescription>
              Create an API token and find your Base ID
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4 text-sm space-y-3">
              <div>
                <p className="font-medium">API Token:</p>
                <p className="text-muted-foreground">
                  Go to{" "}
                  <a
                    href="https://airtable.com/create/tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    airtable.com/create/tokens
                  </a>{" "}
                  → Create token → Add scopes (data.records:read, data.records:write) 
                  → Add your base
                </p>
              </div>
              <div>
                <p className="font-medium">Base ID:</p>
                <p className="text-muted-foreground">
                  Open your base → Look at the URL: https://airtable.com/
                  <span className="text-primary font-mono">appXXXXXXXXXXXXXX</span>/...
                  → The appXXX part is your Base ID
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Configure Environment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                3
              </span>
              Configure Environment Variables
            </CardTitle>
            <CardDescription>
              Add your credentials to .env.local
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm">
              <p className="text-muted-foreground"># .env.local</p>
              <p>AIRTABLE_API_KEY=patXXXXXXXXXXXXXX.xxxxx...</p>
              <p>AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX</p>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Test Connection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                4
              </span>
              Test Connection
            </CardTitle>
            <CardDescription>
              Enter your credentials and verify your Airtable integration is working
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Airtable API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="patXXXXXXXXXXXXXX.xxxxx..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baseId">Airtable Base ID</Label>
                <Input
                  id="baseId"
                  placeholder="appXXXXXXXXXXXXXX"
                  value={baseId}
                  onChange={(e) => setBaseId(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button onClick={testConnection} disabled={status === "loading"}>
                {status === "loading" ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Database className="h-4 w-4 mr-2" />
                )}
                Test Airtable Connection
              </Button>
              <Badge className={statusColors[status]}>
                {status === "idle" && "Not tested"}
                {status === "loading" && "Testing..."}
                {status === "connected" && (
                  <>
                    <Check className="h-3 w-3 mr-1" /> Connected
                  </>
                )}
                {status === "not_configured" && "Not Configured"}
                {status === "error" && (
                  <>
                    <X className="h-3 w-3 mr-1" /> Error
                  </>
                )}
              </Badge>
            </div>

            {result && (
              <div className="bg-muted rounded-lg p-4 text-sm">
                <p className="font-medium mb-2">{result.message}</p>
                {result.data && (
                  <div className="space-y-2 text-muted-foreground">
                    <p>Categories: {result.data.categoriesCount}</p>
                    <p>Gear items: {result.data.gearCount}</p>
                    {result.data.sampleGear.length > 0 && (
                      <div>
                        <p className="font-medium text-foreground">Sample gear:</p>
                        <ul className="list-disc list-inside">
                          {result.data.sampleGear.map((g) => (
                            <li key={g.id}>{g.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              Current JSON Data
            </CardTitle>
            <CardDescription>
              Your existing gear data that will be migrated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <p className="font-medium text-lg">{gearData.categories.length}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="font-medium text-lg">{gearData.gear.length}</p>
                <p className="text-sm text-muted-foreground">Gear Items</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Categories:</p>
              <div className="flex flex-wrap gap-2">
                {gearData.categories.map((cat) => (
                  <Badge key={cat.id} variant="outline">
                    {cat.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deploy Note */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                5
              </span>
              Deploy to Netlify
            </CardTitle>
            <CardDescription>
              Add environment variables to your production deployment
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              In Netlify Dashboard → Site settings → Environment variables, add:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>AIRTABLE_API_KEY</li>
              <li>AIRTABLE_BASE_ID</li>
            </ul>
            <p className="mt-2">
              After adding these, redeploy your site for the changes to take effect.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
