import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Ship, Sailboat } from 'lucide-react'
import { useEffect, useRef } from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window { VANTA?: any; THREE?: any }
}

function VantaBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const effect = useRef<any>(null)

  useEffect(() => {
    if (!ref.current || effect.current) return
    const id = setInterval(() => {
      if (window.VANTA?.WAVES && window.THREE && ref.current) {
        effect.current = window.VANTA.WAVES({
          el: ref.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          color: 0x030d1a,
          shininess: 30,
          waveHeight: 20,
          waveSpeed: 0.8,
          zoom: 0.8,
        })
        clearInterval(id)
      }
    }, 50)
    return () => { clearInterval(id); effect.current?.destroy(); effect.current = null }
  }, [])

  return <div ref={ref} className="fixed inset-0 z-0" style={{ background: '#030d1a' }} />
}



export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[calc(100svh-4rem)] flex flex-col items-center justify-center relative overflow-hidden"
    >
      <VantaBackground />

      {/* Soft dark overlay to improve text readability over waves */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center 40%, rgba(3,13,26,0.4) 0%, rgba(3,13,26,0.7) 100%)',
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-3xl">
        {/* Logo icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <Sailboat size={40} className="text-ocean-400" strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-5 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-white">Tout savoir sur le </span>
            <span style={{
              color: '#38bdf8',
              textShadow: '0 0 30px rgba(56,189,248,0.4), 0 0 60px rgba(56,189,248,0.2)',
            }}>voilier</span>
          </h1>
          <p className="text-foam-200/70 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
            Maîtrise le vocabulaire du voilier avec des schémas interactifs.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-10 md:mb-14 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link
            to="/explorer"
            className="group relative px-6 py-3.5 md:px-8 md:py-4 rounded-2xl font-semibold text-sm transition-all duration-300 text-white text-center w-full sm:w-64"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.35), rgba(6,182,212,0.25))',
              border: '1px solid rgba(56,189,248,0.3)',
              boxShadow: '0 4px 30px rgba(14,165,233,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <span className="flex items-center justify-center gap-2.5">
              <Ship size={18} />
              Explorer
            </span>
          </Link>
          <Link
            to="/lexique"
            className="px-6 py-3.5 md:px-8 md:py-4 rounded-2xl text-foam-200/80 hover:text-white text-sm font-semibold transition-all duration-300 backdrop-blur-xl text-center w-full sm:w-64"
            style={{
              background: 'rgba(3, 13, 26, 0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Voir le lexique
          </Link>
        </motion.div>

        {/* Stats — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="hidden sm:flex items-center gap-10 text-center"
        >
          {[
            { value: '110', label: 'composants' },
            { value: '6', label: 'schémas' },
            { value: '160+', label: 'termes' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-2xl font-bold text-ocean-400 tabular-nums">{stat.value}</div>
              <div className="text-[11px] text-foam-300/30 mt-0.5 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Book recommendations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden sm:block mt-10"
        >
          <p className="text-foam-300/20 text-[10px] uppercase tracking-widest text-center mb-3">Pour aller plus loin</p>
          <div className="flex gap-3 justify-center">
            <a
              href="https://www.amazon.fr/dp/2020130912?tag=YOUR_AFFILIATE_TAG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(3, 13, 26, 0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span className="text-lg">📘</span>
              <div>
                <p className="text-foam-100/70 text-xs font-medium">Le cours des Glénans</p>
                <p className="text-foam-300/25 text-[10px]">La bible de la voile</p>
              </div>
            </a>
            <a
              href="https://www.amazon.fr/dp/2742448187?tag=YOUR_AFFILIATE_TAG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(3, 13, 26, 0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span className="text-lg">📙</span>
              <div>
                <p className="text-foam-100/70 text-xs font-medium">Voile et navigation</p>
                <p className="text-foam-300/25 text-[10px]">Le guide pratique Vagnon</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
