# Drafter (California Prenup) — PRD v2

## 1) Objective
Build a privacy-forward, AI-assisted California prenuptial agreement generator with collaborative review. Keep the current Replit deployment, develop in Cursor locally, and standardize on Supabase Postgres.

## 2) Personas
- Primary couple: non-lawyers creating a prenup, care about clarity, privacy, and speed.
- Internal ops (you): monitors success/failure, email deliverability, minimal support load.

## 3) Success metrics
- Time-to-first-prenup < 3 minutes from intake submit.
- >90% generation success (no-hard-fail) per week.
- Email delivery success > 98% (non-bounce).
- Review engagement: ≥50% open the review page; ≥30% mark ≥1 clause reviewed.

## 4) Scope (v2)
- Intake: guided 4-step form; collects names, date, assets/debts, preferences.
- PII handling: mask before AI; unmask only for authenticated users.
- AI generation: generate JSON sections via Anthropic, then render .docx.
- Delivery: email Word doc; expose data URL for download.
- Collaborative review: clause list, flags, comments, Q&A, mark reviewed.
- Auth: Replit OIDC for sessions; sessions stored in DB.
- SEO: static content for landing/blog.
- DB: Supabase Postgres; Drizzle schemas + SQL init; data seed for CA clauses.

Out of scope (v2): attorney marketplace, Stripe payments/checkout, multi-jurisdiction beyond CA, full audit UI, admin CMS.

## 5) Non‑functional
- Privacy/Security: PII tokens, server-side AI calls, sessions via Postgres store, secrets in env. No client direct DB writes.
- Availability: single-region Supabase; nightly backups; PITR enabled.
- Performance: API p95 < 1.5s excluding AI calls; AI p95 < 20s; streaming optional later.
- Observability: structured logs for generate/review; minimal metrics counters.

## 6) System architecture
- Client: React + TanStack Query + Wouter. Pages: intake, review, success, blog/SEO.
- API: Express on Replit. Endpoints below. Auth via Replit OIDC session.
- AI: Anthropic Claude Sonnet (latest). Server-only key.
- DB: Supabase Postgres. Access via `postgres` client with SSL required.

## 7) Data model (Postgres)
- users(id, email, first_name, last_name, profile_image_url, created_at, updated_at)
- sessions(sid, sess, expire) — for express-session store
- intakes(id, email, state, party_a_name, party_b_name, party_a_user_id?, party_b_user_id?, wedding_date, intake_data JSONB, masked_data JSONB, pii_map JSONB, prenup_doc_url, status, review_completed?, review_completed_date?, created_at)
- clauses(id, clause_id UNIQUE, title, category, jurisdiction, text_normalized, applicable_when JSONB, version, created_at)
- generation_logs(id, intake_id FK, clauses_used JSONB, prompt_tokens?, completion_tokens?, success, error_message?, created_at)
- prenup_clauses(id, intake_id FK, clause_number, title, legal_text, plain_explanation?, category?, created_at)
- clause_comments(id, prenup_clause_id FK, user_id FK, comment, created_at)
- clause_flags(id, prenup_clause_id FK, user_id FK, reason?, resolved, created_at)
- clause_questions(id, prenup_clause_id FK, user_id FK, question, answer?, created_at)
- clause_reviews(id, prenup_clause_id FK, user_id FK, reviewed_at default now())

Note: v1 schema includes some optional fields (paid, paymentAmount) not wired; omit from v2 until payments land.

## 8) API (v2)
- POST `/api/generate`
  - Body: InsertIntake
  - Flow: maskPII → fetch CA clauses → Anthropic JSON → validate → docx buffer → store data URL → parse clauses → save → log → status transitions
  - Returns: { success, intakeId, message }

- GET `/api/intake/:id` — returns intake record

- GET `/api/review/:intakeId/clauses` — returns masked or unmasked clauses based on auth
- GET `/api/review/:intakeId/progress` — { total, reviewed }
- POST `/api/clauses/:id/explain` — generates and persists plain-English explanation
- POST `/api/clauses/:id/flag` — create flag
- GET `/api/clauses/:id/flags`
- POST `/api/clauses/:id/comment` — add comment
- GET `/api/clauses/:id/comments`
- POST `/api/clauses/:id/question` — ask; stores Q and AI A (placeholder now)
- GET `/api/clauses/:id/questions`
- POST `/api/clauses/:id/mark-reviewed`

- Auth
  - GET `/api/login` → OIDC login (supports `returnTo`)
  - GET `/api/callback` → session creation + redirect
  - GET `/api/logout`
  - GET `/api/auth/user` → current user

- Email testing (dev): POST `/api/test-email`

## 9) Client UX
- Intake wizard (4 steps), inline validation, CTA to generate.
- Review page: list of clauses, masked until login; Quick actions: explain, flag, comment, question; progress badge.
- Login prompts where needed; redirect back.
- Success/fallback states for empty clauses.

## 10) Configuration
- Env (server):
  - DATABASE_URL=postgresql://…?sslmode=require
  - SESSION_SECRET, REPLIT_DOMAINS, ISSUER_URL=https://replit.com/oidc, REPL_ID
  - ANTHROPIC_API_KEY, SENDGRID_API_KEY, SENDGRID_FROM_EMAIL
  - PORT (Replit uses 5000)

## 11) Migrations & seeding
- Use Drizzle schema for types; keep SQL init as safety on boot.
- Seed CA clauses from JSON when table empty.

## 12) Risks & mitigations
- AI JSON parsing errors → safe JSON extraction + validation; log failure and mark status failed.
- No clauses parsed → email still delivered; UI shows fallback; log event.
- Email deliverability → test endpoint + proper domain auth; retries optional later.
- Auth fragility on multi-domain → REPLIT_DOMAINS list; strict `returnTo` validation.

## 13) Roadmap (post‑v2)
- Payments (Stripe) gating download/email; add `paid_at`, pricing, receipt emails.
- Multi-state support; clause packs per jurisdiction.
- Admin backoffice for logs, clause management.
- Supabase RLS for any client-side reads (if adopted later).
- Metrics dashboard; structured logs shipping.

---

This PRD is derived from current code paths (Express routes, Supabase‑ready storage, Anthropic client, PII masking, docx generator, review UI). It scopes a clean v2 rebuild while preserving the working flows and privacy posture.
