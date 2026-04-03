import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WindSector {
  id: string
  label: string
  startAngle: number
  endAngle: number
  color: string
  description: string
  forbidden?: boolean
}

const SECTORS: WindSector[] = [
  { id: 'lit-du-vent', label: 'Lit du vent', startAngle: -25, endAngle: 25, color: '#f43f5e', description: 'Zone interdite (~0-35°). Les voiles faseyent, le bateau s\'arrête. Impossible de naviguer face au vent.', forbidden: true },
  { id: 'pres-tribord', label: 'Près', startAngle: 25, endAngle: 55, color: '#0ea5e9', description: 'Allure de remontée au vent (~45°). La plus technique. On navigue au plus près du vent, voiles bien bordées.' },
  { id: 'bon-plein-tribord', label: 'Bon plein', startAngle: 55, endAngle: 75, color: '#38bdf8', description: 'Entre le près et le travers (~60°). Allure confortable avec bonne vitesse, souvent la plus rapide.' },
  { id: 'travers-tribord', label: 'Travers', startAngle: 75, endAngle: 105, color: '#7dd3fc', description: 'Vent exactement sur le côté (90°). Allure équilibrée offrant un bon compromis vitesse/confort.' },
  { id: 'largue-tribord', label: 'Largue', startAngle: 105, endAngle: 140, color: '#34d399', description: 'Vent venant de l\'arrière du travers (~120°). Allure rapide et agréable, souvent la préférée.' },
  { id: 'grand-largue-tribord', label: 'Grand largue', startAngle: 140, endAngle: 170, color: '#10b981', description: 'Vent venant de l\'arrière à ~150°. Allure rapide, on peut envoyer le spinnaker.' },
  { id: 'vent-arriere', label: 'Vent arrière', startAngle: 170, endAngle: 190, color: '#f59e0b', description: 'Le vent pousse dans le dos (180°). Allure lente sur un voilier moderne, risque d\'empannage accidentel.' },
  { id: 'grand-largue-babord', label: 'Grand largue', startAngle: 190, endAngle: 220, color: '#10b981', description: 'Vent venant de l\'arrière à ~150° côté bâbord. Même allure que tribord, amure opposée.' },
  { id: 'largue-babord', label: 'Largue', startAngle: 220, endAngle: 255, color: '#34d399', description: 'Vent de l\'arrière du travers côté bâbord (~120°). Allure rapide en amure bâbord.' },
  { id: 'travers-babord', label: 'Travers', startAngle: 255, endAngle: 285, color: '#7dd3fc', description: 'Vent sur le côté bâbord (90°). Même allure que tribord, amure opposée.' },
  { id: 'bon-plein-babord', label: 'Bon plein', startAngle: 285, endAngle: 305, color: '#38bdf8', description: 'Entre le près et le travers côté bâbord (~60°). Allure confortable.' },
  { id: 'pres-babord', label: 'Près', startAngle: 305, endAngle: 335, color: '#0ea5e9', description: 'Remontée au vent côté bâbord (~45°). Voiles bordées au maximum.' },
  { id: 'lit-du-vent-2', label: 'Lit du vent', startAngle: 335, endAngle: 360, color: '#f43f5e', description: 'Zone interdite. Impossible de naviguer directement face au vent.', forbidden: true },
]

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle)
  const end = polarToCartesian(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`
}

export default function WindDiagram({ selectedId }: { selectedId?: string | null }) {
  const [hoveredSector, setHoveredSector] = useState<WindSector | null>(null)

  // External selection from play mode (strip "wind-" prefix)
  const externalKey = selectedId?.startsWith('wind-') ? selectedId.slice(5) : null
  const externalSector = externalKey ? SECTORS.find(s => s.id.includes(externalKey)) : null
  const activeSector = hoveredSector || externalSector || null
  const cx = 200, cy = 200, r = 170

  const boatAngle = activeSector
    ? (activeSector.startAngle + activeSector.endAngle) / 2
    : 0

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-auto"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background circle */}
        <circle cx={cx} cy={cy} r={r + 5} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Sectors */}
        {SECTORS.map(sector => {
          const isActive = activeSector?.id === sector.id
          return (
            <g key={sector.id}>
              <path
                d={arcPath(cx, cy, r, sector.startAngle, sector.endAngle)}
                fill={sector.color}
                fillOpacity={isActive ? 0.4 : 0.15}
                stroke={isActive ? sector.color : 'rgba(255,255,255,0.1)'}
                strokeWidth={isActive ? 2 : 0.5}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredSector(sector)}
                onMouseLeave={() => setHoveredSector(null)}
                onClick={() => setHoveredSector(sector)}
              />
              {/* Sector label */}
              {(() => {
                const midAngle = (sector.startAngle + sector.endAngle) / 2
                const labelR = r * 0.65
                const pos = polarToCartesian(cx, cy, labelR, midAngle)
                const span = sector.endAngle - sector.startAngle
                if (span < 30) return null
                return (
                  <text
                    x={pos.x}
                    y={pos.y}
                    fill={isActive ? '#fff' : 'rgba(255,255,255,0.6)'}
                    fontSize={isActive ? '10' : '8'}
                    fontFamily="Inter, sans-serif"
                    fontWeight={isActive ? '600' : '400'}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none transition-all duration-200"
                  >
                    {sector.label}
                  </text>
                )
              })()}
            </g>
          )
        })}

        {/* Center boat silhouette */}
        <motion.g
          animate={{ rotate: boatAngle }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          {/* Boat hull top view */}
          <path
            d={`M ${cx} ${cy - 25} Q ${cx + 8} ${cy - 20} ${cx + 6} ${cy + 15} Q ${cx} ${cy + 25} ${cx - 6} ${cy + 15} Q ${cx - 8} ${cy - 20} ${cx} ${cy - 25} Z`}
            fill="#1e2d4a"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          {/* Mast dot */}
          <circle cx={cx} cy={cy - 5} r="2" fill="#38bdf8" />
        </motion.g>

        {/* Wind arrow from top */}
        <defs>
          <marker id="wind-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#7dd3fc" />
          </marker>
        </defs>
        <line x1={cx} y1="18" x2={cx} y2="35" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#wind-arrow)" />
        <text x={cx} y="15" fill="#7dd3fc" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600">VENT</text>

        {/* Angle markers */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
          const pos = polarToCartesian(cx, cy, r + 15, angle)
          return (
            <text
              key={angle}
              x={pos.x}
              y={pos.y}
              fill="rgba(255,255,255,0.25)"
              fontSize="8"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {angle}°
            </text>
          )
        })}

        {/* Forbidden zone hatching */}
        <defs>
          <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(244,63,94,0.3)" strokeWidth="1" />
          </pattern>
        </defs>
        <path
          d={arcPath(cx, cy, r * 0.4, -25, 25)}
          fill="url(#hatch)"
          className="pointer-events-none"
        />
        <path
          d={arcPath(cx, cy, r * 0.4, 335, 360)}
          fill="url(#hatch)"
          className="pointer-events-none"
        />
      </motion.svg>

      {/* Info card */}
      <AnimatePresence>
        {activeSector && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass rounded-xl p-4 mt-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeSector.color }} />
              <h4 className="text-ocean-400 font-semibold">{activeSector.label}</h4>
              {activeSector.forbidden && (
                <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full">Zone interdite</span>
              )}
            </div>
            <p className="text-foam-200 text-sm leading-relaxed">{activeSector.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-foam-300 text-sm mt-4 opacity-60">
        Survolez les secteurs pour découvrir chaque allure
      </p>
    </div>
  )
}
