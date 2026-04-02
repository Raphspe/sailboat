import { useParams, Link } from 'react-router'
import { motion } from 'framer-motion'
import { ChevronLeft, Wind, Triangle, Ship, Cable, SlidersHorizontal, Compass, RotateCcw, MessageCircle } from 'lucide-react'
import { getCategoryById } from '../data/categories'
import LexiconGrid from '../components/lexicon/LexiconGrid'
import WindDiagram from '../components/diagrams/WindDiagram'
import SailTrimDiagram from '../components/diagrams/SailTrimDiagram'
import SailboatDiagram from '../components/diagrams/SailboatDiagram'
import NavigationDiagram from '../components/diagrams/NavigationDiagram'
import ManeuverDiagram from '../components/diagrams/ManeuverDiagram'
import ExpressionsDiagram from '../components/diagrams/ExpressionsDiagram'

const ICON_MAP: Record<string, React.ElementType> = {
  Wind, Triangle, Ship, Cable, SlidersHorizontal, Compass, RotateCcw, MessageCircle,
}

const COLOR_BG: Record<string, string> = {
  ocean: 'bg-ocean-500/8',
  seagreen: 'bg-seagreen-500/8',
  coral: 'bg-coral-500/8',
  amber: 'bg-amber-500/8',
  purple: 'bg-purple-500/8',
  rose: 'bg-rose-500/8',
}

const COLOR_TEXT: Record<string, string> = {
  ocean: 'text-ocean-400',
  seagreen: 'text-seagreen-400',
  coral: 'text-coral-400',
  amber: 'text-amber-400',
  purple: 'text-purple-400',
  rose: 'text-rose-400',
}

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = getCategoryById(categoryId || '')

  if (!category) {
    return (
      <div className="px-6 py-20 text-center">
        <h1 className="text-2xl text-foam-100 mb-4">Catégorie introuvable</h1>
        <Link to="/lexique" className="text-ocean-400 hover:underline">
          Retour au lexique
        </Link>
      </div>
    )
  }

  const Icon = ICON_MAP[category.icon] || Wind
  const colorBg = COLOR_BG[category.color] || 'bg-ocean-500/8'
  const colorText = COLOR_TEXT[category.color] || 'text-ocean-400'

  const showDiagram = () => {
    switch (category.id) {
      case 'allures':
        return <WindDiagram />
      case 'reglage':
        return <SailTrimDiagram />
      case 'navigation':
        return <NavigationDiagram />
      case 'manoeuvres-fondamentales':
        return <ManeuverDiagram />
      case 'expressions':
        return <ExpressionsDiagram />
      case 'voiles':
        return <SailboatDiagram filter="voiles" />
      case 'manoeuvres':
        return <SailboatDiagram filter="cordages" />
      case 'anatomie':
        return <SailboatDiagram />
      default:
        return null
    }
  }

  const diagram = showDiagram()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-8 pb-20 max-w-6xl mx-auto"
    >
      {/* Breadcrumb */}
      <Link
        to="/lexique"
        className="inline-flex items-center gap-1.5 text-foam-300/60 hover:text-ocean-400 transition-colors text-sm mb-8"
      >
        <ChevronLeft size={14} />
        Retour au lexique
      </Link>

      {/* Category header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl ${colorBg} border border-white/5 flex items-center justify-center`}>
            <Icon size={26} className={colorText} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              <span className={colorText}>{category.title}</span>
            </h1>
            <p className="text-foam-300/60 text-sm">{category.subtitle}</p>
          </div>
        </div>
        <p className="text-foam-200/80 max-w-2xl leading-relaxed text-[15px]">{category.description}</p>
      </div>

      {/* Interactive diagram */}
      {diagram && (
        <div className="mb-16">
          <h2 className="text-lg font-semibold text-foam-100 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Schéma interactif
          </h2>
          <div className="bg-navy-800/20 border border-white/5 rounded-3xl p-6">
            {diagram}
          </div>
        </div>
      )}

      {/* Entries grid */}
      <div>
        <h2 className="text-lg font-semibold text-foam-100 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Tous les termes
          <span className="text-foam-300/30 font-normal ml-2 text-sm">{category.entries.length}</span>
        </h2>
        <LexiconGrid entries={category.entries} />
      </div>
    </motion.div>
  )
}
