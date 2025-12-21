import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedGear } from "@/components/home/featured-gear"
import { CategoriesSection } from "@/components/home/categories-section"
import { GearBundles } from "@/components/bundles/gear-bundles"
import { HowItWorks } from "@/components/home/how-it-works"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { CTASection } from "@/components/home/cta-section"
import { TrustIndicators } from "@/components/home/trust-indicators"
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema } from "@/components/seo/schema-org"

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebSiteSchema />
      <Header />
      <main id="main-content">
        <HeroSection />
        <FeaturedGear />
        <CategoriesSection />
        <GearBundles />
        <HowItWorks />
        <TestimonialsSection />
        <WhyChooseUs />
        <CTASection />
        <TrustIndicators />
      </main>
      <Footer />
    </>
  )
}

