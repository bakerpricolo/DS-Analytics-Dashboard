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
      background: '#18181B', border: '1px solid #27272A', padding: '10px 12px',
      fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#FAFAFA', borderRadius: 3,
    }}>
      <div style={{ fontWeight: 500, marginBottom: 6 }}>{d.labelEn} {d.year}</div>
      <div>Reach&nbsp;&nbsp;<b>{d.reach.toLocaleString()}</b></div>
      {d.goal ? <div style={{ color: '#FACC15' }}>Goal&nbsp;&nbsp;&nbsp;{d.goal.toLocaleString()}</div> : null}
      <div style={{ color: '#A1A1AA' }}>{d.contentCount} content</div>
    </div>
  );
}

export default function ReachChart({ monthly }) {
  return (
    <div>
      <div className="chart-legend">
        <span className="leg"><span className="leg-mark" style={{ background: '#3B82F6' }} />Reach ที่ทำได้</span>
        <span className="leg"><span className="leg-mark" style={{ background: '#FACC15' }} />เป้าหมาย (Goal)</span>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart data={monthly} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
            <defs>
              <linearGradient id="reachFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#27272A" strokeDasharray="2 4" vertical={false} />
            <XAxis dataKey="labelEn" tick={{ fontSize: 12, fill: '#A1A1AA', fontFamily: 'IBM Plex Mono' }}
                   axisLine={{ stroke: '#27272A' }} tickLine={false} />
            <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#A1A1AA', fontFamily: 'IBM Plex Mono' }}
                   axisLine={false} tickLine={false} width={44} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#FACC15', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="reach" stroke="#3B82F6" strokeWidth={2.5} fill="url(#reachFill)" />
            <Line type="monotone" dataKey="goal" stroke="#FACC15" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
