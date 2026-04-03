import { Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useEffect } from 'react'
import Header from './components/layout/Header'
import ThemeToggle from './components/ui/ThemeToggle'
import { Analytics } from '@vercel/analytics/react'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const LexiconPage = lazy(() => import('./pages/LexiconPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AdDemoPage = lazy(() => import('./pages/AdDemoPage'))
const ComparePage = lazy(() => import('./pages/ComparePage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))

function App() {
  const location = useLocation()
  const isFullscreen = location.pathname === '/' || location.pathname === '/explorer' || location.pathname === '/compare'

  // Block body scroll on fullscreen pages (landing, explorer)
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isFullscreen])

  return (
    <>
      <Header />
      <main className={isFullscreen ? 'h-screen pt-16 overflow-hidden' : 'pt-16 min-h-screen'}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-2 border-ocean-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/explorer" element={<HomePage />} />
              <Route path="/lexique" element={<LexiconPage />} />
              <Route path="/lexique/:categoryId" element={<CategoryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/ad-demo" element={<AdDemoPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/quiz" element={<QuizPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <ThemeToggle />
      <Analytics />
    </>
  )
}

export default App
