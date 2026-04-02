import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import type { LexiconEntry } from '../../data/types';
import { cn } from '../../lib/cn';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LexiconEntry[];
}

/** Map category IDs to display labels */
const categoryLabels: Record<string, string> = {
  allures: 'Allures',
  voiles: 'Voiles',
  anatomie: 'Anatomie',
  manoeuvres: 'Manoeuvres',
  reglage: 'Reglage',
  navigation: 'Navigation',
  'manoeuvres-fondamentales': 'Fondamentales',
  expressions: 'Expressions',
};

/** Map categories to badge color classes */
const categoryColors: Record<string, string> = {
  allures: 'bg-ocean-500/20 text-ocean-400',
  voiles: 'bg-coral-500/20 text-coral-400',
  anatomie: 'bg-seagreen-500/20 text-seagreen-400',
  manoeuvres: 'bg-amber-500/20 text-amber-400',
  reglage: 'bg-purple-500/20 text-purple-400',
  navigation: 'bg-rose-500/20 text-rose-400',
  'manoeuvres-fondamentales': 'bg-ocean-400/20 text-ocean-300',
  expressions: 'bg-coral-400/20 text-coral-400',
};

export default function SearchBar({ isOpen, onClose, entries }: SearchBarProps) {
  const { query, setQuery, results } = useSearch(entries);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when opened, reset when closed
  useEffect(() => {
    if (isOpen) {
      // Small delay for animation
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
      };
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
  }, [isOpen, setQuery]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleResultClick = (entry: LexiconEntry) => {
    onClose();
    navigate(`/lexique/${entry.category}`);
  };

  // Group results by category
  const grouped = results.reduce<Record<string, LexiconEntry[]>>(
    (acc, entry) => {
      const cat = entry.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(entry);
      return acc;
    },
    {},
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Search container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass relative z-10 mx-4 w-full max-w-2xl overflow-hidden rounded-3xl"
          >
            {/* Input area */}
            <div className="flex items-center gap-3 border-b border-white/5 px-6 py-5">
              <Search className="h-6 w-6 shrink-0 text-foam-300/60" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un terme..."
                className="flex-1 bg-transparent text-xl text-foam-100 outline-none placeholder:text-foam-300/40"
              />
              <kbd className="hidden shrink-0 rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-sans text-[10px] font-medium tracking-wide text-foam-300/50 sm:inline-block">
                ESC
              </kbd>
              <button
                onClick={onClose}
                aria-label="Fermer la recherche"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-foam-300 transition-all hover:bg-white/10 hover:text-foam-100 sm:hidden"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto px-3 py-3">
              {query.trim() && results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-foam-300/50">
                  Aucun resultat pour &laquo;&nbsp;{query}&nbsp;&raquo;
                </p>
              )}

              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foam-300/40">
                    {categoryLabels[category] ?? category}
                  </p>
                  {items.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => handleResultClick(entry)}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:bg-white/6 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-foam-100">
                          {entry.term}
                        </span>
                        <span className="block truncate text-xs text-foam-300/60">
                          {entry.shortDefinition}
                        </span>
                      </div>
                      <span
                        className={cn(
                          'shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                          categoryColors[category] ?? 'bg-white/10 text-foam-300',
                        )}
                      >
                        {categoryLabels[category] ?? category}
                      </span>
                    </button>
                  ))}
                </div>
              ))}

              {!query.trim() && (
                <p className="px-4 py-8 text-center text-sm text-foam-300/40">
                  Tapez pour rechercher dans le lexique...
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
