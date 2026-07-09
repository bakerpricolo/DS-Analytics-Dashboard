import { getDashboardData } from '../lib/data';
import ReachChart from './ReachChart';

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
  const maxTopReach = Math.max(...d.topContent.map((c) => c.reach), 1);
  const annualProgress = d.annualGoal ? d.totalReach / d.annualGoal : 0;

  return (
    <div className="wrap">
      {/* Masthead */}
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <div className="eyebrow">Content Insight · 2025–2026</div>
            <h1>Reach &amp; <em>Resonance</em></h1>
            <div className={`source-tag`}>
              <span className={`source-dot ${d.source === 'demo' ? 'demo' : ''}`} />
              {d.source === 'supabase' ? 'Live · Supabase' : 'Demo · imported data'}
            </div>
          </div>
          <div className="sub">
            รวมผลตอบรับของคอนเทนต์ทุกชิ้น จาก Facebook, Instagram, YouTube และ TikTok
            ไว้ในที่เดียว
          </div>
        </div>
      </header>

      {/* Illumination — annual reach vs goal */}
      <section className="section">
        <div className="illumination">
          <div className="illum-figure">
            <div className="big-number">{compact(d.totalReach)}<span className="unit">reach</span></div>
            <div className="big-label">ผู้คนที่คอนเทนต์ไปถึง · สะสมทั้งปี</div>
            <div style={{ marginTop: 26 }}>
              <div className="progress-track" aria-label="annual goal progress">
                <div className="progress-fill" style={{ width: `${Math.min(annualProgress * 100, 100)}%` }} />
              </div>
              <div className="progress-meta">
                <span>{Math.round(annualProgress * 100)}% ของเป้าหมายทั้งปี</span>
                <span>{compact(d.annualGoal)} goal</span>
              </div>
            </div>
          </div>
          <div className="illum-copy">
            <p className="lead">
              “คอนเทนต์ {d.totalContent} ชิ้น ทำงานร่วมกันเพื่อส่งสารไปให้ไกลที่สุด”
            </p>
            <p>
              แต่ละเดือนตั้งเป้าเข้าถึง {compact(d.annualGoal / 12)} คน ต่อไปนี้คือภาพรวม
              ว่าคอนเทนต์แต่ละชิ้น แต่ละแพลตฟอร์ม และแต่ละรูปแบบ ทำผลงานได้อย่างไร
              ตลอดทั้งปีที่ผ่านมา
            </p>
          </div>
        </div>
      </section>

      {/* Totals */}
      <section className="section">
        <div className="section-head">
          <span className="section-num">01</span>
          <h2>ภาพรวมทั้งหมด</h2>
          <span className="note">รวมทุกแพลตฟอร์ม · {d.totalContent} คอนเทนต์</span>
        </div>
        <div className="stat-grid">
          <div className="stat">
            <div className="k">Views</div>
            <div className="v">{n(d.totals.views)}</div>
            <div className="sub">การมองเห็นทั้งหมด</div>
          </div>
          <div className="stat">
            <div className="k">Reach</div>
            <div className="v">{n(d.totals.reach)}</div>
            <div className="sub">ผู้คนที่เข้าถึง</div>
          </div>
          <div className="stat">
            <div className="k">Engage</div>
            <div className="v">{n(d.totals.engage)}</div>
            <div className="sub">การมีส่วนร่วม</div>
          </div>
          <div className="stat">
            <div className="k">Share</div>
            <div className="v">{n(d.totals.shares)}</div>
            <div className="sub">การแบ่งปัน</div>
          </div>
        </div>
      </section>

      {/* Monthly trend */}
      <section className="section">
        <div className="section-head">
          <span className="section-num">02</span>
          <h2>Reach รายเดือน เทียบเป้าหมาย</h2>
        </div>
        <div className="chart-card">
          <ReachChart monthly={d.monthly} />
        </div>
      </section>

      {/* Platforms */}
      <section className="section">
        <div className="section-head">
          <span className="section-num">03</span>
          <h2>แต่ละแพลตฟอร์ม</h2>
          <span className="note">เรียงตาม reach</span>
        </div>
        <div className="platforms">
          {Object.entries(d.perPlatform)
            .sort((a, b) => b[1].reach - a[1].reach)
            .map(([key, p]) => {
              const meta = PF_META[key];
              return (
                <div className="pf-row" key={key}>
                  <div className="pf-name">
                    <span className="pf-swatch" style={{ background: meta.color }} />
                    {meta.name}
                  </div>
                  <div className="pf-track">
                    <div className="pf-fill" style={{ width: `${(p.reach / maxPlatformReach) * 100}%`, background: meta.color }} />
                  </div>
                  <div className="pf-val">
                    {n(p.reach)} <span className="muted">/ {p.posts} โพสต์</span>
                  </div>
                </div>
              );
            })}
        </div>
        {d.perPlatform.tiktok.reach === 0 && (
          <p style={{ marginTop: 18, fontSize: 13, color: 'var(--ink-soft)' }}>
            หมายเหตุ · TikTok ไม่มีค่า reach เพราะ Display API ไม่เปิดให้ดึงข้อมูลนี้
            (ต้องใช้สิทธิ์ระดับธุรกิจ) — ค่าอื่นอย่าง views และ share ยังดึงได้ตามปกติ
          </p>
        )}
      </section>

      {/* Format + Top content */}
      <section className="section">
        <div className="two-col">
          <div>
            <div className="section-head">
              <span className="section-num">04</span>
              <h2>ตามรูปแบบ</h2>
            </div>
            <div className="fmt-list">
              {d.byFormat.map((f) => (
                <div className="fmt-row" key={f.format}>
                  <div className="fmt-name">{f.format}<span className="cnt">{f.contentCount} ชิ้น</span></div>
                  <div className="fmt-val">{n(f.reach)}</div>
                  <div className="fmt-bar-track">
                    <div className="fmt-bar-fill" style={{ width: `${(f.reach / maxFormatReach) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-head">
              <span className="section-num">05</span>
              <h2>คอนเทนต์เด่น</h2>
            </div>
            <div className="rank-list">
              {d.topContent.slice(0, 6).map((c, i) => (
                <div className="rank-row" key={c.content_id}>
                  <div className="rank-num">{i + 1}</div>
                  <div>
                    <div className="rank-title">{c.title}</div>
                    <div className="rank-meta">
                      {c.format && <span className="chip">{c.format}</span>}
                      {c.platforms.map((pf) => (
                        <span key={pf} className="pf-dot" title={PF_META[pf]?.name}
                              style={{ background: PF_META[pf]?.color }} />
                      ))}
                    </div>
                  </div>
                  <div className="rank-reach">
                    <div className="n">{compact(c.reach)}</div>
                    <div className="l">reach</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div>
          <div className="mono">INSIGHT / CONTENT ANALYTICS</div>
          <div style={{ marginTop: 4 }}>ข้อมูลนำเข้าจากสเปรดชีต · พร้อมเชื่อมต่อ API อัตโนมัติ</div>
        </div>
        <div className="mono" style={{ textAlign: 'right' }}>
          {d.totalContent} CONTENT · 4 PLATFORMS<br />
          {d.source === 'supabase' ? 'SUPABASE LIVE' : 'DEMO MODE'}
        </div>
      </footer>
    </div>
  );
}
