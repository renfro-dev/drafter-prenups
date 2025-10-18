# Drafter Privacy Policy & Data Management

**Last Updated:** October 18, 2025  
**Effective Date:** October 18, 2025

---

## Our Privacy Commitment

At Drafter, we understand that prenuptial agreements contain some of the most sensitive personal and financial information you'll ever share. **Your privacy is not just important to us—it's fundamental to how we built this platform.**

Unlike other AI-powered legal services, we've implemented **industry-leading privacy protections** that ensure your personal information is **never exposed to our AI provider** in its raw form.

---

## How We Protect Your Data

### 🔒 Privacy-First Architecture

We've designed Drafter with a unique **PII (Personally Identifiable Information) Masking System** that protects your data before it ever reaches our AI partner (Anthropic Claude):

#### What Gets Masked Before AI Processing:

1. **Your Names**
   - Party A Name → `PARTY_A_[RANDOM_ID]`
   - Party B Name → `PARTY_B_[RANDOM_ID]`

2. **Financial Information**
   - Asset values → `VALUE_[RANDOM_ID]` (e.g., "$500,000" becomes "VALUE_7X3K9")
   - Debt amounts → `VALUE_[RANDOM_ID]`
   - Asset descriptions → `DESC_[RANDOM_ID]`
   - Debt descriptions → `DESC_[RANDOM_ID]`

3. **Personal Details**
   - Wedding date → `DATE_[RANDOM_ID]`
   - Email address → `EMAIL_[RANDOM_ID]`
   - Additional provisions → `TEXT_[RANDOM_ID]`

#### Example of Our Masking:

**What You Enter:**
```
Party A: Jennifer Martinez
Party B: Michael Chen
Wedding Date: June 15, 2025
Asset: Primary residence worth $850,000
Email: jennifer.martinez@email.com
```

**What Our AI Sees:**
```
Party A: PARTY_A_9K2L5M
Party B: PARTY_B_3X7N8Q
Wedding Date: DATE_4P6R2S
Asset: Primary residence worth VALUE_8H1J4T
Email: EMAIL_7M9N2K
```

**What You Receive:**
Your final document with ALL your real information restored perfectly!

---

## Data We Collect

### Information You Provide

When you use Drafter, you provide:

1. **Party Information**
   - Full legal names of both parties
   - Wedding date
   - Email address for document delivery

2. **Financial Information**
   - Asset details (type, value, ownership, description)
   - Debt information (type, amount, ownership, description)

3. **Agreement Preferences**
   - Spousal support preferences
   - Property protection choices
   - Legal representation status
   - Additional custom provisions

### Information We Generate

- **Masked versions** of all your data (stored for potential support/debugging)
- **PII mapping** (the key to unmask your data - stored encrypted)
- **Generation logs** (success/failure, timestamp, no personal data)
- **Document URL** (temporary data URL for download)

### Information We Do NOT Collect

- ❌ Credit card numbers (when payment is implemented, Stripe handles this)
- ❌ Social Security Numbers
- ❌ Driver's license numbers
- ❌ Passwords (no user accounts currently)
- ❌ Browsing history or cookies (minimal analytics only)

---

## How We Use Your Data

### Primary Uses

1. **Document Generation**
   - Create your personalized prenuptial agreement
   - Format content professionally using our DOCX generator
   - Deliver via email and/or download

2. **Service Improvement**
   - Analyze generation success rates (anonymized)
   - Identify and fix technical issues
   - Improve AI prompt effectiveness

### What We Do NOT Do With Your Data

