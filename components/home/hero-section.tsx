import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col pt-[180px] items-center overflow-hidden bg-[#000000]">
      {/* Background - Optional subtle gradient or grid could go here, but keeping it clean black for now */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-[#000000] to-[#000000]"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 text-center flex flex-col items-center">
        
        <h1 className="text-[56px] sm:text-[64px] md:text-[80px] font-semibold tracking-[-0.015em] text-white leading-[1.05] text-balance">
          Professional Gear for
          <br />
          <span className="text-white/90">Extraordinary Productions</span>
        </h1>

        <p className="mt-8 text-[20px] sm:text-[22px] text-[#B4B4B4] max-w-[640px] mx-auto leading-relaxed text-pretty font-medium">
          Uganda&apos;s premier film equipment rental house. From cinema cameras to professional audio, 
          access the gear that brings your vision to life.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
           {/* Linear's main button style */}
          <Button asChild className="h-12 px-8 text-base font-medium bg-[#EEEEEE] text-black hover:bg-white rounded-full transition-all bg-linear-to-b from-white to-[#EEEEEE] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.1)]">
            <Link href="/inventory">
              Start building
            </Link>
          </Button>
          
          <Link 
            href="/how-it-works"
            className="group flex items-center gap-1 text-[15px] font-medium text-[#B4B4B4] hover:text-white transition-colors"
          >
            New: See How It Works
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 text-[#B4B4B4] group-hover:text-white" />
          </Link>
        </div>
      </div>
    </section>
  )
}
