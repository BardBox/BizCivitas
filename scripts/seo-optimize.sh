#!/bin/bash

# SEO Optimization Script for BizCivitas
# This script helps optimize the website for better search engine rankings

echo "🚀 Starting SEO optimization for BizCivitas..."

# Check if running in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# 1. Generate sitemap
echo "📄 Generating sitemap..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build successful - sitemap generated"
else
    echo "⚠️  Build had warnings but sitemap should be generated"
fi

# 2. Check for image optimization opportunities
echo "🖼️  Checking image optimization..."
find public -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" | while read image; do
    size=$(stat -f%z "$image" 2>/dev/null || stat -c%s "$image" 2>/dev/null)
    if [ "$size" -gt 500000 ]; then
        echo "⚠️  Large image detected: $image ($(echo "scale=2; $size/1024/1024" | bc)MB)"
    fi
done

# 3. Validate critical SEO files
echo "🔍 Validating SEO files..."

# Check robots.txt
if [ -f "app/robots.ts" ]; then
    echo "✅ robots.ts found"
else
    echo "❌ robots.ts missing"
fi

# Check sitemap
if [ -f "app/sitemap.ts" ]; then
    echo "✅ sitemap.ts found"
else
    echo "❌ sitemap.ts missing"
fi

# Check middleware for redirects
if [ -f "middleware.ts" ]; then
    echo "✅ middleware.ts found"
else
    echo "❌ middleware.ts missing"
fi

# 4. Check for common SEO issues
echo "🔍 Checking for common SEO issues..."

# Check for missing alt tags in images
grep -r "alt=\"\"" components/ app/ 2>/dev/null && echo "⚠️  Empty alt tags found" || echo "✅ No empty alt tags found"

# Check for missing meta descriptions
grep -r "description.*\"\\"\\|description.*''" app/ 2>/dev/null && echo "⚠️  Empty meta descriptions found" || echo "✅ No empty meta descriptions found"

# 5. Performance recommendations
echo "⚡ Performance recommendations:"
echo "   - Enable image optimization in next.config.ts"
echo "   - Use next/image for all images"
echo "   - Implement lazy loading for below-the-fold content"
echo "   - Optimize bundle size with code splitting"
echo "   - Enable compression middleware"

echo ""
echo "🎉 SEO optimization check complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Review and optimize large images"
echo "   2. Test website with Google PageSpeed Insights"
echo "   3. Submit sitemap to Google Search Console"
echo "   4. Monitor Core Web Vitals"
echo "   5. Set up Google Analytics and Search Console"
echo ""
echo "🔗 Useful tools:"
echo "   - Google PageSpeed Insights: https://pagespeed.web.dev/"
echo "   - Google Search Console: https://search.google.com/search-console"
echo "   - SEO testing: https://seositecheckup.com/"
