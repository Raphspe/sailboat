import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface ShareButtonProps {
  entryId: string
  className?: string
}

export default function ShareButton({ entryId, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const url = `https://sailboat.raphspe.com/explorer?select=${entryId}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'SAILBOAT', url })
      } catch {
        // User cancelled or error — ignore
      }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`relative inline-flex ${className}`}>
      <button
        onClick={handleShare}
        className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-foam-300/30 hover:text-ocean-400 hover:border-ocean-500/20 transition-all"
        title="Partager"
        aria-label="Partager ce terme"
      >
        <Share2 size={12} />
      </button>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-ocean-400 bg-navy-800/90 border border-ocean-500/20 rounded-full px-2 py-0.5 whitespace-nowrap pointer-events-none"
          >
            Copié !
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
