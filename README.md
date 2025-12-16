# 9Yards Gear - Professional Equipment Rental Platform

> **The most advanced JAMStack gear rental platform in East Africa**

A fully static, blazing-fast Next.js 16 application for professional film and production equipment rental in Uganda.

## âœ¨ Key Features Implemented

### 1. Enhanced User Experience
- âœ… Smooth hover effects (image zoom + lift) on all cards
- âœ… "Quick Book" WhatsApp integration on all gear cards
- âœ… Clickable production bundles with detailed modal breakdowns
- âœ… AI-powered gear recommendations
- âœ… "Add to Quote" functionality with localStorage cart

### 2. Advanced Inventory System
- âœ… Fuse.js powered fuzzy search
- âœ… Multi-filter sidebar (category, price, availability)
- âœ… Grid/List view toggle
- âœ… Instant client-side filtering
- âœ… Mobile-friendly filter sheet

### 3. Upgraded Rental Calculator
- âœ… Visual date picker (start/end dates)
- âœ… Multi-item selection with quantities
- âœ… Automatic weekly discounts (2 free days on 7+ day rentals)
- âœ… Bundle discounts (10% on 3+ items)
- âœ… Tax (18% VAT) and insurance (5%) calculation
- âœ… 50% deposit display
- âœ… **Flutterwave payment integration** (Mobile Money, Cards)

### 4. Progressive Web App (PWA)
- âœ… Service worker with offline support
- âœ… App manifest for installation
- âœ… Offline fallback page
- âœ… Browse inventory offline

### 5. SEO & Analytics
- âœ… JSON-LD Schema (Organization, Product, LocalBusiness)
- âœ… Open Graph and Twitter Cards
- âœ… Google Analytics 4 integration
- âœ… Sitemap ready

### 6. Enhanced Footer
- âœ… All 7 equipment categories as links
- âœ… Social media icons (Instagram, WhatsApp, TikTok)
- âœ… Mailchimp newsletter signup
- âœ… Privacy & Terms links
- âœ… Contact information

## íº€ Quick Start

\`\`\`bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production (static export)
pnpm build
\`\`\`

## í³¦ Deployment (Netlify)

**Build Command:** `next build`  
**Publish Directory:** `out`

The site is fully JAMStack compatible with static export enabled.

## í» ï¸ Tech Stack

- Next.js 16 (App Router, Static Export)
- TypeScript 5
- Tailwind CSS 4
- Radix UI Components
- Fuse.js (Search)
- Flutterwave (Payments)
- Google Analytics 4

## í³Š Performance

- 90+ Lighthouse Performance Score
- Lazy-loaded images
- Optimized bundle size
- PWA ready
- SEO optimized

## í¾¨ Customization

### Update Equipment
Edit `data/gear.json` to add/modify equipment.

### Configure Payments
Update Flutterwave key in `components/calculator/rental-calculator.tsx`:
\`\`\`typescript
public_key: "FLWPUBK_TEST-YOUR-KEY" // Replace with live key
\`\`\`

### Google Analytics
Update tracking ID in `app/layout.tsx`:
\`\`\`typescript
gtag('config', 'G-XXXXXXXXXX') // Your GA4 ID
\`\`\`

## í³ Contact

**Email:** gear@9yards.co.ug  
**WhatsApp:** +256 700 000 000  
**Website:** https://9yards.co.ug

---

Â© 2025 9Yards Film. All rights reserved.

**Made with â¤ï¸ in Kampala, Uganda í·ºï¿½ï¿½**
