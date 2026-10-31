import { useState } from 'react'
import { motion } from 'framer-motion'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LineChart as LineIcon, Trophy, TrendingUp } from 'lucide-react'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import GlassCard from '../components/GlassCard'
import AnimatedCounter from '../components/AnimatedCounter'
import EmptyState from '../components/EmptyState'
import { useTheme } from '../context/ThemeContext'
import { lifts, personalRecords, progressSummary, strengthProgress } from '../data/mockData'

const tiers = {
  gold: { from: '#fde047', to: '#f59e0b', text: '#3a2800', label: 'Gold' },
  silver: { from: '#e5e7eb', to: '#94a3b8', text: '#1f2937', label: 'Silver' },
  bronze: { from: '#fdba74', to: '#c2410c', text: '#3b1405', label: 'Bronze' },
}

const ranges = [
  { key: 6, label: '6W' },
  { key: 12, label: '12W' },
]

function LiftTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-strong min-w-[140px] rounded-xl px-3 py-2.5 text-xs shadow-soft">
      <p className="mb-1.5 font-display font-semibold">Week {label.replace('W', '')}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            {lifts.find((l) => l.key === p.dataKey)?.label}
          </span>
          <span className="font-semibold">{p.value} kg</span>
        </p>
      ))}
    </div>
  )
}

export default function Progress() {
  const { chart } = useTheme()
  const [active, setActive] = useState(() => new Set(['deadlift', 'squat', 'bench']))
  const [range, setRange] = useState(12)
  const data = strengthProgress.slice(-range)

  const toggle = (key) =>
    setActive((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })

  return (
    <Page title="Progress">
      <PageHeader eyebrow="Last 12 weeks" title="Progress" subtitle="Every rep adds up. Here’s the proof." />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {progressSummary.map((s, i) => (
          <GlassCard key={s.label} className="p-4 sm:p-5" delay={i * 0.06}>
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              <AnimatedCounter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-accent">
              <TrendingUp size={12} /> {s.sub}
            </p>
          </GlassCard>
        ))}
      </div>

      <GlassCard hover={false} className="mt-5 p-5 sm:p-6" delay={0.1}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Strength gains</p>
            <p className="mt-1 font-display text-xl font-semibold">Estimated 1RM (kg)</p>
          </div>
          <div className="flex rounded-xl bg-line/[0.05] p-1">
            {ranges.map((r) => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold transition ${range === r.key ? 'text-ink' : 'text-muted'}`}
              >
                {range === r.key && <motion.span layoutId="range-pill" className="absolute inset-0 rounded-lg bg-surface shadow-soft" />}
                <span className="relative">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {lifts.map((l) => {
            const on = active.has(l.key)
            return (
              <button
                key={l.key}
                onClick={() => toggle(l.key)}
                className="flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition"
                style={{
                  borderColor: on ? `${l.color}66` : 'rgb(var(--line) / 0.1)',
                  background: on ? `${l.color}1a` : 'transparent',
                  color: on ? l.color : 'rgb(var(--muted))',
                }}
                aria-pressed={on}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: on ? l.color : 'rgb(var(--muted))' }} />
                {l.label}
              </button>
            )
          })}
        </div>

        {active.size === 0 ? (
          <div className="mt-6">
            <EmptyState icon={LineIcon} title="Nothing to chart yet" message="Pick at least one lift above to see your strength curve." />
          </div>
        ) : (
          <div className="mt-6 h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={chart.grid} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: chart.tick, fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: chart.tick, fontSize: 12 }} domain={[(min) => Math.max(0, Math.floor((min - 10) / 20) * 20), (max) => Math.ceil((max + 10) / 20) * 20]} tickCount={6} allowDecimals={false} />
                <Tooltip content={<LiftTooltip />} cursor={{ stroke: chart.grid, strokeWidth: 2 }} />
                {lifts
                  .filter((l) => active.has(l.key))
                  .map((l) => (
                    <Line
                      key={`${l.key}-${range}`}
                      type="monotone"
                      dataKey={l.key}
                      stroke={l.color}
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, strokeWidth: 3, stroke: l.color, fill: '#07090c' }}
                      animationDuration={1600}
                      style={{ filter: `drop-shadow(0 0 6px ${l.color}88)` }}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </GlassCard>

      <div className="mt-10 flex items-end justify-between">
        <div>
          <p className="eyebrow">Hall of fame</p>
          <h2 className="mt-1 text-2xl font-bold">Personal records</h2>
        </div>
        <span className="chip">
          <Trophy size={12} className="text-yellow-400" /> {personalRecords.length} PRs
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {personalRecords.map((pr, i) => {
          const t = tiers[pr.tier]
          return (
            <GlassCard key={pr.id} className="group p-5" delay={i * 0.06}>
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl transition group-hover:opacity-60"
                style={{ background: t.from }}
              />
              <div className="flex items-start justify-between">
                <motion.span
                  whileHover={{ rotate: [0, -12, 12, -6, 0] }}
                  transition={{ duration: 0.6 }}
                  className="grid h-14 w-14 place-items-center rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                    color: t.text,
                    boxShadow: `0 0 30px -8px ${t.from}`,
                  }}
                >
                  <Trophy size={26} />
                </motion.span>
                <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: `${t.from}22`, color: t.to }}>
                  {t.label}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted">{pr.lift} · {pr.reps}</p>
              <p className="mt-1 font-display text-3xl font-bold">
                {typeof pr.value === 'number' ? <AnimatedCounter value={pr.value} decimals={pr.value % 1 ? 1 : 0} /> : pr.value}
                {pr.unit && <span className="ml-1 text-base font-medium text-muted">{pr.unit}</span>}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted">{pr.date}</span>
                <span className="flex items-center gap-1 font-semibold text-accent">
                  <TrendingUp size={12} /> {pr.delta}
                </span>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </Page>
  )
}
