export const revalidate = 0;
import { getSupabase } from './supabase';
import demo from './demo_data.json';

const MONTH_ORDER = [
  [2025, 8], [2025, 9], [2025, 10], [2025, 11], [2025, 12],
  [2026, 1], [2026, 2], [2026, 3], [2026, 4], [2026, 5], [2026, 6],
];
const MONTH_LABEL = {
  1: 'ม.ค.', 2: 'ก.พ.', 3: 'มี.ค.', 4: 'เม.ย.', 5: 'พ.ค.', 6: 'มิ.ย.',
  7: 'ก.ค.', 8: 'ส.ค.', 9: 'ก.ย.', 10: 'ต.ค.', 11: 'พ.ย.', 12: 'ธ.ค.',
};
const MONTH_EN = {
  1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
  7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec',
};

const PLATFORMS = ['facebook', 'instagram', 'youtube', 'tiktok'];

function ym(dateStr) {
  const d = new Date(dateStr);
  return [d.getUTCFullYear(), d.getUTCMonth() + 1];
}

// Pull the raw joined rows either from Supabase or the bundled demo file.
async function loadRows() {
  const sb = getSupabase();
  if (sb) {
    const [{ data: content }, { data: metrics }, { data: goals }] = await Promise.all([
      sb.from('content').select('*'),
      sb.from('latest_post_metrics').select('*'),
      sb.from('monthly_goals').select('*'),
    ]);
    if (content && metrics) {
      const contentById = Object.fromEntries(content.map((c) => [c.id, c]));
      const rows = metrics.map((m) => ({
        ...m,
        title: contentById[m.content_id]?.title,
        content_format: contentById[m.content_id]?.content_format,
      }));
      return { rows, goals: goals || [], source: 'supabase' };
    }
  }
  // Fallback: bundled demo JSON (one snapshot per post)
  const contentById = Object.fromEntries(demo.content.map((c) => [c.id, c]));
  const postById = Object.fromEntries(demo.posts.map((p) => [p.id, p]));
  const rows = demo.snapshots.map((s) => {
    const post = postById[s.post_id];
    const content = contentById[post.content_id];
    return {
      post_id: s.post_id,
      content_id: post.content_id,
      platform: post.platform,
      posted_at: post.posted_at,
      views: s.views, reach: s.reach, engage: s.engage, shares: s.shares,
      title: content?.title,
      content_format: content?.content_format,
    };
  });
  return { rows, goals: demo.goals || [], source: 'demo' };
}

export async function getDashboardData() {
  const { rows, goals, source } = await loadRows();

  const goalByKey = {};
  for (const g of goals) goalByKey[`${g.year}-${g.month}`] = g.reach_goal;

  // Totals
  const totals = { views: 0, reach: 0, engage: 0, shares: 0 };
  for (const r of rows) {
    totals.views += r.views || 0;
    totals.reach += r.reach || 0;
    totals.engage += r.engage || 0;
    totals.shares += r.shares || 0;
  }

  // Per platform
  const perPlatform = Object.fromEntries(
    PLATFORMS.map((p) => [p, { views: 0, reach: 0, engage: 0, shares: 0, posts: 0 }])
  );
  for (const r of rows) {
    const b = perPlatform[r.platform];
    if (!b) continue;
    b.views += r.views || 0;
    b.reach += r.reach || 0;
    b.engage += r.engage || 0;
    b.shares += r.shares || 0;
    b.posts += 1;
  }

  // Monthly time series (reach + views + goal)
  const monthAgg = {};
  for (const [y, m] of MONTH_ORDER) monthAgg[`${y}-${m}`] = { reach: 0, views: 0, engage: 0, contentIds: new Set() };
  for (const r of rows) {
    const [y, m] = ym(r.posted_at);
    const key = `${y}-${m}`;
    if (!monthAgg[key]) continue;
    monthAgg[key].reach += r.reach || 0;
    monthAgg[key].views += r.views || 0;
    monthAgg[key].engage += r.engage || 0;
    monthAgg[key].contentIds.add(r.content_id);
  }
  const monthly = MONTH_ORDER.map(([y, m]) => {
    const key = `${y}-${m}`;
    const a = monthAgg[key];
    return {
      key,
      label: MONTH_LABEL[m],
      labelEn: MONTH_EN[m],
      year: y,
      reach: a.reach,
      views: a.views,
      engage: a.engage,
      contentCount: a.contentIds.size,
      goal: goalByKey[key] || null,
      progress: goalByKey[key] ? a.reach / goalByKey[key] : null,
    };
  });

  // Per-format breakdown (by reach)
  const formatAgg = {};
  const contentSeen = {};
  for (const r of rows) {
    const fmt = r.content_format || 'Other';
    if (!formatAgg[fmt]) formatAgg[fmt] = { reach: 0, views: 0, engage: 0, contentIds: new Set() };
    formatAgg[fmt].reach += r.reach || 0;
    formatAgg[fmt].views += r.views || 0;
    formatAgg[fmt].engage += r.engage || 0;
    formatAgg[fmt].contentIds.add(r.content_id);
  }
  const byFormat = Object.entries(formatAgg)
    .map(([fmt, a]) => ({
      format: fmt,
      reach: a.reach,
      views: a.views,
      engage: a.engage,
      contentCount: a.contentIds.size,
    }))
    .sort((a, b) => b.reach - a.reach);

  // Top content by total reach (summed across platforms)
  const contentAgg = {};
  for (const r of rows) {
    if (!contentAgg[r.content_id]) {
      contentAgg[r.content_id] = {
        content_id: r.content_id, title: r.title, format: r.content_format,
        reach: 0, views: 0, engage: 0, shares: 0, platforms: new Set(),
      };
    }
    const c = contentAgg[r.content_id];
    c.reach += r.reach || 0;
    c.views += r.views || 0;
    c.engage += r.engage || 0;
    c.shares += r.shares || 0;
    c.platforms.add(r.platform);
  }
  const topContent = Object.values(contentAgg)
    .map((c) => ({ ...c, platforms: [...c.platforms] }))
    .sort((a, b) => b.reach - a.reach)
    .slice(0, 10);

  const totalContent = new Set(rows.map((r) => r.content_id)).size;
  const annualGoal = Object.values(goalByKey).reduce((s, g) => s + g, 0);

  return {
    source,
    totals,
    perPlatform,
    monthly,
    byFormat,
    topContent,
    totalContent,
    annualGoal,
    totalReach: totals.reach,
  };
}
