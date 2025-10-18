# Drafter - Action Items & Future Enhancements

## 🔴 Critical - Required Before Production Launch

### Email Delivery Configuration
**Priority:** HIGH  
**Status:** ⏳ Pending

Configure SMTP credentials for email delivery of generated prenuptial agreements.

**Required Environment Variables:**
```
SMTP_HOST=smtp.gmail.com (or your SMTP provider)
SMTP_PORT=587 (or 465 for TLS)
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-specific-password
SMTP_FROM=noreply@drafter.com
```

**Options:**
1. **Gmail:** Use App-Specific Password (requires 2FA enabled)
2. **SendGrid:** Professional email service with API
3. **AWS SES:** Cost-effective for high volume
4. **Mailgun:** Developer-friendly with generous free tier

**Testing:**
- Once configured, test with a real email address
- Verify attachments arrive correctly
- Check spam folder if not received
- Verify HTML formatting in email client

**Fallback:** Currently implemented - download button appears if email fails

---

### Legal Clause Review & Professional Sourcing
**Priority:** HIGH  
**Status:** ⏳ Critical

**Current State:**
- 21 California clauses stored in `data/clauses/california-clauses.json`
- Clauses were **AI-generated for demonstration purposes**
- Reference real California Family Code sections (§1615, §760, §2550, §4320, etc.)
- Pre-tokenized with PII placeholders (`PARTY_A_*`, `PARTY_B_*`, `DATE_*`, etc.)

**Critical Issues:**
- ⚠️ **Not attorney-reviewed** - Clauses have not been verified by licensed California family law attorney
- ⚠️ **Legal accuracy unknown** - Citations may be outdated or incomplete
- ⚠️ **Enforceability uncertain** - No case law review performed
- ⚠️ **Liability risk** - Using unverified legal content could expose platform to legal claims

**Required Actions:**

1. **Immediate Attorney Review**
   - [ ] Engage California-licensed family law attorney to review all 21 clauses
   - [ ] Verify accuracy of California Family Code citations
   - [ ] Check compliance with current case law (2025)
   - [ ] Identify missing provisions or problematic language
   - [ ] Obtain professional opinion letter on enforceability
   - **Estimated Cost:** $2,000-$5,000 for comprehensive review

2. **Professional Legal Content Providers**
   
   Consider licensing pre-approved legal clauses from established providers:
   
   **Option A: LexisNexis Legal Content**
   - Industry-leading legal database with attorney-drafted templates
   - Regular updates when laws change
   - Includes California-specific prenup provisions
   - API available for dynamic access
   - **Cost:** Contact for enterprise pricing (typically $5K-$15K/year)
   - **Website:** https://www.lexisnexis.com/
   
   **Option B: Westlaw Legal Forms**
   - Thomson Reuters legal research platform
   - Comprehensive family law document library
   - State-specific prenuptial agreement clauses
   - Integration via Westlaw Edge API
   - **Cost:** Premium subscription required ($10K+/year)
   - **Website:** https://legal.thomsonreuters.com/
   
   **Option C: Nolo Legal Content**
   - Consumer-friendly legal content provider
   - Affordable prenup templates and clauses
   - Written by attorneys, reviewed regularly
   - More accessible pricing for startups
   - **Cost:** $1K-$3K/year for content licensing
   - **Website:** https://www.nolo.com/
   
   **Option D: Rocket Lawyer API**
   - Legal document automation platform
   - API access to legal templates
   - Includes prenuptial agreement clauses
   - Built-in customization engine
   - **Cost:** API pricing based on usage (~$500-$2K/month)
   - **Website:** https://www.rocketlawyer.com/
   
   **Option E: Legal Templates & Forms APIs**
   - **LawDepot:** https://www.lawdepot.com/ (licensing available)
   - **US Legal Forms:** https://www.uslegalforms.com/ (bulk licensing)
   - **FindLaw Forms:** Smaller clause library but more affordable

