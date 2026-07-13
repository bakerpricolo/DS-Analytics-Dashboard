'use client';

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const kfmt = (n) => (n >= 1000 ? (n / 1000).toFixed(0) + 'k' : String(n));

function TT({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#FFFFFF', border: '1px solid #E7E1D5', padding: '10px 12px',
      fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#211E1A', borderRadius: 3,
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
          <CartesianGrid stroke="#E7E1D5" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="format" tick={{ fontSize: 11, fill: '#8A8378', fontFamily: 'IBM Plex Mono' }}
                 axisLine={{ stroke: '#E7E1D5' }} tickLine={false} interval={0} angle={-30} textAnchor="end" height={60} />
          <YAxis yAxisId="l" tickFormatter={kfmt} tick={{ fontSize: 11, fill: '#8A8378', fontFamily: 'IBM Plex Mono' }}
                 axisLine={false} tickLine={false} width={40} />
          <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11, fill: '#B8873B', fontFamily: 'IBM Plex Mono' }}
                 axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<TT />} cursor={{ fill: 'rgba(158,106,60,0.05)' }} />
          <Bar yAxisId="l" dataKey="reachPerPiece" name="Reach/piece" radius={[3, 3, 0, 0]} fill="#9E6A3C" />
          <Line yAxisId="r" dataKey="pieces" name="Pieces made" stroke="#B8873B" strokeWidth={2}
                dot={{ r: 3, fill: '#B8873B' }} />
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
          <CartesianGrid stroke="#E7E1D5" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="m" tick={{ fontSize: 11, fill: '#8A8378', fontFamily: 'IBM Plex Mono' }}
                 axisLine={{ stroke: '#E7E1D5' }} tickLine={false} />
          <YAxis yAxisId="l" tickFormatter={kfmt} tick={{ fontSize: 11, fill: '#8A8378', fontFamily: 'IBM Plex Mono' }}
                 axisLine={false} tickLine={false} width={40} />
          <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11, fill: '#3D6B5E', fontFamily: 'IBM Plex Mono' }}
                 axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<TT />} cursor={{ fill: 'rgba(158,106,60,0.05)' }} />
          <Bar yAxisId="r" dataKey="powerFormats" name="VDO+Reels made" radius={[3, 3, 0, 0]} fill="#3D6B5E" opacity={0.55} />
          <Line yAxisId="l" dataKey="reachPerPiece" name="Reach/piece" stroke="#9E6A3C" strokeWidth={2.5}
                dot={{ r: 3, fill: '#9E6A3C' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
