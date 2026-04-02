import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass relative z-10 w-full max-w-lg overflow-hidden rounded-3xl p-8"
          >
            {/* Gradient accent stripe at top */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-ocean-600 via-ocean-400 to-ocean-600" />

            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              {title && (
                <h2 className="font-display text-lg font-semibold text-foam-100">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-foam-300 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-foam-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