3. **Optional: MCP Server for Dynamic Legal Database**
   
   **What is MCP?**
   - Model Context Protocol - connects AI systems to external data sources
   - Enables real-time access to legal databases
   - Automatic updates when laws change
   
   **Benefits:**
   - Always current - clauses update when statutes change
   - Multi-jurisdiction support without manual updates
   - Reduced liability - content maintained by legal professionals
   - Audit trail - track which clause versions were used
   
   **Implementation Approach:**
   - Set up MCP server to connect to LexisNexis/Westlaw API
   - Replace static JSON with dynamic database queries
   - Cache clauses locally for performance
   - Implement versioning to track law changes
   
   **Example Architecture:**
   ```
   Drafter Backend → MCP Server → Legal Database API → Attorney-Reviewed Clauses
   ```
   
   **Estimated Development:** 2-4 weeks for MCP integration
   
   **Resources:**
   - MCP Documentation: https://modelcontextprotocol.io/
   - Replit MCP Guide: Check Replit docs for MCP server setup

**Recommended Path Forward:**

**Phase 1 (Immediate - Before Launch):**
1. Hire California family law attorney for one-time clause review ($2K-$5K)
2. Update clauses based on attorney feedback
3. Add attorney review disclaimer to generated documents
4. Document review date and attorney credentials

**Phase 2 (Within 3 months):**
1. License professional legal content from Nolo or Rocket Lawyer
2. Replace AI-generated clauses with attorney-approved content
3. Implement clause versioning system

**Phase 3 (Future - Optional):**
1. Set up MCP server for dynamic legal database access
2. Expand to additional jurisdictions using licensed content
3. Implement automatic updates when laws change

**Current Risk Mitigation:**
- ✅ Strong legal disclaimers on success page
- ✅ "Attorney review recommended" messaging
- ✅ Clear statement that document is for informational purposes
- ⚠️ Still need: Professional review before accepting payment from users

---

## 🟡 Important - Recommended Enhancements

### Legal Review
**Priority:** MEDIUM  
**Status:** ⏳ Pending

- [ ] Have California-licensed attorney review generated prenup samples
- [ ] Verify all 21 clauses are legally accurate and current
- [ ] Review legal disclaimers and "attorney review" messaging
- [ ] Consider adding attorney network partnership program

### Additional Jurisdictions
**Priority:** MEDIUM  
**Status:** 📋 Planned

Currently supports California only. Future states to add:
- [ ] New York
- [ ] Texas
- [ ] Florida
- [ ] Illinois

**Requirements per jurisdiction:**
- Research state-specific prenup requirements
- Source jurisdiction-specific legal clauses
- Update clause library in database
- Modify AI prompt for state-specific language

### Payment Integration
**Priority:** MEDIUM  
**Status:** 📋 Planned

Implement Stripe payment processing for $49 prenup generation fee.

**Features needed:**
- [ ] Payment form on review step (before generation)
- [ ] Stripe Checkout integration
- [ ] Success/failure handling
- [ ] Receipt email delivery
- [ ] Payment tracking in database

---

## 🟢 Nice to Have - Future Features

### User Accounts & Dashboard
**Priority:** LOW  
**Status:** 💡 Idea

Allow users to create accounts and manage their prenups.

**Features:**
- [ ] User registration/login
- [ ] Dashboard to view past generations
- [ ] Re-download documents
- [ ] Track revisions
- [ ] Save drafts

### Attorney Review Marketplace
**Priority:** LOW  
**Status:** 💡 Idea

Connect users with licensed attorneys for document review.

**Features:**
- [ ] Attorney directory by state
- [ ] Direct booking integration
- [ ] Review request workflow
- [ ] Attorney feedback integration

### Multi-Language Support
**Priority:** LOW  
**Status:** 💡 Idea

Support prenups in Spanish and other languages.

**Requirements:**
- [ ] Translate UI to Spanish
- [ ] Translate legal clauses
- [ ] Bilingual document generation
- [ ] Language selector in header

---

## 📊 Technical Improvements

### Performance Optimization
- [ ] Add Redis caching for clause retrieval
- [ ] Implement rate limiting on API endpoints
- [ ] Add CDN for static assets
- [ ] Optimize DOCX generation (currently ~3-5 seconds)

### Monitoring & Analytics
- [ ] Add error tracking (Sentry)
- [ ] Implement usage analytics
- [ ] Track conversion funnel
- [ ] Monitor AI generation success rate
- [ ] Alert on email delivery failures

