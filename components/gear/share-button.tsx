"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type ShareButtonProps = {
  title: string
  text: string
  url?: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const handleShare = async () => {
    const shareUrl = url || window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl)
        toast.success("Link copied to clipboard")
      } catch (err) {
        toast.error("Failed to copy link")
      }
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleShare} 
      title="Share this item"
      className="text-muted-foreground hover:text-foreground"
    >
      <Share2 className="h-5 w-5" />
      <span className="sr-only">Share</span>
    </Button>
  )
}
