import { motion } from 'framer-motion'
import { Link } from 'react-router'

/* Fake ad placeholders to visualize different AdSense placements */
function AdBanner({ width, height, label }: { width: string; height: string; label: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl border-2 border-dashed border-ocean-500/20 text-ocean-400/30 text-xs font-medium"
      style={{ width, height, background: 'rgba(14,165,233,0.03)' }}
    >
      {label}
    </div>
  )
}

function FakeCard({ title }: { title: string }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-medium text-foam-100 mb-2">{title}</h3>
      <p className="text-foam-200/50 text-xs leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Voile et navigation.</p>
    </div>
  )
}

export default function AdDemoPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 pt-20 pb-20 max-w-5xl mx-auto"
    >
      <h1 className="text-2xl font-bold text-foam-100 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        Placements publicitaires
      </h1>
      <p className="text-foam-300/40 text-sm mb-12">
        4 options d'intégration AdSense — compare et choisis
      </p>

      {/* === OPTION A: Bannière horizontale entre le header et le contenu === */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-ocean-400 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          A — Bannière horizontale en haut
        </h2>
        <p className="text-foam-300/30 text-xs mb-4">Leaderboard (728x90) sous la navigation, avant le contenu. Visible sur toutes les pages.</p>
        <div className="rounded-3xl p-6 space-y-4" style={{ background: 'rgba(3,13,26,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Fake nav */}
          <div className="flex gap-3 mb-2">
            <div className="w-20 h-3 rounded-full bg-white/[0.06]" />
            <div className="w-16 h-3 rounded-full bg-white/[0.06]" />
            <div className="w-18 h-3 rounded-full bg-white/[0.06]" />
          </div>
          {/* Ad banner */}
          <div className="flex justify-center">
            <AdBanner width="728px" height="90px" label="Bannière 728×90" />
          </div>
          {/* Fake content */}
          <div className="grid grid-cols-3 gap-3">
            <FakeCard title="Grand-voile" />
            <FakeCard title="Génois" />
            <FakeCard title="Spinnaker" />
          </div>
        </div>
      </section>

      {/* === OPTION B: Pub dans le flux des cards === */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-ocean-400 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          B — Pub intégrée dans la grille
        </h2>
        <p className="text-foam-300/30 text-xs mb-4">In-feed ad (300x250) au milieu des cards du lexique. Se fond dans le design.</p>
        <div className="rounded-3xl p-6" style={{ background: 'rgba(3,13,26,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="grid grid-cols-3 gap-3">
            <FakeCard title="Quille" />
            <FakeCard title="Safran" />
            {/* Ad card */}
            <div className="flex items-center justify-center">
              <AdBanner width="100%" height="100%" label="In-feed 300×250" />
            </div>
            <FakeCard title="Barre" />
            <FakeCard title="Cockpit" />
            <FakeCard title="Mât" />
          </div>
        </div>
      </section>

      {/* === OPTION C: Sidebar sticky sur Explorer === */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-ocean-400 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          C — Sidebar en bas du panneau Explorer
        </h2>
        <p className="text-foam-300/30 text-xs mb-4">Rectangle (300x250) en bas du panneau lexique sur la page Explorer. Toujours visible.</p>
        <div className="rounded-3xl p-6 flex gap-4" style={{ background: 'rgba(3,13,26,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Fake diagram */}
          <div className="flex-1 h-64 rounded-2xl bg-white/[0.02] flex items-center justify-center text-foam-300/15 text-sm">
            Schéma voilier
          </div>
          {/* Fake panel */}
          <div className="w-[300px] space-y-2">
            <div className="h-8 rounded-lg bg-white/[0.04]" />
            <div className="h-6 rounded-lg bg-white/[0.03] w-3/4" />
            <div className="h-6 rounded-lg bg-white/[0.03] w-full" />
            <div className="h-6 rounded-lg bg-white/[0.03] w-5/6" />
            <div className="h-6 rounded-lg bg-white/[0.03] w-2/3" />
            <div className="mt-3">
              <AdBanner width="100%" height="120px" label="Rectangle 300×250" />
            </div>
          </div>
        </div>
      </section>

      {/* === OPTION D: Interstitiel entre les fiches en mode play === */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-ocean-400 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          D — Native ad entre les fiches (mode play)
        </h2>
        <p className="text-foam-300/30 text-xs mb-4">Pub native toutes les 5 fiches en mode play. Style identique aux cards.</p>
        <div className="rounded-3xl p-6 space-y-3 max-w-sm" style={{ background: 'rgba(3,13,26,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Card detail */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foam-100 text-sm font-medium">Bôme</span>
              <span className="text-foam-300/20 text-[10px]">4/37</span>
            </div>
            <p className="text-foam-200/50 text-xs">Espar horizontal au pied de la grand-voile...</p>
          </div>
          {/* Flèches */}
          <div className="flex justify-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center text-foam-300/20 text-xs">←</div>
            <div className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center text-foam-300/20 text-xs">→</div>
          </div>
          {/* Ad native */}
          <div className="rounded-2xl p-4 border border-dashed border-ocean-500/20" style={{ background: 'rgba(14,165,233,0.03)' }}>
            <p className="text-[9px] text-foam-300/20 uppercase tracking-widest mb-2">Sponsorisé</p>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-lg bg-ocean-500/10" />
              <div>
                <p className="text-foam-100/70 text-xs font-medium">Manuel de voile Glénans</p>
                <p className="text-foam-300/30 text-[10px]">Le guide de référence → amazon.fr</p>
              </div>
            </div>
          </div>
          {/* Next card */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foam-100 text-sm font-medium">Bouchain</span>
              <span className="text-foam-300/20 text-[10px]">5/37</span>
            </div>
            <p className="text-foam-200/50 text-xs">Angle entre le fond et les côtés...</p>
          </div>
        </div>
      </section>

      <div className="text-center">
        <Link to="/explorer" className="text-ocean-400/50 hover:text-ocean-400 text-sm transition-colors">
          ← Retour à l'explorateur
        </Link>
      </div>
    </motion.div>
  )
}
