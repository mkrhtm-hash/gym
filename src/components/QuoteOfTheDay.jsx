import { Quote } from 'lucide-react'
import GlassCard from './GlassCard'
import { quotes } from '../data/mockData'

function quoteForToday() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now - start) / 86_400_000)
  return quotes[dayOfYear % quotes.length]
}

export default function QuoteOfTheDay({ className = '', delay = 0 }) {
  const q = quoteForToday()
  return (
    <GlassCard className={`p-6 ${className}`} delay={delay}>
      <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-aqua/20 blur-3xl" />
      <div className="flex items-center gap-2">
        <Quote size={16} className="text-accent" />
        <span className="eyebrow">Quote of the day</span>
      </div>
      <blockquote className="mt-4 font-display text-xl font-medium leading-snug text-ink sm:text-2xl">“{q.text}”</blockquote>
      <p className="mt-3 text-sm text-muted">— {q.author}</p>
    </GlassCard>
  )
}
