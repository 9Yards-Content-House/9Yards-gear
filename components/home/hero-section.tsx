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
        
        <h1 className="text-[40px] sm:text-[64px] md:text-[80px] font-semibold tracking-[-0.015em] text-white leading-[1.1] sm:leading-[1.05] text-balance">
          World-Class Gear for Ugandan storytellers.
        </h1>

        <p className="mt-8 text-[20px] sm:text-[22px] text-[#B4B4B4] max-w-[640px] mx-auto leading-relaxed text-pretty font-medium">
          Professional production equipment trusted by Uganda&apos;s leading filmmakers, 
          agencies, and content creators.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
           <div className="mt-8 flex items-center justify-center gap-x-6">
            <Button asChild className="bg-gradient-to-b from-white to-[#E4E4E4] hover:to-[#D4D4D4] text-black rounded-full h-[54px] px-12 text-[14px] font-semibold transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_0_4px_rgba(255,255,255,0.1)] flex items-center justify-center">
              <Link href="/inventory">
                Browse Equipment
              </Link>
            </Button>
            <Link href="/how-it-works" className="text-[15px] font-medium leading-6 text-[#B4B4B4] hover:text-white transition-all flex items-center px-6 h-[54px] rounded-full bg-white/5 hover:bg-white/10 group">
              How It Works <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
