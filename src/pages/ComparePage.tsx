import { useState } from 'react'
import { motion } from 'framer-motion'
import SailboatDiagram from '../components/diagrams/SailboatDiagram'

/* ====== VARIANTE A — Side profile minimaliste, lignes fines ====== */
function VariantA({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) {
  const parts = [
    { id: 'svg-mat', label: 'Mât', x: 200, y1: 40, y2: 280 },
    { id: 'svg-grand-voile', label: 'Grand-voile', path: 'M 202 50 Q 240 120 270 200 Q 285 250 290 275 L 202 280 Z' },
    { id: 'svg-genois', label: 'Génois', path: 'M 198 55 Q 160 120 135 200 Q 125 245 120 275 L 198 280 Z' },
    { id: 'svg-bome', label: 'Bôme', x1: 200, y: 277, x2: 288 },
    { id: 'svg-coque', label: 'Coque', path: 'M 90 285 Q 80 295 85 308 Q 100 322 200 325 Q 300 322 315 308 Q 320 295 310 285 Z' },
    { id: 'svg-quille', label: 'Quille', path: 'M 195 325 L 188 380 Q 200 386 212 380 L 205 325 Z' },
    { id: 'svg-safran', label: 'Safran', path: 'M 298 308 L 296 355 L 302 355 L 304 308 Z' },
    { id: 'svg-etai', label: 'Étai', x1: 200, y1: 42, x2: 95, y2: 285 },
    { id: 'svg-haubans', label: 'Haubans', x1: 200, y1: 42, x2: 305, y2: 285 },
  ]

  const active = (id: string) => selectedId === id
  const color = (id: string) => active(id) ? '#38bdf8' : 'rgba(56,189,248,0.25)'
  const fill = (id: string) => active(id) ? 'rgba(56,189,248,0.08)' : 'rgba(56,189,248,0.02)'

  return (
    <svg viewBox="0 0 400 420" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Water */}
      <line x1="0" y1="310" x2="400" y2="310" stroke="rgba(14,165,233,0.1)" strokeWidth="0.5" />

      {/* Étai */}
      <line x1={200} y1={42} x2={95} y2={285} stroke={color('svg-etai')} strokeWidth="1" strokeDasharray="4 3" className="cursor-pointer" onClick={() => onSelect('svg-etai')} />

      {/* Haubans */}
      <line x1={200} y1={42} x2={305} y2={285} stroke={color('svg-haubans')} strokeWidth="1" className="cursor-pointer" onClick={() => onSelect('svg-haubans')} />

      {/* Grand-voile */}
      <path d="M 202 50 Q 240 120 270 200 Q 285 250 290 275 L 202 280 Z" fill={fill('svg-grand-voile')} stroke={color('svg-grand-voile')} strokeWidth="1" className="cursor-pointer" onClick={() => onSelect('svg-grand-voile')} />

      {/* Génois */}
      <path d="M 198 55 Q 160 120 135 200 Q 125 245 120 275 L 198 280 Z" fill={fill('svg-genois')} stroke={color('svg-genois')} strokeWidth="1" className="cursor-pointer" onClick={() => onSelect('svg-genois')} />

      {/* Mât */}
      <line x1={200} y1={40} x2={200} y2={280} stroke={color('svg-mat')} strokeWidth="2.5" strokeLinecap="round" className="cursor-pointer" onClick={() => onSelect('svg-mat')} />
      <circle cx={200} cy={38} r={3} fill={color('svg-mat')} />

      {/* Bôme */}
      <line x1={200} y1={277} x2={288} y2={275} stroke={color('svg-bome')} strokeWidth="2" strokeLinecap="round" className="cursor-pointer" onClick={() => onSelect('svg-bome')} />

      {/* Coque */}
      <path d="M 90 285 Q 80 295 85 308 Q 100 322 200 325 Q 300 322 315 308 Q 320 295 310 285 Z" fill={fill('svg-coque')} stroke={color('svg-coque')} strokeWidth="1.5" className="cursor-pointer" onClick={() => onSelect('svg-coque')} />

      {/* Quille */}
      <path d="M 195 325 L 188 380 Q 200 386 212 380 L 205 325 Z" fill={fill('svg-quille')} stroke={color('svg-quille')} strokeWidth="1" className="cursor-pointer" onClick={() => onSelect('svg-quille')} />

      {/* Safran */}
      <path d="M 298 308 L 296 355 L 302 355 L 304 308 Z" fill={fill('svg-safran')} stroke={color('svg-safran')} strokeWidth="1" className="cursor-pointer" onClick={() => onSelect('svg-safran')} />

      {/* Label */}
      {selectedId && (() => {
        const part = parts.find(p => p.id === selectedId)
        return part ? (
          <text x="200" y="410" fill="#38bdf8" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">{part.label}</text>
        ) : null
      })()}
    </svg>
  )
}

