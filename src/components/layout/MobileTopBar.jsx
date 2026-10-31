import { Link } from 'react-router-dom'
import Logo from '../Logo'
import ThemeToggle from '../ThemeToggle'
import { user } from '../../data/mockData'

export default function MobileTopBar() {
  return (
    <header className="sticky top-0 z-30 px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-3 lg:hidden">
      <div className="glass-strong flex items-center justify-between rounded-2xl px-3 py-2">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/profile"
            aria-label="Profile"
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon to-aqua font-display text-sm font-bold text-[#06210f]"
          >
            {user.initials}
          </Link>
        </div>
      </div>
    </header>
  )
}
