"use client"

import { useState, useEffect } from "react"
import { MessageCircle, ArrowUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Scroll to top button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full bg-card border-border shadow-lg transition-all duration-300",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      {/* WhatsApp button */}
      <div className="relative">
        {/* Tooltip */}
        <div
          className={cn(
            "absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap transition-all duration-200",
            showWhatsAppTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none",
          )}
        >
          <button
            className="absolute -right-1 -top-1 p-0.5 bg-card rounded-full border border-border"
            onClick={() => setShowWhatsAppTooltip(false)}
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
          <p className="text-sm font-medium text-foreground">Need help?</p>
          <p className="text-xs text-muted-foreground">Chat with us on WhatsApp</p>
        </div>

        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg transition-transform hover:scale-105"
          onClick={() => {
            window.open("https://wa.me/256700000000?text=Hi! I'm interested in renting gear from 9Yards.", "_blank")
          }}
          onMouseEnter={() => setShowWhatsAppTooltip(true)}
          onMouseLeave={() => setShowWhatsAppTooltip(false)}
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
