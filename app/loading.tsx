import Image from "next/image"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with pulse animation */}
        <div className="animate-pulse">
          <Image
            src="/logo.png"
            alt="9Yards Gear"
            width={240}
            height={80}
            className="h-20 w-auto"
            priority
          />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    </div>
  )
}

