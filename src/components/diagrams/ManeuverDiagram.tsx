import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ManeuverDiagramProps {
  onManeuverSelect?: (maneuver: { id: string; label: string; description: string }) => void
  selectedId?: string | null
}

interface Maneuver {
  id: string
  label: string
  subtitle: string
  description: string
  color: string
}

const MANEUVERS: Maneuver[] = [
  {
    id: 'virement',
    label: 'Virement de bord',
    subtitle: 'Tack',
    description:
      "Changer d\u2019amure en passant face au vent. La man\u0153uvre la plus courante pour remonter au vent.",
    color: '#38bdf8',
  },
  {
    id: 'empannage',
    label: 'Empannage',
    subtitle: 'Jibe',
    description:
      "Changer d\u2019amure par l\u2019arri\u00e8re. Plus dangereux \u2014 la b\u00f4me passe violemment.",
    color: '#f59e0b',
  },
  {
    id: 'louvoyer',
    label: 'Louvoyer',
    subtitle: 'Beat to windward',
    description:
      "Zigzaguer en tirant des bords pour remonter vers un objectif situ\u00e9 dans le vent.",
    color: '#34d399',
  },
]

/* ── tiny top-down boat silhouette (centered on 0,0) ── */
function Boat({
  x,
  y,
  rotation,
  highlight = false,
  warn = false,
}: {
  x: number
  y: number
  rotation: number
  highlight?: boolean
  warn?: boolean
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      <path
        d="M 0 -8 Q 3 -5 2.5 5 Q 0 8 -2.5 5 Q -3 -5 0 -8 Z"
        fill={warn ? '#f59e0b' : '#1e2d4a'}
        stroke={highlight ? '#7dd3fc' : '#38bdf8'}
        strokeWidth="1"
      />
      {/* mast dot */}
      <circle cx="0" cy="-2" r="1" fill={highlight ? '#7dd3fc' : '#38bdf8'} />
      {warn && (
        <circle
          cx="0"
          cy="0"
          r="10"
          fill="#f59e0b"
          fillOpacity="0.15"
          className="pointer-events-none"
        />
      )}
    </g>
  )
}

/* ── wind arrow at the top ── */
function WindArrow() {
  return (
    <g>
      <defs>
        <marker
          id="mnv-wind-arrow"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#7dd3fc" />
        </marker>
      </defs>
      <line
        x1="250"
        y1="8"
        x2="250"
        y2="38"
        stroke="#7dd3fc"
        strokeWidth="2"
        markerEnd="url(#mnv-wind-arrow)"
        opacity="0.6"
      />
      <text
        x="250"
        y="7"
        fill="#7dd3fc"
        fontSize="10"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        textAnchor="middle"
        opacity="0.7"
      >
        VENT
      </text>
    </g>
  )
}

/* ── Virement de bord (Tack) group ── upper-left ── */
function TackGroup({ active, onSelect }: { active: boolean; onSelect: () => void }) {
  const opacity = active ? 1 : 0.45
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.04 }}
      style={{ transformOrigin: '140px 130px' }}
    >
      {/* Glow background when active */}
      {active && (
        <motion.circle
          cx="140"
          cy="130"
          r="72"
          fill="#38bdf8"
          fillOpacity="0.06"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}

      {/* curved path arc showing the tack */}
      <path
        d="M 85 175 Q 90 100 140 75 Q 190 100 195 175"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        opacity={opacity * 0.6}
      />

      {/* directional arrow on the arc */}
      <defs>
        <marker
          id="mnv-tack-arr"
          markerWidth="6"
          markerHeight="5"
          refX="6"
          refY="2.5"
          orient="auto"
        >
          <polygon points="0 0, 6 2.5, 0 5" fill="#38bdf8" fillOpacity={opacity} />
        </marker>
      </defs>
      <path
        d="M 100 155 Q 110 110 140 90"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1"
        markerEnd="url(#mnv-tack-arr)"
        opacity={opacity * 0.5}
      />

      {/* 3 boat positions */}
      {/* Port tack — going upper-left */}
      <Boat x={90} y={170} rotation={-40} highlight={active} />
      {/* Head to wind — nose straight up */}
      <Boat x={140} y={80} rotation={0} highlight={active} />
      {/* Starboard tack — going upper-right */}
      <Boat x={190} y={170} rotation={40} highlight={active} />

      {/* Wind indicator arrow (small, pointing down into the arc) */}
      <line
        x1="140"
        y1="52"
        x2="140"
        y2="66"
        stroke="#7dd3fc"
        strokeWidth="1"
        opacity={opacity * 0.5}
        markerEnd="url(#mnv-wind-arrow)"
      />

      {/* Label */}
      <text
        x="140"
        y="200"
        fill={active ? '#7dd3fc' : '#93c5fd'}
        fontSize="9"
        fontFamily="Inter, sans-serif"
        fontWeight={active ? '600' : '400'}
        textAnchor="middle"
        opacity={opacity}
      >
        Virement de bord
      </text>
    </motion.g>
  )
}

