export default function PulseIcon({ className = '', color = '#07090c' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <polyline
        points="4,26 13,26 17,16 24,36 30,10 34,26 44,26"
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
