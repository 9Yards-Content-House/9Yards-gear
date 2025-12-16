'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Oops! Something went wrong
        </h1>
        
        <p className="text-muted-foreground mb-6">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>

        <div className="space-y-3">
          <Button 
            onClick={reset}
            size="lg"
            className="w-full"
          >
            Try Again
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-secondary rounded-lg text-left">
            <p className="text-xs text-muted-foreground font-mono overflow-wrap-break-word">
              {error.toString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
