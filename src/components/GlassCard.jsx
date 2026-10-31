import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, delay = 0, as = 'div', ...rest }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.25 } } : undefined}
      className={`glass relative overflow-hidden rounded-3xl ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  )
}
