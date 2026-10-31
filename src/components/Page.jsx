import { useEffect } from 'react'
import { motion } from 'framer-motion'

// Wraps every screen for a consistent fade-in and sets the tab title.
export default function Page({ title, children, className = '' }) {
  useEffect(() => {
    document.title = title ? `${title} · YouFit` : 'YouFit — Train smarter. Get stronger.'
    window.scrollTo({ top: 0 })
  }, [title])

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
