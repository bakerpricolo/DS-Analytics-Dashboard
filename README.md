# Content Insight — Analytics Dashboard

A dashboard that unifies **View, Reach, Engage, Share** across Facebook, Instagram,
YouTube, and TikTok into one view — seeded with your real spreadsheet data, and ready to
switch to live API pulls later.

Built with Next.js 14 (App Router) + Supabase. Reads live from Supabase when configured;
falls back to bundled demo data so it runs even before you set env vars.

---

## What you're looking at

- **214 content pieces**, Aug 2025 – Jun 2026, reshaped into the normalized schema from the spec.
- One snapshot per post (as of the spreadsheet). When the live cron runs later, it appends more
  snapshots over time and the monthly trend fills in — the dashboard code doesn't change.
- All figures are computed, not hardcoded: total reach 3.15M, 72% of the 4.4M annual goal, etc.

---

## Setup (about 15 minutes)

### 1. Create the Supabase project
1. Go to supabase.com → new project. Save the database password.
2. Open **SQL Editor** → paste all of `sql/schema.sql` → Run.
   (Creates tables, the `latest_post_metrics` view, and RLS policies.)

### 2. Load your data
You have two options:

**Option A — SQL (no local tooling):**
Paste `sql/seed.sql` into the SQL Editor → Run. Done.

**Option B — Node script (nicer, batched):**
```bash
cp .env.example .env.local     # fill in the three Supabase values
npm install
npm run seed                   # loads lib/demo_data.json into Supabase
```

Get the keys from Supabase → Project Settings → API:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public)
- `SUPABASE_SERVICE_ROLE_KEY` (secret — used only by the seed script)

### 3. Run the dashboard
```bash
npm run dev
# open http://localhost:3000
```
The tag in the header shows **"Live · Supabase"** once env vars are set, or
**"Demo · imported data"** when running from the bundled file.

### 4. Deploy (optional)
Push to GitHub → import into Vercel → add the same env vars in Vercel's project settings.

---

## Project layout

```
sql/schema.sql        Tables, latest_post_metrics view, RLS
sql/seed.sql          Your spreadsheet as INSERT statements
lib/demo_data.json    Same data as JSON (used by seed script + demo fallback)
lib/data.js           All dashboard aggregates (totals, monthly, formats, top content)
lib/supabase.js       Supabase client
app/page.js           The dashboard (server component)
app/ReachChart.js     Monthly reach-vs-goal chart (client)
app/globals.css       Design system
scripts/load-to-supabase.mjs   Batched loader
transform.py          Regenerates seed files from the .xlsx (kept for reference)
```

---

## Going live later (the API swap)

The spec doc (`social-analytics-spec.md`) has the full plan. In short: add an
`/app/api/cron/snapshot` route that pulls each platform and `insert`s into `post_snapshots`
with a fresh `captured_at`. Because the dashboard reads `latest_post_metrics` (newest snapshot
per post) and aggregates by month, live data flows in with **no changes to the UI**.

The only fields that stay manual — because no API provides them — are each post's
**Content Format** and **Thai title**, which live in the `content` table.
