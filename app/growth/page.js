import Sidebar from '../Sidebar';
import trends from '../../lib/trends.json';
import { GrowthChart, DayOfWeekChart, SpeakerChart } from '../GrowthCharts';

export const dynamic = 'force-dynamic';

const n = (x) => (x || 0).toLocaleString('en-US');

export default function GrowthPage() {
  const g = trends;
  const first = g.growth[0].perPiece;
  const peak = Math.max(...g.growth.map((x) => x.perPiece));
  const mult = (peak / first).toFixed(1);
  const bestDay = g.dow.reduce((a, b) => (b.perPiece > a.perPiece ? b : a));
  const worstDay = g.dow.reduce((a, b) => (b.perPiece < a.perPiece ? b : a));
  const dayMult = (bestDay.perPiece / worstDay.perPiece).toFixed(1);
  const topSpeaker = g.speakers[0];

  return (
    <div className="shell">
      <Sidebar active="growth" />
      <main className="main">
        <div className="page-top">
          <div>
            <div className="crumb">Analytics / <b>Growth &amp; Timing</b></div>
            <div className="page-h1">The Platform <em>Is Compounding</em></div>
            <div className="page-sub">สามสิ่งที่มองไม่เห็นในยอดรวม — การเติบโตของแพลตฟอร์ม, วันที่ดีที่สุดในการโพสต์, และคนที่ดึงผู้ชมได้มากที่สุด</div>
          </div>
          <div className="date-pill">3 signals</div>
        </div>

      {/* Growth trajectory */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">01</span>
          <div>
            <h2>Reach per piece has grown {mult}× in a year</h2>
            <p className="finding-tag">คุณภาพต่อชิ้นเติบโตขึ้นเรื่อยๆ — แพลตฟอร์มกำลังแข็งแรงขึ้น</p>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-legend">
            <span className="leg"><span className="leg-mark" style={{ background: '#22C55E' }} />reach เฉลี่ยต่อชิ้น</span>
          </div>
          <GrowthChart data={g.growth} />
        </div>
        <p className="finding-note">
          This is the most important number we have and it's invisible in the totals: average reach per
          piece climbed from <strong>{n(first)}</strong> in August to a peak of <strong>{n(peak)}</strong> —
          a <strong>{mult}× improvement.</strong> You're not holding steady, you're compounding. Whatever
          changed around February (more live cuts, named speakers) is working — this is the trend to protect
          and feed.
        </p>
      </section>

      {/* Day of week */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">02</span>
          <div>
            <h2>{bestDay.d} reaches {dayMult}× what {worstDay.d} does</h2>
            <p className="finding-tag">โพสต์วันไหน สำคัญพอๆ กับโพสต์อะไร</p>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-legend">
            <span className="leg"><span className="leg-mark" style={{ background: '#22C55E' }} />วันที่ดีที่สุด</span>
            <span className="leg"><span className="leg-mark" style={{ background: '#3B82F6' }} />ปานกลาง</span>
            <span className="leg"><span className="leg-mark" style={{ background: '#EF4444' }} />วันที่ควรเลี่ยง</span>
          </div>
          <DayOfWeekChart data={g.dow} />
        </div>
        <p className="finding-note">
          {worstDay.d} averages just <strong>{n(worstDay.perPiece)}</strong> per piece; {bestDay.d} averages{' '}
          <strong>{n(bestDay.perPiece)}</strong>. Friday and Saturday are your windows, with Wednesday a
          strong midweek peak. <strong>Posting your best live cuts on a {worstDay.d} wastes most of their
          reach</strong> — the easiest win here is simply rescheduling strong content to Thu–Sat.
        </p>
      </section>

      {/* Speakers */}
      <section className="section">
        <div className="finding-head">
          <span className="finding-num">03</span>
          <div>
            <h2>You have "stars" — certain voices reliably draw reach</h2>
            <p className="finding-tag">บางคนดึงผู้ชมได้มากกว่าคนอื่นอย่างสม่ำเสมอ</p>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-legend">
            <span className="leg"><span className="leg-mark" style={{ background: '#8B5CF6' }} />reach เฉลี่ยต่อชิ้น</span>
          </div>
          <SpeakerChart data={g.speakers} />
        </div>
        <p className="finding-note">
          Ranked by average reach per piece (speakers appearing in 2+ titles). <strong>{topSpeaker.name}</strong>{' '}
          leads at <strong>{n(topSpeaker.perPiece)}</strong> per piece. Named-person content overall pulls
          <strong> 2.5×</strong> what anonymous content does — 55% of your reach from a third of your pieces.
          These are your featured voices; building content around them deliberately is a reliable reach lever.
        </p>
        <p className="finding-note" style={{ marginTop: 6, fontSize: 13.5 }}>
          Note: this is extracted from title text only, so it undercounts speakers not named in the title.
          Tagging each piece with its actual speaker would give a true star ranking — the single highest-value
          field you could start recording.
        </p>
      </section>

      {/* The combined play */}
      <section className="section">
        <h3 className="strat-sub">The combined play</h3>
        <div className="hero-play">
          <p>
            Every lever here stacks with the live-cut strategy and needs <em>zero</em> new production:
            take a <strong>named-speaker live cut</strong>, title it with a <strong>question</strong>, and
            post it <strong>Thursday–Saturday</strong>. Four independent signals — speaker, format, framing,
            timing — all proven in your own data, all pointing the same direction.
          </p>
        </div>
      </section>

        <footer className="page-foot">
        <div>
          <div className="mono">GROWTH &amp; TIMING</div>
          <div style={{ marginTop: 4 }}>การเติบโต · เวลา · เสียงที่โดดเด่น · 2025–2026</div>
        </div>
        <div className="mono" style={{ textAlign: 'right' }}>
          {mult}× REACH/PIECE GROWTH<br />
          {bestDay.d} = BEST · {worstDay.d} = WORST
        </div>
        </footer>
      </main>
    </div>
  );
}
