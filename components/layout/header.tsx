"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Inventory", href: "/inventory" },
  { name: "Packages", href: "/packages" },
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
      <nav className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="9Yards Film"
              width={180}
              height={60}
              className="h-[40px] w-auto transition-transform group-hover:scale-105 brightness-0 invert" 
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
            className="text-white hover:bg-white/10 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-7">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-[14.5px] font-medium transition-colors relative",
                pathname === item.href ? "text-white" : "text-[#B4B4B4] hover:text-white",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-5 lg:items-center">
          <Button asChild className="bg-white text-black hover:bg-[#F2F2F2] rounded-full px-[18px] h-8 text-[13px] font-medium transition-all">
            <Link href="/contact">Book Now</Link>
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
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block py-2 text-base font-medium transition-colors",
                pathname === item.href ? "text-white" : "text-[#B4B4B4] hover:text-white",
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Button asChild className="w-full bg-white text-black hover:bg-[#F2F2F2] rounded-full">
              <Link href="/contact">Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
