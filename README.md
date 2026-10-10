# Drafter Prenups

A web app that drafts a California prenuptial agreement with AI. A couple completes an intake form, the app masks their personal information, Claude drafts the agreement from a curated clause library, and the result is delivered as a Word document that both parties can review clause by clause.

> The generated document is not legal advice. Both parties should consult independent counsel and follow California requirements for disclosure, timing, and notarization. The app reminds users of these steps in the UI and the delivery email.

## How it works

1. **Intake:** the couple enters their details, assets, and debts, and accepts the terms. Acceptance is recorded in a ledger.
2. **Mask:** personally identifiable information is replaced with placeholders before anything is sent to the model.
3. **Draft:** Claude generates the agreement as structured JSON, grounded in the California clause library in `data/clauses/`.
4. **Render:** placeholders are swapped back and the agreement is rendered to a `.docx` file.
5. **Deliver:** the document is emailed through SendGrid. If email fails, the app still offers a direct download.
6. **Review:** the agreement is split into clauses so the parties can mark each one as reviewed and track progress.

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Wouter
- **Backend:** Node.js, Express
- **AI:** Anthropic Claude (`@anthropic-ai/sdk`)
- **Database:** Postgres via Drizzle ORM (Neon or Supabase)
- **Documents and email:** `docx`, SendGrid

## Run it locally

Requires Node.js 20+, a Postgres database, and an Anthropic API key. SendGrid is only needed for email delivery.

```bash
git clone https://github.com/renfro-dev/drafter-prenups.git
cd drafter-prenups
npm install
```

Create a `.env` file in the project root:

```env
PORT=5000
NODE_ENV=development
PUBLIC_BASE_URL=http://localhost:5000

ANTHROPIC_API_KEY=
DATABASE_URL=postgres://user:pass@host:5432/dbname

SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
```

```bash
npm run db:push
npm run dev
```

Open `http://localhost:5000`.

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | Yes | Agreement generation |
| `DATABASE_URL` or `SUPABASE_DB_URL` | Yes | Postgres connection |
| `SENDGRID_API_KEY` | For email | Email delivery |
| `SENDGRID_FROM_EMAIL` | For email | Must be a verified SendGrid sender |
| `PUBLIC_BASE_URL` | No | Base URL used in email links |
| `PORT` | No | Server port (default `5000`) |
| `AUTH_PROVIDER` | No | Defaults to `replit` |
| `SUPABASE_URL`, `SUPABASE_JWKS_URL`, `SUPABASE_JWT_ISSUER`, `SUPABASE_JWT_AUDIENCE` | No | Supabase auth |
| `SESSION_SECRET`, `REPLIT_DOMAINS`, `REPL_ID`, `ISSUER_URL` | No | Replit auth |

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start Express with Vite middleware |
| `npm run build` | Build the client and bundle the server to `dist/` |
| `npm start` | Run the production build |
| `npm run check` | Type-check with `tsc` |
| `npm run db:push` | Push the Drizzle schema to the database |
| `npm run test:qa` | Run the QA data script |
| `npm run test:qa:parallel` | Run the QA script with parallelism |

## API

| Endpoint | Purpose |
|----------|---------|
| `POST /api/terms/accept` | Record terms acceptance. Required before generation |
| `POST /api/generate` | Validate intake, mask PII, generate the agreement, render the document, and store clauses for review |
| `POST /api/generate-email` | Lighter flow that generates and emails the document. Always returns a `downloadUrl` fallback |
| `GET /api/intake/:id` | Fetch a saved intake record |
| `GET /api/clauses?jurisdiction=CA` | Load the clause library |
| `GET /api/review/:intakeId/progress` | Return `{ total, reviewed }` for a review |
| `POST /api/test-email` | Send a test email to verify SendGrid setup |

## Project structure

```
client/                  React frontend
server/routes.ts         API routes
server/lib/              Claude client
server/utils/            PII masking, clause parsing, document generation, email
server/db/               Database bootstrap and migrations
data/clauses/            California clause library
shared/schema.ts         Database schema and shared types
scripts/                 QA and PII map checks
prenup_mocks/            Sample scenarios and generated documents
```

## Privacy

- PII is masked before any AI call and restored only when the final document is rendered.
- Terms acceptance is enforced before generation and recorded.
- No secrets are sent to the client; the success page uses only the server-returned download URL and email status.

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Email delivery failed | `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` are set, and the sender is verified in SendGrid. Use `POST /api/test-email` to confirm |
| AI response JSON errors | Server logs tagged `[AI Response]` include parsing diagnostics |
| "No clauses found for jurisdiction" | `data/clauses/` contains the jurisdiction used by the intake |
| Database connection errors | `DATABASE_URL` (or `SUPABASE_DB_URL`) is correct and the database is reachable |

## Deploying on Replit

1. Add `ANTHROPIC_API_KEY`, `DATABASE_URL`, `SENDGRID_API_KEY`, and `SENDGRID_FROM_EMAIL` as Secrets.
2. Run `npm run build`, then `npm start`. The server binds to the `PORT` Replit provides.

## More docs

- [SUPABASE_SETUP.md](SUPABASE_SETUP.md): using Supabase as the database
- [design_guidelines.md](design_guidelines.md): visual design system
- [prenup_mocks/README.md](prenup_mocks/README.md): sample scenarios

## License

MIT