/* ====== VARIANTE B — Blueprint technique, grille + cotes ====== */
function VariantB({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) {
  const active = (id: string) => selectedId === id
  const color = (id: string) => active(id) ? '#38bdf8' : 'rgba(56,189,248,0.2)'
  const fill = (id: string) => active(id) ? 'rgba(56,189,248,0.06)' : 'transparent'

  return (
    <svg viewBox="0 0 400 420" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid */}
      {Array.from({ length: 20 }, (_, i) => (
        <line key={`gv-${i}`} x1={i * 20} y1={0} x2={i * 20} y2={420} stroke="rgba(56,189,248,0.03)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 21 }, (_, i) => (
        <line key={`gh-${i}`} x1={0} y1={i * 20} x2={400} y2={i * 20} stroke="rgba(56,189,248,0.03)" strokeWidth="0.5" />
      ))}

      {/* Water line — dashed */}
      <line x1="0" y1="300" x2="400" y2="300" stroke="rgba(14,165,233,0.15)" strokeWidth="1" strokeDasharray="8 4" />
      <text x="390" y="295" fill="rgba(56,189,248,0.15)" fontSize="7" fontFamily="monospace" textAnchor="end">WATERLINE</text>

      {/* Coque — technical outline */}
      <path d="M 100 280 Q 90 290 95 305 Q 110 318 200 320 Q 290 318 305 305 Q 310 290 300 280 Z"
        fill={fill('svg-coque')} stroke={color('svg-coque')} strokeWidth="1" className="cursor-pointer" onClick={() => onSelect('svg-coque')} />
      {active('svg-coque') && <text x="200" y="305" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">COQUE</text>}

      {/* Dimension lines */}
      <line x1="95" y1="330" x2="305" y2="330" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" />
      <line x1="95" y1="326" x2="95" y2="334" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" />
      <line x1="305" y1="326" x2="305" y2="334" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" />
      <text x="200" y="338" fill="rgba(56,189,248,0.1)" fontSize="6" fontFamily="monospace" textAnchor="middle">LOA</text>

      {/* Mât */}
      <line x1={200} y1={40} x2={200} y2={280} stroke={color('svg-mat')} strokeWidth="2" strokeLinecap="round" className="cursor-pointer" onClick={() => onSelect('svg-mat')} />
      {active('svg-mat') && <>
        <line x1="210" y1="40" x2="210" y2="280" stroke="rgba(56,189,248,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="218" y="160" fill="#38bdf8" fontSize="7" fontFamily="monospace">MÂT</text>
      </>}

      {/* Grand-voile */}
      <path d="M 202 50 Q 235 120 260 200 Q 275 245 280 275 L 202 278 Z"
        fill={fill('svg-grand-voile')} stroke={color('svg-grand-voile')} strokeWidth="0.8" strokeDasharray="3 2" className="cursor-pointer" onClick={() => onSelect('svg-grand-voile')} />
      {active('svg-grand-voile') && <text x="240" y="170" fill="#38bdf8" fontSize="7" fontFamily="monospace">GV</text>}

      {/* Génois */}
      <path d="M 198 55 Q 165 120 140 200 Q 130 245 125 275 L 198 278 Z"
        fill={fill('svg-genois')} stroke={color('svg-genois')} strokeWidth="0.8" strokeDasharray="3 2" className="cursor-pointer" onClick={() => onSelect('svg-genois')} />
      {active('svg-genois') && <text x="155" y="170" fill="#38bdf8" fontSize="7" fontFamily="monospace">GÉNOIS</text>}

      {/* Bôme */}
      <line x1={200} y1={276} x2={278} y2={274} stroke={color('svg-bome')} strokeWidth="1.5" strokeLinecap="round" className="cursor-pointer" onClick={() => onSelect('svg-bome')} />

      {/* Quille */}
      <path d="M 195 320 L 190 375 Q 200 380 210 375 L 205 320 Z"
        fill={fill('svg-quille')} stroke={color('svg-quille')} strokeWidth="0.8" className="cursor-pointer" onClick={() => onSelect('svg-quille')} />
      {active('svg-quille') && <text x="200" y="360" fill="#38bdf8" fontSize="7" fontFamily="monospace" textAnchor="middle">QUILLE</text>}

      {/* Safran */}
      <path d="M 295 305 L 293 350 L 299 350 L 301 305 Z"
        fill={fill('svg-safran')} stroke={color('svg-safran')} strokeWidth="0.8" className="cursor-pointer" onClick={() => onSelect('svg-safran')} />

      {/* Étai + Haubans */}
      <line x1={200} y1={42} x2={105} y2={280} stroke={color('svg-etai')} strokeWidth="0.8" strokeDasharray="6 3" className="cursor-pointer" onClick={() => onSelect('svg-etai')} />
      <line x1={200} y1={42} x2={295} y2={280} stroke={color('svg-haubans')} strokeWidth="0.8" className="cursor-pointer" onClick={() => onSelect('svg-haubans')} />

      {/* Title */}
      <text x="10" y="15" fill="rgba(56,189,248,0.12)" fontSize="8" fontFamily="monospace">PLAN DE VOILURE</text>
    </svg>
  )
}

/* ====== VARIANTE C — Néon glow, fond très sombre ====== */
function VariantC({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) {
  const active = (id: string) => selectedId === id
  const glow = (id: string) => active(id) ? 'drop-shadow(0 0 8px rgba(56,189,248,0.6)) drop-shadow(0 0 20px rgba(56,189,248,0.3))' : 'none'
  const color = (id: string) => active(id) ? '#7dd3fc' : 'rgba(56,189,248,0.15)'
  const fill = (id: string) => active(id) ? 'rgba(56,189,248,0.04)' : 'transparent'

  return (
    <svg viewBox="0 0 400 420" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Water shimmer */}
      <path d="M 0 305 Q 50 300 100 305 Q 150 310 200 305 Q 250 300 300 305 Q 350 310 400 305" fill="none" stroke="rgba(14,165,233,0.08)" strokeWidth="1" />

      {/* Étai */}
      <line x1={200} y1={42} x2={100} y2={280} stroke={color('svg-etai')} strokeWidth="1.5" style={{ filter: glow('svg-etai') }} className="cursor-pointer" onClick={() => onSelect('svg-etai')} />

      {/* Haubans */}
      <line x1={200} y1={42} x2={300} y2={280} stroke={color('svg-haubans')} strokeWidth="1.5" style={{ filter: glow('svg-haubans') }} className="cursor-pointer" onClick={() => onSelect('svg-haubans')} />

      {/* Grand-voile */}
      <path d="M 202 50 Q 240 130 270 210 Q 282 255 288 278 L 202 280 Z"
        fill={fill('svg-grand-voile')} stroke={color('svg-grand-voile')} strokeWidth="1.5" style={{ filter: glow('svg-grand-voile') }} className="cursor-pointer" onClick={() => onSelect('svg-grand-voile')} />

      {/* Génois */}
      <path d="M 198 55 Q 160 130 135 210 Q 122 255 118 278 L 198 280 Z"
        fill={fill('svg-genois')} stroke={color('svg-genois')} strokeWidth="1.5" style={{ filter: glow('svg-genois') }} className="cursor-pointer" onClick={() => onSelect('svg-genois')} />

      {/* Mât */}
      <line x1={200} y1={38} x2={200} y2={280} stroke={color('svg-mat')} strokeWidth="3" strokeLinecap="round" style={{ filter: glow('svg-mat') }} className="cursor-pointer" onClick={() => onSelect('svg-mat')} />
      <circle cx={200} cy={36} r={4} fill={active('svg-mat') ? '#7dd3fc' : 'rgba(56,189,248,0.2)'} style={{ filter: glow('svg-mat') }} />

      {/* Bôme */}
      <line x1={200} y1={278} x2={286} y2={276} stroke={color('svg-bome')} strokeWidth="2.5" strokeLinecap="round" style={{ filter: glow('svg-bome') }} className="cursor-pointer" onClick={() => onSelect('svg-bome')} />

      {/* Coque */}
      <path d="M 90 282 Q 78 292 82 310 Q 98 325 200 328 Q 302 325 318 310 Q 322 292 310 282 Z"
        fill={fill('svg-coque')} stroke={color('svg-coque')} strokeWidth="2" style={{ filter: glow('svg-coque') }} className="cursor-pointer" onClick={() => onSelect('svg-coque')} />

      {/* Quille */}
      <path d="M 194 328 L 186 385 Q 200 392 214 385 L 206 328 Z"
        fill={fill('svg-quille')} stroke={color('svg-quille')} strokeWidth="1.5" style={{ filter: glow('svg-quille') }} className="cursor-pointer" onClick={() => onSelect('svg-quille')} />

      {/* Safran */}
      <path d="M 300 310 L 298 360 L 305 360 L 307 310 Z"
        fill={fill('svg-safran')} stroke={color('svg-safran')} strokeWidth="1.5" style={{ filter: glow('svg-safran') }} className="cursor-pointer" onClick={() => onSelect('svg-safran')} />

      {/* Label with glow */}
      {selectedId && (() => {
        const labels: Record<string, string> = { 'svg-mat': 'Mât', 'svg-grand-voile': 'Grand-voile', 'svg-genois': 'Génois', 'svg-bome': 'Bôme', 'svg-coque': 'Coque', 'svg-quille': 'Quille', 'svg-safran': 'Safran', 'svg-etai': 'Étai', 'svg-haubans': 'Haubans' }
        return (
          <text x="200" y="412" fill="#7dd3fc" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle"
            style={{ filter: 'drop-shadow(0 0 8px rgba(125,211,252,0.5))' }}>{labels[selectedId] || selectedId}</text>
        )
      })()}
    </svg>
  )
}

/* ====== PAGE ====== */
export default function ComparePage() {
  const [selectedA, setSelectedA] = useState<string | null>(null)
  const [selectedB, setSelectedB] = useState<string | null>(null)
  const [selectedC, setSelectedC] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[calc(100svh-4rem)] flex flex-col px-6 py-6 overflow-hidden"
    >
      <h1 className="text-xl font-bold text-foam-100 text-center mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        Comparaison des schémas
      </h1>

      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 min-h-0">
        {/* Actuel */}
        <div className="flex flex-col min-h-0">
          <p className="text-foam-300/40 text-xs text-center mb-2">Actuel</p>
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/5 min-h-0">
            <SailboatDiagram />
          </div>
        </div>

        {/* A — Minimaliste */}
        <div className="flex flex-col min-h-0">
          <p className="text-foam-300/40 text-xs text-center mb-2">A — Minimaliste</p>
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/5 min-h-0 flex items-center justify-center">
            <VariantA selectedId={selectedA} onSelect={setSelectedA} />
          </div>
        </div>

        {/* B — Blueprint */}
        <div className="flex flex-col min-h-0">
          <p className="text-foam-300/40 text-xs text-center mb-2">B — Blueprint</p>
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/5 min-h-0 flex items-center justify-center">
            <VariantB selectedId={selectedB} onSelect={setSelectedB} />
          </div>
        </div>

        {/* C — Néon */}
        <div className="flex flex-col min-h-0">
          <p className="text-foam-300/40 text-xs text-center mb-2">C — Néon</p>
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/5 min-h-0 flex items-center justify-center">
            <VariantC selectedId={selectedC} onSelect={setSelectedC} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
