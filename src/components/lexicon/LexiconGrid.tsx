import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { LexiconEntry } from '../../data/types'
import LexiconCard from './LexiconCard'
import LexiconDetail from './LexiconDetail'

interface LexiconGridProps {
  entries: LexiconEntry[]
}

export default function LexiconGrid({ entries }: LexiconGridProps) {
  const [selectedEntry, setSelectedEntry] = useState<LexiconEntry | null>(null)

  const sorted = useMemo(
    () => [...entries].sort((a, b) => a.term.localeCompare(b.term, 'fr')),
    [entries],
  )

  const currentIndex = selectedEntry
    ? sorted.findIndex(e => e.id === selectedEntry.id)
    : -1

  const goPrev = () => {
    if (currentIndex > 0) setSelectedEntry(sorted[currentIndex - 1])
  }

  const goNext = () => {
    if (currentIndex < sorted.length - 1) setSelectedEntry(sorted[currentIndex + 1])
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((entry, i) => (
          <LexiconCard
            key={entry.id}
            entry={entry}
            index={i}
            onClick={() => setSelectedEntry(entry)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedEntry && (
          <LexiconDetail
            entry={selectedEntry}
            onClose={() => setSelectedEntry(null)}
            onPrev={currentIndex > 0 ? goPrev : undefined}
            onNext={currentIndex < sorted.length - 1 ? goNext : undefined}
            current={currentIndex + 1}
            total={sorted.length}
          />
        )}
      </AnimatePresence>
    </>
  )
}
