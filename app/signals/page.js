import Sidebar from '../Sidebar';
import { signals } from '../../lib/insights';
import scatter from '../../lib/scatter.json';
import {
  TitleFeaturesChart, ThemesChart, TitleLengthChart, ViewsReachScatter,
} from '../SignalCharts';

export const dynamic = 'force-dynamic';

const n = (x) => (x || 0).toLocaleString('en-US');
const compact = (x) => (x >= 1000 ? (x / 1000).toFixed(1) + 'k' : String(x));

export default function SignalsPage() {
  const s = signals;

  return (
    <div className="shell">
      <Sidebar active="signals" />
      <main className="main">
        <div className="page-top">
          <div>
            <div className="crumb">Analytics / <b>Content Signals</b></div>
            <div className="page-h1">What Viewers <em>Actually Respond To</em></div>
            <div className="page-sub">เจาะลึกว่าอะไรทำให้คอนเทนต์เข้าถึงคนได้มากขึ้น — หัวข้อแบบไหน คนแบบไหน เนื้อหาแบบไหน ที่อัลกอริทึมดันและคนกดแชร์</div>
          </div>
          <div className="date-pill">212 pieces</div>
        </div>

      {/* The Live Cut headline */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">★</span>
          <div>
            <h2>The Live Cut is your engine</h2>
            <p className="finding-tag">คลิปตัดจาก Live คือคอนเทนต์ที่ทรงพลังที่สุด</p>
          </div>
        </div>
        <div className="stat-grid">
          <div className="stat"><div className="k">Reach ต่อคลิป</div><div className="v accent">{n(s.livecut.reachPerPiece)}</div><div className="sub">2.9× คอนเทนต์อื่น</div></div>
          <div className="stat"><div className="k">ส่วนแบ่ง reach</div><div className="v">{s.livecut.shareOfReach}%</div><div className="sub">จาก {s.livecut.shareOfContent}% ของคอนเทนต์</div></div>
          <div className="stat"><div className="k">ใน Top 20</div><div className="v">{s.livecut.inTop20}/20</div><div className="sub">เป็น Live Cut</div></div>
          <div className="stat"><div className="k">ความน่าเชื่อถือ</div><div className="v">{s.livecut.reliability.beatMedian}%</div><div className="sub">ชนะค่ากลางรวม</div></div>
        </div>
        <p className="finding-note">
          A live cut reaches <strong>{n(s.livecut.vsFullStream.clip)}</strong> per piece — its full source
          stream reaches only <strong>{n(s.livecut.vsFullStream.stream)}</strong>. Cutting a sharp moment out
          of a long stream <strong>triples its reach</strong>, and it's reliable: {s.livecut.reliability.beat10k}%
          of live cuts clear 10,000 reach. This isn't luck — it's a repeatable production move.
        </p>
      </section>

      {/* Chart 1 — Title features */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">01</span>
          <div>
            <h2>A named person is the strongest title signal</h2>
            <p className="finding-tag">หัวข้อที่มีชื่อคน เข้าถึงมากกว่าเกือบ 2 เท่า</p>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-legend">
            <span className="leg"><span className="leg-mark" style={{ background: '#3B82F6' }} />มีลักษณะนี้</span>
            <span className="leg"><span className="leg-mark" style={{ background: '#3f3f46' }} />ไม่มี</span>
          </div>
          <TitleFeaturesChart data={s.titleFeatures} />
        </div>
        <p className="finding-note">
          Titles naming a speaker (อ.ป้อม, พี่อิม) reach <strong>+95%</strong>; titles posing a question
          reach <strong>+69%</strong>. But episode numbers <strong>hurt reach by 60%</strong> — they signal
          "join mid-series," which asks commitment. <strong>Plain English:</strong> your audience follows
          people and curiosity, not series.
        </p>
      </section>

      {/* Chart 2 — Themes */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">02</span>
          <div>
            <h2>Personal stories beat routine devotional framing</h2>
            <p className="finding-tag">เรื่องราวชีวิตจริง ชนะเนื้อหาแบบทั่วไป</p>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-legend">
            <span className="leg"><span className="leg-mark" style={{ background: '#22C55E' }} />แข็งแรงมาก</span>
            <span className="leg"><span className="leg-mark" style={{ background: '#3B82F6' }} />ปานกลาง</span>
            <span className="leg"><span className="leg-mark" style={{ background: '#EF4444' }} />อ่อน</span>
          </div>
          <ThemesChart data={s.themes} />
        </div>
        <p className="finding-note">
          Testimony content (คำพยาน) averages <strong>{n(69615)}</strong> reach and Christian-identity
          questions <strong>{n(30169)}</strong> — but posts framed as prayer (อธิษฐาน) or faith (เชื่อ)
          land near <strong>4,000</strong>. <strong>Plain English:</strong> same gospel, but a human story
          or a provocative question travels; a routine devotional label doesn't.
        </p>
      </section>

      {/* Chart 3 — Title length */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">03</span>
          <div>
            <h2>Descriptive titles reach twice as far</h2>
            <p className="finding-tag">หัวข้อที่บอกรายละเอียด เข้าถึงมากกว่า 2 เท่า</p>
          </div>
        </div>
        <div className="chart-card">
          <TitleLengthChart data={s.titleLength} />
        </div>
        <p className="finding-note">
          Titles over 45 characters reach roughly <strong>2×</strong> what short titles do.
          <strong> Plain English:</strong> a vague 3-word title tells neither the algorithm nor the
          scrolling viewer what the moment is. Spell out who's speaking and what tension it addresses.
        </p>
      </section>

      {/* Chart 4 — Views vs reach */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">04</span>
          <div>
            <h2>Views and reach are the same signal</h2>
            <p className="finding-tag">Views กับ Reach ไปด้วยกัน (r = {s.viewsReachCorr})</p>
          </div>
        </div>
        <div className="chart-card">
          <ViewsReachScatter data={scatter} />
        </div>
        <p className="finding-note">
          The two move together almost perfectly, so tracking reach is enough — views add little extra
          information. Notice the blue live-cut dots cluster up and to the right (high on both).
          <strong> The real "algorithm" signal is share rate</strong> — and your most-shared pieces are
          emotional, hopeful, personal moments (love that doesn't quit, songs in darkness, opening your heart).
          Those are what your audience actively spreads.
        </p>
      </section>

      {/* ===================== STRATEGY ===================== */}
      <section className="section strategy-open">
        <div className="finding-head">
          <span className="finding-num">◆</span>
          <div>
            <h2>The strategy</h2>
            <p className="finding-tag">กลยุทธ์ · จากข้อมูลสู่แผนปฏิบัติ</p>
          </div>
        </div>
        <p className="thesis-lead" style={{ marginBottom: 8 }}>
          Build the content engine around <em>live-stream harvesting</em>.
        </p>
        <p className="thesis-sub" style={{ maxWidth: '72ch' }}>
          The data points one direction: your live streams are raw ore, and cut clips are the refined
          metal. The whole strategy is a system for mining that ore consistently and titling it to travel.
        </p>
      </section>

      {/* The recipe */}
      <section className="section">
        <h3 className="strat-sub">The winning-clip recipe</h3>
        <p className="strat-lead">Every clip your team cuts should aim to hit these — each is a proven reach driver:</p>
        <div className="recipe-grid">
          <div className="recipe-card"><div className="recipe-plus">+95%</div><div className="recipe-body"><strong>Name the speaker</strong><span>อ. / พี่ / น้อง in the title. Audience follows people.</span></div></div>
          <div className="recipe-card"><div className="recipe-plus">+69%</div><div className="recipe-body"><strong>Pose a question / tension</strong><span>"ถ้าพระเจ้าสร้างทุกสิ่ง แล้วสร้างบาปหรือ?"</span></div></div>
          <div className="recipe-card"><div className="recipe-plus">+90%</div><div className="recipe-body"><strong>Describe it fully (45+ chars)</strong><span>Tell the viewer and algorithm what the moment is.</span></div></div>
          <div className="recipe-card"><div className="recipe-plus">15×</div><div className="recipe-body"><strong>Lead with the human story</strong><span>Testimony &amp; identity over routine devotional labels.</span></div></div>
          <div className="recipe-card warn"><div className="recipe-plus">−60%</div><div className="recipe-body"><strong>Drop episode numbers</strong><span>"EP.4" signals commitment. Cut it from clip titles.</span></div></div>
          <div className="recipe-card"><div className="recipe-plus">4×</div><div className="recipe-body"><strong>Post to all 4 platforms</strong><span>Cross-posting multiplies reach at near-zero cost.</span></div></div>
        </div>
      </section>

      {/* The system / cadence */}
      <section className="section">
        <h3 className="strat-sub">The production system</h3>
        <div className="playbook">
          <div className="play"><span className="play-n">1</span><div><strong>Treat every live stream as a harvest.</strong> Before a stream airs, plan to pull 3–5 clips from it — mark the "lean-in moments" live so editors know where to cut.</div></div>
          <div className="play"><span className="play-n">2</span><div><strong>Hold a steady cadence: ~8–10 clips/month, never zero.</strong> When live cuts dropped to zero in June, reach fell. Consistency compounds; gaps cost you.</div></div>
          <div className="play"><span className="play-n">3</span><div><strong>Title with the recipe, every time.</strong> Named speaker + question + full description. Make it a checklist the editor fills before publishing.</div></div>
          <div className="play"><span className="play-n">4</span><div><strong>Cross-post each clip to all 4 platforms.</strong> One cut, four posts. Facebook for reach, TikTok for engagement, YouTube as archive, IG once fixed.</div></div>
          <div className="play"><span className="play-n">5</span><div><strong>Tag each clip's source stream.</strong> Start recording which stream each clip came from, so you can learn how many clips one stream can yield before returns fade.</div></div>
        </div>
      </section>

      {/* What to make more / less of */}
      <section className="section">
        <h3 className="strat-sub">Shift the production mix</h3>
        <div className="mix-grid">
          <div className="mix-col more">
            <div className="mix-head">▲ MORE</div>
            <ul>
              <li><strong>Live-cut clips</strong> — the engine (29k/piece)</li>
              <li><strong>Testimony &amp; life stories</strong> — 70k/piece</li>
              <li><strong>Named-speaker Q&amp;A moments</strong></li>
              <li><strong>Full VDO</strong> — highest reach/piece (57k)</li>
            </ul>
          </div>
          <div className="mix-col less">
            <div className="mix-head">▼ LESS</div>
            <ul>
              <li><strong>Standalone Graphics</strong> — 3.5k/piece</li>
              <li><strong>Podcast</strong> — 0.58% engagement, weakest</li>
              <li><strong>Episode-numbered series titles</strong></li>
              <li><strong>Routine prayer/devotional-labelled posts</strong></li>
            </ul>
          </div>
        </div>
        <p className="finding-note" style={{ paddingLeft: 0 }}>
          This isn't about making less content overall — it's redirecting the same effort toward what
          the data shows travels. One well-cut, well-titled testimony clip outperforms a dozen graphics.
        </p>
      </section>

      {/* The 90-day play */}
      <section className="section">
        <h3 className="strat-sub">If you do one thing this quarter</h3>
        <div className="hero-play">
          <p>
            Pick your next <strong>4 live streams</strong>. Commit to pulling <strong>4 clips each</strong> —
            named speaker, question-framed, fully described, posted to all four platforms. That's
            <strong> 16 clips</strong> built on your strongest, most reliable format. Based on the median
            live-cut performance, that alone should generate roughly <strong>240,000+ reach</strong> from
            content you've <em>already filmed</em> — before making a single new thing.
          </p>
        </div>
      </section>

        <footer className="page-foot">
          <div>
            <div className="mono">CONTENT SIGNALS &amp; STRATEGY</div>
            <div style={{ marginTop: 4 }}>วิเคราะห์หัวข้อและเนื้อหา · 2025–2026</div>
          </div>
          <div className="mono" style={{ textAlign: 'right' }}>
            LIVE CUT = 49% OF REACH<br />
            FROM 25% OF CONTENT
          </div>
        </footer>
      </main>
    </div>
  );
}
