"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"
import { ImageOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className,
  fallbackSrc = "/placeholder-gear.jpg", // We can use a colored div if this image doesn't exist
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-secondary text-muted-foreground", className)}>
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <ImageOff className="h-8 w-8 opacity-50" />
          <span className="text-xs font-medium">Image unavailable</span>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  )
}
