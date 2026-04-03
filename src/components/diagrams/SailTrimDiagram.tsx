import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TrimState = 'bordee' | 'optimale' | 'choquee' | 'faseyante'

interface TrimInfo {
  id: TrimState
  label: string
  description: string
  sailPath: string
  color: string
  penons: { windward: 'ok' | 'down'; leeward: 'ok' | 'down' }
}

const TRIM_STATES: TrimInfo[] = [
  {
    id: 'bordee',
    label: 'Trop bordée',
    description: 'La voile est trop tirée vers l\'intérieur. Le penon sous le vent s\'effondre. Il faut choquer (relâcher) l\'écoute.',
    sailPath: 'M 200 50 Q 210 150 215 250 Q 218 320 220 380',
    color: '#f97316',
    penons: { windward: 'ok', leeward: 'down' },
  },
  {
    id: 'optimale',
    label: 'Réglage optimal',
    description: 'Les deux penons volent horizontalement. La voile est à son angle idéal. C\'est la position parfaite !',
    sailPath: 'M 200 50 Q 230 150 250 250 Q 260 320 265 380',
    color: '#10b981',
    penons: { windward: 'ok', leeward: 'ok' },
  },
  {
    id: 'choquee',
    label: 'Trop choquée',
    description: 'La voile est trop relâchée. Le penon au vent (côté exposé) s\'effondre. Il faut border (tirer) l\'écoute.',
    sailPath: 'M 200 50 Q 260 150 300 250 Q 320 320 330 380',
    color: '#f97316',
    penons: { windward: 'down', leeward: 'ok' },
  },
  {
    id: 'faseyante',
    label: 'Faseyante',
    description: 'La voile claque au vent, elle ne capte plus le vent efficacement. Border progressivement jusqu\'à ce que le faseyement cesse.',
    sailPath: 'M 200 50 Q 280 120 240 200 Q 300 280 260 380',
    color: '#f43f5e',
    penons: { windward: 'down', leeward: 'down' },
  },
]

export default function SailTrimDiagram({ selectedId }: { selectedId?: string | null }) {
  // External selection from play mode (strip "trim-" prefix)
  const externalState = selectedId?.startsWith('trim-') ? selectedId.slice(5) as TrimState : null
  const [manualState, setManualState] = useState<TrimState>('optimale')
  const activeState = externalState || manualState
  const trimInfo = TRIM_STATES.find(t => t.id === activeState)!

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* State selector buttons */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {TRIM_STATES.map(state => (
          <button
            key={state.id}
            onClick={() => setManualState(state.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeState === state.id
                ? 'bg-ocean-500/20 text-ocean-400 border border-ocean-500/30'
                : 'glass glass-hover text-foam-300'
            }`}
          >
            {state.label}
          </button>
        ))}
      </div>

      {/* SVG Diagram */}
      <motion.svg
        viewBox="0 0 450 450"
        className="w-full h-auto"
        role="img"
        aria-label="Diagramme interactif du réglage des voiles avec 4 états de réglage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Wind arrows */}
        <defs>
          <marker id="trim-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#7dd3fc" />
          </marker>
        </defs>
        {[80, 140, 200, 260, 320].map(y => (
          <line key={y} x1="30" y1={y} x2="80" y2={y} stroke="#7dd3fc" strokeWidth="1" markerEnd="url(#trim-arrow)" opacity="0.3" />
        ))}
        <text x="20" y="50" fill="#7dd3fc" fontSize="10" fontFamily="Inter, sans-serif" opacity="0.5" transform="rotate(-90,20,50)">VENT</text>

        {/* Mast */}
        <line x1="200" y1="40" x2="200" y2="390" stroke="#7a9abf" strokeWidth="3" strokeLinecap="round" />

        {/* Sail shape (animated) */}
        <motion.path
          d={trimInfo.sailPath}
          fill="none"
          stroke={trimInfo.color}
          strokeWidth="2.5"
          initial={false}
          animate={{ d: trimInfo.sailPath }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Sail fill area */}
        <motion.path
          d={trimInfo.sailPath + ' L 200 380 L 200 50 Z'}
          fill={trimInfo.color}
          fillOpacity={0.08}
          initial={false}
          animate={{ d: trimInfo.sailPath + ' L 200 380 L 200 50 Z' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Penon windward (au vent - left side) */}
        <g transform="translate(185, 180)">
          <motion.line
            x1="0" y1="0"
            x2="-15"
            animate={{
              y2: trimInfo.penons.windward === 'ok' ? 0 : 12,
              x2: trimInfo.penons.windward === 'ok' ? -20 : -10,
            }}
            stroke={trimInfo.penons.windward === 'ok' ? '#10b981' : '#f43f5e'}
            strokeWidth="2.5"
            strokeLinecap="round"
            transition={{ duration: 0.4 }}
          />
          <text x="-35" y="5" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="Inter, sans-serif">
            Au vent
          </text>
        </g>

        {/* Penon leeward (sous le vent - right side) */}
        {(() => {
          return (
            <g transform="translate(245, 180)">
              <motion.line
                x1="0" y1="0"
                animate={{
                  y2: trimInfo.penons.leeward === 'ok' ? 0 : 12,
                  x2: trimInfo.penons.leeward === 'ok' ? 20 : 10,
                }}
                stroke={trimInfo.penons.leeward === 'ok' ? '#10b981' : '#f43f5e'}
                strokeWidth="2.5"
                strokeLinecap="round"
                transition={{ duration: 0.4 }}
              />
              <text x="25" y="5" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="Inter, sans-serif">
                Sous le vent
              </text>
            </g>
          )
        })()}

        {/* Boom */}
        <motion.line
          x1="200" y1="385"
          animate={{
            x2: activeState === 'bordee' ? 220 : activeState === 'faseyante' ? 280 : activeState === 'choquee' ? 330 : 265,
          }}
          y2="385"
          stroke="#7a9abf"
          strokeWidth="3"
          strokeLinecap="round"
          transition={{ duration: 0.5 }}
        />

        {/* Labels */}
        <text x="200" y="420" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Inter, sans-serif" textAnchor="middle">
          Mât
        </text>

        {/* Faseyement indicator */}
        <AnimatePresence>
          {activeState === 'faseyante' && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[100, 160, 220, 280, 340].map(y => (
                <motion.line
                  key={y}
                  x1={220 + Math.sin(y) * 10}
                  y1={y}
                  x2={230 + Math.sin(y) * 15}
                  y2={y + 5}
                  stroke="#f43f5e"
                  strokeWidth="1"
                  opacity="0.4"
                  animate={{ x1: [220, 235, 220], x2: [230, 245, 230] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: y * 0.002 }}
                />
              ))}
            </motion.g>
          )}
        </AnimatePresence>
      </motion.svg>

      {/* Info panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeState}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="glass rounded-xl p-4 mt-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: trimInfo.color }} />
            <h4 className="font-semibold" style={{ color: trimInfo.color }}>{trimInfo.label}</h4>
          </div>
          <p className="text-foam-200 text-sm leading-relaxed">{trimInfo.description}</p>
          {activeState === 'optimale' && (
            <p className="text-seagreen-400 text-xs mt-2 font-medium">
              La règle d'or : border jusqu'à ce que le faseyement s'arrête, pas plus.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
