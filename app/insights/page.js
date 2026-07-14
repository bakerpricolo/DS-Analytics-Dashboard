import Sidebar from '../Sidebar';
import { insights } from '../../lib/insights';
import { FormatEfficiencyChart, AprilProofChart } from '../InsightCharts';

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

export default function InsightsPage() {
  const i = insights;
  const maxFmtReach = Math.max(...i.formats.map((f) => f.reachPerPiece));
  const maxMp = Math.max(...i.multiplatform.map((m) => m.reach));
  const maxPlatReach = Math.max(...i.platforms.map((p) => p.reachPerPost));
  const maxCross = Math.max(...i.crossPost.map((c) => c.reach));

  return (
    <div className="shell">
      <Sidebar active="insights" />
      <main className="main">
        <div className="page-top">
          <div>
            <div className="crumb">Analytics / <b>Strategy Insights</b></div>
            <div className="page-h1">What the Data <em>Is Telling Us</em></div>
            <div className="page-sub">บทวิเคราะห์เชิงกลยุทธ์ · 7 findings จากผลงานคอนเทนต์ทั้งปี เพื่อวางแผนการผลิตในปีถัดไป</div>
          </div>
          <div className="date-pill">7 findings</div>
        </div>

      {/* The one-line thesis */}
      <section className="section">
        <div className="thesis">
          <p className="thesis-lead">
            เราไม่ได้ต้องการ “คอนเทนต์มากขึ้น” — เราต้องการ
            <em> คอนเทนต์ที่ทรงพลังมากขึ้น และกระจายให้ครบทุกแพลตฟอร์ม</em>
          </p>
          <p className="thesis-sub">
            The reach we have is created by a small share of our content, on a single platform,
            in two formats. Three levers below would lift reach without making more work.
          </p>
        </div>
      </section>

      {/* Finding 1 — Concentration */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">01</span>
          <div>
            <h2>Reach is carried by a few big hits</h2>
            <p className="finding-tag">คอนเทนต์ส่วนน้อย สร้างการเข้าถึงส่วนใหญ่</p>
          </div>
        </div>
        <div className="stat-grid">
          <div className="stat"><div className="k">Top 10% ของคอนเทนต์</div><div className="v accent">{i.concentration.top10Share}%</div><div className="sub">ของ reach ทั้งหมด</div></div>
          <div className="stat"><div className="k">Top 20%</div><div className="v">{i.concentration.top20Share}%</div><div className="sub">ของ reach ทั้งหมด</div></div>
          <div className="stat"><div className="k">ค่ากลาง (median)</div><div className="v">{n(i.concentration.median)}</div><div className="sub">reach ต่อชิ้น</div></div>
          <div className="stat"><div className="k">ชิ้นที่ดีที่สุด</div><div className="v">{compact(i.concentration.max)}</div><div className="sub">reach · 76× ค่ากลาง</div></div>
        </div>
        <p className="finding-note">
          The median piece reaches {n(i.concentration.median)}, but the average is {n(i.concentration.mean)} —
          a gap that means a handful of hits do the heavy lifting. The goal isn't more content;
          it's manufacturing more top-decile pieces.
        </p>
      </section>

      {/* Finding 2 — Multi-platform */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">02</span>
          <div>
            <h2>Posting to all 4 platforms is our biggest free lever</h2>
            <p className="finding-tag">โพสต์ครบทุกแพลตฟอร์ม = reach เพิ่มขึ้น {i.multiplatformMult}×</p>
          </div>
        </div>
        <div className="mp-bars">
          {i.multiplatform.map((m) => (
            <div className="mp-row" key={m.label}>
              <div className="mp-label">{m.label}<span className="mp-count">{m.pieces} ชิ้น</span></div>
              <div className="mp-track">
                <div className="mp-fill" style={{ width: `${(m.reach / maxMp) * 100}%` }}>
                  <span className="mp-val">{n(m.reach)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="finding-note">
          4-platform pieces average {n(26145)} reach; single-platform pieces just {n(4790)}.
          Yet <strong>{i.notAllFour} of our pieces aren't on all four platforms yet</strong> —
          the single biggest opportunity, at near-zero production cost. (See the cross-post list below.)
        </p>
      </section>

      {/* Finding 3 — Format power vs volume */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">03</span>
          <div>
            <h2>We make the most of our weakest formats</h2>
            <p className="finding-tag">รูปแบบที่ผลิตมากที่สุด กลับเข้าถึงคนน้อยที่สุดต่อชิ้น</p>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-legend">
            <span className="leg"><span className="leg-mark" style={{ background: '#3B82F6' }} />reach ต่อชิ้น</span>
            <span className="leg"><span className="leg-mark" style={{ background: '#FACC15' }} />จำนวนที่ผลิต</span>
          </div>
          <FormatEfficiencyChart data={i.formats} />
        </div>
        <p className="finding-note">
          VDO reaches {n(46447)} per piece — but we made only 11. Graphics reaches {n(3494)} per piece —
          and we made 35. The blue bars (power) run opposite to the yellow line (volume).
          Shifting production toward VDO and Reels raises reach with the same effort.
        </p>
      </section>

      {/* Finding 4 — April proof */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">04</span>
          <div>
            <h2>April proved it — power formats lift the whole month</h2>
            <p className="finding-tag">เดือนที่ทำ VDO+Reels เยอะ คือเดือนที่ reach พุ่ง</p>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-legend">
            <span className="leg"><span className="leg-mark" style={{ background: '#3B82F6' }} />reach ต่อชิ้น</span>
            <span className="leg"><span className="leg-mark" style={{ background: '#22D3EE' }} />VDO+Reels ที่ผลิต</span>
          </div>
          <AprilProofChart data={i.monthly} />
        </div>
        <p className="finding-note">
          April hit {compact(970547)} reach — nearly 3× a normal month — on the back of 17 VDO+Reels pieces,
          far more than any other month. One VDO (the Good Friday teaching) alone pulled {compact(319617)}.
          The blue line tracks the cyan bars almost perfectly: lean into power formats, the month lifts.
        </p>
      </section>

      {/* Finding 5/6/7 — Platform roles */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">05</span>
          <div>
            <h2>Each platform plays a different role</h2>
            <p className="finding-tag">แต่ละแพลตฟอร์มมีบทบาทต่างกัน — วัดผลให้ถูก</p>
          </div>
        </div>
        <div className="platform-cards">
          {i.platforms.map((p) => {
            const meta = PF_META[p.platform.toLowerCase()];
            const warn = p.role === 'underperforming';
            return (
              <div className={`pcard ${warn ? 'warn' : ''}`} key={p.platform}>
                <div className="pcard-head">
                  <span className="pf-swatch" style={{ background: meta.color }} />
                  <span className="pcard-name">{p.name}</span>
                  <span className={`role-badge ${warn ? 'role-warn' : ''}`}>{p.role}</span>
                </div>
                <div className="pcard-stats">
                  <div><span className="pc-v">{n(p.reachPerPost)}</span><span className="pc-l">reach/post</span></div>
                  <div><span className="pc-v">{p.engRate}%</span><span className="pc-l">engagement</span></div>
                  <div><span className="pc-v">{p.posts}</span><span className="pc-l">posts</span></div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="finding-note">
          <strong>Facebook</strong> is the reach engine (video especially). <strong>TikTok</strong> reaches
          few but earns a 32% engagement rate — a community play, not a reach play.
          <strong> Instagram is the problem</strong>: 122 posts for just {compact(i.headline ? 77539 : 0)} total
          reach — less than one strong Facebook video. It needs a fix or a rethink, not more of the same.
        </p>
      </section>

      {/* The action: cross-post list */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">→</span>
          <div>
            <h2>Do this first: cross-post these winners</h2>
            <p className="finding-tag">งานที่ทำได้ทันที — เอาคอนเทนต์ที่ดีอยู่แล้ว ไปลงให้ครบทุกแพลตฟอร์ม</p>
          </div>
        </div>
        <div className="cross-list">
          {i.crossPost.map((c, idx) => (
            <div className="cross-row" key={idx}>
              <div className="cross-reach">
                <span className="cr-n">{compact(c.reach)}</span>
                <span className="cr-l">reach</span>
              </div>
              <div className="cross-body">
                <div className="cross-title">{c.title}</div>
                <div className="cross-meta">
                  <span className="chip">{c.format}</span>
                  <span className="cross-on">อยู่บน {c.on} แพลตฟอร์ม · ขาด:</span>
                  {c.missing.map((m) => (
                    <span key={m} className="pf-dot" title={PF_META[m]?.name}
                          style={{ background: PF_META[m]?.color }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="finding-note">
          These are already-proven pieces missing from platforms where they'd likely perform.
          {' '}{i.notAllFour} pieces total qualify — this is the shortlist by reach.
        </p>
      </section>

      {/* Playbook summary */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">✓</span>
          <div>
            <h2>The playbook</h2>
            <p className="finding-tag">สี่ก้าว สำหรับปีถัดไป</p>
          </div>
        </div>
        <div className="playbook">
          <div className="play"><span className="play-n">1</span><div><strong>Cross-post everything strong.</strong> Get the {i.notAllFour} incomplete pieces onto all 4 platforms. Highest return, lowest cost.</div></div>
          <div className="play"><span className="play-n">2</span><div><strong>Rebalance toward VDO & Reels.</strong> Make April's format ratio the default. Fewer Graphics and Articles.</div></div>
          <div className="play"><span className="play-n">3</span><div><strong>Fix or defund Instagram.</strong> Diagnose why the same content that flies on Facebook dies on IG — or repurpose that effort.</div></div>
          <div className="play"><span className="play-n">4</span><div><strong>Measure each platform by its job.</strong> TikTok on engagement, Facebook on reach, YouTube as the searchable archive.</div></div>
        </div>
      </section>

        <footer className="page-foot">
          <div>
            <div className="mono">STRATEGY INSIGHTS</div>
            <div style={{ marginTop: 4 }}>วิเคราะห์จากข้อมูล 2025–2026 · {i.headline.totalContent} คอนเทนต์</div>
          </div>
          <div className="mono" style={{ textAlign: 'right' }}>
            7 FINDINGS · 4 PLATFORMS<br />
            {compact(i.headline.totalReach)} TOTAL REACH
          </div>
        </footer>
      </main>
    </div>
  );
}
