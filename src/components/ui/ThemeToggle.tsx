import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useLocation } from 'react-router'

export default function ThemeToggle() {
  const location = useLocation()
  const [theme, setTheme] = useState<'dark' | 'ocean-light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'ocean-light') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // On mobile, only show on landing page
  const isLanding = location.pathname === '/'

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'ocean-light' : 'dark')}
      className={`fixed bottom-5 left-5 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group ${
        isLanding ? '' : 'hidden lg:flex'
      }`}
      style={{
        background: 'rgba(3, 13, 26, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
      }}
      aria-label={theme === 'dark' ? 'Mode ocean' : 'Mode sombre'}
    >
      {theme === 'dark' ? (
        <Sun size={15} className="text-foam-300/40 group-hover:text-ocean-400 transition-colors" />
      ) : (
        <Moon size={15} className="text-foam-300/40 group-hover:text-foam-100 transition-colors" />
      )}
    </button>
  )
}
