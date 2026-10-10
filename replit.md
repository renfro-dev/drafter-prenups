# Drafter - AI-Powered Prenuptial Agreement Platform

## Overview

Drafter is a collaborative web application that enables couples to generate and review California-compliant prenuptial agreements through an AI-powered platform. The platform addresses the high cost ($3,000-$10,000) and complexity of traditional prenuptial agreements by offering an automated solution at $49 with built-in collaboration tools.

The system collects user information via a multi-step form, uses advanced PII (Personally Identifiable Information) masking to protect privacy, generates attorney-ready documents using Anthropic Claude AI with jurisdiction-specific legal clauses, and delivers the final prenup as a Word document via email. After generation, both parties can log in to review the prenup clause-by-clause, get AI explanations, flag concerns, add comments, and ask questions.

**Core Value Proposition:**
- **Privacy-First Architecture**: PII masking ensures sensitive information never reaches the AI in raw form
- **Collaborative Review**: Both parties can review, discuss, and understand each clause together
- **AI-Powered Explanations**: Get plain-English explanations of complex legal language
- **Legal Accuracy**: Uses curated California Family Code-compliant clauses
- **Speed**: Complete prenup generation in under 10 minutes
- **Affordability**: $49 vs $3,000-$10,000 traditional cost
- **Attorney-Ready Output**: Professional Word documents ready for legal review

## User Preferences

Preferred communication style: Simple, everyday language.

---

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, bundled via Vite

**UI Component System**: 
- Shadcn/ui component library (Radix UI primitives)
- Tailwind CSS for styling with custom design tokens
- Professional legal tech aesthetic: Navy-slate backgrounds, trust blue accents, serif fonts for legal text

**Authentication & Access Control**:
- Replit Auth (OIDC) integration for secure user login
- Global Header component with login/logout functionality
- **UUID-Based Access Model**:
  - Viewing prenups: NO authentication required (UUID in URL acts as access token)
  - Collaborative features (Explain, Flag, Comment, Ask): Authentication required
  - Any authenticated user with the UUID link can use collaborative features
  - No email matching required - supports users with multiple email accounts
