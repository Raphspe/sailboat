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
      {children}

      {/* Selected indicator — native SVG animation, works on all devices */}
      {isSelected && cx != null && cy != null && (
        <circle cx={cx} cy={cy} r="16" fill="none" stroke="#facc15" strokeWidth="3">
          <animate attributeName="r" values="14;22;14" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.9;0.2;0.9" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="3;1;3" dur="1.2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Hover glow — desktop only via CSS */}
      {isActive && !isSelected && (
        <circle cx={cx || 0} cy={cy || 0} r="18" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
      )}
    </motion.g>
  )
}
