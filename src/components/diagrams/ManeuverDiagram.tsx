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
    description: "Changer d\u2019amure en passant face au vent.",
    color: '#38bdf8',
  },
  {
    id: 'empannage',
    label: 'Empannage',
    subtitle: 'Jibe',
    description: "Changer d\u2019amure par l\u2019arri\u00e8re. Attention \u00e0 la b\u00f4me.",
    color: '#f59e0b',
  },
  {
    id: 'louvoyer',
    label: 'Louvoyer',
    subtitle: 'Beat',
    description: 'Zigzaguer pour remonter vers le vent.',
    color: '#34d399',
  },
  {
    id: 'voiles',
    label: 'Gestion des voiles',
    subtitle: 'Sails',
    description: 'Hisser, affaler, envoyer et ranger les voiles.',
    color: '#7dd3fc',
  },
  {
    id: 'port',
    label: 'Man\u0153uvres de port',
    subtitle: 'Harbour',
    description: 'Mouillage, appareillage et accostage.',
    color: '#a78bfa',
  },
  {
    id: 'urgence',
    label: 'Urgences',
    subtitle: 'Emergency',
    description: 'Homme \u00e0 la mer, mise \u00e0 la cape.',
    color: '#f43f5e',
  },
  {
    id: 'cap',
    label: 'Changements de cap',
    subtitle: 'Steering',
    description: 'Lofer, abattre, corriger la trajectoire.',
    color: '#fb923c',
  },
  {
    id: 'incident',
    label: 'Incidents',
    subtitle: 'Hazards',
    description: 'Dessaler, sancir, chavirer, prise de ris.',
    color: '#94a3b8',
  },
]

