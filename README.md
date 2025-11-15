## Drafter — AI Prenup Generator (California)

An end‑to‑end web app that generates a California prenuptial agreement using AI, masks PII during processing, renders a professional Word document, and supports collaborative clause‑by‑clause review. Delivery is via email (SendGrid) with a resilient client‑side download fallback.

### Key Features
- AI drafting with Anthropic Claude, grounded by a curated clause library
- PII masking and careful unmasking when producing the final DOCX
- Professional Word (.docx) export via `docx`
- Email delivery via SendGrid Web API, with download fallback
- Collaborative review: clauses are parsed and saved for later review
- Terms acceptance ledger for compliance
- Works locally and on Replit deployment


## Tech Stack
- Server: Node.js, Express, Vite middleware in dev
- Frontend: React + Vite + Tailwind + shadcn/ui + Radix UI, Router: `wouter`
- AI: `@anthropic-ai/sdk`
- DB: Postgres (Neon recommended) via `drizzle-orm`
- Email: `@sendgrid/mail`
- Build: Vite, esbuild


## Project Structure
- `client/` — SPA frontend (Vite)
- `server/` — Express server, API routes, Vite dev middleware, static serving in prod
- `server/utils/` — document generation, PII operations, email sender
- `server/lib/` — AI client wrapper (Anthropic)
- `server/db/` — DB bootstrap/init
- `data/clauses/` — jurisdiction clause library (e.g., California)
- `shared/` — shared types and schemas
- `scripts/` — utilities for QA, PII map checks, etc.


## Prerequisites
- Node.js 20+
- A Postgres database (Neon recommended)
- Anthropic API key
- SendGrid account and a verified sender (for production email)


## Getting Started (Local)
1) Install dependencies

```bash
npm install
```

2) Create a `.env` file in the project root (adjust as needed)

```bash
# Server basics
PORT=5000
NODE_ENV=development

# AI
ANTHROPIC_API_KEY=your-anthropic-key

# Database (prefer SUPABASE_DB_URL if using Supabase-hosted Postgres; else DATABASE_URL)
DATABASE_URL=postgres://user:pass@host:5432/dbname
# SUPABASE_DB_URL=postgres://...  # optional alternative

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=hello@yourdomain.com  # must be a verified sender

# URLs
PUBLIC_BASE_URL=http://localhost:5000

# Auth (defaults to Replit auth; these can remain unset locally if not needed)
AUTH_PROVIDER=replit
# SUPABASE_URL=...
# SUPABASE_JWKS_URL=...
# SUPABASE_JWT_ISSUER=...
# SUPABASE_JWT_AUDIENCE=...
# SESSION_SECRET=your-session-secret
# REPLIT_DOMAINS=your-repl-co-domain
# REPL_ID=...
# ISSUER_URL=...
```

3) Initialize database (optional; project will attempt best‑effort boot)

```bash
npm run db:push
```

4) Start in development

```bash
npm run dev
```

The server will log something like “serving on localhost:5000”. Visit `http://localhost:5000`.


## Production Build & Run
```bash
npm run build
npm start
```

`build` will produce client assets and bundle the server to `dist/`. In production the server serves static files from its `public` folder (populated by the Vite client build per config).


## Scripts
- `npm run dev` — Start Express + Vite middleware in development on `PORT` (default 5000)
- `npm run build` — Build client and server bundle
- `npm start` — Run the production server bundle
- `npm run check` — Type check
- `npm run db:push` — Push DB schema via drizzle‑kit
- `npm run test:qa` — Run QA data script
- `npm run test:qa:parallel` — Run QA script with parallelism


## Environment Variables (Reference)
- Server and Environment
  - `PORT` (default `5000`)
  - `NODE_ENV` (`development` | `production`)
  - `PUBLIC_BASE_URL` (used in certain email templates/links)
- AI
  - `ANTHROPIC_API_KEY` (required for prenup generation)
- Database
  - `DATABASE_URL` or `SUPABASE_DB_URL`
