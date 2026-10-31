import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import Logo from '../Logo'
import ThemeToggle from '../ThemeToggle'
import { navItems } from './navItems'
import { user } from '../../data/mockData'

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col p-4 lg:flex">
      <div className="glass flex h-full flex-col rounded-3xl p-5">
        <Logo to="/" className="px-2 pt-1" />

        <nav className="mt-10 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className="relative">
              {({ isActive }) => (
                <span
                  className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:bg-line/[0.05] hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-2xl border border-accent/25 bg-accent/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon size={19} className={`relative ${isActive ? 'text-accent' : ''}`} />
                  <span className="relative">{label}</span>
                  {isActive && <span className="relative ml-auto h-1.5 w-1.5 rounded-full bg-accent shadow-glow" />}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-ember/20 bg-gradient-to-br from-ember/15 to-rose/10 p-4">
            <div className="flex items-center gap-3">
              <Flame className="animate-flicker text-ember" size={28} />
              <div>
                <p className="font-display text-2xl font-bold leading-none">{user.streak} days</p>
                <p className="mt-1 text-xs text-muted">Current streak — keep it lit!</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NavLink to="/profile" className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl p-1.5 transition hover:bg-line/[0.05]">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-neon to-aqua font-display text-sm font-bold text-[#06210f]">
                {user.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{user.name}</span>
                <span className="block text-xs text-accent">{user.membership} member</span>
              </span>
            </NavLink>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  )
}
