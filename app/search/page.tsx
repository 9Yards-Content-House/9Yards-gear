"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGear, formatPrice } from "@/lib/gear-context"
import { 
  Search, ChevronRight, ArrowRight, Filter, SortAsc, 
  Phone, MessageCircle, Package, X
} from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  
  const { gear, categories, isLoading } = useGear()
  
  useEffect(() => {
    const q = searchParams.get("q")
    if (q) setQuery(q)
  }, [searchParams])
  
  const results = useMemo(() => {
    if (!query.trim()) return []
    
    const searchTerms = query.toLowerCase().split(" ").filter(Boolean)
    
    let filtered = gear.filter((item) => {
      const searchableText = `${item.name} ${item.category} ${item.description || ""}`.toLowerCase()
      return searchTerms.every((term) => searchableText.includes(term))
    })
    
    if (categoryFilter !== "all") {
      filtered = filtered.filter((item) => item.category === categoryFilter)
    }
    
    // Sort results
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.pricePerDay - b.pricePerDay)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.pricePerDay - a.pricePerDay)
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }
    
    return filtered
  }, [gear, query, categoryFilter, sortBy])
  
  // Did you mean suggestions
  const suggestions = useMemo(() => {
    if (results.length > 0 || !query.trim()) return []
    
    const allTerms = new Set<string>()
    gear.forEach((item) => {
      item.name.toLowerCase().split(" ").forEach((word) => allTerms.add(word))
      allTerms.add(item.category.toLowerCase())
    })
    
    const searchTerm = query.toLowerCase()
    const similar = Array.from(allTerms).filter((term) => {
      if (term.length < 3) return false
      return term.includes(searchTerm.slice(0, 3)) || searchTerm.includes(term.slice(0, 3))
    }).slice(0, 5)
    
    return similar
  }, [gear, query, results.length])
  
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Search</span>
          </nav>

          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {query ? `Results for: "${query}"` : "Search Equipment"}
            </h1>
            
            {/* Search Bar */}
            <div className="flex gap-2 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search cameras, lenses, lighting, audio..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {query && (
                <Button variant="ghost" size="icon" onClick={() => setQuery("")}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Filters & Sort */}
          {query && (
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <span className="text-sm text-muted-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </span>
            </div>
          )}

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-4/3 bg-secondary rounded-xl animate-pulse" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((item) => (
                <Link key={item.id} href={`/gear/${item.id}`}>
                  <Card className="group h-full hover:border-primary transition-colors overflow-hidden">
                    <div className="aspect-4/3 overflow-hidden bg-secondary">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{formatPrice(item.pricePerDay)}/day</span>
                        {item.available ? (
                          <Badge variant="outline" className="text-green-500 border-green-500">Available</Badge>
                        ) : (
                          <Badge variant="secondary">Booked</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No results found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn&apos;t find any equipment matching &quot;{query}&quot;
              </p>
              
              {/* Did you mean suggestions */}
              {suggestions.length > 0 && (
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-2">Did you mean:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* No results CTA */}
              <Card className="max-w-md mx-auto bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">Can&apos;t find what you need?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact us we might have it in stock or can source it for you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button asChild>
                      <Link href="/contact">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Us
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="bg-transparent">
                      <a href="https://wa.me/256700488870" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Start your search</h2>
              <p className="text-muted-foreground mb-6">
                Search for cameras, lenses, lighting, audio equipment, and more
              </p>
              <Button asChild>
                <Link href="/inventory">
                  Browse All Equipment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
