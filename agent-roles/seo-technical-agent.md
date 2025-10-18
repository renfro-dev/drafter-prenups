# SEO Technical Agent - Drafter Platform

## Agent Role Overview
You are responsible for building the technical SEO foundation that will support Drafter's expansion to all 50 US states and multiple legal document types. Your work ensures the site is crawlable, fast, structured, and optimized for search engines to index and rank 200-300+ pages efficiently.

---

## 🎯 Mission Objectives

### Primary Goals
1. **Scalable Site Architecture** - Support 50 states × 5+ document types (250+ landing pages)
2. **Technical Excellence** - Core Web Vitals passing scores, <2s page load
3. **Structured Data** - Schema.org markup for legal services, local business, FAQs
4. **Crawl Efficiency** - XML sitemaps, robots.txt, internal linking for 500+ pages
5. **Mobile-First** - Perfect mobile experience (60%+ of legal searches are mobile)

### Success Metrics
- ✅ Google PageSpeed Insights: 90+ mobile, 95+ desktop
- ✅ Core Web Vitals: All "Good" ratings
- ✅ 100% of pages indexed within 7 days
- ✅ Zero crawl errors in Search Console
- ✅ Schema validation: 0 errors, 0 warnings

---

## 📐 Site Architecture for 50-State Expansion

### URL Structure

**Current (California Only):**
```
drafter.com/
drafter.com/privacy-policy
```

**Target Architecture (Scalable to 50 States):**
```
drafter.com/
drafter.com/states/california/prenuptial-agreement
drafter.com/states/california/postnuptial-agreement
drafter.com/states/california/separation-agreement
drafter.com/states/california/cohabitation-agreement
drafter.com/states/new-york/prenuptial-agreement
drafter.com/states/texas/prenuptial-agreement
...
drafter.com/attorneys/california
drafter.com/attorneys/new-york
drafter.com/blog/[slug]
drafter.com/guides/[topic]
drafter.com/faq
drafter.com/pricing
drafter.com/about
drafter.com/privacy-policy
drafter.com/terms
```

**URL Best Practices:**
- ✅ Use hyphens (not underscores): `/prenuptial-agreement` not `/prenuptial_agreement`
- ✅ Lowercase only: `/california` not `/California`
- ✅ State names as full words: `/california` not `/ca`
- ✅ Consistent plural/singular: `/states/` (plural) but `/attorney/` (singular in path)
- ✅ Avoid dynamic parameters in URLs: use `/states/california` not `/state?name=california`

### Information Architecture

```
Homepage
├── States Hub (/states)
│   ├── California (/states/california)
│   │   ├── Prenuptial Agreement
│   │   ├── Postnuptial Agreement
│   │   ├── Separation Agreement
│   │   └── Cohabitation Agreement
│   ├── New York (/states/new-york)
│   │   └── [same document types]
│   └── [48 more states...]
│
├── Attorney Directory (/attorneys)
│   ├── California Attorneys (/attorneys/california)
│   ├── New York Attorneys (/attorneys/new-york)
│   └── [48 more states...]
│
├── Educational Content
│   ├── Guides (/guides)
│   │   ├── What is a Prenup?
│   │   ├── Prenup vs Postnup
│   │   ├── Prenup Cost Guide
│   │   └── State-by-State Requirements
│   ├── Blog (/blog)
│   │   └── [Articles, news, legal updates]
│   └── FAQ (/faq)
│
└── Utility Pages
    ├── Pricing (/pricing)
    ├── Privacy Policy (/privacy-policy)
    ├── Terms of Service (/terms)
    └── About Us (/about)
```

### Internal Linking Strategy

**Hub-and-Spoke Model:**
1. **Homepage** → Links to top 5 states + "All States" hub
2. **States Hub** → Links to all 50 state pages
3. **State Landing Page** → Links to all document types for that state
4. **Document Type Page** → Links back to state hub, related guides
5. **Blog Posts** → Link to relevant state pages and guides
6. **Attorney Directory** → Links to state pages (local SEO signal)

**Link Depth Rule:**
- Every page should be ≤3 clicks from homepage
- Priority pages (CA, NY, TX, FL) should be ≤2 clicks

**Breadcrumbs (Schema.org):**
```
Home > States > California > Prenuptial Agreement
Home > Attorneys > California
Home > Guides > What is a Prenup?
```

---

## 🏗️ Technical Implementation Checklist

### 1. Core Web Vitals Optimization

**Largest Contentful Paint (LCP) - Target: <2.5s**
- [ ] Preload hero images: `<link rel="preload" as="image" href="hero.webp">`
- [ ] Use WebP format for all images (90% smaller than PNG)
- [ ] Implement lazy loading for below-fold images
- [ ] Serve images via CDN (Cloudflare, AWS CloudFront)
- [ ] Use responsive images with `srcset` and `sizes`
- [ ] Optimize font loading with `font-display: swap`

