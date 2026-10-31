import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navItems } from './navItems'

// Profile lives in the mobile top bar, so the bottom bar keeps 5 thumb-friendly slots.
const items = navItems.filter((i) => i.to !== '/profile')

export default function BottomNav() {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 px-3 pt-2 lg:hidden">
      <div className="glass-strong mx-auto flex max-w-md items-end justify-between rounded-3xl px-2 py-2 shadow-soft">
        {items.map(({ to, short, icon: Icon, featured }) =>
          featured ? (
            <NavLink key={to} to={to} className="-mt-8 flex flex-col items-center gap-1" aria-label={short}>
              {({ isActive }) => (
                <>
                  <motion.span
                    whileTap={{ scale: 0.9 }}
                    className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-neon to-aqua text-[#06210f] shadow-glow-lg ring-4 ring-bg ${
                      isActive ? 'scale-105' : ''
                    }`}
                  >
                    <Icon size={24} strokeWidth={2.4} />
                  </motion.span>
                  <span className={`text-[11px] font-semibold ${isActive ? 'text-accent' : 'text-muted'}`}>{short}</span>
                </>
              )}
            </NavLink>
          ) : (
            <NavLink key={to} to={to} className="relative flex w-16 flex-col items-center gap-1 py-1.5" aria-label={short}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="bottom-active"
                      className="absolute inset-x-2 inset-y-0 rounded-2xl bg-accent/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon size={21} className={`relative ${isActive ? 'text-accent' : 'text-muted'}`} />
                  <span className={`relative text-[11px] font-medium ${isActive ? 'text-ink' : 'text-muted'}`}>{short}</span>
                </>
              )}
            </NavLink>
          ),
        )}
      </div>
    </nav>
  )
}
