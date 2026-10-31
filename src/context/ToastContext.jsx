import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'

const ToastContext = createContext(null)

const STYLES = {
  success: { icon: CheckCircle2, color: '#c6ff3d' },
  error: { icon: TriangleAlert, color: '#ff4d8d' },
  info: { icon: Info, color: '#22d3ee' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => setToasts((all) => all.filter((t) => t.id !== id)), [])

  const toast = useCallback(
    ({ type = 'success', title, message, duration = 3600 }) => {
      const id = ++idRef.current
      setToasts((all) => [...all.slice(-2), { id, type, title, message }])
      window.setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-3 z-[100] flex flex-col items-center gap-2 px-4 sm:top-auto sm:bottom-6 sm:right-6 sm:left-auto sm:items-end"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const { icon: Icon, color } = STYLES[t.type] ?? STYLES.info
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                className="glass-strong pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl p-4 shadow-soft"
                style={{ boxShadow: `0 18px 40px -18px ${color}66` }}
                role="status"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl" style={{ background: `${color}22`, color }}>
                  <Icon className="h-4.5 w-4.5" size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold text-ink">{t.title}</p>
                  {t.message && <p className="mt-0.5 text-sm text-muted">{t.message}</p>}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="rounded-lg p-1 text-muted transition hover:bg-line/10 hover:text-ink"
                  aria-label="Dismiss notification"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
