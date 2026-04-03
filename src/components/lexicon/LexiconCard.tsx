import { motion } from 'framer-motion'
import { Eye, Heart } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { LexiconEntry } from '../../data/types'
import { useProgress } from '../../hooks/useProgress'

interface LexiconCardProps {
  entry: LexiconEntry
  index: number
  onClick?: () => void
}

export default function LexiconCard({ entry, index, onClick }: LexiconCardProps) {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useProgress()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      role="article"
      className="glass-card p-6 cursor-pointer group relative overflow-hidden"
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Favorite heart — top-right, visible on hover */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleFavorite(entry.id) }}
        className={`absolute top-3 right-3 w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center transition-all hover:border-rose-500/20 hover:bg-rose-500/10 z-10 ${
          isFavorite(entry.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        title={isFavorite(entry.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <Heart size={12} className={isFavorite(entry.id) ? 'text-rose-400 fill-rose-400' : 'text-foam-300/30'} />
      </button>
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <h3 className="text-base font-medium text-foam-100 group-hover:text-ocean-400 transition-colors duration-200">
            {entry.term}
          </h3>
          {entry.diagramPartId && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/explorer?select=${entry.id}`)
              }}
              className="shrink-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-foam-300/30 hover:text-ocean-400 hover:border-ocean-500/20 transition-all opacity-0 group-hover:opacity-100"
              title="Voir sur le schéma"
            >
              <Eye size={12} />
            </button>
          )}
        </div>

        {entry.aliases && entry.aliases.length > 0 && (
          <p className="text-foam-300/40 text-xs mb-2">
            {entry.aliases.join(' · ')}
          </p>
        )}

        <p className="text-foam-200/70 text-sm leading-relaxed text-justify">
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
