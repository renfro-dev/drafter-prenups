# Drafter - AI-Powered Prenuptial Agreement Platform

## Overview

Drafter is a web application that enables couples to generate legally sound prenuptial agreements through an AI-powered guided intake process. The system collects user information via a multi-step form, automatically masks personally identifiable information (PII) before AI processing, generates jurisdiction-specific prenuptial agreements using Claude AI, and delivers the final document as a Word file via email.

The platform addresses the high cost and complexity of traditional prenuptial agreements ($3,000-$8,000) by offering an affordable alternative at $49, while maintaining legal accuracy through a curated clause library and ensuring data privacy through automatic PII masking.

## User Preferences

Preferred communication style: Simple, everyday language.

---

## 📁 Project Organization

### Documentation Structure

**Birds Eye/** - Strategic documentation hub for high-level project overview
- `Design.md` - Design system guidelines and UI/UX principles
- `PRD.txt` - Product Requirements Document
- `privacy-policy.md` - Privacy policy documentation
- `replit.md` - This file: Project architecture and technical overview
- `tasks.md` - Action items, future enhancements, and roadmap
- `Tech.txt` - Technical architecture details
- **`session-logs/`** - Development session tracking (PST timezone)
  - `summary.md` - Quick reference (1-2 lines per session)
  - `detailed-logs.md` - Full session documentation
  - `template.md` - Logging instructions and structure

**agent-roles/** - SEO implementation playbooks for 50-state expansion
- `seo-technical-agent.md` - Technical SEO foundation (schema, Core Web Vitals, sitemaps)
- `seo-content-strategy-agent.md` - Content strategy and keyword research
- `seo-backlinks-agent.md` - Link building and authority development
- `seo-llm-optimization-agent.md` - AI search optimization (ChatGPT, Perplexity, Google SGE)
- `seo-roadmap-agent.md` - 12-month phased implementation plan

**Application Code:**
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript schemas and types
- `data/` - Legal clause library (california-clauses.json)

---

## System Architecture

### Monorepo Structure
The application uses a monorepo architecture with three main directories:
- **`client/`** - React frontend application
- **`server/`** - Express.js backend API
- **`shared/`** - Shared TypeScript schemas and types used by both client and server

### Frontend Architecture

**Build System**: Vite serves as the development server and build tool, providing fast hot module replacement and optimized production builds. The application is configured for custom mode with server-side rendering support during development.

**UI Framework**: Built with React and uses Wouter for lightweight client-side routing (chosen over React Router for minimal bundle size). The design system is implemented using Shadcn/ui components built on Radix UI primitives, providing accessible, composable UI components styled with Tailwind CSS.

**Design Philosophy**: Professional legal tech aesthetic inspired by Stripe (trust/clarity), Linear (clean forms), and Notion (guided workflows). Uses a custom color palette optimized for trust and security with a professional blue primary color, supporting both light and dark modes.

**Form Management**: React Hook Form handles complex multi-step form state with Zod schema validation, ensuring type-safe data collection and validation before submission. The intake form is divided into four steps: Personal Info, Assets & Debts, Preferences, and Review & Submit.

**State Management Strategy**:
- TanStack Query (React Query) manages server state, API calls, and caching
- React Hook Form manages form state with controlled components
- Local React hooks handle UI state (modals, accordions, tooltips)

**Routing Structure**:
- `/` - Marketing landing page with feature highlights and FAQ
- `/intake` - Multi-step form for data collection
- `/success` - Confirmation page with document download/email status
- `/privacy-policy` - Detailed privacy and PII masking explanation

### Backend Architecture

**Server Framework**: Express.js with TypeScript, running on Node.js. The server handles API requests, database operations, AI orchestration, and document generation.

**Request Processing Pipeline**:
1. **Validation** - Intake data validated against Zod schema (`insertIntakeSchema`)
2. **PII Masking** - Sensitive information replaced with randomized tokens before AI processing
3. **Database Storage** - Original and masked data stored in PostgreSQL with status tracking
4. **Clause Retrieval** - Jurisdiction-specific legal clauses fetched from database
5. **AI Generation** - Masked data + clauses sent to Claude AI for prenup generation
6. **Document Creation** - Generated content unmasks PII and renders to Word (.docx) format
7. **Email Delivery** - Document sent via SMTP with HTML email template
8. **Response** - Document URL and delivery status returned to client

**API Design**: Single primary endpoint `POST /api/generate` accepts intake data and returns the generated document. This monolithic endpoint was chosen for simplicity in the MVP, handling the entire generation pipeline in one request.

**Error Handling**: Comprehensive try-catch blocks with status tracking in database. If email delivery fails, the system provides a download URL fallback, ensuring users always receive their document.

### Data Privacy & PII Masking System

**Core Privacy Architecture**: The platform's differentiating feature is automatic PII masking before AI processing. This ensures that Anthropic Claude never receives raw sensitive information.

**Masking Strategy**:
- **Names**: `PARTY_A_*` and `PARTY_B_*` with random UUIDs
- **Financial Values**: `VALUE_*` tokens for amounts
- **Descriptions**: `DESC_*` tokens for asset/debt descriptions
- **Dates**: `DATE_*` tokens for wedding dates
- **Email**: `EMAIL_*` tokens

**Unmasking Process**: After AI generation, tokens are replaced with original values during Word document creation, ensuring the final prenup contains actual user data.

**Storage**: Both original intake data and masked versions are stored in the database with a JSON `pii_map` that maintains token-to-value mappings. Data retention is 7 days (documented in privacy policy).

### Database Architecture

**Database Technology**: PostgreSQL hosted on Neon (serverless Postgres), chosen for its serverless architecture, generous free tier, and compatibility with Drizzle ORM.

**Schema Design**:

**`intakes` table** - Stores user submissions with PII masking
- `id` (UUID primary key)
- `email` - User email for delivery
- `state` - Jurisdiction (currently only CA supported)
- `party_a_name`, `party_b_name` - Parties' names
- `wedding_date` - Planned marriage date
- `intake_data` (JSONB) - Original unmasked form data
- `masked_data` (JSONB) - PII-masked version for AI
- `pii_map` (JSONB) - Token-to-value mapping for unmasking
- `prenup_doc_url` - Base64-encoded document or download URL
- `status` - Tracks processing state (pending/processing/completed/failed)
- `created_at` - Timestamp for data retention

**`clauses` table** - Jurisdiction-specific legal clauses
- `id` (UUID primary key)
- `clause_id` - Unique identifier (e.g., "CA-RECITALS-001")
- `title` - Human-readable clause name
- `category` - Clause type (recitals, disclosure, separate_property, etc.)
- `jurisdiction` - State code (CA, NY, TX, etc.)
- `text_normalized` - Clause text with PII token placeholders
- `applicable_when` (JSONB) - Conditional logic for clause inclusion
- `version` - Clause version for future updates

**`generation_logs` table** - AI generation audit trail
- `id` (UUID primary key)
- `intake_id` - Foreign key to intakes
- `clauses_used` (JSONB) - Which clauses were included
- `prompt_tokens`, `completion_tokens` - AI usage metrics
- `success` - Whether generation succeeded
- `error_message` - Failure details if applicable
- `created_at` - Timestamp

**Migration Strategy**: Database initialization is handled via SQL migration files in `server/db/migrations/`. On server startup, tables are created if they don't exist, and California clauses are seeded from `data/clauses/california-clauses.json`.

### AI Integration

**Provider**: Anthropic Claude (latest model: `claude-sonnet-4-20250514`) chosen for its strong performance on structured legal text generation and JSON output reliability.

**Prompt Architecture**:
- **System Prompt**: Defines role as legal drafting AI, specifies output format (JSON with sections), and sets expectations for California Family Code compliance
- **User Prompt**: Contains masked intake data + retrieved legal clauses + formatting instructions

**Output Format**: Claude returns structured JSON with jurisdiction and sections array, validated against `generatedPrenupSchema` before document creation.

**Token Management**: Generation logs track prompt and completion tokens for cost monitoring and optimization.

### Document Generation

**Library**: `docx` npm package creates Word documents programmatically with proper formatting, headers, paragraphs, and text runs.

**Document Structure**:
1. Title page with "PRENUPTIAL AGREEMENT"
2. Introduction paragraph with party names and signature line placeholders
3. Sections from AI generation (Recitals, Disclosure, Separate Property, etc.)
4. Each section rendered as heading + formatted text with proper spacing

**Delivery Format**: Documents are converted to base64-encoded data URLs for inline storage, or can be downloaded directly via browser API.

### Email Delivery System

**SMTP Configuration**: Uses Nodemailer with configurable SMTP settings (Gmail, SendGrid, AWS SES, or Mailgun supported). Requires environment variables for host, port, user, password.

**Email Template**: HTML email with professional styling includes:
- Drafter branding
- Personalized greeting with party names
- Explanation of document attachment
- Next steps (review, attorney consultation, signing)
- Privacy reminder about 7-day data deletion
- Contact information

**Attachment**: Word document attached as `.docx` file with proper MIME type.

**Fallback Strategy**: If email delivery fails, the frontend displays a download button using the base64 data URL, ensuring users always receive their document.

---

## External Dependencies

### Third-Party Services

**Anthropic Claude AI**:
- Purpose: Generate prenuptial agreement text from masked intake data and legal clauses
- Integration: `@anthropic-ai/sdk` npm package with API key authentication
- Required: `ANTHROPIC_API_KEY` environment variable
- Usage: Single API call per prenup generation with JSON response parsing

**Neon Database (PostgreSQL)**:
- Purpose: Serverless PostgreSQL hosting for intakes, clauses, and generation logs
- Integration: `@neondatabase/serverless` package with connection pooling
- Required: `DATABASE_URL` environment variable
- Features: Automatic scaling, generous free tier, WebSocket connections

**SMTP Email Service** (Gmail/SendGrid/AWS SES/Mailgun):
- Purpose: Deliver generated prenuptial agreements to users
- Integration: Nodemailer with configurable SMTP settings
- Required: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` environment variables
- Status: Currently not configured (critical blocker for production)

### Frontend Dependencies

**UI Component Libraries**:
- Radix UI primitives (`@radix-ui/react-*`) - 20+ accessible component primitives
- Shadcn/ui - Pre-built component implementations with Tailwind styling
- Tailwind CSS - Utility-first CSS framework with custom design tokens

**Form & Validation**:
- React Hook Form (`react-hook-form`) - Form state management
- Zod (`zod`) - Schema validation and TypeScript type inference
- `@hookform/resolvers` - Integration between React Hook Form and Zod

**Data Fetching**:
- TanStack Query (`@tanstack/react-query`) - Server state management, caching, and synchronization

**Routing**:
- Wouter (`wouter`) - Lightweight client-side router (chosen over React Router for smaller bundle size)

### Backend Dependencies

**Core Framework**:
- Express.js (`express`) - Web server framework
- TypeScript (`tsx` for development) - Type safety and developer experience

**Database**:
- Drizzle ORM (`drizzle-orm`) - Type-safe database queries
- `drizzle-kit` - Database migrations and schema management
- `@neondatabase/serverless` - Neon-specific PostgreSQL client

**AI Integration**:
- `@anthropic-ai/sdk` - Official Anthropic Claude SDK

**Document Generation**:
- `docx` - Microsoft Word document creation
- `nodemailer` - Email sending with SMTP

**Utilities**:
- `nanoid` - Random ID generation
- `date-fns` - Date formatting and manipulation

### Development Tools

**Build Tools**:
- Vite - Frontend build tool and dev server
- esbuild - Backend bundler for production
- TypeScript compiler (`tsc`) - Type checking

**Replit-Specific**:
- `@replit/vite-plugin-runtime-error-modal` - Development error overlay
- `@replit/vite-plugin-cartographer` - Code navigation
- `@replit/vite-plugin-dev-banner` - Development environment indicator

---

## Critical Configuration Requirements

### Environment Variables Needed
```
DATABASE_URL=<Neon PostgreSQL connection string>
ANTHROPIC_API_KEY=<Anthropic API key>
SMTP_HOST=<SMTP server hostname>
SMTP_PORT=<SMTP port (587 or 465)>
SMTP_USER=<SMTP username/email>
SMTP_PASS=<SMTP password/app-specific password>
SMTP_FROM=<From email address>
NODE_ENV=production (for production deployment)
```

### Known Limitations
1. California-only support (21 clauses loaded, other states not yet implemented)
2. AI-generated clauses not attorney-reviewed (legal liability risk)
3. Email delivery not configured (requires SMTP credentials)
4. No user authentication (stateless, one-time generation)
5. No payment processing (marked as $49 but not implemented)
6. 7-day data retention policy documented but not automated

---

## Expansion Plans

### SEO Strategy for 50-State Rollout
Complete SEO playbooks are available in `agent-roles/` folder:

**Phase 1 (Months 1-3): California + Top 5 States**
- Foundation: Technical SEO, schema markup, Core Web Vitals
- Content: State landing pages for CA, NY, TX, FL, IL
- Backlinks: Legal directories, attorney partnerships
- Target: 10 states, 5K visitors/month, DR 20-25

**Phase 2 (Months 4-6): 25 States**
- Scale content production (10 states/month)
- Guest posting and PR outreach
- LLM optimization (ChatGPT, Perplexity, Google SGE)
- Target: 25 states, 25K visitors/month, DR 30-35

**Phase 3 (Months 7-9): 40 States**
- Content velocity increases
- Link-worthy assets (cost calculator, research reports)
- Attorney marketplace SEO
- Target: 40 states, 60K visitors/month, DR 37-40

**Phase 4 (Months 10-12): All 50 States**
- Complete coverage of all US states
- Optimization of existing content
- Featured snippet domination
- Target: 50 states, 100K visitors/month, DR 42-45

### Future Document Types
- Postnuptial agreements (50 states)
- Separation agreements (50 states)
- Cohabitation agreements (50 states)
- Marital settlement agreements (50 states)

### Additional Features (See tasks.md)
- Payment integration (Stripe)
- User accounts and dashboard
- Attorney review marketplace
- Multi-language support (Spanish)

---

*Last Updated: October 18, 2025*
