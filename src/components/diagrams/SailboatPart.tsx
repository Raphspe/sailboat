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
  cx,
  cy,
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
      {/* Pulsing yellow circle behind selected component — visible on all devices */}
      {isSelected && cx != null && cy != null && (
        <motion.circle
          cx={cx}
          cy={cy}
          r={20}
          fill="rgba(250, 204, 21, 0.15)"
          stroke="rgba(250, 204, 21, 0.6)"
          strokeWidth={2}
          animate={{
            r: [18, 24, 18],
            opacity: [0.8, 0.3, 0.8],
            strokeWidth: [2, 1, 2],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
      {/* Hover blue glow — CSS filter works fine on desktop */}
      <g style={{
        filter: isActive && !isSelected
          ? 'drop-shadow(0 0 10px rgba(14, 165, 233, 0.7))'
          : 'none',
        transition: 'filter 0.3s ease',
      }}>
        {children}
      </g>
    </motion.g>
  )
}
