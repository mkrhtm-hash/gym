import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Dumbbell, Flame, Heart, Play, Star, Timer, Trophy } from 'lucide-react'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import AnimatedCounter from '../components/AnimatedCounter'
import ProgressRing from '../components/ProgressRing'
import GlassCard from '../components/GlassCard'
import QuoteOfTheDay from '../components/QuoteOfTheDay'
import Page from '../components/Page'
import { iconMap } from '../components/icons'
import { landingFeatures, landingStats } from '../data/mockData'

const ease = [0.16, 1, 0.3, 1]
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

const marqueeWords = ['Strength', 'HIIT', 'Yoga', 'Spin', 'Boxing', 'Mobility', 'Endurance', 'Recovery']

function Navbar() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
      <nav className="glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-3 py-2.5 sm:px-5">
        <Logo />
        <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <a href="#features" className="transition hover:text-ink">Features</a>
          <a href="#stats" className="transition hover:text-ink">Community</a>
          <Link to="/classes" className="transition hover:text-ink">Classes</Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/dashboard" className="btn-primary !px-4 !py-2.5">
            Open app <ArrowUpRight size={16} />
          </Link>
        </div>
      </nav>
    </header>
  )
}

function HeartLine() {
  return (
    <svg viewBox="0 0 260 70" className="h-14 w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="hl" x1="0" x2="1">
          <stop offset="0" stopColor="#c6ff3d" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#c6ff3d" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 40 L40 40 L52 18 L64 62 L76 6 L88 40 L140 40 L152 22 L164 56 L176 12 L188 40 L260 40"
        fill="none"
        stroke="url(#hl)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.75, 1] }}
        style={{ filter: 'drop-shadow(0 0 6px rgba(198,255,61,.7))' }}
      />
    </svg>
  )
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, delay: 0.3, ease }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-neon/40 to-aqua/40 blur-3xl" />

      <div className="glass gradient-border relative rounded-[2rem] p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Live session</p>
            <p className="mt-1 font-display text-lg font-semibold">Push Day — Upper Power</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-rose/15 px-2.5 py-1 text-xs font-semibold text-rose">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose" /> REC
          </span>
        </div>

        <div className="mt-6 flex items-center gap-6">
          <ProgressRing value={78} max={100} size={136} stroke={12} delay={0.6}>
            <div>
              <p className="font-display text-3xl font-bold">
                <AnimatedCounter value={78} suffix="%" />
              </p>
              <p className="text-[11px] text-muted">complete</p>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-3">
            {[
              { icon: Timer, label: 'Time', value: '38:24', c: 'text-aqua' },
              { icon: Flame, label: 'Burned', value: '312 kcal', c: 'text-ember' },
              { icon: Dumbbell, label: 'Volume', value: '6.4 t', c: 'text-accent' },
            ].map(({ icon: Icon, label, value, c }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={16} className={c} />
                <span className="text-xs text-muted">{label}</span>
                <span className="ml-auto font-display text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-line/10 bg-line/[0.03] p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-muted">
              <Heart size={14} className="fill-rose text-rose" /> Heart rate
            </span>
            <span className="font-display text-base font-bold">
              148 <span className="text-xs font-medium text-muted">bpm</span>
            </span>
          </div>
          <HeartLine />
        </div>
      </div>

      {/* floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6, ease }}
        className="absolute -bottom-8 -left-3 sm:-left-12"
      >
        <div className="glass-strong flex animate-float items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-soft">
          <Flame size={22} className="animate-flicker text-ember" />
          <div>
            <p className="font-display text-sm font-bold leading-none">12-day streak</p>
            <p className="mt-1 text-[11px] text-muted">Personal best: 21</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease }}
        className="absolute -right-3 -top-12 sm:-right-10"
      >
        <div className="glass-strong flex animate-float-slow items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-soft">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-yellow-400/15">
            <Trophy size={18} className="text-yellow-400" />
          </span>
          <div>
            <p className="font-display text-sm font-bold leading-none">New PR!</p>
            <p className="mt-1 text-[11px] text-muted">Deadlift · 180 kg</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Landing() {
  return (
    <Page>
      <Navbar />

      {/* HERO */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 pb-20 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
        <div className="text-center lg:text-left">
          <motion.div {...rise(0)} className="chip mx-auto mb-6 !border-accent/25 !bg-accent/10 !text-accent lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Autumn Strength Challenge is live
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="text-[2.9rem] font-bold leading-[0.95] sm:text-7xl lg:text-[5.4rem]"
          >
            Train smarter.
            <br />
            <span className="text-gradient-anim">Get stronger.</span>
          </motion.h1>

          <motion.p {...rise(0.18)} className="mx-auto mt-6 max-w-lg text-base text-muted sm:text-lg lg:mx-0">
            YouFit plans your workouts, tracks every rep, books your favourite classes and keeps your streak alive — all from your pocket.
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Link to="/workout" className="btn-primary group w-full !px-7 !py-4 !text-base sm:w-auto">
              <Play size={18} className="fill-current" /> Start Your Workout
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/dashboard" className="btn-ghost w-full !px-7 !py-4 !text-base sm:w-auto">
              View dashboard
            </Link>
          </motion.div>

          <motion.div {...rise(0.38)} className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
            <div className="flex -space-x-3">
              {['#c6ff3d', '#22d3ee', '#ff7a45', '#a78bfa', '#ff4d8d'].map((c, i) => (
                <span
                  key={c}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-bg font-display text-xs font-bold text-[#07090c]"
                  style={{ background: c }}
                >
                  {['JM', 'SK', 'LR', 'AT', 'NB'][i]}
                </span>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mt-0.5 text-xs text-muted">Loved by 48k+ members</p>
            </div>
          </motion.div>
        </div>

        <HeroVisual />
      </section>

      {/* STATS */}
      <section id="stats" className="mx-auto max-w-6xl px-4 sm:px-6">
        <GlassCard hover={false} className="grid divide-y divide-line/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {landingStats.map((s, i) => (
            <div key={s.label} className="px-6 py-8 text-center sm:py-10">
              <p className="font-display text-4xl font-bold sm:text-5xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} duration={2.2 + i * 0.2} className={i === 1 ? 'text-gradient' : ''} />
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </GlassCard>
      </section>

      {/* MARQUEE */}
      <section className="relative mt-20 overflow-hidden border-y border-line/10 py-6 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-10">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-3xl font-bold uppercase tracking-tight text-ink/80 sm:text-5xl">
              {w}
              <span className="h-3 w-3 rotate-45 bg-gradient-to-br from-neon to-aqua" />
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Everything in one app</p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Your gym, <span className="text-gradient">supercharged.</span>
          </h2>
          <p className="mt-4 text-muted">Four tools that turn showing up into levelling up.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {landingFeatures.map((f, i) => {
            const Icon = iconMap[f.icon]
            return (
              <GlassCard key={f.title} delay={i * 0.08} className="group p-6">
                <Link to={f.to} className="block">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition duration-500 group-hover:bg-accent/25" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-neon/20 to-aqua/20 text-accent ring-1 ring-accent/20">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </GlassCard>
            )
          })}
        </div>
      </section>

      {/* QUOTE + CTA */}
      <section className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <QuoteOfTheDay />
        <GlassCard hover={false} className="gradient-border p-8 sm:p-10">
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-neon/25 blur-3xl" />
          <h2 className="relative text-3xl font-bold sm:text-4xl">
            Your next PR is <span className="text-gradient">one session away.</span>
          </h2>
          <p className="relative mt-3 max-w-md text-muted">Today’s plan is ready. 5 exercises, 52 minutes, zero guesswork.</p>
          <Link to="/workout" className="btn-primary relative mt-7 !px-7 !py-4">
            <Play size={18} className="fill-current" /> Start Your Workout
          </Link>
        </GlassCard>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto mt-24 max-w-6xl px-4 pb-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-line/10 pt-8 sm:flex-row">
          <Logo />
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            <Link to="/library" className="hover:text-ink">Workouts</Link>
            <Link to="/classes" className="hover:text-ink">Classes</Link>
            <Link to="/progress" className="hover:text-ink">Progress</Link>
            <Link to="/profile" className="hover:text-ink">Profile</Link>
          </div>
          <p className="text-sm text-muted">© {new Date().getFullYear()} YouFit. Train smarter.</p>
        </div>
      </footer>
    </Page>
  )
}
