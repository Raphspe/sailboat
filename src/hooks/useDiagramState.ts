import { useState, useCallback } from 'react'

export function useDiagramState() {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)
  const [selectedPart, setSelectedPart] = useState<string | null>(null)

  const handleHover = useCallback((partId: string | null) => {
    setHoveredPart(partId)
  }, [])

  const handleSelect = useCallback((partId: string) => {
    setSelectedPart(partId)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedPart(null)
  }, [])

  return {
    hoveredPart,
    selectedPart,
    handleHover,
    handleSelect,
    clearSelection,
    isActive: (partId: string) => hoveredPart === partId || selectedPart === partId,
  }
}
