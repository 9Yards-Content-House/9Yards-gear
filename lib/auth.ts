// Authentication system using Netlify Identity
// Provides user login, signup, profile management, and session handling

"use client"

import { useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
  }
  app_metadata: {
    roles?: string[]
  }
  created_at: string
  confirmed_at?: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

// Check if Netlify Identity is available
const isNetlifyIdentityAvailable = (): boolean => {
  return typeof window !== "undefined" && "netlifyIdentity" in window
}

/**
 * Initialize Netlify Identity
 */
export function initNetlifyIdentity(): void {
  if (typeof window === "undefined") return

  // Load Netlify Identity widget
  const script = document.createElement("script")
  script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js"
  script.async = true
  document.body.appendChild(script)

  script.onload = () => {
    const netlifyIdentity = (window as any).netlifyIdentity
    if (netlifyIdentity) {
      netlifyIdentity.init()

      // Auto-close modal after login
      netlifyIdentity.on("login", () => {
        netlifyIdentity.close()
      })

      // Handle redirects
      if (window.location.hash === "#invite_token") {
        netlifyIdentity.open("signup")
      }
    }
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  if (!isNetlifyIdentityAvailable()) return null
  const netlifyIdentity = (window as any).netlifyIdentity
  return netlifyIdentity?.currentUser() || null
}

/**
 * Open login modal
 */
export function login(): void {
  if (!isNetlifyIdentityAvailable()) {
    console.error("Netlify Identity not loaded")
    return
  }
  ;(window as any).netlifyIdentity?.open("login")
}

/**
 * Open signup modal
 */
export function signup(): void {
  if (!isNetlifyIdentityAvailable()) {
    console.error("Netlify Identity not loaded")
    return
  }
  ;(window as any).netlifyIdentity?.open("signup")
}

/**
 * Logout user
 */
export function logout(): void {
  if (!isNetlifyIdentityAvailable()) return
  const netlifyIdentity = (window as any).netlifyIdentity
  netlifyIdentity?.logout()
}

/**
 * Update user metadata
 */
export async function updateUser(metadata: Record<string, any>): Promise<User | null> {
  if (!isNetlifyIdentityAvailable()) return null

  const netlifyIdentity = (window as any).netlifyIdentity
  const user = netlifyIdentity?.currentUser()

  if (!user) return null

  try {
    const updatedUser = await netlifyIdentity.gotrue.currentUser().update({
      data: metadata,
    })
    return updatedUser
  } catch (error) {
    console.error("Failed to update user:", error)
    return null
  }
}

/**
 * Check if user has role
 */
export function hasRole(user: User | null, role: string): boolean {
  if (!user) return false
  return user.app_metadata?.roles?.includes(role) || false
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return hasRole(user, "admin")
}

/**
 * React hook for authentication
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Initialize on mount
    initNetlifyIdentity()

    // Small delay to ensure netlifyIdentity is loaded
    const timer = setTimeout(() => {
      const user = getCurrentUser()
      setState({ user, loading: false, error: null })

      // Listen for auth changes
      if (isNetlifyIdentityAvailable()) {
        const netlifyIdentity = (window as any).netlifyIdentity

        netlifyIdentity.on("login", (user: User) => {
          setState({ user, loading: false, error: null })
        })

        netlifyIdentity.on("logout", () => {
          setState({ user: null, loading: false, error: null })
        })

        netlifyIdentity.on("error", (err: Error) => {
          setState(prev => ({ ...prev, error: err.message }))
        })
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return state
}

/**
 * Get user token for API calls
 */
export async function getUserToken(): Promise<string | null> {
  if (!isNetlifyIdentityAvailable()) return null

  const netlifyIdentity = (window as any).netlifyIdentity
  const user = netlifyIdentity?.currentUser()

  if (!user) return null

  try {
    const token = await user.jwt()
    return token
  } catch (error) {
    console.error("Failed to get user token:", error)
    return null
  }
}
