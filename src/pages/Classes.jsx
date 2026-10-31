import { forwardRef, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bike, CalendarCheck, CalendarX, Check, Clock, Flower2, MapPin, Swords, UserRound, Zap } from 'lucide-react'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import { useToast } from '../context/ToastContext'
import { classSchedule, classTypes } from '../data/mockData'

const typeIcon = { Yoga: Flower2, HIIT: Zap, Spin: Bike, Boxing: Swords }

function buildWeek() {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return {
      date: d,
      weekday: (d.getDay() + 6) % 7, // Monday = 0
      label: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate(),
      long: d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    }
  })
}

const to12h = (t) => {
  const [h, m] = t.split(':').map(Number)
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

const ClassCard = forwardRef(function ClassCard({ c, booked, onBook, index }, ref) {
  const t = classTypes[c.type]
  const Icon = typeIcon[c.type]
  const spotsLeft = c.spots - (booked ? 1 : 0)
  const full = c.spots === 0
  const low = !full && c.spots <= 3
  const fill = ((c.capacity - spotsLeft) / c.capacity) * 100

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`glass relative overflow-hidden rounded-3xl p-5 ${booked ? 'ring-1 ring-accent/40' : ''}`}
    >
      <span className="absolute inset-y-0 left-0 w-1" style={{ background: t.color, boxShadow: `0 0 20px ${t.color}` }} />
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl" style={{ background: t.soft }} />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4 sm:w-44 sm:shrink-0">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl" style={{ background: t.soft, color: t.color }}>
            <Icon size={24} />
          </span>
          <div>
            <p className="whitespace-nowrap font-display text-xl font-bold leading-none">{to12h(c.time)}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted">
              <Clock size={12} /> {c.duration} min
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: t.soft, color: t.color }}>
              {c.type}
            </span>
            <span className="text-[11px] font-medium text-muted">{c.intensity} intensity</span>
          </div>
          <h3 className="mt-1.5 truncate text-lg font-semibold">{c.name}</h3>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="flex items-center gap-1"><UserRound size={12} /> {c.coach}</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> {c.room}</span>
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line/[0.08]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fill}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{ background: full ? '#ff4d8d' : low ? '#ff7a45' : t.color }}
              />
            </div>
            <span className={`shrink-0 text-xs font-semibold ${full ? 'text-rose' : low ? 'text-ember' : 'text-muted'}`}>
              {full ? 'Full' : `${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} left`}
            </span>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => onBook(c)}
          className={`sm:w-36 ${
            booked ? 'btn !bg-accent/15 !text-accent ring-1 ring-accent/30 hover:!bg-rose/15 hover:!text-rose hover:ring-rose/30' : full ? 'btn-ghost' : 'btn-primary'
          } group w-full`}
        >
          {booked ? (
            <>
              <Check size={16} className="group-hover:hidden" />
              <span className="group-hover:hidden">Booked</span>
              <span className="hidden group-hover:inline">Cancel</span>
            </>
          ) : full ? (
            'Join waitlist'
          ) : (
            'Book'
          )}
        </motion.button>
      </div>
    </motion.article>
  )
})

