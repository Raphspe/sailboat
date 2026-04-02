import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExpressionsDiagramProps {
  onExpressionSelect?: (expr: { id: string; label: string; description: string }) => void
  selectedId?: string | null
}

interface Expression {
  id: string
  label: string
  description: string
  x: number
  y: number
  width: number
  height: number
  floatDelay: number
  icon?: 'wind' | 'cloud' | 'arrow' | 'eye' | 'wave'
}

// 17 expressions — laid out in a clean 3-column grid with staggered rows
const COL1 = 15, COL2 = 175, COL3 = 340
const ROW1 = 30, ROW2 = 85, ROW3 = 140, ROW4 = 195, ROW5 = 250, ROW6 = 305

const EXPRESSIONS: Expression[] = [
  // Row 1
  { id: 'naviguer-a-vue', label: 'Naviguer à vue', description: 'Naviguer sans instruments, en observant. Au figuré : improviser.', x: COL1, y: ROW1, width: 130, height: 38, floatDelay: 0, icon: 'eye' },
  { id: 'toutes-voiles-dehors', label: 'Toutes voiles dehors', description: 'Toutes les voiles déployées. Au figuré : à fond, sans retenue.', x: COL2, y: ROW1, width: 150, height: 38, floatDelay: 0.4 },
  { id: 'coup-de-tabac', label: 'Coup de tabac', description: 'Tempête soudaine et violente en mer.', x: COL3, y: ROW1, width: 125, height: 38, floatDelay: 0.8, icon: 'cloud' },
  // Row 2
  { id: 'virer-de-bord-figure', label: 'Virer de bord', description: 'Changer radicalement de direction ou d\'avis.', x: COL1, y: ROW2, width: 120, height: 38, floatDelay: 1.2, icon: 'arrow' },
  { id: 'au-vent', label: 'Au vent', description: 'Le côté exposé, d\'où vient le vent.', x: COL2, y: ROW2, width: 95, height: 38, floatDelay: 1.6, icon: 'wind' },
  { id: 'vent-debout', label: 'Vent debout', description: 'Face au vent — impossible de naviguer à la voile.', x: COL3, y: ROW2, width: 115, height: 38, floatDelay: 2.0 },
  // Row 3
  { id: 'en-facheux', label: 'Être en fâcheux', description: 'Être en position délicate, en difficulté à bord.', x: COL1, y: ROW3, width: 130, height: 38, floatDelay: 0.3 },
  { id: 'grain', label: 'Grain', description: 'Perturbation courte mais intense : vent + pluie soudains.', x: COL2, y: ROW3, width: 95, height: 38, floatDelay: 0.7, icon: 'cloud' },
  { id: 'dans-le-lit-du-vent', label: 'Lit du vent', description: 'Zone face au vent où les voiles battent et le bateau s\'arrête.', x: COL3, y: ROW3, width: 110, height: 38, floatDelay: 1.1 },
  // Row 4
  { id: 'gite', label: 'Gîte', description: 'Inclinaison latérale du bateau sous l\'effet du vent.', x: COL1, y: ROW4, width: 95, height: 38, floatDelay: 1.5 },
  { id: 'corne', label: 'Corne', description: 'Espar servant au gréement de certaines voiles.', x: COL2, y: ROW4, width: 95, height: 38, floatDelay: 1.9 },
  { id: 'vent-en-poupe', label: 'Vent en poupe', description: 'Avoir le succès avec soi. Le vent pousse dans le dos.', x: COL3, y: ROW4, width: 130, height: 38, floatDelay: 2.3, icon: 'wind' },
  // Row 5
  { id: 'larguer-les-amarres', label: 'Larguer les amarres', description: 'Détacher les amarres — partir. Au figuré : prendre le large.', x: COL1, y: ROW5, width: 145, height: 38, floatDelay: 0.5, icon: 'wave' },
  { id: 'sous-le-vent', label: 'Sous le vent', description: 'Le côté abrité, protégé du vent.', x: COL2, y: ROW5, width: 115, height: 38, floatDelay: 0.9, icon: 'wind' },
  { id: 'tenir-la-barre', label: 'Tenir la barre', description: 'Diriger le bateau. Au figuré : être aux commandes.', x: COL3, y: ROW5, width: 120, height: 38, floatDelay: 1.3 },
  // Row 6
  { id: 'pot-au-noir', label: 'Pot-au-noir', description: 'Zone équatoriale de calmes et grains violents imprévisibles.', x: COL1, y: ROW6, width: 115, height: 38, floatDelay: 1.7, icon: 'cloud' },
  { id: 'vent-de-travers', label: 'Vent de travers', description: 'Vent arrivant perpendiculairement au bateau.', x: COL2, y: ROW6, width: 130, height: 38, floatDelay: 2.1, icon: 'wind' },
]

