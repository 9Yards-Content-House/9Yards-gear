# 9Yards Gear - Deployment & Setup Guide

## Pre-Deployment Checklist

### 1. Environment Variables
All critical environment variables are set in `.env.local` and `.env.production`:

**Required Variables:**
```bash
# Flutterwave (Payment)
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_live_key

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-5TQZXSDWSF

# Contact
NEXT_PUBLIC_CONTACT_EMAIL=bookings@9yards.co.ug
NEXT_PUBLIC_WHATSAPP_NUMBER=256783791730
NEXT_PUBLIC_SITE_URL=https://gear.9yards.co.ug
```

### 2. Netlify Configuration

**Environment Setup in Netlify Dashboard:**
1. Go to Site Settings → Build & Deploy → Environment
2. Add all variables from `.env.production`
3. Set `NODE_ENV=production`
4. Ensure Node version is 20+

**Build Settings:**
- Build command: `pnpm build`
- Publish directory: `out`

### 3. Flutterwave Setup

1. Get live public key from [Flutterwave Dashboard](https://dashboard.flutterwave.com)
2. Add to Netlify environment variables
3. Test with test cards:
   - Visa: 5438898014588007 (12/25, 564)
   - Mastercard: 5399975300000015 (12/25, 564)

### 4. Features & Functionality

#### Payment Processing ✓
- ✅ Flutterwave integration with proper error handling
- ✅ Customer data collection (name, email, phone)
- ✅ Payment history tracking
- ✅ Transaction reference generation
- ✅ Support for Mobile Money, Cards, USSD

#### Booking & Rental ✓
- ✅ Date selection with conflict detection
- ✅ Dynamic pricing with discounts
- ✅ Quantity selection
- ✅ Real-time price calculation
- ✅ Booking request submission

#### Inventory ✓
- ✅ Advanced filtering (category, price, availability)
- ✅ Search with fuzzy matching
- ✅ Grid & list view toggle
- ✅ Sorting (price, name, featured, newest)
- ✅ Gear comparison tool

#### User Experience ✓
- ✅ Mobile-first responsive design
- ✅ Dark theme optimization
- ✅ Accessibility improvements
- ✅ Performance monitoring
- ✅ Error boundaries
- ✅ Loading states

### 5. Performance Optimizations

**Implemented:**
- Image optimization with lazy loading
- Code splitting with dynamic imports
- Browser caching headers (1 year for static assets)
- Minification and compression
- Web Vitals monitoring
- Debounced event handlers
- Optimized package imports

**Target Metrics:**
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to First Byte (TTFB): < 600ms

### 6. Security Headers

All requests include:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: [configured for Flutterwave]
```

### 7. Testing Before Deployment

```bash
# Install dependencies
pnpm install

# Build locally
pnpm build

# Test payment flow
# - Add items to calculator
# - Verify dates can be selected
# - Complete payment form
# - Test Flutterwave modal

# Test all pages
# - Home
# - Inventory with filters
# - Gear details
# - Calculator
# - Contact form
# - Comparison page
```

### 8. Deployment Steps

1. **Test locally:**
   ```bash
   pnpm build
   pnpm start
   ```

2. **Push to production branch:**
   ```bash
   git add .
   git commit -m "Production deployment"
   git push origin main
   ```

3. **Deploy to Netlify:**
   - Manual: Upload `out` folder to Netlify
   - Auto: Enable GitHub integration for auto-deployment

4. **Post-Deployment Verification:**
   - ✅ All pages load correctly
   - ✅ Flutterwave payment works
   - ✅ Mobile responsiveness verified
   - ✅ Google Analytics tracking
   - ✅ Search functionality
   - ✅ Filters working
   - ✅ Contact form submission

### 9. Monitoring & Maintenance

**Analytics:**
- Google Analytics tracks all major events
- Payment events logged
- Search queries tracked
- Filter usage monitored

**Error Tracking:**
- Check browser console for errors
- Monitor Netlify deploy logs
- Review Flutterwave transaction logs

**Performance:**
- Monitor Core Web Vitals in Google Analytics
- Check Netlify analytics
- Review image optimization

### 10. Troubleshooting

**Flutterwave not loading:**
- Verify public key in environment variables
- Check browser console for CORS errors
- Ensure script loads: `https://checkout.flutterwave.com/v3.js`

**Payment form issues:**
- Validate customer data collection
- Check phone number formatting
- Verify email validation

**Mobile responsiveness issues:**
- Test on actual devices
- Use Chrome DevTools device emulation
- Check viewport meta tags

**Build failures:**
- Run `pnpm install --force`
- Clear `.next` directory
- Check Node version (should be 20+)

## Support

For issues or questions:
- Email: bookings@9yards.co.ug
- WhatsApp: +256 783 791 730
