import Link from 'next/link';

const ICONS = {
  overview: (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
    </svg>
  ),
  insights: (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" /><path d="M18 9l-5 5-3-3-4 4" />
    </svg>
  ),
  signals: (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  ),
  growth: (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" />
    </svg>
  ),
};

const LINKS = [
  { href: '/', key: 'overview', label: 'Overview' },
  { href: '/insights', key: 'insights', label: 'Strategy Insights' },
  { href: '/signals', key: 'signals', label: 'Content Signals' },
  { href: '/growth', key: 'growth', label: 'Growth & Timing' },
];

export default function Sidebar({ active }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">รู้</div>
        <div className="brand-name">Know God<span>Digital Strategies</span></div>
      </div>
      <div className="nav-label">Analytics</div>
      {LINKS.map((l) => (
        <Link key={l.key} href={l.href} className={`nav-item${active === l.key ? ' active' : ''}`}>
          {ICONS[l.key]}
          {l.label}
        </Link>
      ))}
      <div className="side-foot"><div className="avatar">B</div>Benito · Know God</div>
    </aside>
  );
}
