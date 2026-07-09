-- ============================================================
--  Social Analytics Dashboard — schema
--  Run this FIRST in the Supabase SQL editor, then run seed.sql
-- ============================================================

-- Clean slate (safe to re-run during setup)
drop table if exists post_snapshots cascade;
drop table if exists account_snapshots cascade;
drop table if exists posts cascade;
drop table if exists content cascade;
drop table if exists accounts cascade;
drop table if exists monthly_goals cascade;

-- Connected social accounts (used later by the live cron; not needed for the demo)
create table accounts (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  external_id text not null,
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  created_at timestamptz default now()
);

-- Editorial content — the thing that ties platforms together.
-- title + content_format are your MANUAL fields (no API provides them).
create table content (
  id uuid primary key default gen_random_uuid(),
  title text,
  content_format text,          -- Graphics | Short VDO | Podcast | Article
  posted_at date,
  created_at timestamptz default now()
);

-- One row per platform-post, linked to a piece of content
create table posts (
  id uuid primary key default gen_random_uuid(),
  content_id uuid references content(id) on delete cascade,
  account_id uuid references accounts(id),
  platform text not null,       -- facebook | instagram | youtube | tiktok
  external_post_id text not null,
  permalink text,
  posted_at date,
  unique (platform, external_post_id)
);

-- The archive: one metrics row every time you pull for a post.
-- The demo import writes one row per post; the live cron appends more over time.
create table post_snapshots (
  id bigint generated always as identity primary key,
  post_id uuid references posts(id) on delete cascade,
  captured_at timestamptz default now(),
  views int,
  reach int,
  engage int,
  shares int
);

-- Monthly reach goals (from your Goal 5M tab)
create table monthly_goals (
  id bigint generated always as identity primary key,
  year int not null,
  month int not null,
  reach_goal int not null,
  unique (year, month)
);

-- Helpful indexes
create index on posts (content_id);
create index on posts (platform);
create index on post_snapshots (post_id);
create index on post_snapshots (captured_at);

-- ============================================================
--  A view that gives the LATEST snapshot per post.
--  The dashboard reads this so it always shows current numbers
--  even after the cron adds many snapshots over time.
-- ============================================================
create or replace view latest_post_metrics as
select distinct on (s.post_id)
  s.post_id,
  p.content_id,
  p.platform,
  p.posted_at,
  s.views, s.reach, s.engage, s.shares,
  s.captured_at
from post_snapshots s
join posts p on p.id = s.post_id
order by s.post_id, s.captured_at desc;

-- Row Level Security: lock tables; the cron uses the service-role key which bypasses RLS.
alter table content enable row level security;
alter table posts enable row level security;
alter table post_snapshots enable row level security;
alter table monthly_goals enable row level security;
alter table accounts enable row level security;

-- Demo read policy: allow anon read of analytics (NOT accounts/tokens).
-- Tighten this when you add auth.
create policy "read content"   on content            for select using (true);
create policy "read posts"     on posts              for select using (true);
create policy "read snapshots" on post_snapshots     for select using (true);
create policy "read goals"     on monthly_goals      for select using (true);
-- accounts: no anon policy = no anon access (tokens stay private)
