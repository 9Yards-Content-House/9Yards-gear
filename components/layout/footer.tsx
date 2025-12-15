import Link from "next/link"
import { Instagram, Youtube, Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  inventory: [
    { name: "Cameras", href: "/inventory?category=cameras" },
    { name: "Lenses", href: "/inventory?category=lenses" },
    { name: "Lighting", href: "/inventory?category=lighting" },
    { name: "Audio Equipment", href: "/inventory?category=audio" },
    { name: "Drones & Motion", href: "/inventory?category=drones" },
    { name: "Grip & Support", href: "/inventory?category=grip" },
    { name: "Accessories", href: "/inventory?category=accessories" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Calculator", href: "/calculator" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  network: [
    { name: "9Yards Film", href: "https://film.9yards.co.ug", external: true },
    { name: "9Yards Main", href: "https://9yards.co.ug", external: true },
  ],
}

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/9yardsfilm", icon: Instagram },
  { name: "WhatsApp", href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '256783791730'}`, icon: Phone },
  { name: "TikTok", href: "https://tiktok.com/@9yardsfilm", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">9Y</span>
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">9Yards</span>
                <span className="text-xl font-light text-primary ml-1">Gear</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Premium film and production equipment rental in Uganda. Empowering creators with professional gear at
              affordable rates.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Stay Updated</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Get notifications about new gear, special offers, and production tips.
              </p>
              {/* Mailchimp Embed */}
              <div id="mc_embed_shell">
                <div id="mc_embed_signup">
                  <form
                    action="https://9yards.us12.list-manage.com/subscribe/post?u=YOUR_USER_ID&amp;id=YOUR_LIST_ID"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate flex gap-2"
                    target="_blank"
                  >
                    <Input
                      type="email"
                      name="EMAIL"
                      id="mce-EMAIL"
                      placeholder="your@email.com"
                      required
                      className="flex-1 bg-background"
                    />
                    <Button type="submit" size="icon" className="shrink-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Follow Us</h3>
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
          </div>

          {/* Quick Links - Inventory */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Browse by Category</h3>
            <ul className="space-y-2.5">
              {footerLinks.inventory.map((link) => (
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

          {/* Company Links */}
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

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Kampala, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="tel:+256783791730"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +256 700 000 000
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
            </ul>
            <Button asChild className="w-full mt-6" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} 9Yards Film. All rights reserved. Empowering African storytellers.
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
          </div>
        </div>
      </div>
    </footer>
  )
}
