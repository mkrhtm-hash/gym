import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '', withLabel = false }) {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className={`group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-2xl border border-line/10 bg-line/[0.04] px-3 text-sm font-medium text-ink transition hover:border-line/20 hover:bg-line/[0.08] ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: 14, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {isDark ? <Moon size={18} className="text-aqua" /> : <Sun size={18} className="text-ember" />}
        </motion.span>
      </AnimatePresence>
      {withLabel && <span>{isDark ? 'Dark' : 'Light'} mode</span>}
    </button>
  )
}
