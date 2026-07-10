'use client';

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const kfmt = (n) => (n >= 1000 ? (n / 1000).toFixed(0) + 'k' : String(n));

function TT({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#18181B', border: '1px solid #27272A', padding: '10px 12px',
      fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#FAFAFA', borderRadius: 3,
    }}>
      <div style={{ fontWeight: 500, marginBottom: 6 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </div>
      ))}
    </div>
  );
}

// Format efficiency: reach/piece bars + pieces-made line (the inversion)
export function FormatEfficiencyChart({ data }) {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="#27272A" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="format" tick={{ fontSize: 11, fill: '#A1A1AA', fontFamily: 'IBM Plex Mono' }}
                 axisLine={{ stroke: '#27272A' }} tickLine={false} interval={0} angle={-30} textAnchor="end" height={60} />
          <YAxis yAxisId="l" tickFormatter={kfmt} tick={{ fontSize: 11, fill: '#A1A1AA', fontFamily: 'IBM Plex Mono' }}
                 axisLine={false} tickLine={false} width={40} />
          <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11, fill: '#FACC15', fontFamily: 'IBM Plex Mono' }}
                 axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<TT />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar yAxisId="l" dataKey="reachPerPiece" name="Reach/piece" radius={[3, 3, 0, 0]} fill="#3B82F6" />
          <Line yAxisId="r" dataKey="pieces" name="Pieces made" stroke="#FACC15" strokeWidth={2}
                dot={{ r: 3, fill: '#FACC15' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// April proof: reach/piece area + power-format volume bars, monthly
export function AprilProofChart({ data }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="#27272A" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="m" tick={{ fontSize: 11, fill: '#A1A1AA', fontFamily: 'IBM Plex Mono' }}
                 axisLine={{ stroke: '#27272A' }} tickLine={false} />
          <YAxis yAxisId="l" tickFormatter={kfmt} tick={{ fontSize: 11, fill: '#A1A1AA', fontFamily: 'IBM Plex Mono' }}
                 axisLine={false} tickLine={false} width={40} />
          <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11, fill: '#22D3EE', fontFamily: 'IBM Plex Mono' }}
                 axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<TT />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar yAxisId="r" dataKey="powerFormats" name="VDO+Reels made" radius={[3, 3, 0, 0]} fill="#22D3EE" opacity={0.55} />
          <Line yAxisId="l" dataKey="reachPerPiece" name="Reach/piece" stroke="#3B82F6" strokeWidth={2.5}
                dot={{ r: 3, fill: '#3B82F6' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
