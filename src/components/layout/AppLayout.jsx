import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import MobileTopBar from './MobileTopBar'
import ErrorBoundary from '../ErrorBoundary'

export default function AppLayout() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen">
      <Sidebar />
      <MobileTopBar />
      <main className="px-4 pb-32 pt-2 sm:px-6 lg:pl-80 lg:pr-8 lg:pt-8 lg:pb-12">
        <div className="mx-auto max-w-6xl">
          {/* key resets the boundary when navigating away from a crashed screen */}
          <ErrorBoundary key={pathname}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
