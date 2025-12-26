import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#000000] pt-[120px] lg:pt-0">
      {/* Background - Optional subtle gradient or grid could go here, but keeping it clean black for now */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-[#000000] to-[#000000]"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-[40px] lg:gap-[60px] xl:gap-[80px]">
        
        {/* Left Column: Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:flex-1">
           <h1 
            className="text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.15] gradient-heading pb-2 lg:pb-3"
          >
            World-Class Gear for Ugandan storytellers.
          </h1>

          <p className="mt-6 lg:mt-8 text-[16px] lg:text-[18px] leading-[1.5] text-[#B4B4B4] max-w-[640px] font-normal">
            Professional production equipment trusted by Uganda&apos;s leading filmmakers, 
            agencies, and content creators.
          </p>

          <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Button asChild className="bg-[#ECECEC] hover:bg-white text-black rounded-md h-[54px] px-12 text-[14px] font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center w-full sm:w-auto border border-transparent">
              <Link href="/inventory">
                Browse Equipment
              </Link>
            </Button>
            <Link 
              href="/how-it-works" 
              className="text-[14px] font-semibold leading-6 text-white transition-all flex items-center justify-center px-12 h-[54px] rounded-md bg-white/5 hover:bg-white/10 group w-full sm:w-auto border border-transparent"
            >
              How It Works <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-[600px] xl:w-[640px] flex justify-center lg:justify-end order-first lg:order-last">
          <div className="relative w-full aspect-square max-w-[500px] lg:max-w-none">
             <Image
              src="/gear/9Yards-Films-hero-serction-02.jpg"
              alt="9Yards Films Hero"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  )
}
