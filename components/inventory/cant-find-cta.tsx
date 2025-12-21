import Link from "next/link"
import { Phone, MessageCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CantFindCTA() {
  return (
    <Card className="mt-12 bg-primary/5 border-primary/20">
      <CardContent className="py-8">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Can't Find What You Need?
            </h3>
            <p className="text-muted-foreground">
              We're constantly expanding our inventory and offer custom equipment sourcing for productions. 
              Let us know what you're looking for.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href="/contact">
                <MessageCircle className="mr-2 h-4 w-4" />
                Request Equipment
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent">
              <a href="tel:+256700488870">
                <Phone className="mr-2 h-4 w-4" />
                0700 488 870
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
