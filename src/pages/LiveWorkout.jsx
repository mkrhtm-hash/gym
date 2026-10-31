import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Check, ChevronRight, Clock, Dumbbell, Flame, Minus, Pause, Play, Plus, RotateCcw, SkipForward, Trophy } from 'lucide-react'
import Page from '../components/Page'
import GlassCard from '../components/GlassCard'
import ProgressRing from '../components/ProgressRing'
import { useToast } from '../context/ToastContext'
import { todayWorkout } from '../data/mockData'

const PRESETS = [30, 60, 90, 120]

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

const freshProgress = () => Object.fromEntries(todayWorkout.exercises.map((e) => [e.id, Array(e.sets).fill(false)]))

function celebrate() {
  const colors = ['#c6ff3d', '#22d3ee', '#ff7a45', '#ff4d8d', '#ffffff']
  const end = Date.now() + 2200
  confetti({ particleCount: 140, spread: 100, startVelocity: 45, origin: { y: 0.6 }, colors })
  ;(function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.75 }, colors })
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.75 }, colors })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

function RestTimer({ rest, setRest }) {
  const urgent = rest.running && rest.remaining <= 5 && rest.remaining > 0
  const adjust = (delta) =>
    setRest((r) => {
      const remaining = Math.max(0, r.remaining + delta)
      return { ...r, remaining, total: Math.max(r.total, remaining) }
    })

  return (
    <GlassCard hover={false} className="gradient-border flex flex-col items-center p-6 sm:p-8">
      <div className={`pointer-events-none absolute left-1/2 top-24 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl transition-colors duration-500 ${urgent ? 'bg-ember/30' : rest.running ? 'bg-neon/20' : 'bg-aqua/10'}`} />
      <p className="eyebrow relative">{rest.running ? 'Resting' : rest.remaining === 0 ? 'Go time' : 'Rest timer'}</p>

      <motion.div animate={urgent ? { scale: [1, 1.03, 1] } : { scale: 1 }} transition={urgent ? { duration: 1, repeat: Infinity } : {}} className="relative mt-5">
        <ProgressRing
          value={rest.remaining}
          max={rest.total || 1}
          size={252}
          stroke={16}
          live
          colors={urgent ? ['#ff7a45', '#ff4d8d'] : ['#c6ff3d', '#22d3ee']}
        >
          <div>
            <p className={`font-display text-6xl font-bold tabular-nums tracking-tight ${urgent ? 'text-ember' : ''}`}>{fmt(rest.remaining)}</p>
            <p className="mt-1 text-sm text-muted">{rest.running ? 'Breathe. Hydrate.' : rest.remaining === 0 ? 'Next set — you got this' : 'Tick a set to auto-start'}</p>
          </div>
        </ProgressRing>
      </motion.div>

      <div className="relative mt-7 flex items-center gap-3">
        <button onClick={() => adjust(-15)} className="btn-ghost !h-12 !w-12 !rounded-full !p-0" aria-label="Subtract 15 seconds">
          <Minus size={18} />
        </button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() =>
            setRest((r) => (r.remaining === 0 ? { ...r, remaining: r.total, running: true } : { ...r, running: !r.running }))
          }
          className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-neon to-aqua text-[#06210f] shadow-glow-lg"
          aria-label={rest.running ? 'Pause timer' : 'Start timer'}
        >
          {rest.running ? <Pause size={26} className="fill-current" /> : <Play size={26} className="ml-1 fill-current" />}
        </motion.button>
        <button onClick={() => adjust(15)} className="btn-ghost !h-12 !w-12 !rounded-full !p-0" aria-label="Add 15 seconds">
          <Plus size={18} />
        </button>
        <button
          onClick={() => setRest((r) => ({ ...r, remaining: 0, running: false }))}
          className="btn-ghost !h-12 !w-12 !rounded-full !p-0"
          aria-label="Skip rest"
          title="Skip rest"
        >
          <SkipForward size={18} />
        </button>
      </div>

      <div className="relative mt-6 flex gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => setRest({ total: p, remaining: p, running: true })}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              rest.total === p ? 'bg-accent/15 text-accent ring-1 ring-accent/30' : 'bg-line/[0.05] text-muted hover:text-ink'
            }`}
          >
            {p}s
          </button>
        ))}
      </div>
    </GlassCard>
  )
}

function ExerciseRow({ ex, sets, index, isCurrent, onToggle }) {
  const doneCount = sets.filter(Boolean).length
  const complete = doneCount === sets.length
  const nextIdx = sets.indexOf(false)
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`glass relative overflow-hidden rounded-3xl p-4 transition sm:p-5 ${
        isCurrent ? 'ring-1 ring-accent/40 shadow-glow' : ''
      } ${complete ? 'opacity-70' : ''}`}
    >
      {isCurrent && <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-neon/15 blur-2xl" />}
      <div className="relative flex items-center gap-3">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-display text-sm font-bold transition ${
            complete ? 'bg-gradient-to-br from-neon to-aqua text-[#06210f]' : isCurrent ? 'bg-accent/15 text-accent' : 'bg-line/[0.06] text-muted'
          }`}
        >
          {complete ? <Check size={18} strokeWidth={3} /> : index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className={`truncate font-display font-semibold ${complete ? 'line-through decoration-accent/60' : ''}`}>{ex.name}</p>
          <p className="text-xs text-muted">
            {ex.sets} × {ex.reps} · {ex.weight} · rest {ex.rest}s
          </p>
        </div>
        {isCurrent && (
          <span className="hidden items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent sm:flex">
            Up next <ChevronRight size={12} />
          </span>
        )}
      </div>
      <div className="relative mt-4 flex flex-wrap gap-2">
        {sets.map((done, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.88 }}
            onClick={() => onToggle(ex, i)}
            className={`relative flex h-12 min-w-[4.5rem] flex-1 items-center justify-center gap-1.5 rounded-2xl text-sm font-semibold transition sm:flex-none ${
              done
                ? 'bg-gradient-to-br from-neon to-aqua text-[#06210f] shadow-glow'
                : i === nextIdx && isCurrent
                  ? 'border-2 border-dashed border-accent/50 text-accent'
                  : 'border border-line/10 bg-line/[0.04] text-muted hover:text-ink'
            }`}
            aria-pressed={done}
            aria-label={`Set ${i + 1} of ${ex.name}${done ? ', done' : ''}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {done ? (
                <motion.span key="d" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                  <Check size={16} strokeWidth={3} />
                </motion.span>
              ) : (
                <motion.span key="n" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-xs opacity-70">
                  S{i + 1}
                </motion.span>
              )}
            </AnimatePresence>
            {ex.reps}
          </motion.button>
        ))}
      </div>
    </motion.li>
  )
}

function CompleteModal({ open, stats, onReset }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] grid place-items-center bg-bg/70 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="done-title"
        >
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="glass gradient-border relative w-full max-w-md overflow-hidden rounded-[2rem] p-8 text-center"
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-neon/30 blur-3xl" />
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 14 }}
              className="relative mx-auto grid h-24 w-24 place-items-center rounded-[1.75rem] bg-gradient-to-br from-yellow-300 to-amber-500 text-[#3a2800] shadow-[0_0_60px_-8px_rgba(250,204,21,.8)]"
            >
              <Trophy size={46} />
            </motion.div>
            <h2 id="done-title" className="relative mt-6 text-3xl font-bold">
              Workout <span className="text-gradient">crushed!</span>
            </h2>
            <p className="relative mt-2 text-sm text-muted">That’s 13 days in a row. Your future self says thanks.</p>
            <div className="relative mt-6 grid grid-cols-3 gap-2">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-line/10 bg-line/[0.04] p-3">
                  <s.icon size={16} className="mx-auto text-accent" />
                  <p className="mt-1.5 font-display text-lg font-bold">{s.value}</p>
                  <p className="text-[11px] text-muted">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-7 flex flex-col gap-2 sm:flex-row">
              <Link to="/dashboard" className="btn-primary flex-1">Back to dashboard</Link>
              <button onClick={onReset} className="btn-ghost flex-1">
                <RotateCcw size={16} /> Train again
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function LiveWorkout() {
  const { toast } = useToast()
  const [progress, setProgress] = useState(freshProgress)
  const [rest, setRest] = useState({ total: 90, remaining: 90, running: false })
  const [elapsed, setElapsed] = useState(0)
  const [complete, setComplete] = useState(false)
  const wasRunning = useRef(false)

  const totalSets = useMemo(() => todayWorkout.exercises.reduce((s, e) => s + e.sets, 0), [])
  const doneSets = Object.values(progress).flat().filter(Boolean).length
  const currentId = todayWorkout.exercises.find((e) => progress[e.id].includes(false))?.id

  // Session stopwatch
  useEffect(() => {
    if (complete) return
    const id = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [complete])

  // Rest countdown
  useEffect(() => {
    if (!rest.running) return
    const id = setInterval(() => {
      setRest((r) => (r.remaining <= 1 ? { ...r, remaining: 0, running: false } : { ...r, remaining: r.remaining - 1 }))
    }, 1000)
    return () => clearInterval(id)
  }, [rest.running])

  // Notify when a running timer hits zero
  useEffect(() => {
    if (wasRunning.current && !rest.running && rest.remaining === 0 && !complete) {
      toast({ type: 'info', title: 'Rest’s over ⏱️', message: 'Time for your next set. Let’s go!' })
      navigator.vibrate?.([200, 100, 200])
    }
    wasRunning.current = rest.running
  }, [rest.running, rest.remaining, complete, toast])

  const toggleSet = useCallback(
    (ex, i) => {
      const wasDone = progress[ex.id][i]
      const next = { ...progress, [ex.id]: progress[ex.id].map((v, j) => (j === i ? !v : v)) }
      setProgress(next)
      if (wasDone) return

      const allDone = Object.values(next).every((arr) => arr.every(Boolean))
      if (allDone) {
        setRest((r) => ({ ...r, running: false, remaining: 0 }))
        wasRunning.current = false
        setComplete(true)
        celebrate()
      } else {
        setRest({ total: ex.rest, remaining: ex.rest, running: true })
      }
    },
    [progress],
  )

  const reset = () => {
    setProgress(freshProgress())
    setRest({ total: 90, remaining: 90, running: false })
    setElapsed(0)
    setComplete(false)
  }

  const volume = useMemo(() => {
    const kg = todayWorkout.exercises.reduce((sum, e) => {
      const w = parseFloat(e.weight.replace('+', '')) || 0
      return sum + w * e.reps * e.sets
    }, 0)
    return `${(kg / 1000).toFixed(1)} t`
  }, [])

  const pct = Math.round((doneSets / totalSets) * 100)

  return (
    <Page title="Live Workout">
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-rose/15 px-2.5 py-1 text-xs font-semibold text-rose">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose" /> LIVE
          </span>
          <span className="flex items-center gap-1 font-display text-sm font-semibold tabular-nums text-muted">
            <Clock size={14} /> {fmt(elapsed)}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{todayWorkout.title}</h1>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line/[0.08]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon to-aqua shadow-glow"
              animate={{ width: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
          <span className="font-display text-sm font-semibold tabular-nums">
            {doneSets}/{totalSets} sets
          </span>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <RestTimer rest={rest} setRest={setRest} />
          <button onClick={reset} className="btn-ghost mt-4 w-full">
            <RotateCcw size={16} /> Reset workout
          </button>
        </div>
        <ul className="space-y-3">
          {todayWorkout.exercises.map((ex, i) => (
            <ExerciseRow key={ex.id} ex={ex} sets={progress[ex.id]} index={i} isCurrent={ex.id === currentId} onToggle={toggleSet} />
          ))}
        </ul>
      </div>

      <CompleteModal
        open={complete}
        onReset={reset}
        stats={[
          { icon: Clock, label: 'Duration', value: fmt(elapsed) },
          { icon: Dumbbell, label: 'Volume', value: volume },
          { icon: Flame, label: 'Burned', value: `${todayWorkout.calories}` },
        ]}
      />
    </Page>
  )
}
