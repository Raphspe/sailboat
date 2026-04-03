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
  cx?: number
  cy?: number
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
  return (
    <motion.g
      id={partId}
      className="svg-part"
      onMouseEnter={() => onHover(partId)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => { e.stopPropagation(); onClick(partId) }}
      style={{ opacity }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      role="button"
      aria-label={label}
    >
      {isSelected ? (
        <motion.g
          animate={{
            opacity: [1, 0.4, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            filter: 'brightness(1.5) saturate(0.3) sepia(1) hue-rotate(10deg) saturate(3) brightness(1.2)',
          }}
        >
          {children}
        </motion.g>
      ) : (
        <g style={{
          filter: isActive
            ? 'drop-shadow(0 0 10px rgba(14, 165, 233, 0.7))'
            : 'none',
          transition: 'filter 0.3s ease',
        }}>
          {children}
        </g>
      )}
    </motion.g>
  )
}
