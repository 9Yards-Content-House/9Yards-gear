"use client"

import React, { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GearCategory } from "@/lib/gear-data"

interface CategoryCardProps {
  category: GearCategory & { itemCount: number }
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/inventory?category=${category.id}`}
      className="group relative block flex-shrink-0 w-[280px] sm:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
    >
      {/* Background Image */}
      {category.image ? (
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-80"
          sizes="(max-width: 768px) 320px, 400px"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
           <span className="text-zinc-700 text-4xl font-bold opacity-20">{category.name}</span>
        </div>
      )}

      {/* Overlays */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/80 via-black/20 to-transparent p-8">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
            {category.name}
          </h3>
          <p className="text-white/70 text-sm font-medium">
            {category.itemCount} {category.itemCount === 1 ? "item" : "items"} available
          </p>
        </div>
      </div>
      
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-2xl transition-colors duration-300 shadow-[inset_0_0_40px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]" />
    </Link>
  )
}

interface CategoryCarouselProps {
  categories: (GearCategory & { itemCount: number })[]
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl gradient-heading pb-1">
              Browse by Category
            </h2>
            <p className="text-muted-foreground mt-2">
              From cameras to audio, explore our full range of professional equipment organized for easy browsing.
            </p>
          </div>
          
          <div className="flex gap-3 mb-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border",
                canScrollLeft 
                  ? "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600" 
                  : "bg-zinc-900 border-zinc-800 text-zinc-600 opacity-50 cursor-not-allowed"
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border",
                canScrollRight 
                  ? "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600" 
                  : "bg-zinc-900 border-zinc-800 text-zinc-600 opacity-50 cursor-not-allowed"
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 pt-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Peeking spacer for start */}
          <div className="flex-shrink-0 w-[0px] lg:w-[0px]" />
          
          {categories.map((category) => (
            <div key={category.id} className="snap-start first:pl-0">
              <CategoryCard category={category} />
            </div>
          ))}
          
          {/* Peeking spacer for end */}
          <div className="flex-shrink-0 w-[40px] lg:w-[100px]" />
        </div>
      </div>
    </section>
  )
}