- Email (SendGrid)
  - `SENDGRID_API_KEY` (required for email delivery)
  - `SENDGRID_FROM_EMAIL` (MUST be a verified sender in SendGrid)
- Auth (optional/advanced)
  - `AUTH_PROVIDER` (defaults to `replit`)
  - `SUPABASE_URL`, `SUPABASE_JWKS_URL`, `SUPABASE_JWT_ISSUER`, `SUPABASE_JWT_AUDIENCE`
  - `SESSION_SECRET`, `REPLIT_DOMAINS`, `REPL_ID`, `ISSUER_URL`


## Core Endpoints (Server)
- `POST /api/generate`
  - Validates intake, masks PII, generates agreement JSON via Claude, produces Word document, saves metadata, parses and stores clauses for review, and returns `{ success, intakeId, message }` for redirect to review.
- `POST /api/generate-email`
  - Lightweight flow: validates intake and terms, masks PII, generates agreement JSON, produces Word document, attempts email delivery, always returns a `downloadUrl` fallback.
  - Response: `{ success: true, emailDelivered: boolean, downloadUrl: string }`
- `GET /api/intake/:id`
  - Fetches persisted intake record (used by review page).
- `GET /api/clauses?jurisdiction=CA`
  - Loads clause library used for generation and review.
- `GET /api/review/:intakeId/progress`
  - Returns `{ total, reviewed }` summary for review progress.
- `POST /api/terms/accept`
  - Records Terms & Conditions acceptance ledger for an email and parties; required before generation.
- `POST /api/test-email`
  - Sends a simple test email (useful for verifying SendGrid setup in non‑prod environments).


## Email Delivery
The app uses SendGrid’s Web API in `server/utils/email-sender.ts`.

Requirements:
- `SENDGRID_API_KEY` must be set.
- `SENDGRID_FROM_EMAIL` must be a verified sender in SendGrid.

If delivery fails, the API returns `emailDelivered: false` and the client shows a “Email Delivery Failed” state while still providing a download button. Server logs will include provider error details for diagnosis.


## Collaborative Review
- Generated prenup JSON is parsed into clauses and stored. The review UI loads clauses and allows marking as reviewed, and tracks progress.
- If parsing fails, generation still succeeds; collaborative review features will simply be unavailable for that record.


## Security & Privacy
- PII is masked prior to AI calls; unmasking occurs only when generating the final document.
- Terms acceptance is enforced before generation and recorded.
- The client’s success page only uses server‑returned `downloadUrl` (data URL) and email flags; no secrets are exposed.


## Deployment (Replit)
1) Add Secrets:
   - Required: `ANTHROPIC_API_KEY`, `DATABASE_URL` (or `SUPABASE_DB_URL`)
   - Email: `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL` (verified sender)
   - Optional: `PUBLIC_BASE_URL`, `AUTH_PROVIDER` and any auth‑related variables
2) Ensure Replit uses the environment `PORT` (the server binds to `0.0.0.0` in production).
3) Run `npm run build`, then `npm start`.
4) If email fails in production, verify sender/domain authentication in SendGrid and the `SENDGRID_FROM_EMAIL` value in Replit Secrets.


## Troubleshooting
- Email Delivery Failed
  - Confirm `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` in environment.
  - Verify the sender/domain in SendGrid (Single Sender or Domain Authentication).
  - Use `POST /api/test-email` to confirm connectivity.
- AI Response JSON Errors
  - Check server logs for “[AI Response]” errors; they include parsing diagnostics.
- “No clauses found for jurisdiction: …”
  - Ensure `data/clauses/` contains the jurisdiction used by the intake (`state`), e.g., California.
- Database connection
  - Verify `DATABASE_URL` (or `SUPABASE_DB_URL`) and that the Postgres instance is reachable.


## Legal Notice
The generated document is not legal advice. Parties must consult independent counsel and follow California requirements (e.g., disclosure, timelines, notarization). The app reminds users of these steps in the email and UI.


## License
MIT