/* ── Empannage (Jibe) group ── upper-right ── */
function JibeGroup({ active, onSelect }: { active: boolean; onSelect: () => void }) {
  const opacity = active ? 1 : 0.45
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.04 }}
      style={{ transformOrigin: '360px 130px' }}
    >
      {active && (
        <motion.circle
          cx="360"
          cy="130"
          r="72"
          fill="#f59e0b"
          fillOpacity="0.06"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}

      {/* curved path arc (inverted — boats go downwind, arc opens upward) */}
      <path
        d="M 305 85 Q 310 160 360 185 Q 410 160 415 85"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        opacity={opacity * 0.6}
      />

      {/* directional arrow */}
      <defs>
        <marker
          id="mnv-jibe-arr"
          markerWidth="6"
          markerHeight="5"
          refX="6"
          refY="2.5"
          orient="auto"
        >
          <polygon points="0 0, 6 2.5, 0 5" fill="#f59e0b" fillOpacity={opacity} />
        </marker>
      </defs>
      <path
        d="M 320 105 Q 330 150 360 170"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1"
        markerEnd="url(#mnv-jibe-arr)"
        opacity={opacity * 0.5}
      />

      {/* 3 boat positions (downwind — boats pointing away from wind) */}
      {/* Port gybe */}
      <Boat x={310} y={90} rotation={220} highlight={active} />
      {/* Dead downwind */}
      <Boat x={360} y={180} rotation={180} highlight={active} warn />
      {/* Starboard gybe */}
      <Boat x={410} y={90} rotation={140} highlight={active} />

      {/* Warning indicator on the transition boat */}
      {active && (
        <motion.text
          x="378"
          y="178"
          fontSize="12"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {'\u26A0\uFE0F'}
        </motion.text>
      )}

      {/* Label */}
      <text
        x="360"
        y="210"
        fill={active ? '#fbbf24' : '#fcd34d'}
        fontSize="9"
        fontFamily="Inter, sans-serif"
        fontWeight={active ? '600' : '400'}
        textAnchor="middle"
        opacity={opacity}
      >
        Empannage
      </text>
    </motion.g>
  )
}

