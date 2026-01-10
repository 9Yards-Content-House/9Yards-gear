"use client"

import { useState, useCallback, memo } from "react"
import Image, { ImageProps } from "next/image"
import { ImageOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string
}

// Memoized component to prevent unnecessary re-renders
export const ImageWithFallback = memo(function ImageWithFallback({ 
  src, 
  alt, 
  className,
  fallbackSrc = "/placeholder-gear.jpg",
  loading = "lazy", // Default to lazy loading
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = useCallback(() => setError(true), [])
  const handleLoad = useCallback(() => setIsLoading(false), [])

  if (error) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-secondary text-muted-foreground",
          className
        )}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <ImageOff className="h-8 w-8 opacity-50" aria-hidden="true" />
          <span className="text-xs font-medium">Image unavailable</span>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 bg-secondary animate-pulse",
            className
          )}
          aria-hidden="true"
        />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          className,
          isLoading && "opacity-0",
          !isLoading && "opacity-100 transition-opacity duration-300"
        )}
        onError={handleError}
        onLoad={handleLoad}
        loading={loading}
        {...props}
      />
    </>
  )
})
