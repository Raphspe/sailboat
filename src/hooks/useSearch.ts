import { useState, useMemo, useEffect, useRef } from 'react';
import type { LexiconEntry } from '../data/types';

/** Strip diacritics for accent-insensitive matching */
function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

interface SearchResult {
  entry: LexiconEntry;
  score: number;
}

export function useSearch(entries: LexiconEntry[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Debounce query by 150ms
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);

    return () => clearTimeout(timerRef.current);
  }, [query]);

  const results = useMemo(() => {
    const q = normalize(debouncedQuery.trim());
    if (!q) return [];

    const scored: SearchResult[] = [];

    for (const entry of entries) {
      const term = normalize(entry.term);
      let score = 0;

      // Exact term match (highest)
      if (term === q) {
        score = 100;
      }
      // Term starts with query
      else if (term.startsWith(q)) {
        score = 80;
      }
      // Term contains query
      else if (term.includes(q)) {
        score = 60;
      }
      // Alias match
      else if (
        entry.aliases?.some((alias) => {
          const a = normalize(alias);
          return a === q || a.startsWith(q) || a.includes(q);
        })
      ) {
        score = 50;
      }
      // Definition substring
      else if (normalize(entry.definition).includes(q)) {
        score = 30;
      }
      // Short definition substring
      else if (normalize(entry.shortDefinition).includes(q)) {
        score = 25;
      }

      if (score > 0) {
        scored.push({ entry, score });
      }
    }

    // Sort by score descending, then alphabetically by term
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.entry.term.localeCompare(b.entry.term, 'fr');
    });

    return scored.map((s) => s.entry);
  }, [debouncedQuery, entries]);

  return { query, setQuery, results };
}
