import { motion } from 'framer-motion'
import type { LexiconEntry } from '../../data/types'

interface LexiconCardProps {
  entry: LexiconEntry
  index: number
  onClick?: () => void
}

export default function LexiconCard({ entry, index, onClick }: LexiconCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="glass-card p-6 cursor-pointer group relative overflow-hidden"
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <div>
        <h3 className="text-base font-medium text-foam-100 group-hover:text-ocean-400 transition-colors duration-200 mb-2.5">
          {entry.term}
        </h3>

        {entry.aliases && entry.aliases.length > 0 && (
          <p className="text-foam-300/40 text-xs mb-2">
            {entry.aliases.join(' · ')}
          </p>
        )}

        <p className="text-foam-200/70 text-sm leading-relaxed">
          {entry.shortDefinition}
        </p>

        {entry.tips && (
          <p className="text-ocean-300/40 text-xs italic mt-2.5">
            {entry.tips}
          </p>
        )}
      </div>
    </motion.div>
  )
}
