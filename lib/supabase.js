import { createClient } from '@supabase/supabase-js';

// Server-side client. Uses the anon key for reads (RLS allows analytics reads).
// The service-role key is used ONLY in scripts/cron, never in the browser bundle.
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    return null; // lets the app fall back to bundled demo data if env isn't set yet
  }
  return createClient(url, anon, { auth: { persistSession: false } });
}
