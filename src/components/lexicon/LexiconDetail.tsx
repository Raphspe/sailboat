import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { LexiconEntry } from '../../data/types'
import { useEffect } from 'react'
import ImagePreview from '../ui/ImagePreview'
import { getAllEntries } from '../../data/categories'

const allEntries = getAllEntries()

function formatTermName(id: string): string {
  const entry = allEntries.find(e => e.id === id) || allEntries.find(e => e.id.includes(id) || id.includes(e.id))
  if (entry) return entry.term
  return id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

interface LexiconDetailProps {
  entry: LexiconEntry
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  current?: number
  total?: number
}

export default function LexiconDetail({ entry, onClose, onPrev, onNext, current, total }: LexiconDetailProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="relative z-10 w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-navy-800/60 backdrop-blur-2xl border border-white/8 rounded-3xl p-8 shadow-2xl shadow-black/30">
          {/* Top right: nav arrows + close */}
          <div className="absolute top-5 right-5 flex items-center gap-1.5">
            {(onPrev || onNext) && (
              <>
                <button
                  onClick={onPrev}
                  disabled={!onPrev}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-navy-700/60 border border-white/10 text-foam-300 hover:text-ocean-400 hover:border-ocean-500/20 disabled:opacity-20 disabled:cursor-default transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
                {current != null && total != null && (
                  <span className="text-[10px] text-foam-300/30 tabular-nums min-w-[2rem] text-center">
                    {current}/{total}
                  </span>
                )}
                <button
                  onClick={onNext}
                  disabled={!onNext}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-navy-700/60 border border-white/10 text-foam-300 hover:text-ocean-400 hover:border-ocean-500/20 disabled:opacity-20 disabled:cursor-default transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-navy-700/60 border border-white/10 text-foam-300 hover:text-foam-100 hover:bg-navy-600/60 transition-all"
            >
              <X size={14} />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-ocean-400 mb-1 pr-36" style={{ fontFamily: 'var(--font-display)' }}>
            {entry.term}
          </h2>

          {entry.aliases && entry.aliases.length > 0 && (
            <p className="text-foam-300/50 text-sm mb-5">
              Aussi : {entry.aliases.join(', ')}
            </p>
          )}

          <p className="text-foam-200 leading-relaxed mb-5 text-[15px] text-justify">
            {entry.definition}
          </p>

          {entry.tips && (
            <div className="bg-ocean-500/8 border border-ocean-500/15 rounded-2xl p-4 mb-5">
              <p className="text-ocean-300 text-sm leading-relaxed">
                <span className="font-semibold">Conseil : </span>
                {entry.tips}
              </p>
            </div>
          )}

          {entry.relatedTerms && entry.relatedTerms.length > 0 && (
            <div className="pt-4 border-t border-white/5">
              <p className="text-foam-300/40 text-xs mb-2.5">Termes liés</p>
              <div className="flex flex-wrap gap-2">
                {[...new Set(entry.relatedTerms.map(t => {
                  const linked = allEntries.find(e => e.id === t) || allEntries.find(e => e.id.includes(t) || t.includes(e.id))
                  return linked?.id || t
                }))].map(t => (
                  <span key={t} className="text-xs bg-navy-700/60 text-foam-200 px-3 py-1.5 rounded-full border border-white/5">
                    {formatTermName(t)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Image preview */}
          <div className="mt-4">
            <ImagePreview term={entry.term} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
