'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ScatterChart, Scatter, ZAxis, Legend,
} from 'recharts';

const k = (v) => (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v);

function Box({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E7E1D5', padding: '8px 11px',
      fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#211E1A', borderRadius: 3 }}>
      {label && <div style={{ marginBottom: 4 }}>{label}</div>}
      {payload.map((p, idx) => (
        <div key={idx} style={{ color: p.color || '#211E1A' }}>
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
          <CartesianGrid stroke="#E7E1D5" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 10.5, fill: '#8A8378' }} axisLine={{ stroke: '#E7E1D5' }} tickLine={false} interval={0} />
          <YAxis tickFormatter={k} tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={false} tickLine={false} width={38} />
          <Tooltip content={<Box />} cursor={{ fill: 'rgba(158,106,60,0.05)' }} />
          <Bar dataKey="with" name="Has feature" fill="#9E6A3C" radius={[3, 3, 0, 0]} />
          <Bar dataKey="without" name="Doesn't" fill="#D4CFC2" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Themes: horizontal bars, green for top, red for weak
export function ThemesChart({ data }) {
  const color = (r) => (r >= 25000 ? '#5C7A54' : r >= 8000 ? '#9E6A3C' : '#C0663E');
  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 8 }}>
          <CartesianGrid stroke="#E7E1D5" strokeDasharray="2 4" horizontal={false} />
          <XAxis type="number" tickFormatter={k} tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="t" tick={{ fontSize: 11.5, fill: '#211E1A' }} axisLine={false} tickLine={false} width={96} />
          <Tooltip content={<Box />} cursor={{ fill: 'rgba(158,106,60,0.05)' }} />
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
          <CartesianGrid stroke="#E7E1D5" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="b" tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={{ stroke: '#E7E1D5' }} tickLine={false} />
          <YAxis tickFormatter={k} tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={false} tickLine={false} width={38} />
          <Tooltip content={<Box />} cursor={{ fill: 'rgba(158,106,60,0.05)' }} />
          <Bar dataKey="reach" name="Avg reach" fill="#3D6B5E" radius={[3, 3, 0, 0]} />
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
          <CartesianGrid stroke="#E7E1D5" strokeDasharray="2 4" />
          <XAxis type="number" dataKey="x" name="views" tickFormatter={k}
                 tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={{ stroke: '#E7E1D5' }} tickLine={false}
                 label={{ value: 'views', position: 'insideBottom', offset: -8, fill: '#8A8378', fontSize: 11 }} />
          <YAxis type="number" dataKey="y" name="reach" tickFormatter={k}
                 tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={false} tickLine={false}
                 label={{ value: 'reach', angle: -90, position: 'insideLeft', fill: '#8A8378', fontSize: 11 }} />
          <ZAxis range={[36, 36]} />
          <Tooltip content={<Box />} cursor={{ strokeDasharray: '3 3', stroke: '#B5AC9C' }} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#8A8378' }} />
          <Scatter name="Other" data={other} fill="#B5AC9C" fillOpacity={0.6} />
          <Scatter name="[Live cut]" data={lc} fill="#9E6A3C" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
