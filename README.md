Drafter — AI Prenup Generator

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

