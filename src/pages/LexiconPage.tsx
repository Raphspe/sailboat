import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Wind, Triangle, Ship, Cable, SlidersHorizontal, Compass, RotateCcw, MessageCircle, ChevronRight, Search, X } from 'lucide-react'
import { categories, getAllEntries } from '../data/categories'
import { useState, useMemo } from 'react'
import LexiconGrid from '../components/lexicon/LexiconGrid'

const ICON_MAP: Record<string, React.ElementType> = {
  Wind, Triangle, Ship, Cable, SlidersHorizontal, Compass, RotateCcw, MessageCircle,
}

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  ocean: { bg: 'bg-ocean-500/8', text: 'text-ocean-400' },
  cyan: { bg: 'bg-cyan-500/8', text: 'text-cyan-400' },
  seagreen: { bg: 'bg-seagreen-500/8', text: 'text-seagreen-400' },
  coral: { bg: 'bg-coral-500/8', text: 'text-coral-400' },
  amber: { bg: 'bg-amber-500/8', text: 'text-amber-400' },
  purple: { bg: 'bg-purple-500/8', text: 'text-purple-400' },
  rose: { bg: 'bg-rose-500/8', text: 'text-rose-400' },
  indigo: { bg: 'bg-indigo-500/8', text: 'text-indigo-400' },
}

function normalize(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function LexiconPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const allEntries = useMemo(() => getAllEntries(), [])

  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return null
    const q = normalize(searchQuery.trim())
    return allEntries.filter(e =>
      normalize(e.term).includes(q) ||
      e.aliases?.some(a => normalize(a).includes(q))
    )
  }, [searchQuery, allEntries])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 pt-20 pb-8 max-w-6xl mx-auto h-full flex flex-col"
    >
      {/* Header — compact */}
      <div className="text-center mb-6 flex-shrink-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          <span className="text-foam-100">Le </span>
          <span className="text-ocean-400">Lexique</span>
        </h1>
        <p className="text-foam-300/40 text-sm mb-4">
          {allEntries.length} termes · {categories.length} catégories
        </p>

        <div className="max-w-sm mx-auto relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foam-300/25" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl pl-9 pr-8 py-2.5 text-base text-foam-100 placeholder-foam-300/20 outline-none focus:border-ocean-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foam-300/30 hover:text-foam-100"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {filteredEntries ? (
        <div className="flex-1 overflow-y-auto min-h-0">
          <p className="text-foam-300/30 text-xs mb-3">
            {filteredEntries.length} résultat{filteredEntries.length !== 1 ? 's' : ''}
          </p>
          <LexiconGrid entries={filteredEntries} />
        </div>
      ) : (
        /* Categories — 4 columns, compact cards, no scroll needed */
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 content-start">
          {[...categories].sort((a, b) => a.title.localeCompare(b.title, 'fr')).map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Wind
            const colors = COLOR_MAP[cat.color] || COLOR_MAP.ocean
            return (
              <Link
                key={cat.id}
                to={`/lexique/${cat.id}`}
                className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/[0.08] rounded-2xl p-4 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ocean-500/5 active:scale-95 active:duration-100"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={22} className={colors.text} />
                </div>
                <h3 className="text-sm font-medium text-foam-100 group-hover:text-ocean-400 transition-colors mb-1">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-foam-300/30 mb-2 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>
                <div className="flex items-center gap-1 mt-auto">
                  <span className="text-[10px] text-foam-300/20">{cat.entries.length} termes</span>
                  <ChevronRight size={10} className="text-foam-300/15 group-hover:text-ocean-400/50 transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
