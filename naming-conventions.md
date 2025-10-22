# Drafter - Naming Conventions

This document defines consistent terminology for different sections and features of the Drafter application.

## Core Application Sections

### **Intake Form**
**Route:** `/intake`  
**Description:** Multi-step form where users enter their personal information, assets, debts, and preferences to generate a prenuptial agreement.

**Sub-sections:**
- **Step 1: Personal Info** - Party names, email, state, wedding date
- **Step 2: Assets & Debts** - Financial information for both parties
- **Step 3: Preferences** - Property division, spousal support, special provisions
- **Step 4: Review & Submit** - Final review and email delivery address

**Related Terms:**
- "Form submission"
- "Prenup generation"
- "Intake data"

---

### **Clause Review** (also "Review Page")
**Route:** `/review/:prenupId`  
**Description:** Collaborative interface where users can review their generated prenuptial agreement clause-by-clause, with AI-powered explanations and discussion tools.

**Key Features:**
- **Clause-by-clause display** - Each legal section shown separately
- **Legal language view** - Original attorney-drafted text
- **Progress tracking** - Shows percentage of clauses reviewed

**Related Terms:**
- "Review interface"
- "Prenup review"
- "Clause breakdown"

---

### **Engagement Features** (also "Collaborative Features")
**Location:** Within Clause Review page  
**Description:** Interactive tools that allow users to engage with individual clauses. Requires authentication.

**Features:**
1. **Explain** - Get plain-English AI explanation of complex legal language
2. **Flag for Discussion** - Mark clauses that need discussion between parties
3. **Add Comment** - Leave notes or questions about specific clauses
4. **Ask Question** - Get AI-powered answers about specific clause implications

**Access Control:**
- Viewing clauses: No login required (UUID acts as access token)
- Using engagement features: Login required
- Any authenticated user with the link can collaborate

**Related Terms:**
- "Collaborative tools"
- "Clause interactions"
- "Discussion features"
- "AI explanations"

---

## User Journey Sections

### **Success Page**
**Route:** `/success`  
**Description:** Confirmation page shown after successful prenup generation (when email delivery works).

**Elements:**
- Email delivery confirmation
- Download button (fallback)
- Review link

---

### **Homepage**
**Route:** `/`  
**Description:** Landing page with feature overview, FAQ, and conversion CTAs.

---

## Technical Components

### **PII Masking System**
**Description:** Privacy-first architecture that replaces sensitive user data with random tokens before sending to AI.

**Related Terms:**
- "Privacy masking"
- "Token replacement"
- "Data anonymization"

---

### **Clause Library**
**Database Table:** `clauses`  
**Description:** Jurisdiction-specific legal clauses (currently California) used to generate prenups.

**Related Terms:**
- "Legal templates"
- "Clause repository"
- "Template library"

---

### **Generation Pipeline**
**Endpoint:** `POST /api/generate`  
**Description:** End-to-end process that takes intake data and produces a Word document.

**Steps:**
1. Intake validation
2. PII masking
3. Clause retrieval
4. AI generation (Anthropic Claude)
5. Document creation (Word)
6. Email delivery (SendGrid)
7. Database logging

---

## Authentication & Access

### **UUID-Based Access Model**
**Description:** Security model where the prenup UUID in the URL acts as an access token.

**Rules:**
- **View without login:** Anyone with the link can view clauses
- **Collaborate with login:** Authenticated users with the link can use engagement features
- **No email matching:** Any authenticated user can collaborate (supports multiple emails)

---

## Data & Database

### **Intake Record**
**Table:** `intakes`  
**Description:** Stored submission containing user data, masked data, PII map, and generated document.

**Statuses:**
- `pending` - Initial creation
- `processing` - AI generation in progress
- `completed` - Success with email delivery
- `completed_no_email` - Success but email failed (download available)
- `failed` - Generation failed

---

### **Prenup Clauses**
**Table:** `prenup_clauses`  
**Description:** Individual clauses extracted from the generated prenup, stored for review interface.

---

## Feature-Specific Terms

### **Flags** (Clause Flags)
User-marked clauses that need discussion. Stored in `clause_flags` table.

### **Comments** (Clause Comments)
User notes on specific clauses. Stored in `clause_comments` table.

### **Questions** (Clause Questions)
User questions with AI-generated answers. Stored in `clause_questions` table.

### **Explanations** (AI Explanations)
Plain-English explanations of legal text. Stored in `clause_explanations` table.

---

## Common Abbreviations

- **PII** - Personally Identifiable Information
- **AI** - Artificial Intelligence (Anthropic Claude)
- **UUID** - Universally Unique Identifier
- **OIDC** - OpenID Connect (Replit Auth)
- **CA** - California (jurisdiction)

---

## Quick Reference

| User Says... | We Call It... | Location |
|--------------|---------------|----------|
| "The form" | Intake Form | `/intake` |
| "The review" | Clause Review | `/review/:id` |
| "The explain button" | Engagement Features | Within Clause Review |
| "The comments/flags" | Engagement Features | Within Clause Review |
| "The generated document" | Prenup Document / Word Document | Emailed or downloaded |
| "The AI explanation" | Plain-English Explanation | Engagement feature result |

---

Last Updated: 2025-10-22
