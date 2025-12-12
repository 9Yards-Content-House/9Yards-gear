import Link from "next/link"
import { Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  inventory: [
    { name: "Cameras", href: "/inventory?category=cameras" },
    { name: "Lenses", href: "/inventory?category=lenses" },
    { name: "Lighting", href: "/inventory?category=lighting" },
    { name: "Audio", href: "/inventory?category=audio" },
    { name: "Drones & Motion", href: "/inventory?category=drones" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Rental Terms", href: "/about#terms" },
    { name: "FAQ", href: "/about#faq" },
  ],
  network: [
    { name: "9Yards Film", href: "https://film.9yards.co.ug", external: true },
    { name: "9Yards Main", href: "https://9yards.co.ug", external: true },
  ],
}

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/9yardsfilm", icon: Instagram },
  { name: "Twitter", href: "https://twitter.com/9yardsfilm", icon: Twitter },
  { name: "YouTube", href: "https://youtube.com/@9yardsfilm", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">9Y</span>
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">9Yards</span>
                <span className="text-xl font-light text-primary ml-1">Gear</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Premium film and production equipment rental in Uganda. Empowering creators with professional gear.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Inventory Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Inventory</h3>
            <ul className="space-y-2">
              {footerLinks.inventory.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Kampala, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="tel:+256700000000"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  +256 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:gear@9yards.co.ug"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  gear@9yards.co.ug
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} 9Yards Film. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
