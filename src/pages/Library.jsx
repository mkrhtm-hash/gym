import { forwardRef, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Dumbbell, Flame, Plus, Repeat, Search, SearchX, Timer, X } from 'lucide-react'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import { useToast } from '../context/ToastContext'
import { exercises, muscleGroups } from '../data/mockData'

const difficultyStyle = {
  Beginner: { color: '#22d3ee', bars: 1 },
  Intermediate: { color: '#c6ff3d', bars: 2 },
  Advanced: { color: '#ff7a45', bars: 3 },
}

function DifficultyBadge({ level }) {
  const { color, bars } = difficultyStyle[level]
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: `${color}1f`, color }}>
      <span className="flex items-end gap-[2px]">
        {[1, 2, 3].map((b) => (
          <span key={b} className="w-[3px] rounded-full" style={{ height: 4 + b * 2.5, background: b <= bars ? color : `${color}40` }} />
        ))}
      </span>
      {level}
    </span>
  )
}

const ExerciseCard = forwardRef(function ExerciseCard({ ex, added, onToggle }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      className="glass group relative flex flex-col overflow-hidden rounded-3xl p-5"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition duration-500 group-hover:bg-accent/20" />
      <div className="flex items-center justify-between">
        <span className="chip">{ex.muscle}</span>
        <DifficultyBadge level={ex.difficulty} />
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-tight">{ex.name}</h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-muted">{ex.description}</p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          { icon: Repeat, label: 'Sets', value: ex.sets },
          { icon: Dumbbell, label: 'Reps', value: ex.reps },
          { icon: Timer, label: 'Rest', value: ex.rest ? `${ex.rest}s` : '—' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-line/[0.08] bg-line/[0.03] px-2 py-2.5 text-center">
            <Icon size={14} className="mx-auto text-muted" />
            <p className="mt-1 truncate font-display text-sm font-semibold" title={String(value)}>{value}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Flame size={13} className="text-ember" /> ~{ex.kcal} kcal · {ex.equipment}
        </span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(ex)}
          className={`inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold transition ${
            added
              ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
              : 'bg-line/[0.06] text-ink hover:bg-gradient-to-r hover:from-neon hover:to-aqua hover:text-[#06210f]'
          }`}
          aria-pressed={added}
        >
          {added ? <Check size={14} /> : <Plus size={14} />}
          {added ? 'Added' : 'Add'}
        </motion.button>
      </div>
    </motion.article>
  )
})

export default function Library() {
  const { toast } = useToast()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [plan, setPlan] = useState(() => new Set())

  const counts = useMemo(() => {
    const c = { All: exercises.length }
    muscleGroups.forEach((m) => (c[m] = exercises.filter((e) => e.muscle === m).length))
    return c
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return exercises.filter(
      (e) =>
        (filter === 'All' || e.muscle === filter) &&
        (!q || e.name.toLowerCase().includes(q) || e.equipment.toLowerCase().includes(q)),
    )
  }, [filter, query])

  const togglePlan = (ex) => {
    const removing = plan.has(ex.id)
    setPlan((prev) => {
      const next = new Set(prev)
      removing ? next.delete(ex.id) : next.add(ex.id)
      return next
    })
    if (removing) toast({ type: 'info', title: 'Removed from plan', message: `${ex.name} is off today’s list.` })
    else toast({ type: 'success', title: 'Added to your plan 💪', message: `${ex.name} · ${ex.sets} × ${ex.reps}` })
  }

  const reset = () => {
    setFilter('All')
    setQuery('')
  }

  return (
    <Page title="Workout Library">
      <PageHeader
        eyebrow={`${exercises.length} exercises`}
        title="Workout Library"
        subtitle="Coach-designed movements for every muscle group. Tap Add to build today’s plan."
        actions={
          plan.size > 0 && (
            <span className="chip !border-accent/25 !bg-accent/10 !text-accent">
              <Check size={12} /> {plan.size} in plan
            </span>
          )
        }
      />

      <div className="relative mb-4">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search exercises or equipment…"
          className="input !pl-11 !pr-10"
          aria-label="Search exercises"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted hover:text-ink" aria-label="Clear search">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {['All', ...muscleGroups].map((m) => {
          const active = filter === m
          return (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={`relative shrink-0 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                active ? 'text-[#06210f]' : 'border border-line/10 bg-line/[0.04] text-muted hover:text-ink'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="muscle-pill"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon to-aqua shadow-glow"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {m} <span className={active ? 'opacity-60' : 'opacity-50'}>{counts[m]}</span>
              </span>
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No exercises found"
          message={`We couldn’t find anything matching “${query}”${filter !== 'All' ? ` in ${filter}` : ''}. Try another word or clear the filters.`}
          action={<button className="btn-primary" onClick={reset}>Reset filters</button>}
        />
      ) : (
        <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((ex) => (
              <ExerciseCard key={ex.id} ex={ex} added={plan.has(ex.id)} onToggle={togglePlan} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Page>
  )
}
