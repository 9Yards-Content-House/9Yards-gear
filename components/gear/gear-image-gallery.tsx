"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type GearImageGalleryProps = {
  image: string
  name: string
}

export function GearImageGallery({ image, name }: GearImageGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <>
      <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-secondary group">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" priority />
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsZoomed(true)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Zoom modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50"
            onClick={() => setIsZoomed(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="relative w-full max-w-4xl aspect-4/3">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
