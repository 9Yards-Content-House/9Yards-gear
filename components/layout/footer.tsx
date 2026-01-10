

import Link from "next/link"
import Image from "next/image"
import { MapPin, Clock, ExternalLink } from "lucide-react"
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6"
import { getAllCategoriesAsync } from "@/lib/gear-data"

const staticFooterLinks = {
  rentalInfo: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing & Rates", href: "/calculator" },
    { name: "Rental Policies", href: "/policies" },
    { name: "Equipment Care", href: "/equipment-care" },
    { name: "FAQ", href: "/faq" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Resources", href: "#" },
    { name: "Careers", href: "#" },
  ],
  network: [
    { name: "9Yards Main", href: "https://9yards.co.ug" },
    { name: "9Yards Content House", href: "https://contenthouse.9yards.co.ug" },
    { name: "9Yards Food", href: "https://food.9yards.co.ug" },
    { name: "9Yards Film", href: "https://film.9yards.co.ug" },
  ],
}

// Social links with actual URLs for SEO
const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/9yards_content_house/", icon: FaInstagram },
  { name: "TikTok", href: "https://www.tiktok.com/@9.yards.content.house", icon: FaTiktok },
  { name: "YouTube", href: "https://www.youtube.com/@9Yards-ch", icon: FaYoutube },
]

export async function Footer() {
  const allCategories = await getAllCategoriesAsync()
  const footerCategories = allCategories.slice(0, 8).map(cat => ({
    name: cat.name,
    href: `/inventory?category=${cat.id}`
  }))

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/9Yards-Film-2D-Logo_50.png"
                alt="9Yards Gear"
                width={200}
                height={70}
                className="h-12 w-auto sm:h-14 md:h-16"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm whitespace-pre-line">
              Kampala&apos;s trusted equipment rental partner.{"\n"}
              Premium gear. Fair rates. Expert support.
            </p>

            {/* Contact Info (No phone number) */}
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Canoga Suites, Lower Kkonge</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">Business Hours</p>
                  <p>Mon-Fri: 9AM-6PM</p>
                  <p>Sat: 10AM-4PM</p>
                  <p>Sun: By Appointment</p>
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-muted-foreground border border-border hover:border-primary"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Equipment Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Equipment</h3>
            <ul className="space-y-2.5">
              {footerCategories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rental Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Rental Info</h3>
            <ul className="space-y-2.5">
              {staticFooterLinks.rentalInfo.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Network */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2.5">
              {staticFooterLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-foreground mb-4">9Yards Network</h4>
              <ul className="space-y-2.5">
                {staticFooterLinks.network.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {link.name}
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} 9Yards Gear · Part of 9Yards Group
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
