#!/bin/bash

# 🚀 9YARDS GEAR - DEPLOYMENT SCRIPT
# Run this to deploy your site to production

echo "=========================================="
echo "🚀 9YARDS GEAR - DEPLOYING TO PRODUCTION"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project directory!"
    echo "Please cd to: c:\Users\Stuart\Desktop\9YARDS\9Yards Official\9Yards-gear"
    exit 1
fi

echo "✅ Project directory confirmed"
echo ""

# Check if build works
echo "📦 Building project..."
pnpm build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""

# Show git status
echo "📊 Current git status:"
git status --short

echo ""
echo "=========================================="
echo "🎯 DEPLOYMENT OPTIONS"
echo "=========================================="
echo ""
echo "Choose your deployment method:"
echo ""
echo "1. AUTOMATIC (Recommended)"
echo "   - Commit changes and push to GitHub"
echo "   - Netlify auto-deploys"
echo ""
echo "2. MANUAL"
echo "   - Go to Netlify dashboard"
echo "   - Click 'Trigger deploy'"
echo ""

read -p "Deploy now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 Committing changes..."
    git add .
    git commit -m "🚀 Production deployment with API keys configured - Ready to go live"
    
    echo ""
    echo "⬆️  Pushing to GitHub..."
    git push origin redesign-gear
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "=========================================="
        echo "✅ DEPLOYMENT INITIATED!"
        echo "=========================================="
        echo ""
        echo "Next steps:"
        echo "1. Go to: https://app.netlify.com"
        echo "2. Watch deploy progress (2-5 minutes)"
        echo "3. Once live, test at: https://gear.9yards.co.ug"
        echo ""
        echo "Test checklist in: READY_TO_DEPLOY.md"
        echo ""
    else
        echo ""
        echo "❌ Push failed! Check your GitHub credentials."
    fi
else
    echo ""
    echo "Deployment cancelled. Run this script again when ready."
fi

echo ""
echo "=========================================="
echo "📚 DOCUMENTATION"
echo "=========================================="
echo "- Pre-deployment guide: PRE_DEPLOYMENT_CHECKLIST.md"
echo "- Ready to deploy: READY_TO_DEPLOY.md"
echo "- Quick reference: DEPLOY_QUICK_REFERENCE.md"
echo "=========================================="