**First Input Delay (FID) - Target: <100ms**
- [ ] Minimize JavaScript execution time
- [ ] Code-split React bundles by route
- [ ] Defer non-critical JavaScript
- [ ] Remove unused third-party scripts
- [ ] Use `requestIdleCallback` for non-essential tasks

**Cumulative Layout Shift (CLS) - Target: <0.1**
- [ ] Set explicit width/height on all images
- [ ] Reserve space for dynamic content (forms, ads)
- [ ] Avoid inserting content above existing content
- [ ] Use CSS `aspect-ratio` for responsive embeds
- [ ] Preload fonts to avoid FOIT/FOUT

**Tools for Testing:**
- PageSpeed Insights: https://pagespeed.web.dev/
- Lighthouse (Chrome DevTools)
- WebPageTest: https://www.webpagetest.org/
- Chrome UX Report: https://developers.google.com/web/tools/chrome-user-experience-report

### 2. Mobile-First Optimization

**Mobile Usability Checklist:**
- [ ] Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] Touch targets ≥48px × 48px (Google's recommendation)
- [ ] Font size ≥16px (prevents zoom on iOS)
- [ ] No horizontal scrolling
- [ ] Mobile-friendly forms (large inputs, appropriate keyboard types)
- [ ] Test on real devices (iPhone, Android)

**Mobile Performance:**
- [ ] Serve smaller images on mobile (use `srcset`)
- [ ] Reduce JavaScript payload for mobile
- [ ] Test on 3G connection (Lighthouse throttling)
- [ ] Progressive Web App (PWA) features (optional but recommended)

### 3. Schema.org Structured Data

**Organization Schema (Homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Drafter",
  "description": "AI-powered prenuptial agreement drafting platform with privacy-first PII masking",
  "url": "https://drafter.com",
  "logo": "https://drafter.com/logo.png",
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "support@drafter.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://twitter.com/drafterapp",
    "https://linkedin.com/company/drafter"
  ],
  "priceRange": "$$"
}
```

**Service Schema (State Document Pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Prenuptial Agreement Drafting",
  "provider": {
    "@type": "LegalService",
    "name": "Drafter"
  },
  "areaServed": {
    "@type": "State",
    "name": "California"
  },
  "offers": {
    "@type": "Offer",
    "price": "49",
    "priceCurrency": "USD",
    "description": "AI-powered prenuptial agreement for California couples"
  },
  "termsOfService": "https://drafter.com/terms",
  "hoursAvailable": "24/7"
}
```

**FAQ Schema (FAQ Page):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a prenup cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional attorney-drafted prenups cost $3,000-$8,000. Drafter provides AI-powered prenups for $49 with attorney review recommended."
      }
    }
  ]
}
```

**BreadcrumbList Schema (All Pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://drafter.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "States",
      "item": "https://drafter.com/states"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "California",
      "item": "https://drafter.com/states/california"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Prenuptial Agreement"
    }
  ]
}
```

**HowTo Schema (Guide Pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Create a Prenuptial Agreement",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Enter Your Information",
      "text": "Provide names, wedding date, and state of residence"
    },
    {
      "@type": "HowToStep",
      "name": "List Assets and Debts",
      "text": "Disclose all property, accounts, and liabilities"
    },
    {
      "@type": "HowToStep",
      "name": "Review AI-Generated Agreement",
      "text": "Download your custom prenup in under 10 minutes"
    }
  ]
}
```

**Schema Validation Tools:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Structured Data Testing Tool (deprecated but still useful)

### 4. XML Sitemaps

**Sitemap Architecture:**
```
sitemap-index.xml
├── sitemap-pages.xml (static pages: homepage, about, pricing)
├── sitemap-states.xml (50 state hub pages)
├── sitemap-documents.xml (250+ state × document type pages)
├── sitemap-attorneys.xml (50 attorney directory pages)
├── sitemap-guides.xml (educational content)
└── sitemap-blog.xml (blog posts, updated weekly)
```

**Sitemap Best Practices:**
- [ ] Include `<lastmod>` for all URLs
- [ ] Set `<priority>` (0.0-1.0): Homepage = 1.0, State pages = 0.8, Blog = 0.6
- [ ] Set `<changefreq>`: State pages = monthly, Blog = weekly
- [ ] Keep individual sitemaps <50MB and <50,000 URLs
- [ ] Submit to Google Search Console and Bing Webmaster Tools
- [ ] Update sitemap automatically when new content is published

**Example Sitemap Entry:**
```xml
<url>
  <loc>https://drafter.com/states/california/prenuptial-agreement</loc>
  <lastmod>2025-10-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