export default function Classes() {
  const { toast } = useToast()
  const week = useMemo(buildWeek, [])
  const [dayIdx, setDayIdx] = useState(0)
  const [type, setType] = useState('All')
  const [booked, setBooked] = useState(() => new Set())
  const [waitlist, setWaitlist] = useState(() => new Set())

  const day = week[dayIdx]
  const classes = (classSchedule[day.weekday] ?? []).filter((c) => type === 'All' || c.type === type)

  const bookingsOnDay = (weekday) => (classSchedule[weekday] ?? []).filter((c) => booked.has(c.id))

  const handleBook = (c) => {
    if (booked.has(c.id)) {
      setBooked((prev) => {
        const next = new Set(prev)
        next.delete(c.id)
        return next
      })
      toast({ type: 'info', title: 'Booking cancelled', message: `${c.name} — your spot has been released.` })
      return
    }
    if (c.spots === 0) {
      if (waitlist.has(c.id)) {
        toast({ type: 'info', title: 'Already on the waitlist', message: 'We’ll ping you the moment a spot opens up.' })
      } else {
        setWaitlist((prev) => new Set(prev).add(c.id))
        toast({ type: 'info', title: 'You’re on the waitlist', message: `We’ll notify you if a spot opens in ${c.name}.` })
      }
      return
    }
    const clash = bookingsOnDay(day.weekday).find((b) => b.time === c.time)
    if (clash) {
      toast({
        type: 'error',
        title: 'Double-booked!',
        message: `You’re already in ${clash.name} at ${to12h(c.time)}. Cancel that one first — we believe in you, but not in teleporting.`,
        duration: 5000,
      })
      return
    }
    setBooked((prev) => new Set(prev).add(c.id))
    toast({ type: 'success', title: 'You’re in! 🎉', message: `${c.name} · ${day.label === 'Today' ? 'Today' : day.long} at ${to12h(c.time)}` })
  }

  return (
    <Page title="Class Booking">
      <PageHeader
        eyebrow="This week"
        title="Book a class"
        subtitle="Grab a spot in Yoga, HIIT, Spin or Boxing. Classes fill fast, so don’t sleep on it."
        actions={
          <span className="chip !border-accent/25 !bg-accent/10 !text-accent">
            <CalendarCheck size={12} /> {booked.size} booked
          </span>
        }
      />

      {/* Day picker */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {week.map((d, i) => {
          const active = i === dayIdx
          const hasBooking = bookingsOnDay(d.weekday).length > 0
          const count = (classSchedule[d.weekday] ?? []).length
          return (
            <button
              key={i}
              onClick={() => setDayIdx(i)}
              className={`relative flex w-[4.5rem] shrink-0 flex-col items-center rounded-2xl py-3 transition sm:flex-1 ${
                active ? 'text-[#06210f]' : 'glass text-ink hover:-translate-y-0.5'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="day-pill"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon to-aqua shadow-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative text-[11px] font-semibold uppercase tracking-wider ${active ? 'opacity-70' : 'text-muted'}`}>{d.label}</span>
              <span className="relative mt-1 font-display text-2xl font-bold">{d.dayNum}</span>
              <span className={`relative mt-1 text-[10px] ${active ? 'opacity-70' : 'text-muted'}`}>{count} class{count === 1 ? '' : 'es'}</span>
              {hasBooking && <span className={`absolute right-2 top-2 h-2 w-2 rounded-full ${active ? 'bg-[#06210f]' : 'bg-accent shadow-glow'}`} />}
            </button>
          )
        })}
      </div>

      {/* Type filter */}
      <div className="no-scrollbar -mx-4 mt-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {['All', ...Object.keys(classTypes)].map((k) => {
          const active = type === k
          const color = classTypes[k]?.color
          return (
            <button
              key={k}
              onClick={() => setType(k)}
              className="shrink-0 rounded-xl border px-3.5 py-2 text-xs font-semibold transition"
              style={{
                borderColor: active ? (color ?? 'rgb(var(--accent))') : 'rgb(var(--line) / 0.1)',
                background: active ? (color ? `${color}1f` : 'rgb(var(--accent) / 0.12)') : 'transparent',
                color: active ? (color ?? 'rgb(var(--accent))') : 'rgb(var(--muted))',
              }}
            >
              {k}
            </button>
          )
        })}
      </div>

      <h2 className="mb-3 font-display text-lg font-semibold">{day.long}</h2>

      {classes.length === 0 ? (
        <EmptyState
          icon={CalendarX}
          title={type === 'All' ? 'Rest day vibes' : `No ${type} classes on this day`}
          message={type === 'All' ? 'No classes scheduled — perfect excuse for a recovery walk.' : 'Try another day or show all class types.'}
          action={type !== 'All' && <button className="btn-primary" onClick={() => setType('All')}>Show all classes</button>}
        />
      ) : (
        <motion.div layout className="space-y-3">
          <AnimatePresence mode="popLayout">
            {classes.map((c, i) => (
              <ClassCard key={c.id} c={c} index={i} booked={booked.has(c.id)} onBook={handleBook} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Page>
  )
}
