"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CartSheet } from "@/components/cart/cart-sheet"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Inventory", href: "/inventory" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]



export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
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
          ? "bg-[#000000]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-8 relative">
        {/* Left Section: Back Link & Logo */}
        <div className="flex items-center gap-8 lg:flex-1">
          <Link 
            href="https://film.9yards.co.ug" 
            className="hidden md:flex items-center gap-1.5 text-[12px] font-medium text-[#B4B4B4] hover:text-white transition-colors whitespace-nowrap"
          >
            ← Back to 9Yards Film
          </Link>
          
          <Link href="/" className="-m-1.5 p-1.5 flex items-center group">
            <Image
              src="/logo.png"
              alt="9Yards Gear"
              width={180}
              height={60}
              className="h-[38px] sm:h-[44px] w-auto transition-transform group-hover:scale-105 brightness-0 invert" 
              priority
            />
          </Link>
        </div>

        {/* Center: Desktop navigation */}
        <div className="hidden lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:gap-x-8">
          {navigation.map((item) => {
            const isActive = item.href === '/' 
              ? pathname === '/' 
              : pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-[14px] font-medium transition-colors relative",
                  isActive ? "text-white" : "text-[#B4B4B4] hover:text-white",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Section: Mobile/Desktop CTA & Controls */}
        <div className="flex flex-1 justify-end items-center gap-x-4">
          {/* Desktop/Tablet Browse Gear Button */}
          <Button asChild className="hidden md:flex bg-white text-black hover:bg-[#F2F2F2] rounded-full px-5 h-9 text-[13px] font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <Link href="/inventory">Browse Gear</Link>
          </Button>
          
          <CartSheet />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            aria-label="Toggle menu"
            className="text-white hover:bg-white/10 hover:text-white lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-[#000000] border-b border-white/10 transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-6 py-4 space-y-4">
          {navigation.map((item) => {
            const isActive = item.href === '/' 
              ? pathname === '/' 
              : pathname === item.href || pathname.startsWith(item.href + '/');
              
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block py-2 text-base font-medium transition-colors",
                  isActive ? "text-white" : "text-[#B4B4B4] hover:text-white",
                )}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 flex flex-col gap-3">
            <Button asChild className="w-full bg-white text-black hover:bg-[#F2F2F2] rounded-full">
              <Link href="/inventory">Browse Gear</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