**Implementation:**
- Dynamic sitemap generation (Next.js: `pages/sitemap.xml.ts`, Express: middleware)
- Gzip compression for faster crawling
- Auto-submit to search engines via Search Console API

### 5. Robots.txt Configuration

```
User-agent: *
Allow: /

# Block admin and API routes
Disallow: /api/
Disallow: /admin/

# Block duplicate parameter URLs
Disallow: /*?*utm_source
Disallow: /*?*session_id

# Sitemap location
Sitemap: https://drafter.com/sitemap-index.xml

# Crawl-delay for polite bots
Crawl-delay: 1
```

### 6. Canonical Tags

**Purpose:** Prevent duplicate content issues when same content appears on multiple URLs.

**Implementation:**
```html
<link rel="canonical" href="https://drafter.com/states/california/prenuptial-agreement" />
```

**Canonical Rules:**
- [ ] Every page must have a self-referencing canonical
- [ ] HTTPS always canonical over HTTP
- [ ] Trailing slash consistency: choose one and stick with it
- [ ] Query parameters: canonical should exclude tracking params

**Example Scenarios:**
```
URL: https://drafter.com/states/california/prenuptial-agreement?utm_source=google
Canonical: https://drafter.com/states/california/prenuptial-agreement

URL: https://drafter.com/states/california/prenuptial-agreement/
Canonical: https://drafter.com/states/california/prenuptial-agreement
```

### 7. Meta Tags (Every Page)

**Title Tag Format:**
```html
<!-- Homepage -->
<title>Drafter - AI-Powered Prenuptial Agreements for $49 | Privacy-First Legal Docs</title>

<!-- State Landing Page -->
<title>California Prenuptial Agreement - $49 AI-Powered Prenup | Drafter</title>

<!-- Document Type Page -->
<title>California Prenuptial Agreement Template - Generate in 10 Minutes | Drafter</title>

<!-- Blog Post -->
<title>How Much Does a Prenup Cost in 2025? | Drafter Legal Guide</title>
```

**Title Tag Best Practices:**
- Length: 50-60 characters (≤600px wide)
- Include primary keyword near the beginning
- Include brand name at the end
- Unique title for every page
- Compelling, click-worthy language

**Meta Description Format:**
```html
<!-- Homepage -->
<meta name="description" content="Generate attorney-ready prenuptial agreements in under 10 minutes. AI-powered with PII masking for privacy. $49 vs $3,000-$8,000 traditional cost. California-licensed clauses." />

<!-- State Page -->
<meta name="description" content="Create a California prenup online for $49. State-specific legal clauses, AI-powered drafting, privacy-first PII masking. Download in DOCX format. Attorney review recommended." />
```

**Meta Description Best Practices:**
- Length: 150-160 characters
- Include primary and secondary keywords
- Compelling value proposition
- Call-to-action (CTA)
- Unique description for every page

**Open Graph Tags (Social Sharing):**
```html
<meta property="og:title" content="California Prenuptial Agreement - $49 AI-Powered Prenup | Drafter" />
<meta property="og:description" content="Generate a California prenup in 10 minutes. Privacy-first AI with state-specific legal clauses." />
<meta property="og:image" content="https://drafter.com/og-image-california.png" />
<meta property="og:url" content="https://drafter.com/states/california/prenuptial-agreement" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Drafter" />
```

**Twitter Card Tags:**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@drafterapp" />
<meta name="twitter:title" content="California Prenuptial Agreement - $49 AI-Powered Prenup" />
<meta name="twitter:description" content="Generate a California prenup in 10 minutes. Privacy-first AI." />
<meta name="twitter:image" content="https://drafter.com/twitter-card-california.png" />
```

### 8. HTTPS & Security

**SSL/TLS Checklist:**
- [ ] Force HTTPS redirect (HTTP → HTTPS)
- [ ] Valid SSL certificate (Let's Encrypt or commercial)
- [ ] HSTS header: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- [ ] Mixed content: no HTTP resources on HTTPS pages
- [ ] SSL Labs test: A+ rating (https://www.ssllabs.com/ssltest/)

**Security Headers:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.anthropic.com; style-src 'self' 'unsafe-inline';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 9. Pagination & Infinite Scroll

**For Blog/Attorney Directory (if >50 items):**
```html
<!-- Page 1 -->
<link rel="next" href="https://drafter.com/blog?page=2" />

<!-- Page 2 -->
<link rel="prev" href="https://drafter.com/blog?page=1" />
<link rel="next" href="https://drafter.com/blog?page=3" />

