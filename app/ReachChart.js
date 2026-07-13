'use client';

import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';

const fmt = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'k';
  return String(n);
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: '#FFFFFF', border: '1px solid #E7E1D5', padding: '10px 12px',
      fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#211E1A', borderRadius: 3,
    }}>
      <div style={{ fontWeight: 500, marginBottom: 6 }}>{d.labelEn} {d.year}</div>
      <div>Reach&nbsp;&nbsp;<b>{d.reach.toLocaleString()}</b></div>
      {d.goal ? <div style={{ color: '#B8873B' }}>Goal&nbsp;&nbsp;&nbsp;{d.goal.toLocaleString()}</div> : null}
      <div style={{ color: '#8A8378' }}>{d.contentCount} content</div>
    </div>
  );
}

export default function ReachChart({ monthly }) {
  return (
    <div>
      <div className="chart-legend">
        <span className="leg"><span className="leg-mark" style={{ background: '#9E6A3C' }} />Reach ที่ทำได้</span>
        <span className="leg"><span className="leg-mark" style={{ background: '#B8873B' }} />เป้าหมาย (Goal)</span>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart data={monthly} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
            <defs>
              <linearGradient id="reachFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9E6A3C" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#9E6A3C" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E7E1D5" strokeDasharray="2 4" vertical={false} />
            <XAxis dataKey="labelEn" tick={{ fontSize: 12, fill: '#8A8378', fontFamily: 'IBM Plex Mono' }}
                   axisLine={{ stroke: '#E7E1D5' }} tickLine={false} />
            <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#8A8378', fontFamily: 'IBM Plex Mono' }}
                   axisLine={false} tickLine={false} width={44} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#B8873B', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="reach" stroke="#9E6A3C" strokeWidth={2.5} fill="url(#reachFill)" />
            <Line type="monotone" dataKey="goal" stroke="#B8873B" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
