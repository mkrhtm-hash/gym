import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ArrowRight, CalendarDays, Check, Clock, Dumbbell, Flame, Play, Timer, Trophy, Zap } from 'lucide-react'
import Page from '../components/Page'
import GlassCard from '../components/GlassCard'
import ProgressRing from '../components/ProgressRing'
import AnimatedCounter from '../components/AnimatedCounter'
import QuoteOfTheDay from '../components/QuoteOfTheDay'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import { classSchedule, classTypes, personalRecords, todayWorkout, user, weeklyActivity, weeklyGoals } from '../data/mockData'

const todayIdx = (new Date().getDay() + 6) % 7 // Monday = 0

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const { minutes, calories } = payload[0].payload
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-xs shadow-soft">
      <p className="font-display font-semibold">{label}</p>
      <p className="text-muted">
        {minutes ? `${minutes} min · ${calories} kcal` : 'Rest day'}
      </p>
    </div>
  )
}

function WeeklyChart() {
  const { chart } = useTheme()
  const total = weeklyActivity.reduce((s, d) => s + d.minutes, 0)
  return (
    <GlassCard className="p-5 sm:p-6 lg:col-span-2" delay={0.15}>
      <div className="flex items-start justify-between">
        <div>
          <p className="eyebrow">Weekly activity</p>
          <p className="mt-2 font-display text-3xl font-bold">
            <AnimatedCounter value={total} /> <span className="text-base font-medium text-muted">min</span>
          </p>
        </div>
        <span className="chip !border-accent/20 !bg-accent/10 !text-accent">
          <Zap size={12} /> +18% vs last week
        </span>
      </div>
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyActivity} margin={{ top: 10, right: 0, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c6ff3d" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={chart.grid} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: chart.tick, fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: chart.tick, fontSize: 12 }} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: chart.cursor, radius: 12 }} />
            <Bar dataKey="minutes" radius={[10, 10, 10, 10]} maxBarSize={38} animationDuration={1400} animationEasing="ease-out">
              {weeklyActivity.map((d, i) => (
                <Cell key={d.day} fill={i === todayIdx ? 'url(#barGrad)' : chart.muted} stroke={i === todayIdx ? 'none' : 'none'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}

function StreakCard() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <GlassCard className="p-5 sm:p-6" delay={0.1}>
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ember/25 blur-3xl" />
      <p className="eyebrow">Streak</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-ember/25 to-rose/15">
          <Flame size={44} className="animate-flicker fill-ember/30 text-ember" />
        </div>
        <div>
          <p className="font-display text-5xl font-bold leading-none">
            <AnimatedCounter value={user.streak} duration={1.5} />
          </p>
          <p className="mt-1 text-sm text-muted">days in a row</p>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        {days.map((d, i) => {
          const done = weeklyActivity[i].minutes > 0 && i <= todayIdx
          const isToday = i === todayIdx
          return (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 400, damping: 20 }}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-xs ${
                  done
                    ? 'bg-gradient-to-br from-ember to-rose text-white shadow-[0_0_14px_-2px_rgba(255,122,69,.8)]'
                    : isToday
                      ? 'border-2 border-dashed border-ember/60 text-ember'
                      : 'bg-line/[0.06] text-muted'
                }`}
              >
                {done ? <Check size={14} strokeWidth={3} /> : d}
              </span>
            </motion.div>
          )
        })}
      </div>
      <p className="mt-4 text-xs text-muted">
        Best streak: <span className="font-semibold text-ink">{user.bestStreak} days</span> — {user.bestStreak - user.streak} to go!
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {[
          { label: 'kcal this week', value: weeklyActivity.reduce((s, d) => s + d.calories, 0) },
          { label: 'active days', value: weeklyActivity.filter((d) => d.minutes > 0).length },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-line/[0.08] bg-line/[0.03] px-3 py-2.5">
            <p className="font-display text-lg font-bold">
              <AnimatedCounter value={s.value} duration={1.4} />
            </p>
            <p className="text-[11px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

function TodayWorkout() {
  const totalSets = todayWorkout.exercises.reduce((s, e) => s + e.sets, 0)
  return (
    <GlassCard hover={false} className="gradient-border p-5 sm:p-7 lg:col-span-2">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-neon/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="chip !border-accent/25 !bg-accent/10 !text-accent">
            <Dumbbell size={12} /> Today’s workout
          </span>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{todayWorkout.title}</h2>
          <p className="mt-1 text-sm text-muted">{todayWorkout.focus} · with {todayWorkout.coach}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip"><Clock size={12} /> {todayWorkout.duration} min</span>
            <span className="chip"><Dumbbell size={12} /> {todayWorkout.exercises.length} exercises · {totalSets} sets</span>
            <span className="chip"><Flame size={12} /> ~{todayWorkout.calories} kcal</span>
          </div>
        </div>
        <Link to="/workout" className="btn-primary group shrink-0 !px-7 !py-4 !text-base">
          <Play size={18} className="fill-current" /> Start
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <ul className="relative mt-6 grid gap-2 sm:grid-cols-2">
        {todayWorkout.exercises.slice(0, 4).map((e, i) => (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            className="flex items-center gap-3 rounded-2xl border border-line/[0.08] bg-line/[0.03] px-3.5 py-3"
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-line/[0.06] font-display text-sm font-semibold text-muted">{i + 1}</span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{e.name}</span>
            <span className="text-xs text-muted">{e.sets}×{e.reps}</span>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  )
}

function GoalRings() {
  return (
    <GlassCard className="p-5 sm:p-6 lg:col-span-3" delay={0.2}>
      <div className="flex items-center justify-between">
        <p className="eyebrow">This week’s goals</p>
        <span className="text-xs text-muted">Resets Monday</span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-6">
        {weeklyGoals.map((g, i) => (
          <div key={g.key} className="flex flex-col items-center text-center">
            <ProgressRing value={g.value} max={g.goal} size={112} stroke={10} colors={g.colors} delay={0.2 + i * 0.15} className="scale-[0.85] sm:scale-100">
              <div>
                <p className="font-display text-2xl font-bold leading-none">
                  <AnimatedCounter value={g.value} duration={1.6} />
                </p>
                <p className="mt-1 text-[11px] text-muted">/ {g.goal}</p>
              </div>
            </ProgressRing>
            <p className="mt-2 text-sm font-medium">{g.label}</p>
            <p className="text-xs text-muted">{Math.round((g.value / g.goal) * 100)}%</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

function NextClass() {
  // Find the next class from today onward
  let found = null
  for (let d = 0; d < 7 && !found; d++) {
    const list = classSchedule[(todayIdx + d) % 7]
    if (list?.length) found = { ...list[list.length - 1], offset: d }
  }
  if (!found) return null
  const t = classTypes[found.type]
  return (
    <GlassCard className="p-5 sm:p-6" delay={0.25}>
      <p className="eyebrow">Recommended class</p>
      <div className="mt-4 flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: t.soft, color: t.color }}>
          <CalendarDays size={24} />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-semibold">{found.name}</p>
          <p className="text-sm text-muted">
            {found.offset === 0 ? 'Today' : found.offset === 1 ? 'Tomorrow' : 'This week'} · {found.time} · {found.coach}
          </p>
        </div>
      </div>
      <Link to="/classes" className="btn-ghost mt-5 w-full">
        Browse schedule <ArrowRight size={16} />
      </Link>
    </GlassCard>
  )
}

function LatestPR() {
  const pr = personalRecords[0]
  return (
    <GlassCard className="p-5 sm:p-6" delay={0.3}>
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-yellow-400/20 blur-3xl" />
      <p className="eyebrow">Latest PR</p>
      <div className="mt-4 flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-500 text-[#3a2800] shadow-[0_0_30px_-6px_rgba(250,204,21,.7)]">
          <Trophy size={26} />
        </span>
        <div>
          <p className="font-display text-3xl font-bold leading-none">
            {pr.value} <span className="text-base text-muted">{pr.unit}</span>
          </p>
          <p className="mt-1 text-sm text-muted">{pr.lift} · {pr.date}</p>
        </div>
      </div>
      <Link to="/progress" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        See all records <ArrowRight size={15} />
      </Link>
    </GlassCard>
  )
}

export default function Dashboard() {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  return (
    <Page title="Dashboard">
      <header className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <p className="eyebrow">{date}</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            {greeting()}, <span className="text-gradient">{user.firstName}</span>
          </h1>
          <p className="mt-1 text-sm text-muted">You’re 1 workout away from hitting this week’s goal. Let’s go.</p>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle withLabel />
          <Link to="/workout" className="btn-primary"><Timer size={16} /> Quick start</Link>
        </div>
      </header>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        <TodayWorkout />
        <StreakCard />
        <GoalRings />
        <WeeklyChart />
        <QuoteOfTheDay delay={0.2} />
        <NextClass />
        <LatestPR />
        <GlassCard className="flex flex-col justify-between p-5 sm:p-6" delay={0.35}>
          <p className="eyebrow">Level {user.level}</p>
          <div>
            <p className="mt-3 font-display text-2xl font-bold">{user.xp.toLocaleString()} XP</p>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-line/[0.08]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-neon to-aqua shadow-glow"
              />
            </div>
            <p className="mt-2 text-xs text-muted">{(user.nextLevelXp - user.xp).toLocaleString()} XP to Level {user.level + 1}</p>
          </div>
        </GlassCard>
      </div>
    </Page>
  )
}
