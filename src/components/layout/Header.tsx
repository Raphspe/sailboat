import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Sailboat, Menu, X } from 'lucide-react';
import { cn } from '../../lib/cn';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/explorer', label: 'Explorer' },
  { to: '/lexique', label: 'Lexique' },
  { to: '/contact', label: 'Contact' },
];

/* Shared glass style that blends with the ocean gradient background */
const pillStyle = {
  background: 'rgba(3, 13, 26, 0.3)',
  backdropFilter: 'blur(40px) saturate(1.4)',
  WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
  border: '1px solid rgba(255, 255, 255, 0.04)',
  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.15)',
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 pointer-events-none">
      <div className="flex items-start justify-between px-3 pt-3 md:px-5 md:pt-4 **:cursor-pointer" style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}>
        {/* Logo — top left */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto"
        >
          <Link
            to="/"
            className="group flex items-center gap-1.5 rounded-full px-3 py-2 md:px-4 md:py-2.5 md:gap-2"
            style={pillStyle}
          >
            <Sailboat className="h-4 w-4 md:h-5 md:w-5 text-ocean-400 transition-all duration-500 group-hover:scale-115 group-hover:-rotate-12 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
            <span className="font-display text-xs md:text-sm font-bold tracking-wide text-foam-100 transition-colors duration-300 group-hover:text-ocean-400">
              SAILBOAT
            </span>
          </Link>
        </motion.div>

        {/* Nav — centered */}
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto hidden md:block absolute left-1/2 -translate-x-1/2"
        >
          <div
            className="flex items-center gap-0.5 rounded-full p-1 cursor-pointer"
            style={pillStyle}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'relative rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 select-none outline-none focus:outline-none cursor-pointer',
                  isActive(link.to)
                    ? 'text-white'
                    : 'text-foam-300/50 hover:text-foam-100',
                )}
              >
                {isActive(link.to) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: 'rgba(14, 165, 233, 0.06)',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 pointer-events-none">{link.label}</span>
              </Link>
            ))}
          </div>
        </motion.nav>

        {/* Mobile hamburger */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto md:hidden"
        >
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foam-300 transition-all hover:text-foam-100"
            style={pillStyle}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mx-5 mt-2 rounded-3xl overflow-hidden md:hidden"
            style={pillStyle}
          >
            <div className="flex flex-col gap-1 p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-sm font-medium text-center transition-all',
                    isActive(link.to)
                      ? 'bg-ocean-500/10 text-ocean-400'
                      : 'text-foam-300/50 hover:bg-ocean-500/5 hover:text-foam-100',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
