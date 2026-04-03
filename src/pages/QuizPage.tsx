import { useState, useCallback, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import SailboatDiagram from '../components/diagrams/SailboatDiagram'
import { getAllEntries } from '../data/categories'
import type { LexiconEntry } from '../data/types'

interface QuizQuestion {
  entry: LexiconEntry
  choices: string[]
}

interface QuizState {
  questions: QuizQuestion[]
  currentIndex: number
  score: number
  answered: boolean
  selectedChoice: string | null
}

const TOTAL_QUESTIONS = 10

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(diagramEntries: LexiconEntry[]): QuizQuestion[] {
  const picked = shuffle(diagramEntries).slice(0, TOTAL_QUESTIONS)
  return picked.map((entry) => {
    const wrong = shuffle(
      diagramEntries.filter((e) => e.id !== entry.id)
    )
      .slice(0, 3)
      .map((e) => e.term)
    const choices = shuffle([entry.term, ...wrong])
    return { entry, choices }
  })
}

function getResultMessage(score: number): { emoji: string; message: string } {
  if (score === 10) return { emoji: '🏆', message: 'Parfait ! Tu es un vrai loup de mer !' }
  if (score >= 8) return { emoji: '⛵', message: 'Excellent ! Tu connais bien ton bateau !' }
  if (score >= 6) return { emoji: '🌊', message: 'Bien joué ! Continue comme ça !' }
  if (score >= 4) return { emoji: '💨', message: 'Pas mal ! Un peu de révision et tu seras au top !' }
  return { emoji: '🧭', message: 'C\'est un début ! Retourne explorer le lexique !' }
}

export default function QuizPage() {
  const diagramEntries = useMemo(
    () => getAllEntries().filter((e) => e.diagramPartId?.startsWith('svg-')),
    []
  )

  const [state, setState] = useState<QuizState>(() => ({
    questions: buildQuestions(diagramEntries),
    currentIndex: 0,
    score: 0,
    answered: false,
    selectedChoice: null,
  }))

  const currentQuestion = state.questions[state.currentIndex] as QuizQuestion | undefined
  const isFinished = state.currentIndex >= state.questions.length

  const handleChoice = useCallback(
    (choice: string) => {
      if (state.answered || !currentQuestion) return
      const correct = choice === currentQuestion.entry.term
      setState((s) => ({
        ...s,
        answered: true,
        selectedChoice: choice,
        score: correct ? s.score + 1 : s.score,
      }))
    },
    [state.answered, currentQuestion]
  )

  // Auto-advance after answering
  useEffect(() => {
    if (!state.answered || !currentQuestion) return
    const isCorrect = state.selectedChoice === currentQuestion.entry.term
    const delay = isCorrect ? 1000 : 2000
    const timer = setTimeout(() => {
      setState((s) => ({
        ...s,
        currentIndex: s.currentIndex + 1,
        answered: false,
        selectedChoice: null,
      }))
    }, delay)
    return () => clearTimeout(timer)
  }, [state.answered, state.selectedChoice, currentQuestion])

  const restart = useCallback(() => {
    setState({
      questions: buildQuestions(diagramEntries),
      currentIndex: 0,
      score: 0,
      answered: false,
      selectedChoice: null,
    })
  }, [diagramEntries])

  const getChoiceStyle = (choice: string) => {
    if (!state.answered) {
      return 'border-white/10 hover:border-ocean-400/40 hover:bg-ocean-500/10'
    }
    const isCorrect = choice === currentQuestion?.entry.term
    const isSelected = choice === state.selectedChoice
    if (isCorrect) return 'border-emerald-400/60 bg-emerald-500/20'
    if (isSelected && !isCorrect) return 'border-rose-400/60 bg-rose-500/20'
    return 'border-white/5 opacity-50'
  }

  const progress = isFinished ? 100 : (state.currentIndex / TOTAL_QUESTIONS) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col lg:flex-row"
    >
      {/* Progress bar at the very top */}
      <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-white/5">
        <motion.div
          className="h-full bg-ocean-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Diagram side */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 pt-8 lg:p-8 lg:h-[calc(100vh-4rem)]">
        <div className="w-full max-w-lg">
          <SailboatDiagram
            selectedPartId={currentQuestion?.entry.diagramPartId ?? null}
            enableZoom={false}
          />
        </div>
      </div>

      {/* Quiz panel */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-8 lg:h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md">
          {isFinished ? (
            /* Results screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl p-8 text-center"
              style={{
                background: 'rgba(3, 13, 26, 0.4)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="text-6xl mb-4">{getResultMessage(state.score).emoji}</div>
              <div className="text-5xl font-bold text-white mb-2">
                {state.score}<span className="text-foam-300/50 text-3xl">/{TOTAL_QUESTIONS}</span>
              </div>
              <p className="text-foam-300/70 text-lg mb-8">
                {getResultMessage(state.score).message}
              </p>
              <button
                onClick={restart}
                className="px-8 py-3 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.3), rgba(16,185,129,0.3))',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                }}
              >
                Recommencer
              </button>
            </motion.div>
          ) : (
            /* Question screen */
            <div className="space-y-5">
              {/* Header: question number + score */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-foam-300/50">
                  Question <span className="text-white font-semibold">{state.currentIndex + 1}</span>/{TOTAL_QUESTIONS}
                </span>
                <span className="text-foam-300/50">
                  Score : <span className="text-ocean-400 font-semibold">{state.score}</span>
                </span>
              </div>

              {/* Prompt */}
              <p className="text-white text-lg font-medium text-center">
                Quel est le nom de cette partie ?
              </p>

              {/* Choices */}
              <div className="space-y-3">
                {currentQuestion?.choices.map((choice) => (
                  <motion.button
                    key={choice}
                    onClick={() => handleChoice(choice)}
                    disabled={state.answered}
                    whileTap={state.answered ? {} : { scale: 0.97 }}
                    className={`w-full text-left px-5 py-4 rounded-2xl font-medium text-white transition-all duration-300 border ${getChoiceStyle(choice)}`}
                    style={{
                      background: state.answered
                        ? undefined
                        : 'rgba(3, 13, 26, 0.3)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {choice}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
