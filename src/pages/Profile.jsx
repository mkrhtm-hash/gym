import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Crown, Dumbbell, Flame, Lock, MapPin, Moon, Ruler, Settings, Sparkles, Timer, Trophy, Users } from 'lucide-react'
import Page from '../components/Page'
import GlassCard from '../components/GlassCard'
import AnimatedCounter from '../components/AnimatedCounter'
import ThemeToggle from '../components/ThemeToggle'
import { iconMap } from '../components/icons'
import { useToast } from '../context/ToastContext'
import { achievements, user } from '../data/mockData'

function Switch({ on, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? 'bg-gradient-to-r from-neon to-aqua' : 'bg-line/[0.12]'}`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${on ? 'right-1' : 'left-1'}`}
      />
    </button>
  )
}

export default function Profile() {
  const { toast } = useToast()
  const [prefs, setPrefs] = useState({ reminders: true, classAlerts: true, prAlerts: false })
  const [units, setUnits] = useState('kg')
  const unlocked = achievements.filter((a) => a.unlocked).length

  const setPref = (key, label) => (val) => {
    setPrefs((p) => ({ ...p, [key]: val }))
    toast({ type: val ? 'success' : 'info', title: `${label} ${val ? 'on' : 'off'}`, message: val ? 'We’ll keep you in the loop.' : 'Got it, no more pings for that.' })
  }

  const stats = [
    { icon: Dumbbell, label: 'Workouts', value: user.totals.workouts },
    { icon: Timer, label: 'Hours trained', value: user.totals.hours },
    { icon: Trophy, label: 'PRs set', value: user.totals.prs },
    { icon: Flame, label: 'Best streak', value: user.bestStreak },
  ]

  return (
    <Page title="Profile">
      {/* Hero */}
      <GlassCard hover={false} className="gradient-border p-6 sm:p-8">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-neon/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-aqua/20 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} className="relative">
            <div className="absolute -inset-1.5 animate-[spin_8s_linear_infinite] rounded-[2rem] bg-[conic-gradient(from_0deg,#c6ff3d,#22d3ee,#a78bfa,#c6ff3d)] opacity-80 blur-[2px]" />
            <div className="relative grid h-28 w-28 place-items-center rounded-[1.75rem] bg-surface">
              <span className="text-gradient font-display text-4xl font-bold">{user.initials}</span>
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-neon to-aqua px-2.5 py-0.5 font-display text-xs font-bold text-[#06210f] shadow-glow">
              LVL {user.level}
            </span>
          </motion.div>

          <div className="flex-1">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-300/20 to-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-500 ring-1 ring-amber-400/30 dark:text-yellow-300">
                <Crown size={13} /> {user.membership} member
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {user.handle} · Member since {user.memberSince}
            </p>
            <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted sm:justify-start">
              <MapPin size={13} /> {user.homeGym}
            </p>
            <div className="mt-4 max-w-sm">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Level {user.level}</span>
                <span className="font-semibold">
                  {user.xp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP
                </span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-line/[0.08]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                  transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-neon to-aqua shadow-glow"
                />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <GlassCard key={s.label} className="p-4 sm:p-5" delay={i * 0.06}>
            <s.icon size={18} className="text-accent" />
            <p className="mt-3 font-display text-3xl font-bold">
              <AnimatedCounter value={s.value} />
            </p>
            <p className="text-xs text-muted">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Achievements */}
      <div className="mt-10 flex items-end justify-between">
        <div>
          <p className="eyebrow">Badges</p>
          <h2 className="mt-1 text-2xl font-bold">Achievements</h2>
        </div>
        <span className="chip">
          <Sparkles size={12} className="text-accent" /> {unlocked}/{achievements.length} unlocked
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {achievements.map((a, i) => {
          const Icon = iconMap[a.icon]
          const pct = a.unlocked ? 100 : Math.round((a.progress / a.goal) * 100)
          return (
            <GlassCard key={a.id} className={`group p-4 text-center sm:p-5 ${a.unlocked ? '' : 'opacity-80'}`} delay={i * 0.05}>
              {a.unlocked && (
                <div className="pointer-events-none absolute left-1/2 top-4 h-20 w-20 -translate-x-1/2 rounded-full opacity-40 blur-2xl transition group-hover:opacity-70" style={{ background: a.color }} />
              )}
              <motion.div
                whileHover={a.unlocked ? { rotate: [0, -10, 10, 0], scale: 1.08 } : {}}
                transition={{ duration: 0.5 }}
                className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl"
                style={
                  a.unlocked
                    ? { background: `linear-gradient(135deg, ${a.color}, ${a.color}99)`, color: '#07090c', boxShadow: `0 0 30px -6px ${a.color}` }
                    : { background: 'rgb(var(--line) / 0.06)', color: 'rgb(var(--muted))' }
                }
              >
                {a.unlocked ? <Icon size={28} /> : <Lock size={22} />}
              </motion.div>
              <p className="relative mt-3 font-display font-semibold">{a.title}</p>
              <p className="relative mt-0.5 text-xs text-muted">{a.desc}</p>
              {!a.unlocked && (
                <div className="relative mt-3">
                  <div className="h-1.5 overflow-hidden rounded-full bg-line/[0.08]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: a.color }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted">
                    {a.progress.toLocaleString()} / {a.goal.toLocaleString()}
                  </p>
                </div>
              )}
            </GlassCard>
          )
        })}
      </div>

      {/* Membership + settings */}
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, rotateX: 20 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4, rotate: -0.5 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#11160b] via-[#0b1418] to-[#071014] p-6 text-white shadow-soft ring-1 ring-white/10 sm:p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-neon/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-aqua/25 blur-3xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Membership</p>
              <p className="mt-2 font-display text-4xl font-bold italic tracking-tighter bg-gradient-to-r from-neon to-aqua bg-clip-text text-transparent">ELITE</p>
            </div>
            <Crown className="text-yellow-300" size={28} />
          </div>
          <ul className="relative mt-6 space-y-2 text-sm text-white/80">
            {['Unlimited classes & priority booking', 'All clubs, 24/7 access', '2 guest passes / month', 'Monthly body-comp scan'].map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" /> {p}
              </li>
            ))}
          </ul>
          <div className="relative mt-6 flex items-end justify-between">
            <p className="font-mono text-sm tracking-widest text-white/60">YF •••• 0412</p>
            <p className="text-xs text-white/60">Renews Nov 3</p>
          </div>
        </motion.div>

        <GlassCard hover={false} className="p-6">
          <div className="flex items-center gap-2">
            <Settings size={16} className="text-accent" />
            <p className="eyebrow">Settings</p>
          </div>
          <ul className="mt-4 divide-y divide-line/10">
            <li className="flex items-center justify-between gap-4 py-3.5">
              <span className="flex items-center gap-3 text-sm"><Moon size={17} className="text-muted" /> Appearance</span>
              <ThemeToggle withLabel />
            </li>
            <li className="flex items-center justify-between gap-4 py-3.5">
              <span className="flex items-center gap-3 text-sm"><Ruler size={17} className="text-muted" /> Units</span>
              <div className="flex rounded-xl bg-line/[0.05] p-1">
                {['kg', 'lb'].map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnits(u)}
                    className={`relative rounded-lg px-3.5 py-1.5 text-xs font-semibold ${units === u ? 'text-ink' : 'text-muted'}`}
                  >
                    {units === u && <motion.span layoutId="units-pill" className="absolute inset-0 rounded-lg bg-surface shadow-soft" />}
                    <span className="relative">{u}</span>
                  </button>
                ))}
              </div>
            </li>
            <li className="flex items-center justify-between gap-4 py-3.5">
              <span className="flex items-center gap-3 text-sm"><Bell size={17} className="text-muted" /> Workout reminders</span>
              <Switch on={prefs.reminders} onChange={setPref('reminders', 'Workout reminders')} label="Workout reminders" />
            </li>
            <li className="flex items-center justify-between gap-4 py-3.5">
              <span className="flex items-center gap-3 text-sm"><Users size={17} className="text-muted" /> Class spot alerts</span>
              <Switch on={prefs.classAlerts} onChange={setPref('classAlerts', 'Class alerts')} label="Class spot alerts" />
            </li>
            <li className="flex items-center justify-between gap-4 py-3.5">
              <span className="flex items-center gap-3 text-sm"><Trophy size={17} className="text-muted" /> PR celebrations</span>
              <Switch on={prefs.prAlerts} onChange={setPref('prAlerts', 'PR celebrations')} label="PR celebrations" />
            </li>
          </ul>
        </GlassCard>
      </div>
    </Page>
  )
}