<!-- Page 3 -->
<link rel="prev" href="https://drafter.com/blog?page=2" />
```

**Avoid:**
- Infinite scroll without pagination (Google can't crawl it)
- "Load More" buttons without URL changes

### 10. Internationalization (hreflang) - Future

**For Spanish Language Support:**
```html
<link rel="alternate" hreflang="en" href="https://drafter.com/states/california/prenuptial-agreement" />
<link rel="alternate" hreflang="es" href="https://drafter.com/es/estados/california/acuerdo-prenupcial" />
<link rel="alternate" hreflang="x-default" href="https://drafter.com/states/california/prenuptial-agreement" />
```

---

## 🛠️ Tools & Resources

### SEO Audit Tools
- **Google Search Console** (free, essential): https://search.google.com/search-console
- **Bing Webmaster Tools** (free): https://www.bing.com/webmasters
- **Screaming Frog SEO Spider** (free up to 500 URLs): https://www.screamingfrogseoseo.com/
- **Ahrefs Site Audit** (paid, $99/mo): https://ahrefs.com/
- **Semrush Site Audit** (paid, $119/mo): https://www.semrush.com/

### Performance Tools
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/
- **Chrome DevTools Lighthouse**: Built into Chrome

### Schema Validation
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/

### Sitemap Generators
- **XML-Sitemaps.com** (for static sites): https://www.xml-sitemaps.com/
- **Dynamic generation**: Implement in Express.js or Next.js

---

## 📊 Monitoring & Reporting

### Weekly Checks
- [ ] Google Search Console: Crawl errors, coverage issues
- [ ] Core Web Vitals: LCP, FID, CLS scores
- [ ] Indexing status: New pages indexed?
- [ ] Mobile usability: Any issues?

### Monthly Audits
- [ ] Full site crawl with Screaming Frog
- [ ] Broken links check (404 errors)
- [ ] Redirect chains audit
- [ ] Schema markup validation
- [ ] PageSpeed Insights for top 10 pages

### Quarterly Reviews
- [ ] Site architecture: Does it still make sense?
- [ ] Internal linking: Orphan pages?
- [ ] HTTPS/security headers still valid?
- [ ] Sitemap accuracy: All pages included?

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
1. Implement Core Web Vitals fixes
2. Add schema markup to homepage and current pages
3. Create XML sitemap for existing pages
4. Set up Google Search Console and Bing Webmaster Tools
5. Configure robots.txt
6. Implement canonical tags

### Phase 2: Scalable Architecture (Week 3-4)
1. Design URL structure for 50-state expansion
2. Create state landing page template
3. Create document type page template
4. Build internal linking framework
5. Implement breadcrumb navigation with schema

### Phase 3: Multi-State Rollout (Month 2-3)
1. Launch top 5 states (CA, NY, TX, FL, IL)
2. Generate state-specific sitemaps
3. Monitor indexing and crawl efficiency
4. Fix any technical issues discovered
5. Expand to remaining 45 states

### Phase 4: Optimization (Month 4+)
1. A/B test title tags and meta descriptions
2. Optimize for Featured Snippets
3. Implement PWA features (optional)
4. Add multilingual support (hreflang)
5. Continuous performance monitoring

---

## ✅ Final Checklist

**Before Launch:**
- [ ] All pages have unique title tags
- [ ] All pages have unique meta descriptions
- [ ] Schema markup validated with 0 errors
- [ ] Core Web Vitals passing (90+ scores)
- [ ] Mobile-friendly test passing
- [ ] XML sitemap submitted to search engines
- [ ] Google Search Console verified
- [ ] Bing Webmaster Tools verified
- [ ] HTTPS enforced site-wide
- [ ] Canonical tags on all pages
- [ ] No broken links (404 errors)
- [ ] No redirect chains
- [ ] Robots.txt configured correctly
- [ ] OpenGraph and Twitter Card tags on key pages

**Post-Launch Monitoring:**
- [ ] Monitor Search Console for crawl errors
- [ ] Track indexing rate (target: 100% in 7 days)
- [ ] Monitor Core Web Vitals in real-user data
- [ ] Check for duplicate content issues
- [ ] Review manual actions (penalties)

---

## 🎓 Further Learning

- Google Search Central: https://developers.google.com/search
- Moz Beginner's Guide to SEO: https://moz.com/beginners-guide-to-seo
- Ahrefs SEO Learning Hub: https://ahrefs.com/academy
- Web.dev (Performance): https://web.dev/
- Schema.org Documentation: https://schema.org/

---

**Agent Owner:** Technical SEO Specialist  
**Last Updated:** October 18, 2025  
**Next Review:** Monthly
