import { motion } from 'framer-motion'

export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass flex flex-col items-center rounded-3xl px-6 py-14 text-center"
    >
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />
        <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-line/10 bg-line/[0.05] text-accent">
          {Icon && <Icon size={28} />}
        </div>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {message && <p className="mt-2 max-w-sm text-sm text-muted">{message}</p>}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  )
}
