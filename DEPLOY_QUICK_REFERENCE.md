# ⚡ DEPLOYMENT QUICK REFERENCE

**Use this as your deployment command center**

---

## 🎯 CURRENT STATUS

Site: **Not Yet Deployed**  
Domain: gear.9yards.co.ug  
Branch: redesign-gear

---

## ✅ QUICK CHECKLIST

Copy this and check off as you go:

```
PHASE 1: LOCAL (10 min)
[ ] 1. Run pnpm build - SUCCESS with 0 errors
[ ] 2. Verify out/ directory exists

PHASE 2: GET API KEYS (45 min)
[ ] 3. Flutterwave - LIVE key copied
[ ] 4. Google Analytics - Measurement ID confirmed
[ ] 5. Netlify Identity - Will enable after deployment
[ ] 6. Airtable - API key + Base ID (optional)
[ ] 7. SendGrid - API key + verified email (optional)
[ ] 8. Twilio - Account SID + Auth Token (optional)

PHASE 3: NETLIFY (20 min)
[ ] 9. Created Netlify site
[ ] 10. Added 7 required environment variables
[ ] 11. Added optional variables (if using services)
[ ] 12. Domain gear.9yards.co.ug configured
[ ] 13. DNS CNAME record added

PHASE 4: DEPLOY & TEST (15 min)
[ ] 14. Triggered deployment - SUCCESS
[ ] 15. Tested all 7 core features
[ ] 16. Payment test with test card
[ ] 17. Analytics tracking confirmed
[ ] 18. Enabled Netlify Identity (optional)

FINAL
[ ] 19. All features working
[ ] 20. Ready to announce!
```

---

## 🔑 REQUIRED ENVIRONMENT VARIABLES

Set these in Netlify:

```bash
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-xxxxx (LIVE KEY!)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-5TQZXSDWSF
NEXT_PUBLIC_CONTACT_EMAIL=bookings@9yards.co.ug
NEXT_PUBLIC_WHATSAPP_NUMBER=256783791730 (no + or spaces)
NEXT_PUBLIC_SITE_URL=https://gear.9yards.co.ug
NODE_ENV=production
NODE_VERSION=20
```

---

## 🧪 TEST PAYMENT CARDS

**Use these for testing BEFORE going live:**

```
Visa Test Card
Number: 5438898014588007
Expiry: 12/25
CVV: 564

Mastercard Test Card
Number: 5399975300000015
Expiry: 12/25
CVV: 564
```

---

## 🌐 IMPORTANT URLS

**Your Accounts:**
- Netlify: https://app.netlify.com
- Flutterwave: https://dashboard.flutterwave.com
- Google Analytics: https://analytics.google.com/web/
- GitHub: https://github.com/9Yards-Content-House/9Yards-gear

**After Deployment:**
- Live Site: https://gear.9yards.co.ug
- Netlify Admin: https://app.netlify.com/sites/[your-site]/overview
- Build Logs: https://app.netlify.com/sites/[your-site]/deploys

---

## 🚨 COMMON MISTAKES TO AVOID

❌ **DON'T:**
1. Use test Flutterwave key in production
2. Add + or spaces to WhatsApp number
3. Forget NEXT_PUBLIC_ prefix on public variables
4. Skip testing after deployment
5. Deploy with build errors

✅ **DO:**
1. Use LIVE Flutterwave key (starts with FLWPUBK- not FLWPUBK_TEST-)
2. WhatsApp format: 256783791730 (no symbols)
3. Test locally first (pnpm build)
4. Verify all environment variables
5. Test with test cards before real money

---

## 💾 BUILD COMMANDS

```bash
# Local development
pnpm dev

# Build for production
pnpm build

# Check build output
ls out/

# Lint code
pnpm lint
```

---

## 🎯 DNS CONFIGURATION

Add this CNAME record to your DNS:

```
Type: CNAME
Name: gear
Value: your-site-name.netlify.app
TTL: 3600
```

---

## 📱 TEST CHECKLIST (On Live Site)

After deployment, test these:

```
[ ] Homepage loads
[ ] Inventory page shows all gear
[ ] Search works
[ ] Filters work
[ ] Gear detail pages load
[ ] Images display
[ ] Add to quote works
[ ] Calculator shows prices
[ ] Payment modal opens
[ ] Test payment completes
[ ] WhatsApp buttons work
[ ] Analytics tracking (check GA)
[ ] Mobile responsive
[ ] No console errors (F12)
```

---

## ⏱️ TIME ESTIMATES

| Phase | Task | Time |
|-------|------|------|
| 1 | Local verification | 10 min |
| 2 | Flutterwave setup | 10 min |
| 2 | Google Analytics | 5 min |
| 2 | Airtable (optional) | 15 min |
| 2 | SendGrid (optional) | 10 min |
| 2 | Twilio (optional) | 10 min |
| 3 | Create Netlify site | 5 min |
| 3 | Set environment vars | 10 min |
| 3 | Configure domain | 5 min |
| 4 | Deploy & test | 15 min |
| **TOTAL** | **All steps** | **60-90 min** |

---

## 🆘 QUICK TROUBLESHOOTING

**Build Fails:**
→ Check environment variables in Netlify
→ Verify Node version is 20
→ Check build logs for specific error

**Payment Not Working:**
→ Verify Flutterwave key is LIVE not test
→ Check key is in Netlify environment variables
→ Try test card first

**Analytics Not Tracking:**
→ Verify GA Measurement ID correct
→ Check in incognito mode
→ Wait 24-48hrs for full data

**Domain Not Working:**
→ Verify DNS CNAME added
→ Wait for propagation (up to 24hrs)
→ Check SSL certificate active in Netlify

---

## 📞 SUPPORT

**Full Guide:** PRE_DEPLOYMENT_CHECKLIST.md  
**Features:** PREMIUM_FEATURES_GUIDE.md  
**Technical:** DEVELOPER_GUIDE.md

**Need Help?**
- Check documentation files
- Review Netlify deploy logs
- Check browser console (F12)

---

## ✨ SUCCESS CRITERIA

Your deployment is successful when:

✅ Build completes with 0 errors  
✅ Site loads at https://gear.9yards.co.ug  
✅ Test payment completes  
✅ Analytics shows your visit  
✅ All images load  
✅ No console errors  
✅ Mobile works perfectly  

---

**Last Updated:** December 16, 2025  
**Status:** Ready for deployment  
**Next Step:** Open PRE_DEPLOYMENT_CHECKLIST.md and start Phase 1
