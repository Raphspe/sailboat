import { useState, useCallback, useMemo } from 'react'
import { categories } from '../data/categories'

const STORAGE_KEY = 'sailboat-progress'

interface ProgressData {
  learned: string[]
  favorites: string[]
  quizScores: number[]
}

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        learned: Array.isArray(parsed.learned) ? parsed.learned : [],
        favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
        quizScores: Array.isArray(parsed.quizScores) ? parsed.quizScores : [],
      }
    }
  } catch {
    // ignore parse errors
  }
  return { learned: [], favorites: [], quizScores: [] }
}

function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore quota errors
  }
}

export function useProgress() {
  const [data, setData] = useState<ProgressData>(loadProgress)

  const learned = useMemo(() => new Set(data.learned), [data.learned])
  const favorites = useMemo(() => new Set(data.favorites), [data.favorites])

  const update = useCallback((updater: (prev: ProgressData) => ProgressData) => {
    setData(prev => {
      const next = updater(prev)
      saveProgress(next)
      return next
    })
  }, [])

  const isLearned = useCallback((id: string) => learned.has(id), [learned])

  const toggleLearned = useCallback((id: string) => {
    update(prev => {
      const set = new Set(prev.learned)
      if (set.has(id)) set.delete(id)
      else set.add(id)
      return { ...prev, learned: Array.from(set) }
    })
  }, [update])

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites])

  const toggleFavorite = useCallback((id: string) => {
    update(prev => {
      const set = new Set(prev.favorites)
      if (set.has(id)) set.delete(id)
      else set.add(id)
      return { ...prev, favorites: Array.from(set) }
    })
  }, [update])

  const learnedCount = learned.size
  const favoriteCount = favorites.size

  const learnedByCategory = useCallback((categoryId: string): number => {
    const cat = categories.find(c => c.id === categoryId)
    if (!cat) return 0
    return cat.entries.filter(e => learned.has(e.id)).length
  }, [learned])

  const addQuizScore = useCallback((score: number) => {
    update(prev => ({
      ...prev,
      quizScores: [...prev.quizScores, score],
    }))
  }, [update])

  const bestQuizScore = useMemo(() => {
    if (data.quizScores.length === 0) return 0
    return Math.max(...data.quizScores)
  }, [data.quizScores])

  return {
    isLearned,
    toggleLearned,
    isFavorite,
    toggleFavorite,
    learnedCount,
    favoriteCount,
    learnedByCategory,
    addQuizScore,
    bestQuizScore,
  }
}
