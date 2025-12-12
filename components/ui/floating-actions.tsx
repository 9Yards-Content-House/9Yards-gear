"use client"

import { useState, useEffect } from "react"
import { ArrowUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const WHATSAPP_NUMBER = "256700000000" // Replace with actual number
const WHATSAPP_MESSAGE = "Hi! I'm interested in renting gear from 9Yards."

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Show tooltip after a few seconds on first visit
  useEffect(() => {
    const hasSeenTooltip = sessionStorage.getItem("whatsapp-tooltip-seen")
    if (!hasSeenTooltip && !hasInteracted) {
      const timer = setTimeout(() => {
        setShowWhatsAppTooltip(true)
        sessionStorage.setItem("whatsapp-tooltip-seen", "true")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [hasInteracted])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openWhatsApp = () => {
    setHasInteracted(true)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    window.open(url, "_blank", "noopener,noreferrer")
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
            className="absolute -right-1 -top-1 p-0.5 bg-card rounded-full border border-border hover:bg-secondary transition-colors"
            onClick={() => setShowWhatsAppTooltip(false)}
            aria-label="Close tooltip"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
          <p className="text-sm font-medium text-foreground">Need help?</p>
          <p className="text-xs text-muted-foreground">Chat with us on WhatsApp</p>
        </div>

        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg transition-transform hover:scale-105 focus-visible:ring-[#25D366]"
          onClick={openWhatsApp}
          onMouseEnter={() => setShowWhatsAppTooltip(true)}
          onMouseLeave={() => setShowWhatsAppTooltip(false)}
          aria-label="Contact us on WhatsApp"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </Button>
      </div>
    </div>
  )
}