### Testing
- [ ] Add unit tests for PII masking
- [ ] Test DOCX generation with various data
- [ ] Add E2E tests for complete flow
- [ ] Test with real attorneys reviewing output

---

## 🔒 Security & Compliance

### Security Audit
- [ ] Third-party security audit
- [ ] Penetration testing
- [ ] Review PII masking implementation
- [ ] Verify data encryption at rest
- [ ] Review HTTPS/TLS configuration

### Compliance
- [ ] GDPR compliance review (if serving EU users)
- [ ] CCPA compliance (California users)
- [ ] Terms of Service creation
- [ ] Privacy Policy legal review
- [ ] Cookie consent implementation

---

## 📝 Content & Marketing

### Legal Content
- [x] FAQ expansion - Homepage (6), Privacy (6), CA Landing (3), CA Guide (10) ✅
- [x] Blog section created with 6 articles (2 live, 4 placeholders) ✅
- [x] California state guide (comprehensive 3,500+ word guide) ✅
- [ ] Sample prenup templates for preview

### SEO & Marketing - Month 1 Complete ✅
- [x] Meta descriptions for all pages ✅
- [x] Schema.org structured data (Article, FAQPage, HowTo, LegalService) ✅
- [x] Social media preview images (Open Graph tags) ✅
- [x] Sitemap.xml and robots.txt ✅
- [ ] Google Analytics setup
- [ ] Google Search Console verification

---

## 🚀 SEO Expansion - Option B: Comprehensive Overhaul (12-Month Roadmap)

**Goal:** 100,000 monthly organic visitors → $245K/month organic revenue (5% conversion × $49)  
**Target Domain Rating:** DR 42-45 by Month 12  
**Current Status:** Month 1 technical foundation complete, Month 2 content optimization in progress

### Phase 1: Content Optimization Blitz (Months 2-3)

#### FAQ Schema Expansion
**Target:** 100+ FAQs across all pages with complete schema coverage
- [x] California prenup guide: 4 → 10 FAQs with schema ✅ (Month 2)
- [x] Homepage: Add PAA section with 5 conversational queries ✅ (Month 2)
- [x] California guide: Add PAA section with 5 state-specific queries ✅ (Month 2)
- [ ] Homepage: Expand from 6 to 12 FAQs (Month 2)
- [ ] California landing: Expand from 3 to 10 FAQs (Month 2)
- [ ] California guide: Expand to 15+ FAQs total (Month 2)
- [ ] Privacy policy: Expand from 6 to 12 FAQs (Month 3)
- [ ] Create dedicated FAQ page with 50+ questions organized by category (Month 3)
- [ ] Add FAQ sections to all blog articles (8-10 FAQs each) (Month 3)

#### Blog Content Development
**Target:** 50+ articles (2,000+ words each) optimized for long-tail keywords

**Month 2-3 Priority Articles:**
- [ ] "5 Common Prenup Mistakes That Could Invalidate Your Agreement" (2,500 words)
- [ ] "When Should You Get a Prenup? Timeline and Best Practices" (2,200 words)
- [ ] "Why Second Marriages Need Prenups: Protecting Your Family's Future" (2,400 words)
- [ ] "Prenup vs Postnup: Understanding the Key Differences" (2,000 words)
- [ ] "How to Protect Your Business with a Prenuptial Agreement" (2,600 words)
- [ ] "Prenup Cost Breakdown: Traditional vs AI-Powered Options" (2,100 words)
- [ ] "California Community Property: What You Need to Know" (2,800 words)
- [ ] "How to Talk to Your Partner About a Prenup" (2,000 words)

**Month 4-6 Articles:**
- [ ] "Prenup for Entrepreneurs: Complete Guide" (3,000 words)
- [ ] "Student Loan Debt and Prenups: Protection Strategies" (2,200 words)
- [ ] "Real Estate Assets in Prenuptial Agreements" (2,400 words)
- [ ] "Inheritance Protection: How Prenups Safeguard Family Wealth" (2,300 words)
- [ ] "Do You Need a Prenup If You're Both Broke?" (2,000 words)
- [ ] "Prenup Clauses Explained: A Complete Breakdown" (3,200 words)
- [ ] "How Long Does a Prenup Last? Expiration and Updates" (2,100 words)
- [ ] "Prenup Confidentiality: Protecting Your Privacy" (2,200 words)

