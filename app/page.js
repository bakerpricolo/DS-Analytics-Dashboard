import { getDashboardData } from '../lib/data';
import ReachChart from './ReachChart';
import Sidebar from './Sidebar';

export const dynamic = 'force-dynamic';

const PF_META = {
  facebook:  { name: 'Facebook',  color: 'var(--fb)' },
  instagram: { name: 'Instagram', color: 'var(--ig)' },
  youtube:   { name: 'YouTube',   color: 'var(--yt)' },
  tiktok:    { name: 'TikTok',    color: 'var(--tiktok)' },
};

const n = (x) => (x || 0).toLocaleString('en-US');
const compact = (x) => {
  if (x >= 1000000) return (x / 1000000).toFixed(2) + 'M';
  if (x >= 1000) return (x / 1000).toFixed(1) + 'k';
  return String(x || 0);
};

export default async function Page() {
  const d = await getDashboardData();
  const maxPlatformReach = Math.max(...Object.values(d.perPlatform).map((p) => p.reach), 1);
  const maxFormatReach = Math.max(...d.byFormat.map((f) => f.reach), 1);
  const annualProgress = d.annualGoal ? d.totalReach / d.annualGoal : 0;
  const reachPerPiece = d.totalContent ? Math.round(d.totalReach / d.totalContent) : 0;

  return (
    <div className="shell">
      <Sidebar active="overview" />
      <main className="main">
        <div className="page-top">
          <div>
            <div className="crumb">Analytics / <b>Overview</b></div>
            <div className="page-h1">Content performance</div>
          </div>
          <div className="date-pill">Aug 2025 – Jun 2026</div>
        </div>

        {/* HERO — north-star */}
        <div className="hero">
          <div>
            <div className="ns-k">Total reach</div>
            <div className="ns-v">{compact(d.totalReach)}</div>
            <div className="ns-sub">
              <span className="trend">↑ 3.5×<span style={{ fontWeight: 400 }}>/yr</span></span>
              <span className="ns-note">ผู้คนที่เข้าถึง จาก 4 แพลตฟอร์ม</span>
            </div>
            <div className="progress-wrap">
              <div className="progress-track"><div className="progress-fill" style={{ width: `${Math.min(annualProgress * 100, 100)}%` }} /></div>
              <div className="progress-meta">
                <span>{Math.round(annualProgress * 100)}% ของเป้าหมาย {compact(d.annualGoal)}</span>
                <span>{d.totalContent} คอนเทนต์</span>
              </div>
            </div>
          </div>
          <div className="mini-stats">
            <div className="mini"><span className="mini-k">Views</span><span className="mini-v">{compact(d.totals.views)}</span></div>
            <div className="mini"><span className="mini-k">Engagement</span><span className="mini-v">{compact(d.totals.engage)} <small>6.8%</small></span></div>
            <div className="mini"><span className="mini-k">Shares</span><span className="mini-v">{compact(d.totals.shares)}</span></div>
            <div className="mini"><span className="mini-k">Reach / piece</span><span className="mini-v">{compact(reachPerPiece)}</span></div>
          </div>
        </div>

        {/* Chart + platforms */}
        <div className="grid-2" style={{ marginBottom: 20 }}>
          <div className="card">
            <div className="card-h"><span className="card-title">Reach รายเดือน เทียบเป้าหมาย</span><span className="card-tag">Apr peak</span></div>
            <ReachChart monthly={d.monthly} />
          </div>
          <div className="card">
            <div className="card-h"><span className="card-title">แต่ละแพลตฟอร์ม</span><span className="card-tag">reach</span></div>
            <div className="bars">
              {Object.entries(d.perPlatform).sort((a, b) => b[1].reach - a[1].reach).map(([key, p]) => {
                const meta = PF_META[key];
                const isWeak = key === 'instagram';
                return (
                  <div className="bar-row" key={key}>
                    <span className="bar-lbl"><span className="sw" style={{ background: meta.color }} />{meta.name}</span>
                    <div className="bar-track"><div className="bar-fill" style={{ width: `${(p.reach / maxPlatformReach) * 100}%`, background: isWeak ? 'var(--warn)' : meta.color }} /></div>
                    <span className="bar-val">{compact(p.reach)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Format + top content */}
        <div className="grid-2-even">
          <div className="card">
            <div className="card-h"><span className="card-title">ตามรูปแบบ</span><span className="card-tag">reach</span></div>
            <div className="bars">
              {d.byFormat.slice(0, 7).map((f) => (
                <div className="bar-row" key={f.format}>
                  <span className="bar-lbl">{f.format}</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${(f.reach / maxFormatReach) * 100}%` }} /></div>
                  <span className="bar-val">{compact(f.reach)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-h"><span className="card-title">คอนเทนต์เด่น</span><span className="card-tag">top by reach</span></div>
            <div className="rank-list">
              {d.topContent.slice(0, 5).map((c, i) => (
                <div className="rank-row" key={c.content_id}>
                  <div className="rank-num">{i + 1}</div>
                  <div>
                    <div className="rank-title">{c.title.length > 42 ? c.title.slice(0, 42) + '…' : c.title}</div>
                    <div className="rank-meta">
                      {c.format && <span className="chip">{c.format}</span>}
                      {c.platforms.map((pf) => (
                        <span key={pf} className="pf-dot" title={PF_META[pf]?.name} style={{ background: PF_META[pf]?.color }} />
                      ))}
                    </div>
                  </div>
                  <div className="rank-reach"><div className="n">{compact(c.reach)}</div><div className="l">reach</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="page-foot">
          <div>
            <div className="mono">KNOW GOD · DIGITAL STRATEGIES</div>
            <div style={{ marginTop: 4 }}>{d.source === 'supabase' ? 'Live · Supabase' : 'Demo · imported data'}</div>
          </div>
          <div className="mono" style={{ textAlign: 'right' }}>
            {d.totalContent} CONTENT · 4 PLATFORMS<br />{compact(d.totalReach)} TOTAL REACH
          </div>
        </footer>
      </main>
    </div>
  );
}
