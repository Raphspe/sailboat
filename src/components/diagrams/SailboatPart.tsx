import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SailboatPartProps {
  partId: string
  label: string
  isActive: boolean
  isSelected?: boolean
  onHover: (partId: string | null) => void
  onClick: (partId: string) => void
  children: ReactNode
  opacity?: number
}

export default function SailboatPart({
  partId,
  label,
  isActive,
  isSelected = false,
  onHover,
  onClick,
  children,
  opacity = 1,
}: SailboatPartProps) {
  const selectedGlow = {
    filter: [
      'drop-shadow(0 0 14px rgba(250, 204, 21, 0.9)) drop-shadow(0 0 5px rgba(250, 204, 21, 0.5))',
      'drop-shadow(0 0 5px rgba(250, 204, 21, 0.3)) drop-shadow(0 0 2px rgba(250, 204, 21, 0.15))',
      'drop-shadow(0 0 14px rgba(250, 204, 21, 0.9)) drop-shadow(0 0 5px rgba(250, 204, 21, 0.5))',
    ],
  }

  const hoverGlow = {
    filter: 'drop-shadow(0 0 12px rgba(14, 165, 233, 0.8)) drop-shadow(0 0 4px rgba(14, 165, 233, 0.4))',
  }

  const noGlow = {
    filter: 'drop-shadow(0 0 0px transparent)',
  }

  return (
    <motion.g
      id={partId}
      className="svg-part"
      onMouseEnter={() => onHover(partId)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => { e.stopPropagation(); onClick(partId) }}
      style={{ opacity }}
      animate={isSelected ? selectedGlow : isActive ? hoverGlow : noGlow}
      transition={isSelected ? {
        filter: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
      } : {
        filter: { duration: 0.3 },
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      role="button"
      aria-label={label}
    >
      {children}
    </motion.g>
  )
}
