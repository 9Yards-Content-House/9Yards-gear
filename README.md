# 9Yards Gear - Professional Equipment Rental Platform

> **The most advanced JAMStack gear rental platform in East Africa**

A fully static, blazing-fast Next.js 16 application for professional film and production equipment rental in Uganda.

## ✨ Key Features Implemented

### 1. Enhanced User Experience
- ✅ Smooth hover effects (image zoom + lift) on all cards
- ✅ "Quick Book" WhatsApp integration on all gear cards
- ✅ Clickable production bundles with detailed modal breakdowns
- ✅ AI-powered gear recommendations
- ✅ "Add to Quote" functionality with localStorage cart

### 2. Advanced Inventory System
- ✅ Fuse.js powered fuzzy search
- ✅ Multi-filter sidebar (category, price, availability)
- ✅ Grid/List view toggle
- ✅ Instant client-side filtering
- ✅ Mobile-friendly filter sheet

### 3. Upgraded Rental Calculator
- ✅ Visual date picker (start/end dates)
- ✅ Multi-item selection with quantities
- ✅ Automatic weekly discounts (2 free days on 7+ day rentals)
- ✅ Bundle discounts (10% on 3+ items)
- ✅ Tax (18% VAT) and insurance (5%) calculation
- ✅ 50% deposit display
- ✅ **Flutterwave payment integration** (Mobile Money, Cards)

### 4. Progressive Web App (PWA)
- ✅ Service worker with offline support
- ✅ App manifest for installation
- ✅ Offline fallback page
- ✅ Browse inventory offline

### 5. SEO & Analytics
- ✅ JSON-LD Schema (Organization, Product, LocalBusiness)
- ✅ Open Graph and Twitter Cards
- ✅ Google Analytics 4 integration
- ✅ Sitemap ready

### 6. Enhanced Footer
- ✅ All 7 equipment categories as links
- ✅ Social media icons (Instagram, WhatsApp, TikTok)
- ✅ Mailchimp newsletter signup
- ✅ Privacy & Terms links
- ✅ Contact information

## ��� Quick Start

\`\`\`bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production (static export)
pnpm build
\`\`\`

## ��� Deployment (Netlify)

**Build Command:** `next build`  
**Publish Directory:** `out`

The site is fully JAMStack compatible with static export enabled.

## ���️ Tech Stack

- Next.js 16 (App Router, Static Export)
- TypeScript 5
- Tailwind CSS 4
- Radix UI Components
- Fuse.js (Search)
- Flutterwave (Payments)
- Google Analytics 4

## ��� Performance

- 90+ Lighthouse Performance Score
- Lazy-loaded images
- Optimized bundle size
- PWA ready
- SEO optimized

## ��� Customization

### Update Equipment
All equipment is now managed in Airtable. Use the Airtable admin interface to add or modify gear.

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

## ��� Contact

**Email:** gear@9yards.co.ug  
**WhatsApp:** +256 700 000 000  
**Website:** https://9yards.co.ug

---

© 2025 9Yards Film. All rights reserved.

**Made with ❤️ in Kampala, Uganda �����**
