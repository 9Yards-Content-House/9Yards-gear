"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, X } from "lucide-react"
import { initializeWebVitalsMonitoring } from "@/lib/performance-monitoring"

export function PWARegister() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    // Initialize Web Vitals monitoring for performance tracking
    initializeWebVitalsMonitoring()

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            if (process.env.NODE_ENV === "development") {
              console.log("✅ Service Worker registered successfully")
            }

            // Check for updates every hour
            setInterval(() => {
              registration.update()
            }, 60 * 60 * 1000)

            // Handle service worker updates
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing

              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                    // New service worker available
                    setWaitingWorker(newWorker)
                    setShowUpdatePrompt(true)
                  }
                })
              }
            })
          })
          .catch((error) => {
            if (process.env.NODE_ENV === "development") {
              console.error("❌ Service Worker registration failed", error)
            }
          })

        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data.type === "BOOKING_SYNCED") {
            if (process.env.NODE_ENV === "development") {
              console.log("✅ Booking synced successfully")
            }
          }
        })

        // Listen for when the service worker takes control
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          // Reload the page when the new service worker takes control
          window.location.reload()
        })
      })
    }
  }, [])

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" })
      setShowUpdatePrompt(false)
    }
  }

  if (!showUpdatePrompt) return null

  return (
    <div className="fixed bottom-20 right-6 z-50 max-w-sm">
      <Alert className="bg-card border-primary shadow-lg">
        <RefreshCw className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between gap-4">
          <span className="text-sm">A new version is available!</span>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleUpdate}>
              Update
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowUpdatePrompt(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
