'use client';

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';

const k = (v) => (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v);

function Box({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E7E1D5', padding: '8px 11px',
      fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#211E1A', borderRadius: 3 }}>
      {label && <div style={{ marginBottom: 4 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || '#211E1A' }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
        </div>
      ))}
    </div>
  );
}

// Growth trajectory — reach per piece climbing over time
export function GrowthChart({ data }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
          <defs>
            <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5C7A54" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#5C7A54" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E7E1D5" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="m" tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={{ stroke: '#E7E1D5' }} tickLine={false} />
          <YAxis tickFormatter={k} tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={false} tickLine={false} width={40} />
          <Tooltip content={<Box />} cursor={{ stroke: '#5C7A54', strokeDasharray: '3 3' }} />
          <Area type="monotone" dataKey="perPiece" name="Reach/piece" stroke="#5C7A54" strokeWidth={2.5} fill="url(#growthFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Day of week — bars, weekend highlighted
export function DayOfWeekChart({ data }) {
  const avg = data.reduce((s, x) => s + x.perPiece, 0) / data.length;
  const color = (d) => (['Fri', 'Sat'].includes(d) ? '#5C7A54' : ['Mon', 'Sun'].includes(d) ? '#C0663E' : '#9E6A3C');
  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="#E7E1D5" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="d" tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={{ stroke: '#E7E1D5' }} tickLine={false} />
          <YAxis tickFormatter={k} tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={false} tickLine={false} width={40} />
          <Tooltip content={<Box />} cursor={{ fill: 'rgba(158,106,60,0.05)' }} />
          <ReferenceLine y={avg} stroke="#8A8378" strokeDasharray="4 4"
            label={{ value: 'avg', fill: '#8A8378', fontSize: 10, position: 'right' }} />
          <Bar dataKey="perPiece" name="Reach/piece" radius={[3, 3, 0, 0]}>
            {data.map((e, i) => <Cell key={i} fill={color(e.d)} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Speakers — horizontal ranked bars
export function SpeakerChart({ data }) {
  return (
    <div style={{ width: '100%', height: 340 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 8 }}>
          <CartesianGrid stroke="#E7E1D5" strokeDasharray="2 4" horizontal={false} />
          <XAxis type="number" tickFormatter={k} tick={{ fontSize: 11, fill: '#8A8378' }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#211E1A' }} axisLine={false} tickLine={false} width={80} />
          <Tooltip content={<Box />} cursor={{ fill: 'rgba(158,106,60,0.05)' }} />
          <Bar dataKey="perPiece" name="Reach/piece" fill="#9E6A3C" radius={[0, 3, 3, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
