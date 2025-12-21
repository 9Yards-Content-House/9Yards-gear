import Link from "next/link"
import Image from "next/image"
import { Instagram, Youtube, Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  equipment: [
    { name: "Cameras", href: "/inventory?category=cameras" },
    { name: "Lenses", href: "/inventory?category=lenses" },
    { name: "Lighting", href: "/inventory?category=lighting" },
    { name: "Audio Equipment", href: "/inventory?category=audio" },
    { name: "Motion & Drones", href: "/inventory?category=motion" },
    { name: "Grip & Support", href: "/inventory?category=grip" },
    { name: "Accessories & Monitors", href: "/inventory?category=accessories" },
    { name: "Power & Media", href: "/inventory?category=power" },
  ],
  rentalInfo: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Production Packages", href: "/packages" },
    { name: "Rental Policies", href: "/policies" },
    { name: "FAQ", href: "/faq" },
    { name: "Calculator", href: "/calculator" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  network: [
    { name: "9Yards Film", href: "https://film.9yards.co.ug", external: true },
    { name: "9Yards Food", href: "https://food.9yards.co.ug", external: true },
    { name: "9Yards Content House", href: "https://contenthouse.9yards.co.ug", external: true },
    { name: "9Yards Main", href: "https://9yards.co.ug", external: true },
  ],
}

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/9yardsfilm", icon: Instagram },
  { name: "WhatsApp", href: "https://wa.me/256700488870", icon: MessageCircle },
  { name: "YouTube", href: "https://youtube.com/@9yardsfilm", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="9Yards Gear"
                width={200}
                height={70}
                className="h-12 w-auto sm:h-14 md:h-16"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Professional film equipment rental in Kampala. Empowering Uganda's creators with premium gear.
            </p>

            {/* Contact Info */}
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="tel:+256700488870"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  0700 488 870
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:gear@9yards.co.ug"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  gear@9yards.co.ug
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Kampala, Uganda</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>Mon-Fri: 9AM-6PM</p>
                  <p>Sat: 10AM-4PM</p>
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
              {footerLinks.equipment.map((link) => (
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

          {/* Rental Info (NEW) */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Rental Info</h3>
            <ul className="space-y-2.5">
              {footerLinks.rentalInfo.map((link) => (
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
              {footerLinks.company.map((link) => (
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
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-foreground mb-2.5">9Yards Network</h4>
              <ul className="space-y-2">
                {footerLinks.network.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                    >
                      {link.name}
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
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
            </div>
            <p className="text-xs text-muted-foreground hidden md:block">
              Made with ❤️ in Kampala, Uganda
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