/* ── Louvoyer (Beating) group ── bottom area ── */
function LouvoyerGroup({
  active,
  onSelect,
}: {
  active: boolean
  onSelect: () => void
}) {
  const opacity = active ? 1 : 0.45

  /* zigzag waypoints (bottom to top, heading upwind) */
  const points = [
    { x: 250, y: 470 },
    { x: 170, y: 410 },
    { x: 310, y: 350 },
    { x: 190, y: 290 },
    { x: 330, y: 240 },
    { x: 250, y: 260 },
  ]

  /* build polyline */
  const polyline = points.map(p => `${p.x},${p.y}`).join(' ')

  /* heading angle between two points (0 = up) */
  function angleBetween(
    a: { x: number; y: number },
    b: { x: number; y: number },
  ) {
    return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90
  }

  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.03 }}
      style={{ transformOrigin: '250px 360px' }}
    >
      {active && (
        <motion.ellipse
          cx="250"
          cy="360"
          rx="110"
          ry="120"
          fill="#34d399"
          fillOpacity="0.04"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}

      {/* zigzag path */}
      <polyline
        points={polyline}
        fill="none"
        stroke="#34d399"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        opacity={opacity * 0.5}
      />

      {/* small boats at each waypoint */}
      {points.slice(0, -1).map((p, i) => {
        const next = points[i + 1]
        const angle = angleBetween(p, next)
        return <Boat key={i} x={p.x} y={p.y} rotation={angle} highlight={active} />
      })}

      {/* destination marker (crosshair) */}
      <g opacity={opacity}>
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y - 10}
          r="5"
          fill="none"
          stroke="#34d399"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line
          x1={points[points.length - 1].x}
          y1={points[points.length - 1].y - 16}
          x2={points[points.length - 1].x}
          y2={points[points.length - 1].y - 4}
          stroke="#34d399"
          strokeWidth="1"
        />
        <line
          x1={points[points.length - 1].x - 6}
          y1={points[points.length - 1].y - 10}
          x2={points[points.length - 1].x + 6}
          y2={points[points.length - 1].y - 10}
          stroke="#34d399"
          strokeWidth="1"
        />
      </g>

      {/* Label */}
      <text
        x="250"
        y="490"
        fill={active ? '#6ee7b7' : '#a7f3d0'}
        fontSize="9"
        fontFamily="Inter, sans-serif"
        fontWeight={active ? '600' : '400'}
        textAnchor="middle"
        opacity={opacity}
      >
        Louvoyer
      </text>
    </motion.g>
  )
}

/* ── Main diagram ── */
export default function ManeuverDiagram({ onManeuverSelect, selectedId }: ManeuverDiagramProps) {
  const [manualId, setManualId] = useState<string | null>(null)

  // External selection from play mode (strip "mnv-" prefix)
  const externalId = selectedId?.startsWith('mnv-') ? selectedId.slice(4) : null
  const activeId = externalId || manualId
  const activeManeuver = MANEUVERS.find(m => m.id === activeId) ?? null

  function select(id: string) {
    setManualId(prev => (prev === id ? null : id))
    const m = MANEUVERS.find(m => m.id === id)
    if (m && onManeuverSelect) {
      onManeuverSelect({ id: m.id, label: m.label, description: m.description })
    }
  }

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <motion.svg
        viewBox="0 0 500 500"
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Glow filters */}
        <defs>
          <filter id="mnv-glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="mnv-glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="mnv-glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Wind arrow */}
        <WindArrow />

        {/* Maneuver groups */}
        <TackGroup
          active={activeId === 'virement'}
          onSelect={() => select('virement')}
        />
        <JibeGroup
          active={activeId === 'empannage'}
          onSelect={() => select('empannage')}
        />
        <LouvoyerGroup
          active={activeId === 'louvoyer'}
          onSelect={() => select('louvoyer')}
        />

        {/* Subtle divider hint */}
        <line
          x1="250"
          y1="50"
          x2="250"
          y2="220"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
      </motion.svg>

      {/* Info card */}
      <AnimatePresence mode="wait">
        {activeManeuver && (
          <motion.div
            key={activeManeuver.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-xl p-4 mt-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: activeManeuver.color }}
              />
              <h4 className="font-semibold" style={{ color: activeManeuver.color }}>
                {activeManeuver.label}
              </h4>
              <span className="text-xs text-foam-400 opacity-60">
                ({activeManeuver.subtitle})
              </span>
              {activeManeuver.id === 'empannage' && (
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                  Attention
                </span>
              )}
            </div>
            <p className="text-foam-200 text-sm leading-relaxed">
              {activeManeuver.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-foam-300 text-sm mt-4 opacity-60">
        Cliquez sur une man&#339;uvre pour la d&#233;couvrir
      </p>
    </div>
  )
}