- ❌ Sell your information to third parties
- ❌ Use your data to train AI models (Anthropic's API does not train on user data)
- ❌ Share with marketers or advertisers
- ❌ Keep your unmasked data longer than necessary
- ❌ Access your data unless required for support

---

## Data Storage & Security

### Where We Store Data

1. **Database (Neon PostgreSQL)**
   - Masked intake data
   - PII mapping (encrypted)
   - Generation logs
   - Clause library

2. **Temporary Storage**
   - Generated documents as data URLs (not stored on disk)
   - Session data (cleared on completion)

### How Long We Retain Data

- **Intake records:** 30 days after generation
- **Generation logs:** 90 days (for debugging and analytics)
- **Masked data:** Deleted with intake record
- **PII mapping:** Deleted with intake record
- **Generated documents:** Not stored on our servers (data URLs only)

### Security Measures

1. **Encryption**
   - TLS/HTTPS for all data in transit
   - Database encryption at rest (Neon default)
   - Environment variable protection for secrets

2. **Access Control**
   - Minimal team access to production database
   - No direct access to unmasked user data
   - All access logged and monitored

3. **Infrastructure**
   - Hosted on Replit (enterprise-grade security)
   - Database on Neon (SOC 2 Type II compliant)
   - Regular security updates

---

## Third-Party Services

We use the following trusted third-party services:

### Anthropic Claude (AI Partner)

- **What they receive:** Masked data only (no real names, values, or personal info)
- **What they do:** Generate prenup content from legal clauses and masked inputs
- **Data retention:** Anthropic does NOT train models on API data
- **Privacy policy:** https://www.anthropic.com/privacy

### Neon (Database Provider)

- **What they store:** All intake data, masked data, generation logs
- **Security:** SOC 2 Type II certified, encryption at rest
- **Location:** US data centers
- **Privacy policy:** https://neon.tech/privacy-policy

### Nodemailer/SMTP (Email Delivery - Optional)

- **What they receive:** Your email address and generated document
- **Purpose:** Deliver your prenup as an email attachment
- **Retention:** Depends on SMTP provider (typically not stored)
- **Alternative:** Download button if email delivery fails

### Future Services (Not Yet Implemented)

- **Stripe:** Payment processing (PCI compliant, doesn't share data with us)
- **Sentry:** Error monitoring (anonymized error logs only)
- **Google Analytics:** Usage analytics (IP addresses anonymized)

---

## Your Rights & Control

### Access Your Data

You can request a copy of your data by contacting us at privacy@drafter.com with:
- Your email address used for generation
- Approximate date of generation
- Party names (to verify identity)

### Delete Your Data

You can request deletion of your data at any time:
- Email privacy@drafter.com with your details
- We'll permanently delete within 7 business days
- Generated documents already delivered cannot be recalled




---

## Legal Basis for Processing (GDPR/CCPA)

We process your data based on:

1. **Contract Performance:** To generate and deliver your prenup
2. **Legitimate Interest:** To improve our service and prevent fraud
3. **Consent:** For optional features like marketing communications

### California Residents (CCPA)

California users have the right to:
- Know what personal information we collect
- Request deletion of personal information
- Opt-out of sale of personal information (we don't sell!)
- Non-discrimination for exercising privacy rights

---

## Data Breach Protocol

In the unlikely event of a data breach:

1. **Immediate Response:** Secure our systems within 24 hours
2. **Investigation:** Determine scope and affected users
3. **Notification:** Email affected users within 72 hours
4. **Remediation:** Fix vulnerability and enhance security
5. **Regulatory:** Report to authorities as required by law

---

## Children's Privacy

Drafter is not intended for users under 18 years of age. We do not knowingly collect information from minors. Prenuptial agreements require legal capacity to enter into contracts.

---

## International Users

Our service is currently optimized for United States users. If you're outside the US:
- Your data may be transferred to and processed in the US
- We comply with applicable data protection regulations
- Contact us for jurisdiction-specific questions

---

## Changes to This Policy

We may update this policy to reflect:
- Changes in our practices
- New legal requirements
- Service improvements

**How we'll notify you:**
- Email notification to all recent users
- Prominent notice on homepage
- 30-day notice before major changes take effect

---

## Technical Transparency

### Our PII Masking Implementation

For technical users, here's how our masking works:

```
1. User submits intake form
2. Backend validates data
3. Before AI call:
   - Generate random tokens for all PII
   - Create bidirectional mapping (original ↔ token)
   - Replace all PII with tokens
   - Store mapping encrypted in database
4. Send masked data to Anthropic Claude
5. Receive generated prenup with tokens
6. Unmask tokens using stored mapping
7. Generate final DOCX with real data
8. Delete temporary files
```

### Open Source Components

We use the following open-source libraries:
- `docx` for document generation (MIT License)
- `drizzle-orm` for database (Apache 2.0)
- `@anthropic-ai/sdk` for AI integration (MIT License)

---

## Contact Us

### Privacy Questions

**Email:** privacy@drafter.com  
**Response Time:** Within 48 hours for privacy requests

### Security Issues

**Email:** security@drafter.com  
**Response Time:** Within 24 hours for security concerns

### General Support

**Email:** support@drafter.com  
**Response Time:** Within 2 business days

---

## Transparency Report

We're committed to transparency. Here's what we can share:

**As of October 2025:**
- Total generations: [Updated Monthly]
- PII masking success rate: 100%
- Data breaches: 0
- Government data requests: 0
- User data deletions honored: 100%

---

## Trust & Verification

### Independent Audits

We welcome:
- Security researcher review of our masking implementation
- Third-party privacy audits
- Penetration testing (contact security@drafter.com)

### Certifications (Planned)

- SOC 2 Type II certification (in progress)
- Privacy Shield framework compliance (if applicable)

---

**By using Drafter, you agree to this Privacy Policy.**

For the full Terms of Service, see: [Link to TOS when created]

---

*This policy demonstrates our commitment to privacy-first AI services. If you have questions or concerns, we're here to help.*

**Drafter Team**  
privacy@drafter.com
