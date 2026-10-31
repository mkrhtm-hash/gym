import { useId, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Animated SVG ring. `value / max` sets the fill.
 * Pass `live` for timers so the ring follows value changes smoothly.
 */
export default function ProgressRing({
  value,
  max = 100,
  size = 120,
  stroke = 10,
  colors = ['#c6ff3d', '#22d3ee'],
  delay = 0,
  live = false,
  glow = true,
  children,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const gid = `ring-${useId().replace(/:/g, '')}`
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const pct = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0
  const offset = circumference * (1 - pct)

  return (
    <div ref={ref} className={`relative inline-grid place-items-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-line/[0.08]" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: live ? offset : circumference }}
          animate={{ strokeDashoffset: live || inView ? offset : circumference }}
          transition={live ? { duration: 0.95, ease: 'linear' } : { duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
          style={glow ? { filter: `drop-shadow(0 0 6px ${colors[0]}88)` } : undefined}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  )
}