/* ── tiny top-down boat silhouette (centered on 0,0) ── */
function Boat({
  x,
  y,
  rotation,
  highlight = false,
  warn = false,
  color,
}: {
  x: number
  y: number
  rotation: number
  highlight?: boolean
  warn?: boolean
  color?: string
}) {
  const fillColor = warn ? '#f59e0b' : '#1e2d4a'
  const strokeColor = color ?? (highlight ? '#7dd3fc' : '#38bdf8')
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      <path
        d="M 0 -8 Q 3 -5 2.5 5 Q 0 8 -2.5 5 Q -3 -5 0 -8 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1"
      />
      {/* mast dot */}
      <circle cx="0" cy="-2" r="1" fill={strokeColor} />
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
        x1="300"
        y1="8"
        x2="300"
        y2="38"
        stroke="#7dd3fc"
        strokeWidth="2"
        markerEnd="url(#mnv-wind-arrow)"
        opacity="0.6"
      />
      <text
        x="300"
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

/* ── Shared group props ── */
interface GroupProps {
  active: boolean
  onSelect: () => void
}

/* ── Grid positions (4x2) ── */
// Row 1: y center ~130, cols at x=85, 235, 385, 535
// Row 2: y center ~340, cols at x=85, 235, 385, 535
const COL = [80, 225, 375, 520]
const ROW = [130, 340]

/* ── 1. Virement de bord (Tack) ── Row 1, Col 0 ── */
function TackGroup({ active, onSelect }: GroupProps) {
  const cx = COL[0]
  const cy = ROW[0]
  const opacity = active ? 1 : 0.45
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.06 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {active && (
        <motion.circle
          cx={cx}
          cy={cy}
          r="60"
          fill="#38bdf8"
          fillOpacity="0.06"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}
      {/* curved arc */}
      <path
        d={`M ${cx - 40} ${cy + 35} Q ${cx - 35} ${cy - 20} ${cx} ${cy - 40} Q ${cx + 35} ${cy - 20} ${cx + 40} ${cy + 35}`}
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        opacity={opacity * 0.6}
      />
      {/* 3 boat positions */}
      <Boat x={cx - 38} y={cy + 30} rotation={-40} highlight={active} color="#38bdf8" />
      <Boat x={cx} y={cy - 35} rotation={0} highlight={active} color="#38bdf8" />
      <Boat x={cx + 38} y={cy + 30} rotation={40} highlight={active} color="#38bdf8" />
      {/* Label */}
      <text
        x={cx}
        y={cy + 55}
        fill={active ? '#7dd3fc' : '#93c5fd'}
        fontSize="8"
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

/* ── 2. Empannage (Jibe) ── Row 1, Col 1 ── */
function JibeGroup({ active, onSelect }: GroupProps) {
  const cx = COL[1]
  const cy = ROW[0]
  const opacity = active ? 1 : 0.45
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.06 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {active && (
        <motion.circle
          cx={cx}
          cy={cy}
          r="60"
          fill="#f59e0b"
          fillOpacity="0.06"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}
      {/* inverted arc (boats go downwind) */}
      <path
        d={`M ${cx - 40} ${cy - 35} Q ${cx - 35} ${cy + 20} ${cx} ${cy + 40} Q ${cx + 35} ${cy + 20} ${cx + 40} ${cy - 35}`}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        opacity={opacity * 0.6}
      />
      <Boat x={cx - 38} y={cy - 30} rotation={220} highlight={active} color="#f59e0b" />
      <Boat x={cx} y={cy + 35} rotation={180} highlight={active} warn color="#f59e0b" />
      <Boat x={cx + 38} y={cy - 30} rotation={140} highlight={active} color="#f59e0b" />
      {active && (
        <motion.text
          x={cx + 14}
          y={cy + 34}
          fontSize="11"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {'\u26A0\uFE0F'}
        </motion.text>
      )}
      <text
        x={cx}
        y={cy + 55}
        fill={active ? '#fbbf24' : '#fcd34d'}
        fontSize="8"
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

/* ── 3. Cap (Lofer/Abattre) ── Row 1, Col 2 ── */
function CapGroup({ active, onSelect }: GroupProps) {
  const cx = COL[2]
  const cy = ROW[0]
  const opacity = active ? 1 : 0.45
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.06 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {active && (
        <motion.circle
          cx={cx}
          cy={cy}
          r="60"
          fill="#fb923c"
          fillOpacity="0.06"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}
      {/* Central boat */}
      <Boat x={cx} y={cy} rotation={0} highlight={active} color="#fb923c" />

      {/* Lofer arrow (curved toward wind / left) */}
      <defs>
        <marker
          id="mnv-cap-arr-l"
          markerWidth="6"
          markerHeight="5"
          refX="6"
          refY="2.5"
          orient="auto"
        >
          <polygon points="0 0, 6 2.5, 0 5" fill="#fb923c" fillOpacity={opacity} />
        </marker>
        <marker
          id="mnv-cap-arr-r"
          markerWidth="6"
          markerHeight="5"
          refX="6"
          refY="2.5"
          orient="auto"
        >
          <polygon points="0 0, 6 2.5, 0 5" fill="#fb923c" fillOpacity={opacity} />
        </marker>
      </defs>
      {/* Lofer (toward wind) - curves left/up */}
      <path
        d={`M ${cx - 5} ${cy - 14} Q ${cx - 30} ${cy - 30} ${cx - 35} ${cy - 10}`}
        fill="none"
        stroke="#fb923c"
        strokeWidth="1.2"
        markerEnd="url(#mnv-cap-arr-l)"
        opacity={opacity * 0.8}
      />
      <text
        x={cx - 42}
        y={cy - 18}
        fill="#fb923c"
        fontSize="7"
        fontFamily="Inter, sans-serif"
        textAnchor="middle"
        opacity={opacity * 0.8}
      >
        Lofer
      </text>

      {/* Abattre (away from wind) - curves right/down */}
      <path
        d={`M ${cx + 5} ${cy + 14} Q ${cx + 30} ${cy + 30} ${cx + 35} ${cy + 10}`}
        fill="none"
        stroke="#fb923c"
        strokeWidth="1.2"
        markerEnd="url(#mnv-cap-arr-r)"
        opacity={opacity * 0.8}
      />
      <text
        x={cx + 44}
        y={cy + 28}
        fill="#fb923c"
        fontSize="7"
        fontFamily="Inter, sans-serif"
        textAnchor="middle"
        opacity={opacity * 0.8}
      >
        Abattre
      </text>

      {/* Wind hint arrow */}
      <line
        x1={cx}
        y1={cy - 48}
        x2={cx}
        y2={cy - 36}
        stroke="#7dd3fc"
        strokeWidth="1"
        opacity={opacity * 0.4}
        markerEnd="url(#mnv-wind-arrow)"
      />
      <text
        x={cx}
        y={cy + 55}
        fill={active ? '#fdba74' : '#fb923c'}
        fontSize="8"
        fontFamily="Inter, sans-serif"
        fontWeight={active ? '600' : '400'}
        textAnchor="middle"
        opacity={opacity}
      >
        Changements de cap
      </text>
    </motion.g>
  )
}

/* ── 4. Louvoyer (Beat) ── Row 1, Col 3 ── */
function LouvoyerGroup({ active, onSelect }: GroupProps) {
  const cx = COL[3]
  const cy = ROW[0]
  const opacity = active ? 1 : 0.45

  const points = [
    { x: cx, y: cy + 42 },
    { x: cx - 30, y: cy + 14 },
    { x: cx + 25, y: cy - 10 },
    { x: cx - 10, y: cy - 36 },
  ]
  const polyline = points.map(p => `${p.x},${p.y}`).join(' ')

  function angleBetween(a: { x: number; y: number }, b: { x: number; y: number }) {
    return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90
  }

  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.06 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {active && (
        <motion.circle
          cx={cx}
          cy={cy}
          r="60"
          fill="#34d399"
          fillOpacity="0.06"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}
      <polyline
        points={polyline}
        fill="none"
        stroke="#34d399"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        opacity={opacity * 0.5}
      />
      {points.slice(0, -1).map((p, i) => {
        const next = points[i + 1]
        const angle = angleBetween(p, next)
        return <Boat key={i} x={p.x} y={p.y} rotation={angle} highlight={active} color="#34d399" />
      })}
      {/* destination crosshair */}
      <g opacity={opacity}>
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="4"
          fill="none"
          stroke="#34d399"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      </g>
      <text
        x={cx}
        y={cy + 55}
        fill={active ? '#6ee7b7' : '#a7f3d0'}
        fontSize="8"
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

/* ── 5. Voiles (Sails up/down) ── Row 2, Col 0 ── */
function VoilesGroup({ active, onSelect }: GroupProps) {
  const cx = COL[0]
  const cy = ROW[1]
  const opacity = active ? 1 : 0.45
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.06 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {active && (
        <motion.circle
          cx={cx}
          cy={cy}
          r="60"
          fill="#7dd3fc"
          fillOpacity="0.06"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}
      {/* Boat hull (centered) */}
      <Boat x={cx} y={cy + 5} rotation={0} highlight={active} color="#7dd3fc" />

      {/* Sail shape (triangular, to the left of mast) */}
      <path
        d={`M ${cx} ${cy - 10} L ${cx - 14} ${cy + 2} L ${cx} ${cy + 2} Z`}
        fill="#7dd3fc"
        fillOpacity={opacity * 0.25}
        stroke="#7dd3fc"
        strokeWidth="0.8"
        opacity={opacity}
      />

      {/* Arrow UP (hisser) */}
      <defs>
        <marker
          id="mnv-voile-up"
          markerWidth="5"
          markerHeight="5"
          refX="2.5"
          refY="5"
          orient="auto"
        >
          <polygon points="0 5, 2.5 0, 5 5" fill="#7dd3fc" fillOpacity={opacity} />
        </marker>
        <marker
          id="mnv-voile-down"
          markerWidth="5"
          markerHeight="5"
          refX="2.5"
          refY="0"
          orient="auto"
        >
          <polygon points="0 0, 2.5 5, 5 0" fill="#7dd3fc" fillOpacity={opacity} />
        </marker>
      </defs>
      {/* Up arrow */}
      <line
        x1={cx - 25}
        y1={cy + 10}
        x2={cx - 25}
        y2={cy - 25}
        stroke="#7dd3fc"
        strokeWidth="1.5"
        markerEnd="url(#mnv-voile-up)"
        opacity={opacity * 0.8}
      />
      <text
        x={cx - 25}
        y={cy + 20}
        fill="#7dd3fc"
        fontSize="6"
        fontFamily="Inter, sans-serif"
        textAnchor="middle"
        opacity={opacity * 0.7}
      >
        Hisser
      </text>

      {/* Down arrow */}
      <line
        x1={cx + 25}
        y1={cy - 25}
        x2={cx + 25}
        y2={cy + 10}
        stroke="#7dd3fc"
        strokeWidth="1.5"
        markerEnd="url(#mnv-voile-down)"
        opacity={opacity * 0.8}
      />
      <text
        x={cx + 25}
        y={cy + 20}
        fill="#7dd3fc"
        fontSize="6"
        fontFamily="Inter, sans-serif"
        textAnchor="middle"
        opacity={opacity * 0.7}
      >
        Affaler
      </text>

      <text
        x={cx}
        y={cy + 55}
        fill={active ? '#bae6fd' : '#7dd3fc'}
        fontSize="8"
        fontFamily="Inter, sans-serif"
        fontWeight={active ? '600' : '400'}
        textAnchor="middle"
        opacity={opacity}
      >
        Gestion des voiles
      </text>
    </motion.g>
  )
}

/* ── 6. Port (Harbour manoeuvres) ── Row 2, Col 1 ── */
function PortGroup({ active, onSelect }: GroupProps) {
  const cx = COL[1]
  const cy = ROW[1]
  const opacity = active ? 1 : 0.45
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.06 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {active && (
        <motion.circle
          cx={cx}
          cy={cy}
          r="60"
          fill="#a78bfa"
          fillOpacity="0.06"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}
      {/* Dock / quay line */}
      <line
        x1={cx + 20}
        y1={cy - 35}
        x2={cx + 20}
        y2={cy + 25}
        stroke="#a78bfa"
        strokeWidth="2.5"
        opacity={opacity * 0.7}
        strokeLinecap="round"
      />
      {/* Dock bumpers */}
      {[-25, -10, 5, 20].map((dy, i) => (
        <line
          key={i}
          x1={cx + 20}
          y1={cy + dy}
          x2={cx + 26}
          y2={cy + dy + 5}
          stroke="#a78bfa"
          strokeWidth="1"
          opacity={opacity * 0.5}
        />
      ))}

      {/* Boat approaching dock */}
      <Boat x={cx - 10} y={cy - 5} rotation={90} highlight={active} color="#a78bfa" />

      {/* Dashed approach path */}
      <path
        d={`M ${cx - 30} ${cy + 15} Q ${cx - 20} ${cy + 5} ${cx - 10} ${cy - 5}`}
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity={opacity * 0.5}
      />

      {/* Anchor symbol */}
      <g transform={`translate(${cx - 30},${cy - 25})`} opacity={opacity * 0.7}>
        {/* Ring */}
        <circle cx="0" cy="-6" r="3" fill="none" stroke="#a78bfa" strokeWidth="1" />
        {/* Shank */}
        <line x1="0" y1="-3" x2="0" y2="8" stroke="#a78bfa" strokeWidth="1" />
        {/* Arms */}
        <path d="M -5 6 Q 0 10 5 6" fill="none" stroke="#a78bfa" strokeWidth="1" />
        {/* Crossbar */}
        <line x1="-4" y1="1" x2="4" y2="1" stroke="#a78bfa" strokeWidth="1" />
      </g>

      <text
        x={cx}
        y={cy + 55}
        fill={active ? '#c4b5fd' : '#a78bfa'}
        fontSize="8"
        fontFamily="Inter, sans-serif"
        fontWeight={active ? '600' : '400'}
        textAnchor="middle"
        opacity={opacity}
      >
        Man\u0153uvres de port
      </text>
    </motion.g>
  )
}

/* ── 7. Urgence (Emergency) ── Row 2, Col 2 ── */
function UrgenceGroup({ active, onSelect }: GroupProps) {
  const cx = COL[2]
  const cy = ROW[1]
  const opacity = active ? 1 : 0.45
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.06 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {active && (
        <motion.circle
          cx={cx}
          cy={cy}
          r="60"
          fill="#f43f5e"
          fillOpacity="0.06"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}
      {/* Boat */}
      <Boat x={cx - 15} y={cy - 10} rotation={-20} highlight={active} color="#f43f5e" />

      {/* Person in water icon */}
      <g transform={`translate(${cx + 18},${cy + 5})`} opacity={opacity}>
        {/* Head */}
        <circle cx="0" cy="-4" r="3.5" fill="none" stroke="#f43f5e" strokeWidth="1.2" />
        {/* Wavy water lines */}
        <path
          d="M -10 2 Q -6 -1 -2 2 Q 2 5 6 2 Q 10 -1 14 2"
          fill="none"
          stroke="#f43f5e"
          strokeWidth="1"
          opacity="0.7"
        />
        <path
          d="M -10 6 Q -6 3 -2 6 Q 2 9 6 6 Q 10 3 14 6"
          fill="none"
          stroke="#f43f5e"
          strokeWidth="0.8"
          opacity="0.4"
        />
        {/* Arms up */}
        <line x1="-3" y1="0" x2="-6" y2="-5" stroke="#f43f5e" strokeWidth="1" />
        <line x1="3" y1="0" x2="6" y2="-5" stroke="#f43f5e" strokeWidth="1" />
      </g>

      {/* Circular rescue arrow */}
      <defs>
        <marker
          id="mnv-rescue-arr"
          markerWidth="5"
          markerHeight="4"
          refX="5"
          refY="2"
          orient="auto"
        >
          <polygon points="0 0, 5 2, 0 4" fill="#f43f5e" fillOpacity={opacity} />
        </marker>
      </defs>
      <path
        d={`M ${cx + 5} ${cy - 30} A 28 28 0 1 1 ${cx - 30} ${cy + 10}`}
        fill="none"
        stroke="#f43f5e"
        strokeWidth="1"
        strokeDasharray="4 3"
        markerEnd="url(#mnv-rescue-arr)"
        opacity={opacity * 0.6}
      />

      <text
        x={cx}
        y={cy + 55}
        fill={active ? '#fb7185' : '#f43f5e'}
        fontSize="8"
        fontFamily="Inter, sans-serif"
        fontWeight={active ? '600' : '400'}
        textAnchor="middle"
        opacity={opacity}
      >
        Urgences
      </text>
    </motion.g>
  )
}

/* ── 8. Incident (Hazards) ── Row 2, Col 3 ── */
function IncidentGroup({ active, onSelect }: GroupProps) {
  const cx = COL[3]
  const cy = ROW[1]
  const opacity = active ? 1 : 0.45
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      whileHover={{ scale: 1.06 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {active && (
        <motion.circle
          cx={cx}
          cy={cy}
          r="60"
          fill="#94a3b8"
          fillOpacity="0.06"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}
      {/* Tilted/capsized boat silhouette */}
      <g transform={`translate(${cx},${cy - 5}) rotate(55)`}>
        <path
          d="M 0 -12 Q 4.5 -7.5 3.75 7.5 Q 0 12 -3.75 7.5 Q -4.5 -7.5 0 -12 Z"
          fill="#1e2d4a"
          stroke="#94a3b8"
          strokeWidth="1.2"
          opacity={opacity}
        />
        <circle cx="0" cy="-3" r="1.2" fill="#94a3b8" opacity={opacity} />
      </g>

      {/* Water surface line */}
      <path
        d={`M ${cx - 30} ${cy + 10} Q ${cx - 18} ${cy + 6} ${cx - 6} ${cy + 10} Q ${cx + 6} ${cy + 14} ${cx + 18} ${cy + 10} Q ${cx + 30} ${cy + 6} ${cx + 38} ${cy + 10}`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="0.8"
        opacity={opacity * 0.5}
      />
      <path
        d={`M ${cx - 30} ${cy + 16} Q ${cx - 18} ${cy + 12} ${cx - 6} ${cy + 16} Q ${cx + 6} ${cy + 20} ${cx + 18} ${cy + 16} Q ${cx + 30} ${cy + 12} ${cx + 38} ${cy + 16}`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="0.6"
        opacity={opacity * 0.3}
      />

      {/* Splash/danger marks */}
      <g opacity={opacity * 0.5}>
        <line
          x1={cx + 16}
          y1={cy - 22}
          x2={cx + 20}
          y2={cy - 28}
          stroke="#94a3b8"
          strokeWidth="1"
        />
        <line
          x1={cx + 22}
          y1={cy - 18}
          x2={cx + 28}
          y2={cy - 22}
          stroke="#94a3b8"
          strokeWidth="1"
        />
        <line
          x1={cx + 10}
          y1={cy - 26}
          x2={cx + 12}
          y2={cy - 32}
          stroke="#94a3b8"
          strokeWidth="1"
        />
      </g>

      <text
        x={cx}
        y={cy + 55}
        fill={active ? '#cbd5e1' : '#94a3b8'}
        fontSize="8"
        fontFamily="Inter, sans-serif"
        fontWeight={active ? '600' : '400'}
        textAnchor="middle"
        opacity={opacity}
      >
        Incidents
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
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.svg
        viewBox="0 0 600 500"
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Glow filter */}
        <defs>
          <filter id="mnv-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Wind arrow */}
        <WindArrow />

        {/* Row 1 */}
        <TackGroup active={activeId === 'virement'} onSelect={() => select('virement')} />
        <JibeGroup active={activeId === 'empannage'} onSelect={() => select('empannage')} />
        <CapGroup active={activeId === 'cap'} onSelect={() => select('cap')} />
        <LouvoyerGroup active={activeId === 'louvoyer'} onSelect={() => select('louvoyer')} />

        {/* Subtle row divider */}
        <line
          x1="40"
          y1="230"
          x2="560"
          y2="230"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />

        {/* Row 2 */}
        <VoilesGroup active={activeId === 'voiles'} onSelect={() => select('voiles')} />
        <PortGroup active={activeId === 'port'} onSelect={() => select('port')} />
        <UrgenceGroup active={activeId === 'urgence'} onSelect={() => select('urgence')} />
        <IncidentGroup active={activeId === 'incident'} onSelect={() => select('incident')} />
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
              {activeManeuver.id === 'urgence' && (
                <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full">
                  Urgence
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
