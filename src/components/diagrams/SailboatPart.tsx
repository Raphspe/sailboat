import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SailboatPartProps {
  partId: string
  label: string
  isActive: boolean
  onHover: (partId: string | null) => void
  onClick: (partId: string) => void
  children: ReactNode
  opacity?: number
}

export default function SailboatPart({
  partId,
  label,
  isActive,
  onHover,
  onClick,
  children,
  opacity = 1,
}: SailboatPartProps) {
  return (
    <motion.g
      id={partId}
      className="svg-part"
      onMouseEnter={() => onHover(partId)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => { e.stopPropagation(); onClick(partId) }}
      style={{
        opacity,
        filter: isActive
          ? 'drop-shadow(0 0 12px rgba(14, 165, 233, 0.8)) drop-shadow(0 0 4px rgba(14, 165, 233, 0.4))'
          : 'drop-shadow(0 0 0px transparent)',
        transition: 'opacity 0.3s ease, filter 0.3s ease',
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      role="button"
      aria-label={label}
    >
      {children}
    </motion.g>
  )
}
