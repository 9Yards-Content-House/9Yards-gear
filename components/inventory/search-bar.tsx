"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Fuse from "fuse.js"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getAllGear, type GearItem } from "@/lib/gear-data"
import { cn } from "@/lib/utils"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [suggestions, setSuggestions] = useState<GearItem[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const allGear = getAllGear()

  const fuse = useMemo(
    () =>
      new Fuse(allGear, {
        keys: ["name", "description", "category"],
        threshold: 0.3,
        includeScore: true,
      }),
    [allGear],
  )

  useEffect(() => {
    if (query.length >= 2) {
      const results = fuse.search(query).slice(0, 5)
      setSuggestions(results.map((r) => r.item))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
    setSelectedIndex(-1)
  }, [query, fuse])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set("q", searchQuery)
    } else {
      params.delete("q")
    }
    router.push(`/inventory?${params.toString()}`)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        router.push(`/gear/${suggestions[selectedIndex].id}`)
        setShowSuggestions(false)
      } else {
        handleSearch(query)
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search cameras, lenses, lighting..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          className="pl-10 pr-10 bg-secondary border-border"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => {
              setQuery("")
              handleSearch("")
              inputRef.current?.focus()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Autocomplete suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((item, index) => (
            <button
              key={item.id}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center gap-3",
                selectedIndex === index && "bg-secondary",
              )}
              onClick={() => {
                router.push(`/gear/${item.id}`)
                setShowSuggestions(false)
              }}
            >
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="overflow-hidden">
                <div className="font-medium text-foreground truncate">{item.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{item.category}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
