# Drafter - AI-Powered Prenuptial Agreement Platform

## Overview

Drafter is a secure, AI-driven web application that enables couples to generate legally sound prenuptial agreements through a guided intake process. The system generates jurisdiction-specific prenups (currently focused on California) by combining user input with a curated legal clause library, processed through Claude AI to produce attorney-ready documents in under 10 minutes.

The platform aims to democratize access to prenuptial agreements by reducing costs from $3,000-$8,000 to $49, while maintaining legal accuracy and data privacy through automatic PII masking and secure document generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with Vite as the build tool and development server

**Routing**: Wouter for lightweight client-side routing with four main pages:
- Home (marketing/landing page with header link to privacy policy)
- Intake (multi-step form for collecting user data)
- Success (confirmation and document delivery)
- Privacy Policy (detailed data privacy and PII masking explanation)

**UI Framework**: Shadcn/ui component library with Radix UI primitives and Tailwind CSS
- Design system follows a professional legal tech aesthetic inspired by Stripe, Linear, and Notion
- Custom color palette optimized for trust and security (professional blue primary, with light/dark mode support)
- Inter font family for modern, professional typography

**State Management**: 
- React Hook Form for complex multi-step form handling with Zod schema validation
- TanStack Query (React Query) for server state management and API communication
- Local component state via React hooks

**Form Flow**: Multi-step intake process collecting:
1. Personal information (party names, email, state, wedding date)
2. Assets and debts with detailed categorization
3. Additional preferences
4. Review and submission

### Backend Architecture

**Runtime**: Node.js with Express.js server framework

**API Structure**: RESTful API with a single primary endpoint:
- `POST /api/generate` - Accepts intake data, orchestrates prenup generation, returns document

**Request Processing Pipeline**:
1. Validate intake data against Zod schema
2. Mask PII (personally identifiable information) using token replacement
3. Store intake record with masked data and PII mapping
4. Retrieve jurisdiction-specific legal clauses from database
5. Generate prenup via Anthropic Claude AI
6. Create Word document (.docx) from generated content
7. Unmask PII in final document
8. Store document URL and send email with attachment

**PII Security Pattern**: 
- Automatically masks names, financial values, descriptions, and dates before AI processing
- Replaces sensitive data with tokens (e.g., `PARTY_A_*`, `VALUE_*`, `DESC_*`, `DATE_*`)
- Maintains bidirectional mapping for unmasking in final output
- AI never sees actual personal information

**Document Generation**: Uses `docx` library to create professionally formatted Word documents with proper legal structure, headings, and formatting

**Email Delivery**: Nodemailer integration for sending generated prenups as email attachments with HTML-formatted message

### Data Storage Solutions

**Database**: PostgreSQL via Neon serverless driver (@neondatabase/serverless)

**ORM**: Drizzle ORM for type-safe database operations

**Schema Design**:

1. **Intakes Table**: Stores user submissions
   - User contact info (email)
   - Jurisdiction (state)
   - Party names and wedding date
   - Full intake data (JSONB)
   - Masked data for AI processing (JSONB)
   - PII mapping for unmasking (JSONB)
   - Generated document URL
   - Processing status

2. **Clauses Table**: Legal clause library
   - Unique clause IDs (e.g., `CA-RECITALS-001`)
   - Title and category (recitals, disclosure, property, etc.)
   - Jurisdiction (currently CA for California)
   - Normalized legal text
   - Applicability conditions (JSONB)
   - Version tracking

3. **Generation Logs Table**: Audit trail
   - Links to intake records
   - Clauses used in generation
   - Token usage metrics (prompt/completion)
   - Success/failure status
   - Error messages

**Data Initialization**: Automatic database setup with migrations and California clause seeding on server startup

### External Dependencies

**AI Service**: Anthropic Claude API
- Model: `claude-sonnet-4-20250514` (latest Claude Sonnet)
- Purpose: Generate prenup content from masked intake + legal clauses
- Input: Masked user data and jurisdiction-specific legal clause library
- Output: Structured JSON with agreement sections (recitals, disclosure, property, etc.)
- System prompt ensures California-specific legal language and proper structure

**Email Service**: SMTP via Nodemailer
- Configurable SMTP server (defaults to Gmail)
- Sends generated prenup documents as .docx attachments
- HTML-formatted professional email template
- Environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`

**Database Provider**: Neon (serverless PostgreSQL)
- Configured via `DATABASE_URL` environment variable
- Automatic provisioning expected for Replit deployments

**UI Component Library**: Radix UI
- Provides accessible, unstyled primitives for complex components
- All major UI patterns (dialogs, dropdowns, forms, etc.)
- Styled via Tailwind CSS with custom design tokens

**Font Provider**: Google Fonts
- Inter font family for UI text
- JetBrains Mono for monospace/code contexts

### Development & Build Tools

**TypeScript**: Full type safety across client, server, and shared code
- Shared schema definitions in `/shared/schema.ts`
- Path aliases: `@/` for client, `@shared/` for shared code

**Build Process**:
- Client: Vite builds React app to `dist/public`
- Server: esbuild bundles Express server to `dist/index.js`
- Production: Serves static client from built server

**Development Server**: Vite middleware integration with HMR and Express API routes

**Schema Validation**: Zod schemas for runtime type validation
- Shared between client and server
- Drizzle-Zod integration for database schema validation