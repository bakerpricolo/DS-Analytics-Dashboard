'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ScatterChart, Scatter, ZAxis, Legend,
} from 'recharts';

const k = (v) => (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v);

function Box({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#18181B', border: '1px solid #27272A', padding: '8px 11px',
      fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#FAFAFA', borderRadius: 3 }}>
      {label && <div style={{ marginBottom: 4 }}>{label}</div>}
      {payload.map((p, idx) => (
        <div key={idx} style={{ color: p.color || '#FAFAFA' }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
        </div>
      ))}
    </div>
  );
}

// Title features: with vs without (grouped bars)
export function TitleFeaturesChart({ data }) {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="#27272A" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 10.5, fill: '#A1A1AA' }} axisLine={{ stroke: '#27272A' }} tickLine={false} interval={0} />
          <YAxis tickFormatter={k} tick={{ fontSize: 11, fill: '#A1A1AA' }} axisLine={false} tickLine={false} width={38} />
          <Tooltip content={<Box />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="with" name="Has feature" fill="#3B82F6" radius={[3, 3, 0, 0]} />
          <Bar dataKey="without" name="Doesn't" fill="#3f3f46" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Themes: horizontal bars, green for top, red for weak
export function ThemesChart({ data }) {
  const color = (r) => (r >= 25000 ? '#22C55E' : r >= 8000 ? '#3B82F6' : '#EF4444');
  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 8 }}>
          <CartesianGrid stroke="#27272A" strokeDasharray="2 4" horizontal={false} />
          <XAxis type="number" tickFormatter={k} tick={{ fontSize: 11, fill: '#A1A1AA' }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="t" tick={{ fontSize: 11.5, fill: '#FAFAFA' }} axisLine={false} tickLine={false} width={96} />
          <Tooltip content={<Box />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="reach" name="Avg reach" radius={[0, 3, 3, 0]}>
            {data.map((e, i) => <Cell key={i} fill={color(e.reach)} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Title length buckets
export function TitleLengthChart({ data }) {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="#27272A" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="b" tick={{ fontSize: 11, fill: '#A1A1AA' }} axisLine={{ stroke: '#27272A' }} tickLine={false} />
          <YAxis tickFormatter={k} tick={{ fontSize: 11, fill: '#A1A1AA' }} axisLine={false} tickLine={false} width={38} />
          <Tooltip content={<Box />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="reach" name="Avg reach" fill="#22D3EE" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Views vs reach scatter
export function ViewsReachScatter({ data }) {
  const lc = data.filter((p) => p.lc);
  const other = data.filter((p) => !p.lc);
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 8, right: 12, bottom: 16, left: 4 }}>
          <CartesianGrid stroke="#27272A" strokeDasharray="2 4" />
          <XAxis type="number" dataKey="x" name="views" tickFormatter={k}
                 tick={{ fontSize: 11, fill: '#A1A1AA' }} axisLine={{ stroke: '#27272A' }} tickLine={false}
                 label={{ value: 'views', position: 'insideBottom', offset: -8, fill: '#A1A1AA', fontSize: 11 }} />
          <YAxis type="number" dataKey="y" name="reach" tickFormatter={k}
                 tick={{ fontSize: 11, fill: '#A1A1AA' }} axisLine={false} tickLine={false}
                 label={{ value: 'reach', angle: -90, position: 'insideLeft', fill: '#A1A1AA', fontSize: 11 }} />
          <ZAxis range={[36, 36]} />
          <Tooltip content={<Box />} cursor={{ strokeDasharray: '3 3', stroke: '#52525b' }} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#A1A1AA' }} />
          <Scatter name="Other" data={other} fill="#52525b" fillOpacity={0.6} />
          <Scatter name="[Live cut]" data={lc} fill="#3B82F6" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