#### LLM Optimization (Months 2-4)
**Target:** Optimize all content for ChatGPT, Claude, Perplexity, and AI search engines

- [x] Add PAA sections to homepage and California pages ✅
- [ ] Create "How-To" content with HowTo schema for all major tasks
  - [ ] "How to Create a Prenup in California" (step-by-step)
  - [ ] "How to Provide Full Financial Disclosure"
  - [ ] "How to Choose What Goes in Your Prenup"
  - [ ] "How to Talk to Your Partner About Prenups"
- [ ] Add comparison tables with TableSchema markup
  - [ ] Drafter vs Traditional Attorney (cost, time, privacy, convenience)
  - [ ] Prenup vs Postnup (timing, requirements, enforceability)
  - [ ] California vs Other States (community property, requirements)
  - [ ] With vs Without Prenup (divorce outcomes)
- [ ] Implement BreadcrumbList schema for better navigation
- [ ] Add structured problem-solution framing to all guides
- [ ] Target 20+ conversational query patterns per page

### Phase 2: Multi-State Expansion (Months 3-6)

#### State-by-State Guides
**Target:** 50 states × 2 pages = 100 state pages

**Month 3-4 (Priority States):**
- [ ] Texas: Landing page + comprehensive guide (6,000+ words combined)
- [ ] Florida: Landing page + comprehensive guide
- [ ] New York: Landing page + comprehensive guide
- [ ] Nevada: Landing page + comprehensive guide
- [ ] Illinois: Landing page + comprehensive guide

**Month 5-6 (Next 10 States):**
- [ ] Washington, Oregon, Arizona, Colorado, Georgia
- [ ] North Carolina, Virginia, Pennsylvania, Ohio, Michigan

**Month 7-12 (Remaining 35 States):**
- [ ] Complete all 50 states with landing pages
- [ ] Add comprehensive guides for top 20 states by population
- [ ] Implement state comparison tools

**Each State Package Includes:**
- Landing page with hero, benefits, 3-5 FAQs, CTA
- Comprehensive guide (3,000-5,000 words)
- State-specific requirements, laws, enforceability
- Cost comparison (traditional vs Drafter)
- Local jurisdiction notes
- 10-15 FAQs with full schema
- PAA section with 5+ conversational queries
- Internal linking to related states and blog articles

#### Local/City Keywords (Months 4-6)
**Target:** Top 50 California cities, then expand to other states

**Month 4-5:**
- [ ] Los Angeles landing page
- [ ] San Francisco landing page
- [ ] San Diego landing page
- [ ] San Jose landing page
- [ ] Sacramento landing page
- [ ] Top 10 California cities complete

**Month 6-8:**
- [ ] Remaining 40 California cities
- [ ] Top 10 Texas cities (Houston, Dallas, Austin, San Antonio, etc.)
- [ ] Top 10 Florida cities (Miami, Orlando, Tampa, Jacksonville, etc.)

**City Page Template:**
- Local keyword optimization ("prenup lawyer [city]", "prenup cost [city]")
- City-specific cost data
- Local attorney referral information
- County clerk information for filing
- 5-8 FAQs with schema
- Links to state guide
- Internal linking structure

### Phase 3: Advanced Content & Authority Building (Months 6-12)

#### Comparison Content
**Target:** 20+ comprehensive comparison articles

- [ ] "Drafter vs Traditional Attorney Prenup: Complete Comparison" (3,000 words)
- [ ] "Top 10 Online Prenup Services Compared (2025)" (4,000 words)
- [ ] "AI Prenup Platforms: Drafter vs Competitors" (2,800 words)
- [ ] "Community Property vs Equitable Distribution States" (3,500 words)
- [ ] "DIY Prenup vs Lawyer-Drafted: Pros and Cons" (2,600 words)
- [ ] "LegalZoom vs Rocket Lawyer vs Drafter" (3,200 words)

#### Ultimate Guides (Pillar Content)
**Target:** 5+ authoritative 8,000+ word guides

