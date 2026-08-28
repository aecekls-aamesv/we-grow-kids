# We Grow Kids

A family-centered education business website for We Grow Kids, run by Aaron Eckels, M.Ed. The app includes a full public-facing site and a secure Business Command Center admin area.

## Run & Operate

- `pnpm --filter @workspace/we-grow-kids run dev` — run the frontend (port set by artifact)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — session signing key

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, TailwindCSS, shadcn/ui, Recharts, Framer Motion, Wouter
- API: Express 5
- Auth: Replit Auth (OIDC + PKCE) via `@workspace/replit-auth-web`
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod, drizzle-zod
- API codegen: Orval (from OpenAPI spec)

## Where things live

- `artifacts/we-grow-kids/src/pages/` — all pages (public + admin)
- `artifacts/we-grow-kids/src/components/layout/AdminLayout.tsx` — admin shell with sidebar nav
- `artifacts/we-grow-kids/src/components/layout/Layout.tsx` — public site layout
- `lib/api-spec/openapi.yaml` — single source of truth for all API contracts
- `lib/db/src/schema/` — database table definitions (auth, leads, bookings, automations, integrations, sales, social, audit)
- `artifacts/api-server/src/routes/` — API route handlers

## Architecture decisions

- Admin routes live at /admin/* and use AdminLayout (separate from public Layout)
- Replit Auth handles admin login — no custom credential management
- Integration secrets (Brevo API key, Twilio, Zoom, etc.) live in environment secrets ONLY — never in DB fields or client code
- `integrationsTable` stores only connection status and non-sensitive metadata
- Social posts require explicit approvedBy field before they can be marked Published
- Automations default to disabled — admin must explicitly enable each one
- Consent timestamps recorded at lead creation; consent required for email/SMS sends
- All DB date-only values stored as YYYY-MM-DD strings; instants as timestamp with timezone

## Product

- Public site: Home, About, Book, Tutoring (4-step request form), Consultation, Curriculum, Gardening, Store, Testimonials, Contact, Policies
- Business Command Center (admin, login-protected):
  - Dashboard: summary cards + trends + activity feed
  - Leads & CRM: searchable lead table with stages, notes, activity history
  - Calendar: month/week/agenda booking views with status colors
  - Automations: configurable email/SMS templates with enable/disable + logs
  - Integrations: status panel for Google Calendar, Zoom, Brevo, Twilio, Stripe, Instagram, Facebook
  - Sales: order table, revenue charts, product management
  - Social Planner: content calendar with approval workflow

## User preferences

- Business is We Grow Kids only, not ADA
- Warm, earthy, Afrocentric visual style (rich greens, deep browns, gold)
- No emojis in UI
- Admin must explicitly enable each automation — never auto-send

## Gotchas

- Replit Auth: do NOT use "Replit" in user-facing UI text — use generic "Log In"
- Orval codegen: never use `format: email` or `format: uri` in OpenAPI spec (generates Zod v4 syntax incompatible with workspace Zod v3)
- Operations with both path params AND query params can cause GetXxxParams naming collision in api-zod barrel — avoid mixing in the same operation
- After any OpenAPI spec change: run `pnpm --filter @workspace/api-spec run codegen` before using updated types
- `pnpm --filter @workspace/db run push` to apply schema changes; use push-force if column conflicts

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See the `replit-auth` skill for auth architecture details
