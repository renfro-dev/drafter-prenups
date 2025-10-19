# Mock Prenuptial Agreements

This folder contains 3 AI-generated prenuptial agreements demonstrating Drafter's capabilities across different scenarios.

## 📁 Generated Documents

### 1. Young Tech Couple (`1-Young-Tech-Couple.docx`)
**Parties:** Jennifer Martinez & Michael Chen  
**Wedding Date:** August 15, 2025

**Scenario:**
- Both work in Silicon Valley tech companies
- High income with RSUs and stock options
- Minimal existing assets (mostly retirement accounts and savings)
- Student loan debt from prestigious universities
- Want to protect future equity compensation

**Total Assets:** ~$623,000
- Tesla RSUs (unvested): $250,000
- 401k (Google): $180,000
- Vanguard Index Funds: $120,000
- Savings accounts: $73,000

**Total Debts:** $107,000 (student loans)

**Key Provisions:**
- Future equity compensation treated as separate property
- Spousal support waived
- Student debt remains separate

---

### 2. Second Marriage with Children (`2-Second-Marriage-with-Children.docx`)
**Parties:** Robert Anderson & Elizabeth Thompson  
**Wedding Date:** March 20, 2026

**Scenario:**
- Both previously married with children from prior relationships
- Established estates with significant assets
- Want to protect children's inheritance rights
- Both have retirement accounts and real property
- Both represented by independent counsel

**Total Assets:** ~$3,335,000
- Primary residence (San Diego): $1,250,000
- Rental property (Sacramento): $650,000
- Combined retirement accounts: $1,000,000
- Investment/savings: $435,000

**Total Debts:** $625,000 (mortgages on properties)

**Key Provisions:**
- All pre-marital assets remain separate property
- Children from previous marriages named as primary beneficiaries
- Life insurance policies protect biological children
- Separate property protection strongly emphasized

---

### 3. Entrepreneur and Professional (`3-Entrepreneur-and-Professional.docx`)
**Parties:** Sarah Kim & David Rodriguez  
**Wedding Date:** November 10, 2025

**Scenario:**
- Sarah owns TechStart Solutions LLC (software consulting)
- David is a physician at Kaiser Permanente
- Significant income disparity
- Business protection is critical
- Both have professional degrees with associated debt
- Both represented by independent counsel

**Total Assets:** ~$2,518,000
- Business (TechStart Solutions): $850,000
- Commercial office space: $920,000
- Combined retirement/savings: $673,000
- Tesla Model S: $75,000

**Total Debts:** $795,000
- Commercial property mortgage: $480,000
- Medical school loans: $195,000
- Business line of credit: $120,000

**Key Provisions:**
- Business remains 100% separate property of Sarah
- Business appreciation during marriage stays separate
- Future businesses governed by separate addendum
- Medical practice income is community property
- No spousal support waiver (due to income disparity)

---

## 🔧 How These Were Generated

1. **Mock data created** in `mock-scenarios.json`
2. **Script executed**: `generate-mocks.ts`
3. **AI Generation**: Each scenario sent to Anthropic Claude via `/api/generate` API
4. **PII Masking**: All personal information masked before AI processing
5. **Document Creation**: Word documents generated using `docx` library
6. **Output**: Professional attorney-ready prenuptial agreements

---

## 📊 What These Demonstrate

✅ **Privacy-First Architecture** - PII masking ensures names/values never reach AI in raw form  
✅ **California Compliance** - All agreements follow CA Family Code requirements  
✅ **Complex Asset Handling** - Businesses, real estate, retirement accounts, equity compensation  
✅ **Diverse Scenarios** - First marriage, second marriage, entrepreneurs, professionals  
✅ **Professional Output** - Attorney-ready Word documents with proper legal formatting  
✅ **Speed** - All 3 generated in ~10 seconds total (vs. 4-8 weeks with traditional attorneys)

---

## 💡 Usage

These mock prenups demonstrate:
- What customers receive for $49
- Quality of AI-generated legal documents
- Handling of complex financial situations
- California-specific legal language
- Professional document formatting

**Note:** These are demonstration documents using fictional parties and data. Real prenups require actual financial disclosure and attorney review before signing.