- [ ] "The Ultimate Guide to Prenuptial Agreements (2025)" (10,000 words)
- [ ] "Complete Guide to Community Property States" (8,500 words)
- [ ] "AI in Legal Tech: Complete Guide for Consumers" (8,000 words)
- [ ] "Privacy-Preserving Technology in Legal Services" (8,000 words)
- [ ] "State-by-State Prenup Requirements (All 50 States)" (12,000 words)

#### Video Content & Multimedia
- [ ] Create 20+ short-form videos (1-3 minutes) explaining prenup concepts
- [ ] Embed videos in blog articles
- [ ] Add VideoObject schema markup
- [ ] Create infographics for key statistics
- [ ] Develop interactive prenup cost calculator
- [ ] Build prenup requirement checker (state selector tool)

#### Topic Clusters & Internal Linking
- [ ] Map all content into topic clusters
- [ ] Implement hub-and-spoke internal linking strategy
- [ ] Create pillar pages for major topics
- [ ] Add related article widgets to all pages
- [ ] Implement breadcrumb navigation
- [ ] Build comprehensive resource center

### Phase 4: Backlink Campaign & Authority Development (Months 3-12)

#### Content Marketing for Backlinks
- [ ] Guest posting on legal blogs (10+ articles)
- [ ] Contribute to family law publications
- [ ] Sponsor legal education resources
- [ ] Create shareable infographics
- [ ] Develop original research/surveys
- [ ] Publish annual "State of Prenups" report

#### Digital PR
- [ ] Press releases for major features
- [ ] Outreach to legal tech journalists
- [ ] Submit to legal directories
- [ ] Partner with wedding planning sites
- [ ] Collaborate with financial planning blogs
- [ ] Build relationships with legal education platforms

#### Local Citations & Directories
- [ ] Submit to legal directories (50+)
- [ ] List in wedding planning directories
- [ ] Add to financial planning resources
- [ ] Register with Better Business Bureau
- [ ] Create profiles on legal Q&A sites
- [ ] Build citations in local business directories

#### Backlink Targets
- **Month 3:** 10-20 quality backlinks (DR 30+)
- **Month 6:** 50-75 backlinks total
- **Month 9:** 100-150 backlinks
- **Month 12:** 200+ backlinks, DR 42-45

### Phase 5: Technical SEO Enhancements (Months 6-12)

#### Advanced Schema Implementation
- [ ] Organization schema with brand information
- [ ] SiteNavigationElement for main menu
- [ ] VideoObject for video content
- [ ] TableSchema for comparison tables
- [ ] Review schema (if collecting user reviews)
- [ ] AggregateRating schema
- [ ] LocalBusiness schema for office locations (future)

#### Performance Optimization
- [ ] Implement lazy loading for images
- [ ] Add CDN for static assets
- [ ] Optimize Core Web Vitals
- [ ] Reduce JavaScript bundle size
- [ ] Implement service worker for offline access
- [ ] Add image optimization pipeline

#### Structured Data Expansion
- [ ] Add 300+ FAQs with schema across all pages
- [ ] Implement dynamic FAQ schema for blog articles
- [ ] Add author schema for blog posts
- [ ] Create comprehensive knowledge graph
- [ ] Implement site search functionality with structured data

### Phase 6: Analytics & Conversion Optimization (Ongoing)

#### Tracking & Measurement
- [ ] Set up Google Analytics 4
- [ ] Configure Google Search Console
- [ ] Implement conversion tracking
- [ ] Set up goal funnels
- [ ] Track keyword rankings (top 100 keywords)
- [ ] Monitor FAQ schema performance
- [ ] Track LLM citations (ChatGPT, Claude, Perplexity)

#### A/B Testing
- [ ] Test FAQ formats (accordion vs static)
- [ ] Test CTA placements and copy
- [ ] Test pricing presentation
- [ ] Test blog article layouts
- [ ] Test form field configurations
- [ ] Test trust signals and social proof

#### Conversion Rate Optimization
- [ ] Analyze user behavior with heatmaps
- [ ] Optimize for 5% conversion rate
- [ ] Test different pricing strategies
- [ ] Improve intake form completion rate
- [ ] Reduce form abandonment
- [ ] Implement exit-intent popups

