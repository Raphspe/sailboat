import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

type FormType = 'bug' | 'feature' | 'autre'

export default function ContactPage() {
  const [type, setType] = useState<FormType>('bug')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setStatus('sending')

    try {
      // Send via Formspree (free, no backend needed)
      const res = await fetch('https://formspree.io/f/xqegyybl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          name,
          email,
          message,
          _subject: `[SAILBOAT] ${type === 'bug' ? 'Bug' : type === 'feature' ? 'Évolution' : 'Message'} — ${name}`,
        }),
      })

      if (res.ok) {
        setStatus('sent')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const typeOptions: { id: FormType; label: string; emoji: string }[] = [
    { id: 'bug', label: 'Bug', emoji: '⚠️' },
    { id: 'feature', label: 'Évolution', emoji: '💡' },
    { id: 'autre', label: 'Autre', emoji: '💬' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 pt-20 pb-12 max-w-lg mx-auto"
    >
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        <span className="text-foam-100">Nous </span>
        <span className="text-ocean-400">contacter</span>
      </h1>
      <p className="text-foam-300/40 text-sm mb-8">
        Un bug, une idée, une suggestion ? On est à l'écoute.
      </p>

      {status === 'sent' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center"
        >
          <CheckCircle size={40} className="text-seagreen-400 mx-auto mb-4" />
          <h2 className="text-foam-100 font-semibold text-lg mb-2">Message envoyé !</h2>
          <p className="text-foam-300/50 text-sm mb-6">Merci pour ton retour, on revient vers toi rapidement.</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-ocean-400/70 hover:text-ocean-400 text-sm transition-colors"
          >
            Envoyer un autre message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type selector */}
          <div>
            <label className="text-foam-300/40 text-xs uppercase tracking-widest mb-2 block">Type</label>
            <div className="flex gap-2">
              {typeOptions.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setType(opt.id)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    type === opt.id
                      ? 'bg-ocean-500/15 text-ocean-400 border border-ocean-500/20'
                      : 'bg-white/[0.02] text-foam-300/40 border border-white/[0.05] hover:border-white/[0.1]'
                  }`}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-foam-300/40 text-xs uppercase tracking-widest mb-2 block">Nom *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ton nom"
              required
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-4 py-3 text-base text-foam-100 placeholder-foam-300/20 outline-none focus:border-ocean-500/20 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-foam-300/40 text-xs uppercase tracking-widest mb-2 block">Email *</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ton@email.com"
              required
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-4 py-3 text-base text-foam-100 placeholder-foam-300/20 outline-none focus:border-ocean-500/20 transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-foam-300/40 text-xs uppercase tracking-widest mb-2 block">Message *</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Décris le bug ou ton idée..."
              rows={5}
              required
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-4 py-3 text-base text-foam-100 placeholder-foam-300/20 outline-none focus:border-ocean-500/20 transition-all resize-none"
            />
          </div>

          {/* Error */}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-rose-400 text-sm">
              <AlertCircle size={14} />
              Erreur lors de l'envoi. Réessaie.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!message.trim() || !name.trim() || !email.trim() || status === 'sending'}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-default flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(6,182,212,0.15))',
              border: '1px solid rgba(14,165,233,0.2)',
              color: '#7dd3fc',
            }}
          >
            {status === 'sending' ? (
              <div className="w-4 h-4 border-2 border-ocean-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={15} />
            )}
            {status === 'sending' ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      )}
    </motion.div>
  )
}
