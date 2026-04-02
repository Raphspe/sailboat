import { motion, AnimatePresence } from 'framer-motion'

interface DiagramTooltipProps {
  label: string
  definition: string
  isVisible: boolean
  x: number
  y: number
}

export default function DiagramTooltip({ label, definition, isVisible, x, y }: DiagramTooltipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 pointer-events-none"
          style={{ left: x, top: y, transform: 'translate(-50%, -100%) translateY(-12px)' }}
        >
          <div className="glass rounded-xl px-4 py-3 max-w-xs">
            <p className="text-ocean-400 font-semibold text-sm mb-1">{label}</p>
            <p className="text-foam-200 text-xs leading-relaxed">{definition}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
