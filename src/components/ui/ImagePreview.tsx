import { useState, useEffect } from 'react'
import { ImageIcon, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImagePreviewProps {
  term: string
}

interface WikiImage {
  title: string
  thumb: string
  full: string
  url: string
}

// Step 1: Try to find the exact Wikipedia FR article and get ALL its images
async function fetchFromWikiArticle(term: string): Promise<WikiImage[]> {
  // Try exact article title first (e.g. "Grand-voile", "Spinnaker")
  // Only try exact term if it's a specific sailing word (not a common word)
  const commonWords = new Set(['balcon', 'grain', 'cape', 'corne', 'lest', 'barre', 'bout', 'foil', 'mouillage', 'rappel', 'mou', 'ardent', 'rouf'])
  const titles = [
    `${term} (voile)`,
    `${term} (nautisme)`,
    `${term} (marine)`,
    `${term} (bateau)`,
    ...(commonWords.has(term.toLowerCase()) ? [] : [term]),
  ]

  for (const title of titles) {
    try {
      const res = await fetch(
        `https://fr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=images&imlimit=10&format=json&origin=*`
      )
      const data = await res.json()
      const pages = data.query?.pages
      if (!pages) continue

      const page = Object.values(pages)[0] as any
      if (page.missing !== undefined || !page.images) continue

      // Got images from the article — now get their URLs
      const imageNames = page.images
        .map((img: any) => img.title as string)
        .filter((t: string) => {
          const lower = t.toLowerCase()
          return !lower.includes('icon') && !lower.includes('flag') && !lower.includes('logo')
            && !lower.includes('.svg') && !lower.includes('commons-logo') && !lower.includes('wiki')
            && !lower.includes('stub') && !lower.includes('edit') && !lower.includes('padlock')
            && !lower.includes('disambig') && !lower.includes('question')
            && (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png'))
        })
        .slice(0, 5)

      if (imageNames.length === 0) continue

      const infoRes = await fetch(
        `https://fr.wikipedia.org/w/api.php?action=query&titles=${imageNames.map(encodeURIComponent).join('|')}&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json&origin=*`
      )
      const infoData = await infoRes.json()
      const infoPages = infoData.query?.pages
      if (!infoPages) continue

      const images: WikiImage[] = []
      for (const p of Object.values(infoPages) as any[]) {
        if (p.imageinfo?.[0]?.thumburl) {
          images.push({
            title: p.title?.replace('File:', '').replace('Fichier:', '') || '',
            thumb: p.imageinfo[0].thumburl,
            full: p.imageinfo[0].url,
            url: p.imageinfo[0].descriptionurl || p.imageinfo[0].url,
          })
        }
      }
      if (images.length > 0) return images
    } catch { /* try next title */ }
  }
  return []
}

// Step 2: Search Wikipedia FR articles about the term
async function fetchFromWikiSearch(term: string): Promise<WikiImage[]> {
  const searchQuery = encodeURIComponent(`"${term}" bateau voilier navigation maritime`)
  const res = await fetch(
    `https://fr.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchQuery}&gsrlimit=5&prop=pageimages&piprop=thumbnail&pithumbsize=600&format=json&origin=*`
  )
  const data = await res.json()
  if (!data.query?.pages) return []

  return Object.values(data.query.pages)
    .filter((p: any) => p.thumbnail?.source)
    .map((p: any) => ({
      title: p.title || '',
      thumb: p.thumbnail.source,
      full: p.thumbnail.source.replace(/\/\d+px-/, '/800px-'),
      url: `https://fr.wikipedia.org/wiki/${encodeURIComponent(p.title)}`,
    }))
}

// Step 3: Fallback to Commons with strict sailing filter
async function fetchFromCommons(term: string): Promise<WikiImage[]> {
  const query = encodeURIComponent(`"${term}" voilier sailing bateau`)
  const res = await fetch(
    `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json&origin=*`
  )
  const data = await res.json()
  if (!data.query?.pages) return []

  return Object.values(data.query.pages)
    .filter((p: any) => {
      const thumb = p.imageinfo?.[0]?.thumburl
      if (!thumb) return false
      const title = (p.title || '').toLowerCase()
      return !title.includes('flag') && !title.includes('logo') && !title.includes('icon')
        && !title.includes('.svg') && !title.includes('map') && !title.includes('stub')
    })
    .map((p: any) => ({
      title: p.title?.replace('File:', '') || '',
      thumb: p.imageinfo[0].thumburl,
      full: p.imageinfo[0].url,
      url: p.imageinfo[0].descriptionurl || p.imageinfo[0].url,
    }))
}

async function fetchImages(term: string): Promise<WikiImage[]> {
  try {
    // Priority 1: exact Wikipedia article images (best quality)
    const articleImages = await fetchFromWikiArticle(term)
    if (articleImages.length >= 2) return articleImages.slice(0, 3)

    // Priority 2: Wikipedia search thumbnails
    const searchImages = await fetchFromWikiSearch(term)

    // Priority 3: Commons
    const commonsImages = await fetchFromCommons(term)

    // Merge all, deduplicate, max 3
    const seen = new Set<string>()
    const merged: WikiImage[] = []
    for (const img of [...articleImages, ...searchImages, ...commonsImages]) {
      if (!seen.has(img.thumb)) {
        seen.add(img.thumb)
        merged.push(img)
      }
      if (merged.length >= 3) break
    }
    return merged
  } catch {
    return []
  }
}

const cache = new Map<string, WikiImage[]>()

export default function ImagePreview({ term }: ImagePreviewProps) {
  const [images, setImages] = useState<WikiImage[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!open) return
    if (cache.has(term)) {
      setImages(cache.get(term)!)
      return
    }
    setLoading(true)
    fetchImages(term).then(imgs => {
      cache.set(term, imgs)
      setImages(imgs)
      setLoading(false)
    })
  }, [term, open])

  // Reset index when term changes
  useEffect(() => { setActiveIndex(0) }, [term])

  // Keyboard nav in popup
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowLeft' && activeIndex > 0) setActiveIndex(i => i - 1)
      if (e.key === 'ArrowRight' && activeIndex < images.length - 1) setActiveIndex(i => i + 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, activeIndex, images.length])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-1.5 text-[11px] text-foam-300/30 hover:text-ocean-400/60 transition-colors w-full"
      >
        <ImageIcon size={12} />
        Voir des images
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />

            {/* Popup */}
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-0 right-0 w-9 h-9 rounded-full flex items-center justify-center z-20 text-foam-300/60 hover:text-foam-100 transition-colors"
                style={{
                  background: 'rgba(3, 13, 26, 0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <X size={15} />
              </button>

              {/* Title */}
              <div className="text-center mb-4">
                <h3 className="text-foam-100 font-semibold text-base">{term}</h3>
                <p className="text-foam-300/30 text-xs mt-1">Illustrations</p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-8 h-8 border-2 border-ocean-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <p className="text-foam-300/30 text-sm">Aucune image trouvée</p>
                  <a
                    href={`https://www.google.com/search?q=voilier+${encodeURIComponent(term)}&tbm=isch`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-ocean-400/60 hover:text-ocean-400 transition-colors"
                  >
                    <ExternalLink size={12} />
                    Chercher sur Google Images
                  </a>
                </div>
              ) : (
                <>
                  {/* Main image */}
                  <div className="rounded-2xl overflow-hidden mb-3" style={{
                    background: 'rgba(3, 13, 26, 0.6)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div className="relative aspect-video flex items-center justify-center bg-black/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeIndex}
                          src={images[activeIndex]?.thumb}
                          alt={images[activeIndex]?.title}
                          className="max-w-full max-h-full object-contain"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      </AnimatePresence>

                      {/* Nav arrows */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
                            disabled={activeIndex === 0}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-foam-300/50 hover:text-foam-100 disabled:opacity-20 transition-all"
                            style={{ background: 'rgba(0,0,0,0.4)' }}
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={() => setActiveIndex(i => Math.min(images.length - 1, i + 1))}
                            disabled={activeIndex === images.length - 1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-foam-300/50 hover:text-foam-100 disabled:opacity-20 transition-all"
                            style={{ background: 'rgba(0,0,0,0.4)' }}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </>
                      )}

                      {/* Counter */}
                      <span className="absolute bottom-2 right-3 text-[10px] text-foam-300/30 tabular-nums">
                        {activeIndex + 1}/{images.length}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2 justify-center">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`w-14 h-10 rounded-lg overflow-hidden transition-all ${
                          i === activeIndex
                            ? 'border-2 border-ocean-400/50 scale-105'
                            : 'border border-white/[0.06] opacity-50 hover:opacity-80'
                        }`}
                      >
                        <img src={img.thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>

                  {/* Google link */}
                  <div className="text-center mt-3">
                    <a
                      href={`https://www.google.com/search?q=voilier+${encodeURIComponent(term)}&tbm=isch`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] text-foam-300/20 hover:text-ocean-400/50 transition-colors"
                    >
                      <ExternalLink size={10} />
                      Plus d'images sur Google
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
