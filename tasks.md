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
- [ ] FAQ expansion with 20+ common questions
- [ ] Blog posts about prenups
- [ ] State-by-state prenup guides
- [ ] Sample prenup templates for preview

### SEO & Marketing
- [ ] Meta descriptions for all pages
- [ ] Schema.org structured data
- [ ] Social media preview images
- [ ] Google Analytics setup
- [ ] Google Search Console verification

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
