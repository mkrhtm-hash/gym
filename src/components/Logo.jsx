import { Link } from 'react-router-dom'
import PulseIcon from './PulseIcon'

export default function Logo({ to = '/', size = 'md', className = '' }) {
  const big = size === 'lg'
  return (
    <Link to={to} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="YouFit home">
      <span
        className={`relative grid place-items-center rounded-xl bg-gradient-to-br from-neon to-aqua shadow-glow transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105 ${
          big ? 'h-11 w-11' : 'h-9 w-9'
        }`}
      >
        <PulseIcon className={big ? 'h-6 w-6' : 'h-5 w-5'} />
      </span>
      <span className={`font-display font-bold italic tracking-tighter text-gradient ${big ? 'text-3xl' : 'text-2xl'}`}>
        YouFit
      </span>
    </Link>
  )
}
