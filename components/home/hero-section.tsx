"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col pt-[180px] items-center overflow-hidden bg-[#000000]">
      {/* Background - Optional subtle gradient or grid could go here, but keeping it clean black for now */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-[#000000] to-[#000000]"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 text-center flex flex-col items-center">
        
        <h1 
          className="text-[36px] sm:text-[54px] font-[600] leading-[1.15] tracking-normal text-transparent bg-clip-text text-center text-balance pb-2"
          style={{ 
            backgroundImage: 'linear-gradient(87.11deg, #FFFFFF 17.87%, rgba(255, 255, 255, 0.9) 45.18%, rgba(255, 255, 255, 0.86) 57.76%)',
            textShadow: '0px 4px 24px rgba(0, 0, 0, 1)'
          }}
        >
          World-Class Gear for Ugandan storytellers.
        </h1>

        <p className="mt-8 text-[20px] sm:text-[22px] text-[#B4B4B4] max-w-[640px] mx-auto leading-relaxed text-pretty font-medium">
          Professional production equipment trusted by Uganda&apos;s leading filmmakers, 
          agencies, and content creators.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto px-6 sm:px-0">
          <Button asChild className="bg-gradient-to-b from-white to-[#E4E4E4] hover:to-white text-black rounded-full h-[54px] px-12 text-[14px] font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center w-full sm:w-auto">
            <Link href="/inventory">
              Browse Equipment
            </Link>
          </Button>
          <Link 
            href="/how-it-works" 
            className="text-[14px] font-semibold leading-6 text-white transition-all flex items-center justify-center px-12 h-[54px] rounded-full bg-white/5 hover:bg-white/10 group w-full sm:w-auto"
          >
            How It Works <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