### Success Metrics & Milestones

#### Month 2-3 Targets
- [ ] 50+ total FAQs with schema
- [ ] PAA sections on all major pages
- [ ] 8 blog articles published
- [ ] 1,000/month organic visitors
- [ ] 10-15 quality backlinks

#### Month 6 Targets
- [ ] 100+ total FAQs with schema
- [ ] 25 blog articles published
- [ ] 5 state guides live (CA, TX, FL, NY, NV)
- [ ] 10 city landing pages
- [ ] 25,000/month organic visitors
- [ ] 50+ backlinks
- [ ] DR 15-20

#### Month 9 Targets
- [ ] 200+ total FAQs with schema
- [ ] 40 blog articles published
- [ ] 20 state guides live
- [ ] 30 city landing pages
- [ ] 60,000/month organic visitors
- [ ] 100+ backlinks
- [ ] DR 30-35

#### Month 12 Targets (Goal)
- [ ] 300+ total FAQs with schema
- [ ] 50+ blog articles published
- [ ] 50 state guides live
- [ ] 50+ city landing pages (California)
- [ ] 100,000/month organic visitors
- [ ] 200+ backlinks
- [ ] DR 42-45
- [ ] 5% conversion rate
- [ ] $245K/month organic revenue

### Budget Estimates

#### Content Creation
- Writers (2,000+ word articles): $200-$400/article
- 50 articles × $300 avg = **$15,000**
- State guides (50 states): $250/state = **$12,500**
- City pages (50 cities): $100/page = **$5,000**
- **Total Content:** $32,500

#### Backlink Campaign
- Guest posting outreach: $2,000/month × 6 months = **$12,000**
- Digital PR campaign: $3,000/month × 6 months = **$18,000**
- Link building tools (Ahrefs, SEMrush): $500/month × 12 = **$6,000**
- **Total Backlinks:** $36,000

#### Tools & Software
- SEO tools (Ahrefs/SEMrush): $6,000/year
- Keyword research tools: $1,200/year
- Analytics tools: $1,800/year
- Content optimization: $2,000/year
- **Total Tools:** $11,000

#### **Grand Total (12 months):** $79,500
#### **Expected ROI:** $245K/month organic revenue = $2.94M/year (37x ROI)

### Implementation Priority

**Immediate (Weeks 1-2):**
- [x] Fix missing FAQ schemas ✅
- [x] Add PAA sections ✅
- [x] Create keyword research file ✅
- [ ] Write first 2 blog articles
- [ ] Set up Google Search Console

**Short-term (Weeks 3-8):**
- [ ] Complete 8 blog articles
- [ ] Expand FAQ coverage to 50+ total
- [ ] Launch Texas and Florida state guides
- [ ] Begin backlink outreach
- [ ] Set up analytics tracking

**Medium-term (Months 3-6):**
- [ ] Publish 25 blog articles total
- [ ] Launch 10 state guides
- [ ] Create 10 city landing pages
- [ ] Build 50+ quality backlinks
- [ ] Achieve 25K/month organic traffic

**Long-term (Months 7-12):**
- [ ] Complete all 50 state guides
- [ ] Publish 50+ blog articles
- [ ] Launch 50 city pages
- [ ] Achieve DR 42-45
- [ ] Hit 100K/month organic traffic goal

---

**Status:** Month 1 complete (technical foundation), Month 2 in progress (content optimization)  
**Next Review:** November 1, 2025  
**Owner:** SEO/Content Team  
**Reference:** See `Birds Eye/keyword-research.md` for complete keyword strategy

---

## 🐛 Known Issues

None currently - all critical bugs resolved! ✅

---

## 📅 Completed Items

- ✅ Core MVP features implemented
- ✅ PII masking before AI processing verified
- ✅ California clause library (21 clauses)
- ✅ DOCX generation with professional formatting
- ✅ Email delivery with download fallback
- ✅ Database schema and persistence
- ✅ Multi-step intake form with validation
- ✅ Responsive UI design
- ✅ Privacy policy page and documentation

---

*Last Updated: October 18, 2025*
