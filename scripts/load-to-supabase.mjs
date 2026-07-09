// Load the transformed spreadsheet data into Supabase.
// Usage:
//   1. Run sql/schema.sql in the Supabase SQL editor first.
//   2. Set env vars (see .env.example), then: npm run seed
//
// This uses the SERVICE ROLE key (bypasses RLS) — run locally only, never ship it.

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(__dirname, '../lib/demo_data.json'), 'utf8'));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}
const sb = createClient(url, serviceKey, { auth: { persistSession: false } });

async function chunkInsert(table, rows, map) {
  const size = 500;
  for (let i = 0; i < rows.length; i += size) {
    const batch = rows.slice(i, i + size).map(map);
    const { error } = await sb.from(table).insert(batch);
    if (error) { console.error(`${table} insert failed:`, error.message); process.exit(1); }
    process.stdout.write(`  ${table}: ${Math.min(i + size, rows.length)}/${rows.length}\r`);
  }
  console.log(`  ${table}: ${rows.length} done            `);
}

async function main() {
  console.log('Seeding Supabase...');

  await chunkInsert('content', data.content, (r) => ({
    id: r.id, title: r.title, content_format: r.content_format, posted_at: r.posted_at,
  }));

  await chunkInsert('posts', data.posts, (r) => ({
    id: r.id, content_id: r.content_id, platform: r.platform,
    external_post_id: 'seed-' + r.id.slice(0, 8), posted_at: r.posted_at,
  }));

  await chunkInsert('post_snapshots', data.snapshots, (r) => ({
    post_id: r.post_id, captured_at: r.captured_at,
    views: r.views, reach: r.reach, engage: r.engage, shares: r.shares,
  }));

  if (data.goals?.length) {
    await chunkInsert('monthly_goals', data.goals, (r) => ({
      year: r.year, month: r.month, reach_goal: r.reach_goal,
    }));
  }

  console.log('\nDone. Your dashboard will now read live from Supabase.');
}
main();
