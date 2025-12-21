"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ExternalLink, Calculator, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthButton } from "@/components/auth/auth-button"
import { WishlistCount } from "@/components/wishlist/wishlist-button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Inventory", href: "/inventory" },
  { name: "Packages", href: "/packages" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const parentSites = [
  { name: "9Yards Film", href: "https://film.9yards.co.ug" },
  { name: "9Yards Food", href: "https://food.9yards.co.ug" },
  { name: "9Yards Content House", href: "https://contenthouse.9yards.co.ug" },
  { name: "9Yards Main", href: "https://9yards.co.ug" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (mobileMenuOpen && !target.closest("nav")) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [mobileMenuOpen])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-background/80 backdrop-blur-md border-b border-border",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="9Yards Film"
              width={180}
              height={60}
              className="h-10 w-auto sm:h-12 md:h-14 transition-transform group-hover:scale-105"
              priority
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-1 relative py-1",
                pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                9Yards Network
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {parentSites.map((site) => (
                <DropdownMenuItem key={site.name} asChild>
                  <a href={site.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    {site.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              <WishlistCount />
            </Link>
          </Button>
          <AuthButton />
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
            <Link href="/contact">Book Now</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block py-2 text-base font-medium transition-colors",
                pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">9Yards Network</p>
            {parentSites.map((site) => (
              <a
                key={site.name}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {site.name}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
          <Button asChild className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white">
            <Link href="/contact">Book Now</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
