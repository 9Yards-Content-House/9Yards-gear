import Link from "next/link"
import { Check, Info, AlertTriangle, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WhatsIncludedProps {
  itemName: string
  category: string
}

const getIncludedItems = (category: string) => {
  const baseItems = [
    "Protective carrying case",
    "All necessary cables",
    "User instruction card",
  ]

  const categoryItems: Record<string, string[]> = {
    cameras: [
      "Camera body with sensor cap",
      "2x high-capacity batteries",
      "Dual battery charger",
      "2x memory cards (512GB each)",
      "Memory card reader (USB-C)",
      "AC power adapter",
      ...baseItems,
    ],
    lenses: [
      "Lens with front and rear caps",
      "Lens cleaning kit",
      "Lens support bracket (if needed)",
      ...baseItems,
    ],
    lighting: [
      "Light fixture with stand mount",
      "Barn doors / diffusion panel",
      "Power cable (5m)",
      "Carry case / soft bag",
      ...baseItems,
    ],
    audio: [
      "Microphone with clip/mount",
      "Windscreen / deadcat",
      "XLR cable (3m)",
      "Batteries (if applicable)",
      ...baseItems,
    ],
    support: [
      "Complete support system",
      "Quick release plate",
      "Carrying bag / case",
      ...baseItems,
    ],
    drones: [
      "Drone with gimbal camera",
      "4x flight batteries",
      "Multi-charger hub",
      "Controller with cables",
      "ND filter set",
      "Propeller guards",
      ...baseItems,
    ],
    monitors: [
      "Monitor with sun hood",
      "Battery plate / power solution",
      "Mounting arm / clamp",
      "HDMI / SDI cables",
      ...baseItems,
    ],
    default: baseItems,
  }

  return categoryItems[category.toLowerCase()] || categoryItems.default
}

export function WhatsIncluded({ itemName, category }: WhatsIncludedProps) {
  const includedItems = getIncludedItems(category)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">What&apos;s Included with Your Rental</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-2">
          {includedItems.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>

        <Alert className="border-orange-500/30 bg-orange-500/5">
          <Info className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-sm text-muted-foreground">
            <strong className="text-foreground">Not included:</strong> Lenses (for cameras), tripods/support (unless specified), extra storage media beyond included.{" "}
            <Link href="/inventory" className="text-primary hover:underline">
              Browse compatible accessories
            </Link>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

interface CareGuidelinesProps {
  itemName: string
  category: string
}

export function CareGuidelines({ itemName, category }: CareGuidelinesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Care Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="handling">
            <AccordionTrigger className="text-sm">General Handling</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p>• Always use the provided case for transport</p>
              <p>• Handle with clean, dry hands</p>
              <p>• Never force connections or controls</p>
              <p>• Keep away from moisture and extreme temperatures</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="operating">
            <AccordionTrigger className="text-sm">Operating Tips</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p>• Allow equipment to acclimate to temperature changes (15 min)</p>
              <p>• Format memory cards in-device before use</p>
              <p>• Monitor battery levels—swap before fully depleted</p>
              <p>• Use protective covers when not actively in use</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="prohibited">
            <AccordionTrigger className="text-sm text-red-500">
              <span className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Prohibited Actions
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p>❌ No underwater use (unless rated)</p>
              <p>❌ Do not modify or open the equipment</p>
              <p>❌ Do not use third-party batteries</p>
              <p>❌ No subletting to other users</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="return">
            <AccordionTrigger className="text-sm">Pre-Return Checklist</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p>• Wipe down exterior with soft cloth</p>
              <p>• Remove and format memory cards</p>
              <p>• Charge batteries to 100%</p>
              <p>• Return all accessories in case</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4 pt-4 border-t">
          <Link href="/equipment-care" className="text-sm text-primary hover:underline">
            View complete Equipment Care Guide →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

interface RentalTermsSummaryProps {
  dailyRate: number
}

export function RentalTermsSummary({ dailyRate }: RentalTermsSummaryProps) {
  const depositAmount = Math.round(dailyRate * 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rental Terms Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm space-y-2">
          <p className="flex justify-between">
            <span className="text-muted-foreground">Rental Period:</span>
            <span>Starts at pickup, ends at return</span>
          </p>
          <p className="flex justify-between">
            <span className="text-muted-foreground">Grace Period:</span>
            <span>1 hour after scheduled return</span>
          </p>
          <p className="flex justify-between">
            <span className="text-muted-foreground">Deposit:</span>
            <span>Refunded same-day after inspection</span>
          </p>
          <p className="flex justify-between">
            <span className="text-muted-foreground">Cancellation:</span>
            <span>Free up to 48 hours before</span>
          </p>
        </div>

        <Alert className="border-green-500/30 bg-green-500/5">
          <Check className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-sm text-muted-foreground">
            We inspect all equipment before and after each rental. Follow care guidelines and your deposit is 100% refundable.
          </AlertDescription>
        </Alert>

        <Link href="/policies" className="text-sm text-primary hover:underline block">
          Read Complete Rental Policies →
        </Link>
      </CardContent>
    </Card>
  )
}
