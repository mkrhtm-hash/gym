import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

const STORAGE_KEY = 'youfit-theme'

function readInitialTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#07090c' : '#f3f5f7')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage unavailable — theme still works for this session */
    }
  }, [theme])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  // Chart colours can't read CSS variables reliably, so expose concrete values.
  const chart = useMemo(
    () =>
      theme === 'dark'
        ? { grid: 'rgba(255,255,255,0.06)', tick: '#94a0b0', cursor: 'rgba(255,255,255,0.04)', muted: 'rgba(255,255,255,0.08)' }
        : { grid: 'rgba(15,23,42,0.07)', tick: '#5c6675', cursor: 'rgba(15,23,42,0.04)', muted: 'rgba(15,23,42,0.08)' },
    [theme],
  )

  const value = useMemo(() => ({ theme, isDark: theme === 'dark', toggleTheme, chart }), [theme, toggleTheme, chart])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
