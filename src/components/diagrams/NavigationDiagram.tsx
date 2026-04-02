import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationConcept {
  id: string
  label: string
  description: string
}

interface NavigationDiagramProps {
  onConceptSelect?: (concept: NavigationConcept) => void
  selectedId?: string | null
}

const CONCEPTS: (NavigationConcept & {
  render: 'cap' | 'route' | 'derive' | 'relevement' | 'amers' | 'courant'
})[] = [
  {
    id: 'cap',
    label: 'Cap',
    description: 'Direction vers laquelle pointe la proue du bateau, mesurée en degrés par rapport au nord.',
    render: 'cap',
  },
  {
    id: 'route',
    label: 'Route',
    description: 'Trajectoire réellement suivie par le bateau sur le fond, résultant du cap, du courant et de la dérive.',
    render: 'route',
  },
  {
    id: 'derive',
    label: 'Dérive',
    description: 'Écart latéral causé par le vent qui pousse le bateau perpendiculairement à sa route.',
    render: 'derive',
  },
  {
    id: 'relevement',
    label: 'Relèvement',
    description: 'Angle mesuré entre le nord et la direction d\'un point remarquable (amer) vu depuis le bateau.',
    render: 'relevement',
  },
  {
    id: 'amers',
    label: 'Amers',
    description: 'Points de repère fixes et identifiables à la côte (phare, clocher, cap) utilisés pour se positionner.',
    render: 'amers',
  },
  {
    id: 'courant',
    label: 'Courant',
    description: 'Mouvement de l\'eau qui déplace le bateau indépendamment de sa propulsion, modifiant la route fond.',
    render: 'courant',
  },
]

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export default function NavigationDiagram({ onConceptSelect, selectedId }: NavigationDiagramProps) {
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null)

  // External selection from play mode (strip "nav-" prefix)
  const externalConcept = selectedId?.startsWith('nav-') ? selectedId.slice(4) : null
  const activeConcept = hoveredConcept || externalConcept || null
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  const cx = 250
  const cy = 250
  const outerR = 180
  const innerR = 150

  const cardinals: { label: string; angle: number }[] = [
    { label: 'N', angle: 0 },
    { label: 'NE', angle: 45 },
    { label: 'E', angle: 90 },
    { label: 'SE', angle: 135 },
    { label: 'S', angle: 180 },
    { label: 'SO', angle: 225 },
    { label: 'O', angle: 270 },
    { label: 'NO', angle: 315 },
  ]

  const degrees = [0, 90, 180, 270]

  const active = CONCEPTS.find(c => c.id === activeConcept) ?? null

  function handleMouseEnter(id: string, e: React.MouseEvent) {
    setHoveredConcept(id)
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect()
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  function handleMouseLeave() {
    setHoveredConcept(null)
  }

  function handleClick(concept: NavigationConcept) {
    onConceptSelect?.({ id: concept.id, label: concept.label, description: concept.description })
  }

  const isActive = (id: string) => activeConcept === id
  const hotspotOpacity = (id: string) => (isActive(id) ? 0.9 : 0.4)
  const glowFilter = 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))'

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <motion.svg
        ref={svgRef}
        viewBox="0 0 500 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        initial={{ rotate: -10, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 60, damping: 14, duration: 1 }}
      >
        <defs>
          {/* Arrow markers */}
          <marker id="nav-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.7)" />
          </marker>
          <marker id="nav-arrow-cap" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
          </marker>
          <marker id="nav-arrow-derive" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
          </marker>
          <marker id="nav-arrow-courant" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#2dd4bf" />
          </marker>

          {/* Glow filters */}
          <filter id="nav-glow-blue">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.7" />
          </filter>
          <filter id="nav-glow-amber">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.7" />
          </filter>
          <filter id="nav-glow-teal">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#2dd4bf" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* ===== COMPASS ROSE ===== */}

        {/* Outer radiating lines (32 directions) */}
        {Array.from({ length: 32 }, (_, i) => {
          const angle = i * 11.25
          const isMajor = angle % 90 === 0
          const isMinor = angle % 45 === 0
          const rStart = isMajor ? innerR - 10 : isMinor ? innerR - 5 : innerR
          const rEnd = outerR + (isMajor ? 20 : isMinor ? 10 : 5)
          const p1 = polarToCartesian(cx, cy, rStart, angle)
          const p2 = polarToCartesian(cx, cy, rEnd, angle)
          return (
            <line
              key={`ray-${i}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={isMajor ? 1.5 : isMinor ? 1 : 0.5}
            />
          )
        })}

        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        {/* Inner ring */}
        <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Inner decorative ring */}
        <circle cx={cx} cy={cy} r={innerR - 20} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

        {/* Compass star (8-pointed) */}
        {cardinals.map(({ angle }, i) => {
          const isPrimary = i % 2 === 0
          const tipR = isPrimary ? innerR - 5 : innerR - 25
          const sideR = isPrimary ? 30 : 18
          const tip = polarToCartesian(cx, cy, tipR, angle)
          const left = polarToCartesian(cx, cy, sideR, angle - (isPrimary ? 18 : 14))
          const right = polarToCartesian(cx, cy, sideR, angle + (isPrimary ? 18 : 14))
          return (
            <polygon
              key={`star-${i}`}
              points={`${tip.x},${tip.y} ${left.x},${left.y} ${cx},${cy} ${right.x},${right.y}`}
              fill={isPrimary ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.5"
            />
          )
        })}

        {/* Fleur-de-lis / North arrow */}
        <g opacity="0.7">
          {/* Main north pointer */}
          <polygon
            points={`${cx},${cy - innerR + 5} ${cx - 6},${cy - innerR + 25} ${cx},${cy - innerR + 18} ${cx + 6},${cy - innerR + 25}`}
            fill="#fff"
            opacity="0.8"
          />
          {/* Side petals */}
          <path
            d={`M ${cx - 4} ${cy - innerR + 22} Q ${cx - 12} ${cy - innerR + 12} ${cx - 5} ${cy - innerR + 5}`}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
          />
          <path
            d={`M ${cx + 4} ${cy - innerR + 22} Q ${cx + 12} ${cy - innerR + 12} ${cx + 5} ${cy - innerR + 5}`}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
          />
        </g>

        {/* Cardinal labels */}
        {cardinals.map(({ label, angle }) => {
          const isPrimary = ['N', 'S', 'E', 'O'].includes(label)
          const labelR = outerR + (isPrimary ? 28 : 22)
          const pos = polarToCartesian(cx, cy, labelR, angle)
          return (
            <text
              key={`label-${label}`}
              x={pos.x}
              y={pos.y}
              fill={label === 'N' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)'}
              fontSize={isPrimary ? '14' : '10'}
              fontFamily="Inter, sans-serif"
              fontWeight={isPrimary ? '700' : '500'}
              textAnchor="middle"
              dominantBaseline="middle"
              letterSpacing="1"
            >
              {label}
            </text>
          )
        })}

        {/* Degree markings */}
        {degrees.map(deg => {
          const pos = polarToCartesian(cx, cy, outerR + 14, deg)
          return (
            <text
              key={`deg-${deg}`}
              x={pos.x}
              y={pos.y + (deg === 0 ? -10 : deg === 180 ? 10 : 0)}
              dx={deg === 90 ? 10 : deg === 270 ? -10 : 0}
              fill="rgba(255,255,255,0.25)"
              fontSize="8"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {deg}°
            </text>
          )
        })}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="3" fill="rgba(255,255,255,0.3)" />

        {/* ===== BOAT SILHOUETTE ===== */}
        <g opacity="0.6">
          {/* Hull */}
          <path
            d={`M ${cx} ${cy - 20} Q ${cx + 7} ${cy - 15} ${cx + 5} ${cy + 12} Q ${cx} ${cy + 20} ${cx - 5} ${cy + 12} Q ${cx - 7} ${cy - 15} ${cx} ${cy - 20} Z`}
            fill="#0c1e3a"
            stroke="#38bdf8"
            strokeWidth="1"
          />
          {/* Mast */}
          <line x1={cx} y1={cy - 14} x2={cx} y2={cy + 8} stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
          {/* Sail */}
          <path
            d={`M ${cx} ${cy - 14} Q ${cx + 10} ${cy - 4} ${cx + 2} ${cy + 4} L ${cx} ${cy + 4} Z`}
            fill="rgba(56, 189, 248, 0.15)"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="0.5"
          />
        </g>

        {/* ===== NAVIGATION CONCEPTS ===== */}

        {/* Cap -- arrow from boat pointing forward */}
        <motion.g
          opacity={hotspotOpacity('cap')}
          style={{ filter: isActive('cap') ? glowFilter : 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => handleMouseEnter('cap', e as unknown as React.MouseEvent)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(CONCEPTS[0])}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <line
            x1={cx}
            y1={cy - 24}
            x2={cx}
            y2={cy - 95}
            stroke="#38bdf8"
            strokeWidth="2"
            markerEnd="url(#nav-arrow-cap)"
          />
          <text
            x={cx + 12}
            y={cy - 60}
            fill="#38bdf8"
            fontSize="11"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            Cap
          </text>
          {/* Invisible hit area */}
          <rect x={cx - 15} y={cy - 100} width="50" height="80" fill="transparent" />
        </motion.g>

        {/* Route -- dashed line offset from cap */}
        <motion.g
          opacity={hotspotOpacity('route')}
          style={{ filter: isActive('route') ? glowFilter : 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => handleMouseEnter('route', e as unknown as React.MouseEvent)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(CONCEPTS[1])}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <line
            x1={cx + 5}
            y1={cy - 20}
            x2={cx + 55}
            y2={cy - 100}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            markerEnd="url(#nav-arrow)"
          />
          <text
            x={cx + 60}
            y={cy - 85}
            fill="rgba(255,255,255,0.7)"
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
          >
            Route
          </text>
          <rect x={cx} y={cy - 110} width="75" height="95" fill="transparent" />
        </motion.g>

        {/* Derive -- wind drift arrow to the side */}
        <motion.g
          opacity={hotspotOpacity('derive')}
          style={{ filter: isActive('derive') ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))' : 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => handleMouseEnter('derive', e as unknown as React.MouseEvent)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(CONCEPTS[2])}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <line
            x1={cx + 10}
            y1={cy}
            x2={cx + 75}
            y2={cy + 15}
            stroke="#f59e0b"
            strokeWidth="1.5"
            markerEnd="url(#nav-arrow-derive)"
          />
          {/* Small wind lines */}
          <line x1={cx + 30} y1={cy - 5} x2={cx + 42} y2={cy - 2} stroke="#f59e0b" strokeWidth="0.7" opacity="0.5" />
          <line x1={cx + 35} y1={cy + 8} x2={cx + 47} y2={cy + 11} stroke="#f59e0b" strokeWidth="0.7" opacity="0.5" />
          <text
            x={cx + 80}
            y={cy + 18}
            fill="#f59e0b"
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
          >
            Dérive
          </text>
          <rect x={cx + 5} y={cy - 12} width="100" height="40" fill="transparent" />
        </motion.g>

        {/* Amers -- lighthouse icon */}
        <motion.g
          opacity={hotspotOpacity('amers')}
          style={{ filter: isActive('amers') ? glowFilter : 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => handleMouseEnter('amers', e as unknown as React.MouseEvent)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(CONCEPTS[4])}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Lighthouse base */}
          <rect x="60" y="68" width="16" height="24" rx="2" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          {/* Lighthouse top */}
          <polygon points="63,68 77,68 74,58 66,58" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          {/* Lighthouse light */}
          <circle cx="70" cy="62" r="3" fill={isActive('amers') ? '#fbbf24' : 'rgba(251, 191, 36, 0.4)'} />
          {/* Light rays */}
          <line x1="64" y1="58" x2="56" y2="52" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="0.8" />
          <line x1="68" y1="56" x2="66" y2="48" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="0.8" />
          <line x1="76" y1="58" x2="84" y2="52" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="0.8" />
          {/* Stripes on tower */}
          <line x1="62" y1="76" x2="78" y2="76" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
          <line x1="61" y1="82" x2="77" y2="82" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
          <text
            x="68"
            y="102"
            fill="rgba(255,255,255,0.6)"
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
            textAnchor="middle"
          >
            Amers
          </text>
          <rect x="50" y="44" width="40" height="65" fill="transparent" />
        </motion.g>

        {/* Relevement -- dotted line from boat to amer */}
        <motion.g
          opacity={hotspotOpacity('relevement')}
          style={{ filter: isActive('relevement') ? glowFilter : 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => handleMouseEnter('relevement', e as unknown as React.MouseEvent)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(CONCEPTS[3])}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <line
            x1={cx - 8}
            y1={cy - 10}
            x2={85}
            y2={80}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          {/* Angle arc near the boat */}
          <path
            d={`M ${cx - 8} ${cy - 35} A 25 25 0 0 0 ${cx - 28} ${cy - 18}`}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />
          <text
            x={cx - 45}
            y={cy - 30}
            fill="rgba(255,255,255,0.55)"
            fontSize="9"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
          >
            Relèv.
          </text>
          <rect x={85} y={70} width={cx - 85} height={cy - 60} fill="transparent" />
        </motion.g>

        {/* Courant -- wavy arrow showing water current */}
        <motion.g
          opacity={hotspotOpacity('courant')}
          style={{ filter: isActive('courant') ? 'drop-shadow(0 0 8px rgba(45, 212, 191, 0.6))' : 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => handleMouseEnter('courant', e as unknown as React.MouseEvent)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(CONCEPTS[5])}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {/* Wavy current lines */}
          <path
            d="M 310 330 Q 325 322 340 330 Q 355 338 370 330"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="1.5"
            markerEnd="url(#nav-arrow-courant)"
          />
          <path
            d="M 315 345 Q 330 337 345 345 Q 360 353 375 345"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="1"
            opacity="0.5"
          />
          <path
            d="M 320 358 Q 335 350 350 358 Q 365 366 380 358"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="0.7"
            opacity="0.3"
          />
          <text
            x="385"
            y="348"
            fill="#2dd4bf"
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
          >
            Courant
          </text>
          <rect x="305" y="318" width="120" height="50" fill="transparent" />
        </motion.g>
      </motion.svg>

      {/* Tooltip */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 pointer-events-none"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: 'translate(-50%, -100%) translateY(-12px)',
            }}
          >
            <div className="glass rounded-xl px-4 py-3 max-w-xs">
              <p className="text-ocean-400 font-semibold text-sm mb-1">{active.label}</p>
              <p className="text-foam-200 text-xs leading-relaxed">{active.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction text */}
      <p className="absolute bottom-2 left-0 right-0 text-center text-foam-300 text-sm opacity-60">
        Survolez les concepts de navigation pour les explorer
      </p>
    </div>
  )
}
