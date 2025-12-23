"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GearImage = {
  url: string
  filename?: string
}

type GearImageGalleryProps = {
  image: string // Primary image (fallback)
  images?: GearImage[] // Multiple images array
  name: string
}

export function GearImageGallery({ image, images = [], name }: GearImageGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Use images array if available, otherwise fallback to single image
  const galleryImages: GearImage[] = images.length > 0 
    ? images 
    : [{ url: image || "/placeholder.svg" }]

  const currentImage = galleryImages[currentIndex]?.url || "/placeholder.svg"
  const hasMultipleImages = galleryImages.length > 1

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
    if (e.key === "Escape") setIsZoomed(false)
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main Image */}
        <div 
          className="relative aspect-4/3 rounded-xl overflow-hidden bg-secondary group"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <Image 
            src={currentImage} 
            alt={`${name} - Image ${currentIndex + 1}`} 
            fill 
            className="object-cover transition-transform duration-300" 
            priority 
          />
          
          {/* Navigation arrows for multiple images */}
          {hasMultipleImages && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
                onClick={goToNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Zoom button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
            onClick={() => setIsZoomed(true)}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          {/* Image counter */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          )}
        </div>

        {/* Thumbnail strip for multiple images */}
        {hasMultipleImages && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                className={cn(
                  "relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                  index === currentIndex 
                    ? "border-primary ring-2 ring-primary/20" 
                    : "border-transparent hover:border-muted-foreground/30"
                )}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={img.url || "/placeholder.svg"}
                  alt={`${name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50"
            onClick={() => setIsZoomed(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation in zoom mode */}
          {hasMultipleImages && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50"
                onClick={(e) => { e.stopPropagation(); goToPrevious() }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50"
                onClick={(e) => { e.stopPropagation(); goToNext() }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          <div className="relative w-full max-w-4xl aspect-4/3" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={currentImage} 
              alt={`${name} - Image ${currentIndex + 1}`} 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Image counter in zoom mode */}
          {hasMultipleImages && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}
