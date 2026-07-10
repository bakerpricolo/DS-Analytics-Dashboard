import Link from 'next/link';

export default function Nav({ active }) {
  return (
    <nav className="topnav">
      <Link href="/" className={active === 'overview' ? 'navlink active' : 'navlink'}>
        ภาพรวม · Overview
      </Link>
      <Link href="/insights" className={active === 'insights' ? 'navlink active' : 'navlink'}>
        กลยุทธ์ · Strategy Insights
      </Link>
    </nav>
  );
}
