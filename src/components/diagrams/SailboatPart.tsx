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
      style={{ opacity }}
      animate={isActive ? {
        filter: [
          'drop-shadow(0 0 12px rgba(14, 165, 233, 0.8)) drop-shadow(0 0 4px rgba(14, 165, 233, 0.4))',
          'drop-shadow(0 0 5px rgba(14, 165, 233, 0.25)) drop-shadow(0 0 2px rgba(14, 165, 233, 0.1))',
          'drop-shadow(0 0 12px rgba(14, 165, 233, 0.8)) drop-shadow(0 0 4px rgba(14, 165, 233, 0.4))',
        ],
      } : {
        filter: 'drop-shadow(0 0 0px transparent)',
      }}
      transition={isActive ? {
        filter: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
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