function WindIcon({ x, y }: { x: number; y: number }) {
  return (
    <g opacity="0.4">
      <path d={`M${x} ${y} Q${x + 8} ${y - 4} ${x + 16} ${y}`} fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeLinecap="round" />
      <path d={`M${x + 2} ${y + 5} Q${x + 10} ${y + 1} ${x + 18} ${y + 5}`} fill="none" stroke="#7dd3fc" strokeWidth="1" strokeLinecap="round" />
      <path d={`M${x + 16} ${y} l3 -2 -1 3`} fill="#7dd3fc" stroke="none" />
    </g>
  )
}

function CloudIcon({ x, y }: { x: number; y: number }) {
  return (
    <g opacity="0.35">
      <path
        d={`M${x + 4} ${y + 10} Q${x} ${y + 10} ${x} ${y + 6} Q${x} ${y + 2} ${x + 5} ${y + 2} Q${x + 6} ${y - 1} ${x + 10} ${y} Q${x + 14} ${y - 1} ${x + 16} ${y + 2} Q${x + 20} ${y + 2} ${x + 20} ${y + 6} Q${x + 20} ${y + 10} ${x + 16} ${y + 10} Z`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.2"
      />
      <line x1={x + 8} y1={y + 12} x2={x + 7} y2={y + 16} stroke="#94a3b8" strokeWidth="0.8" strokeLinecap="round" />
      <line x1={x + 12} y1={y + 12} x2={x + 11} y2={y + 17} stroke="#94a3b8" strokeWidth="0.8" strokeLinecap="round" />
    </g>
  )
}

function CurvedArrowIcon({ x, y }: { x: number; y: number }) {
  return (
    <g opacity="0.4">
      <path
        d={`M${x} ${y + 10} Q${x} ${y} ${x + 10} ${y} Q${x + 20} ${y} ${x + 20} ${y + 10}`}
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d={`M${x + 18} ${y + 7} l2 3 3 -2`} fill="#7dd3fc" stroke="none" />
    </g>
  )
}

function EyeIcon({ x, y }: { x: number; y: number }) {
  return (
    <g opacity="0.4">
      <path
        d={`M${x} ${y + 6} Q${x + 8} ${y} ${x + 16} ${y + 6} Q${x + 8} ${y + 12} ${x} ${y + 6} Z`}
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="1.2"
      />
      <circle cx={x + 8} cy={y + 6} r="2.5" fill="none" stroke="#7dd3fc" strokeWidth="1" />
      <circle cx={x + 8} cy={y + 6} r="1" fill="#7dd3fc" />
    </g>
  )
}

function WaveIcon({ x, y }: { x: number; y: number }) {
  return (
    <g opacity="0.35">
      <path d={`M${x} ${y + 4} Q${x + 4} ${y} ${x + 8} ${y + 4} Q${x + 12} ${y + 8} ${x + 16} ${y + 4}`} fill="none" stroke="#7dd3fc" strokeWidth="1" strokeLinecap="round" />
      <path d={`M${x + 2} ${y + 9} Q${x + 6} ${y + 5} ${x + 10} ${y + 9} Q${x + 14} ${y + 13} ${x + 18} ${y + 9}`} fill="none" stroke="#7dd3fc" strokeWidth="0.8" strokeLinecap="round" />
    </g>
  )
}

function ExpressionIcon({ icon, x, y }: { icon?: string; x: number; y: number }) {
  switch (icon) {
    case 'wind': return <WindIcon x={x} y={y} />
    case 'cloud': return <CloudIcon x={x} y={y} />
    case 'arrow': return <CurvedArrowIcon x={x} y={y} />
    case 'eye': return <EyeIcon x={x} y={y} />
    case 'wave': return <WaveIcon x={x} y={y} />
    default: return null
  }
}

export default function ExpressionsDiagram({ onExpressionSelect, selectedId }: ExpressionsDiagramProps) {
  const [hoveredExpr, setHoveredExpr] = useState<Expression | null>(null)

  // External selection from play mode (strip "expr-" prefix to match EXPRESSIONS ids)
  const externalId = selectedId?.startsWith('expr-') ? selectedId.slice(5) : selectedId
  const externalExpr = externalId ? EXPRESSIONS.find(e => e.id === externalId) : null
  const activeExpr = hoveredExpr || externalExpr || null

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <motion.svg
        viewBox="0 0 500 450"
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Wave lines at bottom */}
        <g opacity="0.15">
          <path d="M0 370 Q30 360 60 370 Q90 380 120 370 Q150 360 180 370 Q210 380 240 370 Q270 360 300 370 Q330 380 360 370 Q390 360 420 370 Q450 380 480 370 L500 370" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M0 380 Q35 372 70 380 Q105 388 140 380 Q175 372 210 380 Q245 388 280 380 Q315 372 350 380 Q385 388 420 380 Q455 372 490 380 L500 380" fill="none" stroke="#38bdf8" strokeWidth="1" />
          <path d="M0 390 Q40 384 80 390 Q120 396 160 390 Q200 384 240 390 Q280 396 320 390 Q360 384 400 390 Q440 396 480 390 L500 390" fill="none" stroke="#38bdf8" strokeWidth="0.8" />
        </g>

        {/* Dock / shore line on the left */}
        <g opacity="0.12">
          <line x1="0" y1="340" x2="0" y2="400" stroke="#94a3b8" strokeWidth="3" />
          <line x1="0" y1="360" x2="30" y2="360" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="0" y1="375" x2="25" y2="375" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Sailboat silhouette — center bottom */}
        <g opacity="0.3">
          {/* Hull */}
          <path
            d="M200 365 Q210 355 250 355 Q290 355 300 365 Q280 375 220 375 Z"
            fill="#1e3a5f"
            stroke="#38bdf8"
            strokeWidth="0.8"
          />
          {/* Mast */}
          <line x1="250" y1="355" x2="250" y2="260" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Mainsail */}
          <path
            d="M250 265 L250 350 L290 345 Z"
            fill="#0c4a6e"
            stroke="#38bdf8"
            strokeWidth="0.6"
          />
          {/* Jib */}
          <path
            d="M250 270 L250 340 L220 345 Z"
            fill="#0c4a6e"
            stroke="#38bdf8"
            strokeWidth="0.5"
          />
          {/* Helm / tiller */}
          <line x1="300" y1="362" x2="320" y2="358" stroke="#38bdf8" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Subtle compass rose in background */}
        <g opacity="0.06" transform="translate(420, 410)">
          <line x1="0" y1="-18" x2="0" y2="18" stroke="#7dd3fc" strokeWidth="1" />
          <line x1="-18" y1="0" x2="18" y2="0" stroke="#7dd3fc" strokeWidth="1" />
          <polygon points="0,-16 3,-4 -3,-4" fill="#7dd3fc" />
          <text x="0" y="-20" fill="#7dd3fc" fontSize="6" fontFamily="Inter, sans-serif" textAnchor="middle">N</text>
        </g>

        {/* Expression bubbles */}
        {EXPRESSIONS.map((expr) => {
          const isActive = activeExpr?.id === expr.id
          const iconX = expr.x + expr.width - 24
          const iconY = expr.y - 18

          return (
            <motion.g
              key={expr.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: [0, -4, 0, 3, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: expr.floatDelay * 0.3 },
                y: {
                  duration: 4 + expr.floatDelay * 0.5,
                  delay: expr.floatDelay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredExpr(expr)}
              onMouseLeave={() => setHoveredExpr(null)}
              onClick={() => {
                setHoveredExpr(expr)
                onExpressionSelect?.({
                  id: expr.id,
                  label: expr.label,
                  description: expr.description,
                })
              }}
            >
              {/* Glow effect on active */}
              {isActive && (
                <rect
                  x={expr.x - 2}
                  y={expr.y - 2}
                  width={expr.width + 4}
                  height={expr.height + 4}
                  rx="14"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
              )}

              {/* Bubble background */}
              <motion.rect
                x={expr.x}
                y={expr.y}
                width={expr.width}
                height={expr.height}
                rx="12"
                fill="rgba(255,255,255,0.02)"
                stroke={isActive ? 'rgba(14,165,233,0.6)' : 'rgba(255,255,255,0.1)'}
                strokeWidth={isActive ? 1.5 : 0.8}
                animate={{
                  scale: isActive ? 1.04 : 1,
                }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: `${expr.x + expr.width / 2}px ${expr.y + expr.height / 2}px` }}
              />

              {/* Expression text */}
              <text
                x={expr.x + expr.width / 2}
                y={expr.y + expr.height / 2 + 1}
                fill="#e0f2fe"
                fontSize="10.5"
                fontFamily="Inter, sans-serif"
                fontWeight={isActive ? '600' : '400'}
                textAnchor="middle"
                dominantBaseline="middle"
                opacity={isActive ? 1 : 0.7}
                className="pointer-events-none"
                style={{
                  filter: isActive ? 'drop-shadow(0 0 4px rgba(14,165,233,0.4))' : 'none',
                }}
              >
                {expr.label}
              </text>

              {/* Decorative icon */}
              {expr.icon && (
                <ExpressionIcon icon={expr.icon} x={iconX} y={iconY} />
              )}
            </motion.g>
          )
        })}
      </motion.svg>

      {/* Info card */}
      <AnimatePresence>
        {activeExpr && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-xl p-4 mt-4"
          >
            <h4 className="text-ocean-400 font-semibold text-sm mb-1">
              {activeExpr.label}
            </h4>
            <p className="text-foam-200 text-sm leading-relaxed">
              {activeExpr.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-foam-300 text-sm mt-4 opacity-60">
        Cliquez sur une expression pour en savoir plus
      </p>
    </div>
  )
}
