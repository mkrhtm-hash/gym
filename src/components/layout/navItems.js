import { CalendarDays, Dumbbell, LayoutDashboard, LineChart, Timer, UserRound } from 'lucide-react'

export const navItems = [
  { to: '/dashboard', label: 'Dashboard', short: 'Home', icon: LayoutDashboard },
  { to: '/library', label: 'Workout Library', short: 'Library', icon: Dumbbell },
  { to: '/workout', label: 'Live Workout', short: 'Train', icon: Timer, featured: true },
  { to: '/progress', label: 'Progress', short: 'Progress', icon: LineChart },
  { to: '/classes', label: 'Class Booking', short: 'Classes', icon: CalendarDays },
  { to: '/profile', label: 'Profile', short: 'Profile', icon: UserRound },
]
