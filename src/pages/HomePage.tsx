import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Triangle, Ship, Cable, SlidersHorizontal, Compass, RotateCcw, MessageCircle, ChevronRight, ChevronLeft, X, ArrowLeft, Play, Eye, List, Search } from 'lucide-react'
import SailboatDiagram from '../components/diagrams/SailboatDiagram'
import { useMediaQuery } from '../hooks/useMediaQuery'
import ImagePreview from '../components/ui/ImagePreview'
import WindDiagram from '../components/diagrams/WindDiagram'
import SailTrimDiagram from '../components/diagrams/SailTrimDiagram'
import NavigationDiagram from '../components/diagrams/NavigationDiagram'
import ManeuverDiagram from '../components/diagrams/ManeuverDiagram'
import ExpressionsDiagram from '../components/diagrams/ExpressionsDiagram'
import { categories, getAllEntries } from '../data/categories'
import type { LexiconEntry } from '../data/types'

const ICON_MAP: Record<string, React.ElementType> = {
  Wind, Triangle, Ship, Cable, SlidersHorizontal, Compass, RotateCcw, MessageCircle,
}

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  ocean: { bg: 'bg-ocean-500/10', text: 'text-ocean-400' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  seagreen: { bg: 'bg-seagreen-500/10', text: 'text-seagreen-400' },
  coral: { bg: 'bg-coral-500/10', text: 'text-coral-400' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400' },
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
}

function normalize(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

type PanelView = 'categories' | 'category' | 'detail'

interface SelectedPart {
  id: string
  label: string
  shortDef: string
  definition: string
}

export default function HomePage() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [panelView, setPanelView] = useState<PanelView>('categories')
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<LexiconEntry | null>(null)
  const [selectedPartFromDiagram, setSelectedPartFromDiagram] = useState<SelectedPart | null>(null)
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileTab, setMobileTab] = useState<'diagram' | 'lexicon'>('lexicon')
  const panelRef = useRef<HTMLDivElement>(null)
  const [lockedHeight, setLockedHeight] = useState<number | null>(null)

  // Capture panel height when on categories view, lock it for other views
  useEffect(() => {
    if (panelView === 'categories' && panelRef.current) {
      setLockedHeight(panelRef.current.offsetHeight)
    }
  }, [panelView])
  const allEntries = useMemo(() => getAllEntries(), [])

  const activeCategory = activeCategoryId
    ? categories.find(c => c.id === activeCategoryId)
    : null

  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return null
    const q = normalize(searchQuery)
    return allEntries.filter(e =>
      normalize(e.term).includes(q) ||
      normalize(e.shortDefinition).includes(q) ||
      e.aliases?.some(a => normalize(a).includes(q))
    )
  }, [searchQuery, allEntries])

  const handleDiagramPartSelect = (part: { id: string; label: string; shortDef: string; definition: string }) => {
    // Find the entry with this diagramPartId and open it
    const entry = allEntries.find(e => e.diagramPartId === part.id)
    if (entry) {
      setSelectedPartFromDiagram(null)
      setSelectedEntry(entry)
      if (!activeCategoryId || entry.category !== activeCategoryId) {
        setActiveCategoryId(entry.category)
      }
      setPanelView('detail')
    } else {
      setSelectedPartFromDiagram(part)
    }
  }

  const openCategory = (catId: string) => {
    setActiveCategoryId(catId)
    setPanelView('category')
    setSelectedEntry(null)
    setSearchQuery('')
  }

  const openEntry = (entry: LexiconEntry) => {
    setSelectedEntry(entry)
    setSelectedPartFromDiagram(null)
    setPanelView('detail')
    if (!activeCategoryId || entry.category !== activeCategoryId) {
      setActiveCategoryId(entry.category)
    }
  }

  const goBack = () => {
    if (panelView === 'detail') {
      setPanelView('category')
      setSelectedEntry(null)
    } else {
      setPanelView('categories')
      setActiveCategoryId(null)
      setSearchQuery('')
    }
  }

  // Play mode: works on category entries if in a category, or ALL entries globally
  const playEntries = useMemo(() => {
    const entries = activeCategory ? activeCategory.entries : allEntries
    return [...entries].sort((a, b) => a.term.localeCompare(b.term, 'fr'))
  }, [activeCategory, allEntries])

  const currentEntryIndex = selectedEntry
    ? playEntries.findIndex(e => e.id === selectedEntry.id)
    : -1

  const goToEntry = (index: number) => {
    const entry = playEntries[index]
    if (entry) {
      setSelectedEntry(entry)
      setSelectedPartFromDiagram(null)
      setPanelView('detail')
      // Auto-select the entry's category so the diagram matches
      if (!activeCategoryId || entry.category !== activeCategoryId) {
        setActiveCategoryId(entry.category)
      }
    }
  }

  const goPrev = () => {
    if (currentEntryIndex > 0) goToEntry(currentEntryIndex - 1)
  }

  const goNext = () => {
    if (currentEntryIndex < playEntries.length - 1) goToEntry(currentEntryIndex + 1)
  }

  const startPlay = () => {
    if (playEntries.length > 0) {
      goToEntry(0)
    }
  }

  // The part to highlight on the diagram — from entry hover/select OR from diagram click
  const diagramHighlightId = hoveredPartId
    || selectedEntry?.diagramPartId
    || selectedPartFromDiagram?.id
    || null

  const centered = (el: React.ReactNode) => (
    <div className="w-full h-full flex items-center justify-center">{el}</div>
  )

  const renderDiagram = () => {
    switch (activeCategoryId) {
      case 'allures':
        return centered(<WindDiagram key={`wind-${diagramHighlightId}`} selectedId={diagramHighlightId} />)
      case 'reglage':
        return centered(<SailTrimDiagram key={`trim-${diagramHighlightId}`} selectedId={diagramHighlightId} />)
      case 'navigation':
        return centered(<NavigationDiagram key={`nav-${diagramHighlightId}`} selectedId={diagramHighlightId} />)
      case 'manoeuvres-fondamentales':
        return centered(<ManeuverDiagram key={`mnv-${diagramHighlightId}`} selectedId={diagramHighlightId} />)
      case 'expressions':
        return centered(<ExpressionsDiagram key={`expr-${diagramHighlightId}`} selectedId={diagramHighlightId} />)
      case 'voiles':
        return (
          <SailboatDiagram
            key={`boat-${diagramHighlightId}`}
            onPartSelect={handleDiagramPartSelect}
            selectedPartId={diagramHighlightId}
            enableZoom={isDesktop}
            filter="voiles"
          />
        )
      case 'manoeuvres':
        return (
          <SailboatDiagram
            key={`boat-${diagramHighlightId}`}
            onPartSelect={handleDiagramPartSelect}
            selectedPartId={diagramHighlightId}
            enableZoom={isDesktop}
            filter="cordages"
          />
        )
      case 'anatomie':
        return (
          <SailboatDiagram
            key={`boat-${diagramHighlightId}`}
            onPartSelect={handleDiagramPartSelect}
            selectedPartId={diagramHighlightId}
            enableZoom={isDesktop}
          />
        )
      default:
        return (
          <SailboatDiagram
            key={`boat-${diagramHighlightId}`}
            onPartSelect={handleDiagramPartSelect}
            selectedPartId={diagramHighlightId}
            enableZoom={isDesktop}
          />
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[calc(100svh-4rem)] relative overflow-hidden"
    >
      {/* === FULL SCREEN: Dynamic Diagram === */}
      <div
        className={`absolute inset-0 flex items-center justify-center ${mobileTab === 'lexicon' ? 'hidden lg:flex' : ''}`}
        onClick={() => {
          setSelectedEntry(null)
          setSelectedPartFromDiagram(null)
          if (panelView === 'detail') setPanelView(activeCategoryId ? 'category' : 'categories')
        }}
      >
        <div className="w-full h-full p-2">
          <div className="w-full h-full">
            {renderDiagram()}
          </div>
        </div>
      </div>

      {/* === FLOATING LEXICON PANEL === */}
      <div
        className={`absolute inset-x-0 bottom-16 lg:inset-x-auto lg:bottom-auto lg:right-16 lg:w-[440px] lg:max-h-[calc(100%-2rem)] z-20 transition-opacity duration-300 lexicon-panel ${mobileTab === 'diagram' ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto' : ''}`}
      >
        <div
          ref={panelRef}
          className="flex flex-col overflow-hidden h-full lg:h-auto lg:rounded-3xl"
          style={{
            height: lockedHeight || undefined,
            maxHeight: 'calc(100svh - 6rem)',
          }}
          data-panel="lexicon"
        >

        {/* Panel Header */}
        <div className="flex-shrink-0 px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-2 lg:mb-4">
            {searchOpen ? (
              <motion.div
                initial={{ width: 100 }}
                animate={{ width: '100%' }}
                className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5"
              >
                <Search size={13} className="text-foam-300/30 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="flex-1 bg-transparent text-sm text-foam-100 placeholder-foam-300/20 outline-none min-w-0"
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                  className="text-foam-300/30 hover:text-foam-100 shrink-0"
                >
                  <X size={13} />
                </button>
              </motion.div>
            ) : panelView !== 'categories' ? (
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={goBack}
                className="flex items-center gap-2 text-foam-300/70 hover:text-ocean-400 transition-all text-sm group"
              >
                <span className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-ocean-500/10 group-hover:border-ocean-500/20 transition-all">
                  <ArrowLeft size={13} />
                </span>
                <span>Retour</span>
              </motion.button>
            ) : (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-foam-100"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Catégories
              </motion.h2>
            )}
            <div className="flex items-center gap-2">
              {panelView === 'categories' && !searchOpen && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-7 h-7 flex items-center justify-center text-foam-300/40 hover:text-ocean-400 transition-colors rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-ocean-500/20"
                >
                  <Search size={12} />
                </button>
              )}
              {panelView === 'category' && (
                <button
                  onClick={startPlay}
                  className="w-7 h-7 flex items-center justify-center text-ocean-400/70 hover:text-ocean-400 transition-colors rounded-full bg-ocean-500/8 border border-ocean-500/10 hover:border-ocean-500/20"
                >
                  <Play size={11} fill="currentColor" />
                </button>
              )}
              {panelView === 'detail' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={goPrev}
                    disabled={currentEntryIndex <= 0}
                    className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-foam-300/40 hover:text-ocean-400 hover:border-ocean-500/20 disabled:opacity-20 disabled:cursor-default transition-all"
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <span className="text-[10px] text-foam-300/25 tabular-nums w-12 text-center">
                    {currentEntryIndex + 1}/{playEntries.length}
                  </span>
                  <button
                    onClick={goNext}
                    disabled={currentEntryIndex >= playEntries.length - 1}
                    className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-foam-300/40 hover:text-ocean-400 hover:border-ocean-500/20 disabled:opacity-20 disabled:cursor-default transition-all"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Diagram selection card */}
        <AnimatePresence>
          {selectedPartFromDiagram && panelView === 'categories' && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="flex-shrink-0 px-5 pb-3 overflow-hidden"
            >
              <div className="bg-ocean-500/[0.06] border border-ocean-500/10 rounded-2xl p-4 relative">
                <button
                  onClick={() => setSelectedPartFromDiagram(null)}
                  className="absolute top-3 right-3 text-foam-300/25 hover:text-foam-100 transition-colors"
                >
                  <X size={12} />
                </button>
                <h4 className="text-ocean-400 font-medium text-sm">{selectedPartFromDiagram.label}</h4>
                <p className="text-foam-200/60 text-xs leading-relaxed mt-1.5">{selectedPartFromDiagram.shortDef}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable content */}
        <div className={`flex-1 px-5 pb-10 min-h-0 ${panelView === 'categories' ? 'overflow-hidden lg:overflow-hidden overflow-y-auto' : 'overflow-y-auto'} scrollbar-none`}>
          <AnimatePresence mode="wait">
            {/* Search results */}
            {filteredEntries ? (
              <motion.div
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-foam-300/30 text-xs mb-3">
                  {filteredEntries.length} résultat{filteredEntries.length !== 1 ? 's' : ''}
                </p>
                <div className="space-y-1.5">
                  {[...filteredEntries].sort((a, b) => a.term.localeCompare(b.term, 'fr')).map((entry, i) => (
                    <EntryRow key={entry.id} entry={entry} index={i} onClick={() => {
                      setSearchOpen(false)
                      setSearchQuery('')
                      setActiveCategoryId(entry.category)
                      openEntry(entry)
                    }} onHover={setHoveredPartId} />
                  ))}
                  {filteredEntries.length === 0 && (
                    <p className="text-foam-300/20 text-sm text-center py-12">Aucun résultat</p>
                  )}
                </div>
              </motion.div>
            ) : panelView === 'categories' ? (
              <motion.div
                key="cats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-1.5"
              >
                {[...categories].sort((a, b) => a.title.localeCompare(b.title, 'fr')).map((cat) => {
                  const Icon = ICON_MAP[cat.icon] || Wind
                  const colors = COLOR_MAP[cat.color] || COLOR_MAP.ocean
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => openCategory(cat.id)}
                      className="w-full text-left bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/[0.08] rounded-2xl p-4 flex items-center gap-3.5 group transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                        <Icon size={16} className={colors.text} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foam-100 group-hover:text-ocean-400 transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-foam-300/30 truncate mt-0.5">{cat.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] text-foam-300/20 tabular-nums">
                          {cat.entries.length}
                        </span>
                        <ChevronRight size={13} className="text-foam-300/15 group-hover:text-ocean-400/60 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </motion.button>
                  )
                })}
              </motion.div>
            ) : panelView === 'category' && activeCategory ? (
              <motion.div
                key={`cat-${activeCategoryId}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="mb-5">
                  <motion.h3
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="text-lg font-bold text-foam-100"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {activeCategory.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-[11px] text-foam-300/30 mt-1 leading-relaxed"
                  >
                    {activeCategory.description}
                  </motion.p>
                </div>
                <div className="space-y-1.5">
                  {[...activeCategory.entries].sort((a, b) => a.term.localeCompare(b.term, 'fr')).map((entry, i) => (
                    <EntryRow key={entry.id} entry={entry} index={i} onClick={() => openEntry(entry)} onHover={setHoveredPartId} />
                  ))}
                </div>
              </motion.div>
            ) : panelView === 'detail' && selectedEntry ? (
              <motion.div
                key={`detail-${selectedEntry.id}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="space-y-5"
              >
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <h3 className="text-2xl font-bold text-ocean-400" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedEntry.term}
                  </h3>
                  {selectedEntry.aliases && selectedEntry.aliases.length > 0 && (
                    <p className="text-foam-300/30 text-xs mt-1">
                      {selectedEntry.aliases.join(' · ')}
                    </p>
                  )}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-foam-200/70 text-[14px] leading-relaxed"
                >
                  {selectedEntry.definition}
                </motion.p>

                {selectedEntry.tips && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-ocean-500/[0.05] border border-ocean-500/10 rounded-2xl p-4"
                  >
                    <p className="text-ocean-300/70 text-xs leading-relaxed">
                      <span className="font-medium text-ocean-400/80">Conseil</span>
                      <span className="mx-1.5 text-ocean-400/20">—</span>
                      {selectedEntry.tips}
                    </p>
                  </motion.div>
                )}

                {selectedEntry.relatedTerms && selectedEntry.relatedTerms.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-foam-300/20 text-[10px] uppercase tracking-widest mb-2">Termes liés</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(() => {
                        const seen = new Set<string>()
                        return selectedEntry.relatedTerms!.map(t => {
                        const linked = allEntries.find(e => e.id === t) || allEntries.find(e => e.id.includes(t) || t.includes(e.id))
                        const key = linked?.id || t
                        if (seen.has(key)) return null
                        seen.add(key)
                        const displayName = linked ? linked.term : t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                        return linked ? (
                          <button
                            key={t}
                            onClick={() => {
                              setActiveCategoryId(linked.category)
                              openEntry(linked)
                            }}
                            className="text-[11px] font-medium bg-white/[0.03] text-foam-200/60 hover:text-ocean-400 hover:border-ocean-500/20 px-3 py-1.5 rounded-full border border-white/[0.05] transition-colors cursor-pointer capitalize"
                          >
                            {displayName}
                          </button>
                        ) : (
                          <span key={t} className="text-[11px] font-medium bg-white/[0.03] text-foam-200/30 px-3 py-1.5 rounded-full border border-white/[0.05] capitalize">
                            {displayName}
                          </span>
                        )
                      })
                      })()}
                    </div>
                  </motion.div>
                )}

                {/* Image preview */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <ImagePreview term={selectedEntry.term} />
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        </div>
      </div>

      {/* === MOBILE TAB BAR === */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
        <div className="flex mx-4 mb-4 rounded-2xl overflow-hidden" style={{
          background: 'rgba(3, 13, 26, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <button
            onClick={() => setMobileTab('diagram')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors relative ${
              mobileTab === 'diagram' ? 'text-ocean-400 bg-ocean-500/10' : 'text-foam-300/40'
            }`}
          >
            <Eye size={15} />
            Schéma
            {diagramHighlightId && mobileTab === 'lexicon' && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setMobileTab('lexicon')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors ${
              mobileTab === 'lexicon' ? 'text-ocean-400 bg-ocean-500/10' : 'text-foam-300/40'
            }`}
          >
            <List size={15} />
            Lexique
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* Compact entry row */
function EntryRow({ entry, onClick, onHover }: { entry: LexiconEntry; index: number; onClick: () => void; onHover?: (partId: string | null) => void }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover?.(entry.diagramPartId || null)}
      onMouseLeave={() => onHover?.(null)}
      className="w-full text-left bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.03] hover:border-white/[0.07] rounded-2xl p-3.5 px-4 group transition-all duration-200 flex items-start gap-3 hover:translate-x-1 active:scale-[0.98]"
    >
      <div className="flex-1 min-w-0">
        <h4 className="text-[13px] font-medium text-foam-100/80 group-hover:text-ocean-400 transition-colors truncate">
          {entry.term}
          {entry.aliases && entry.aliases.length > 0 && (
            <span className="text-foam-300/15 font-normal ml-1.5 text-[10px]">{entry.aliases[0]}</span>
          )}
        </h4>
        <p className="text-[11px] text-foam-300/25 mt-0.5 line-clamp-1 leading-relaxed">{entry.shortDefinition}</p>
      </div>
      <ChevronRight size={11} className="text-foam-300/10 group-hover:text-ocean-400/50 group-hover:translate-x-0.5 transition-all mt-1.5 flex-shrink-0" />
    </button>
  )
}