- **Login Redirect Preservation** (OAuth State Parameter):
  - Frontend sends `returnTo` query parameter to `/api/login`
  - Backend validates and encodes returnTo as base64 JSON in OAuth `state` parameter
  - State parameter survives OAuth redirects (doesn't depend on session persistence)
  - After authentication, user returns to original page (e.g., clause review)
  - Security: Only allows relative paths (prevents open redirect attacks)
- Graceful 401 handling (returns null instead of throwing errors)
- Login prompts appear when unauthenticated users try to use collaborative features

**Routing**: Wouter (lightweight client-side routing)

**State Management**:
- React Hook Form for complex multi-step forms with Zod validation
- TanStack Query (React Query) for server state management
- Local storage for temporary prenup result caching

**Key Pages**:
- `/` - Homepage with feature overview, FAQ, and conversion CTAs
- `/intake` - Multi-step intake form (4 steps: Personal Info → Assets/Debts → Preferences → Review)
- `/success` - Document delivery confirmation with download option
- `/review/:prenupId` - **NEW** Collaborative clause-by-clause review interface with AI explanations, flags, comments, and Q&A
- `/states/california/*` - State-specific landing pages and guides
- `/blog/*` - SEO-optimized educational content
- `/privacy-policy` - Privacy policy with PII masking explanation

**Design System**:
- Light/dark mode support via CSS custom properties
- Legal SaaS aesthetic: Navy-slate (220 20% 10%), trust blue (215 80% 55%)
- Status colors: Success green, warning amber, comment purple
- Serif fonts (font-serif) for legal text, sans-serif for UI
- Consistent spacing, border radius, and color tokens
- Accessibility-first with ARIA labels and semantic HTML

### Backend Architecture

**Framework**: Express.js with TypeScript (ES modules)

**API Design**: RESTful endpoints
- `POST /api/generate` - Main prenup generation pipeline

**Database ORM**: Drizzle ORM with Neon serverless PostgreSQL

**Data Flow**:
1. **Intake Validation**: Zod schema validation on intake data
2. **PII Masking**: Replace sensitive data with random tokens before AI processing
3. **Clause Retrieval**: Fetch jurisdiction-specific legal clauses from database
4. **AI Generation**: Send masked data + clauses to Anthropic Claude
5. **Document Generation**: Convert AI output to Word document using docx library
6. **Email Delivery**: Send document via nodemailer (SMTP)
7. **Database Logging**: Track generation success/failure for monitoring

**Privacy Architecture**:
- PII masking system replaces names, values, descriptions, dates with UUIDs
- Masked data sent to AI (e.g., `PARTY_A_9K2L5M` instead of "Jennifer Martinez")
- Reverse mapping stored securely to reconstruct final document
- Data retention: 7 days default, automatic deletion

**Error Handling**:
- Graceful degradation if email fails (download button provided)
- Detailed error logging for debugging
- User-friendly error messages

### Database Schema

**Tables**:

1. **`intakes`** - User submission records
   - `id` (UUID primary key)
   - `email`, `state`, `party_a_name`, `party_b_name`, `wedding_date`
   - `intake_data` (JSONB) - Full intake form data
   - `masked_data` (JSONB) - PII-masked version sent to AI
   - `pii_map` (JSONB) - Mapping of tokens to original values
   - `prenup_doc_url` (text) - Base64-encoded document or file path
   - `status` (text) - `pending`, `processing`, `completed`, `failed`
   - `created_at` (timestamp)

2. **`clauses`** - Legal clause library
   - `id` (UUID primary key)
   - `clause_id` (text, unique) - e.g., `CA-SEPARATE-001`
   - `title`, `category`, `jurisdiction`
   - `text_normalized` (text) - Pre-tokenized clause text with placeholders
   - `applicable_when` (JSONB) - Conditional logic for clause inclusion
   - `version` (text) - Clause version for updates
   - `created_at` (timestamp)

3. **`generation_logs`** - AI generation audit trail
   - `id` (UUID primary key)
   - `intake_id` (foreign key to intakes)
   - `clauses_used` (JSONB) - Array of clause IDs used
   - `prompt_tokens`, `completion_tokens` - Cost tracking
   - `success` (boolean), `error_message` (text)
   - `created_at` (timestamp)

**Data Storage**: Neon serverless PostgreSQL (DATABASE_URL environment variable)

### AI Integration

**Provider**: Anthropic Claude API (`claude-sonnet-4-20250514`)

**Privacy Guarantees**:
- No training on user data (Anthropic enterprise policy)
- Masked PII before API calls
- No raw sensitive information exposed

**Prompt Engineering**:
- System prompt defines California prenup requirements
- User prompt includes masked intake data + clause library
- JSON-structured output for reliable parsing
- Includes California Family Code citations

**Output Validation**: Zod schema ensures AI returns expected structure

### Document Generation

**Library**: `docx` (Office Open XML generation)

**Process**:
1. Parse AI-generated JSON sections
2. Unmask PII using stored mapping
3. Generate Word document with:
   - Title page with party names
   - Table of contents
   - Formatted sections (headings, paragraphs, lists)
   - Legal styling (Times New Roman, proper spacing)
4. Convert to buffer for delivery

**Output Format**: `.docx` (Microsoft Word)

### Email Delivery

**SMTP Configuration** (environment variables):
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- Supports Gmail, SendGrid, AWS SES, Mailgun

**Email Content**:
- HTML-formatted email with branding
- Attachment: Generated Word document
- Includes attorney review recommendation
- Privacy notice about data deletion

**Fallback**: If email fails, user can download directly from success page

### SEO Architecture

**Meta Tags**: Dynamic SEO component (`SEOHead`) injects:
- Page title, description
- Open Graph tags (social media previews)
- Twitter Card tags

**Structured Data**: JSON-LD schema markup
- `LegalService` - Service offering schema
- `FAQPage` - FAQ structured data for rich snippets
- `Article` - Blog content schema
- `HowTo` - Step-by-step guides

**Content Strategy**:
- State-specific landing pages (`/states/california/*`)
- Educational blog content targeting long-tail keywords
- FAQ sections on all major pages
- Internal linking for topic clustering

**Sitemap**: `sitemap.xml` for search engine crawling

---

## External Dependencies

### Third-Party Services

**AI Provider**: Anthropic Claude API
- Model: `claude-sonnet-4-20250514`
- Purpose: Generate prenuptial agreement text
- API Key: `ANTHROPIC_API_KEY` environment variable
- Privacy: No training on user data per enterprise agreement

**Database**: Neon Serverless PostgreSQL
- Purpose: Store intakes, clauses, generation logs
- Connection: `DATABASE_URL` environment variable
- Features: Auto-scaling, serverless architecture

**Email Delivery**: SMTP (configurable provider)
- Supported: Gmail, SendGrid, AWS SES, Mailgun, custom SMTP
- Purpose: Deliver generated prenup documents to users
- Configuration: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`

### Key NPM Packages

**Core Framework**:
- `react` - UI library
- `express` - Backend server
- `vite` - Build tool and dev server
- `typescript` - Type safety

**Database & ORM**:
- `drizzle-orm` - TypeScript ORM
- `drizzle-kit` - Database migrations
- `@neondatabase/serverless` - Neon PostgreSQL driver

**AI & API**:
- `@anthropic-ai/sdk` - Anthropic Claude client

**Forms & Validation**:
- `react-hook-form` - Form state management
- `zod` - Runtime schema validation
- `@hookform/resolvers` - Zod integration

**UI Components**:
- `@radix-ui/*` - Unstyled accessible primitives
- `tailwindcss` - Utility-first CSS
- `class-variance-authority` - Component variants
- `cmdk` - Command palette

**Document Generation**:
- `docx` - Word document creation

**Email**:
- `nodemailer` - SMTP email sending

**Routing & State**:
- `wouter` - Lightweight routing
- `@tanstack/react-query` - Server state management

**Utilities**:
- `date-fns` - Date manipulation
- `clsx` - Conditional classnames
- `nanoid` - UUID generation

### Environment Variables

**Required**:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `ANTHROPIC_API_KEY` - Anthropic API key

**Email (Required for Production)**:
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP port (587 or 465)
- `SMTP_USER` - SMTP username/email
- `SMTP_PASS` - SMTP password/app-specific password
- `SMTP_FROM` - Sender email address

**Optional**:
- `NODE_ENV` - `development` or `production`

### Legal Content Source

**California Clauses**: 
- Location: `data/clauses/california-clauses.json`
- Status: ⚠️ AI-generated for demonstration (requires attorney review)
- Contains: 21 clauses covering recitals, disclosure, property, support, debts
- References: California Family Code sections (§1615, §760, §2550, §4320, etc.)
- Format: Pre-tokenized with PII placeholders

**Critical Production Requirement**: Legal clauses must be reviewed and verified by California-licensed family law attorney before production use.