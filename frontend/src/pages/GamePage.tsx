import { useState, useEffect, useRef } from 'react'
import { HoneycombLetters } from '@/components/HoneycombLetters'
import { WordInput } from '@/components/WordInput'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { RankFeedback } from '@/components/RankFeedback'
import { WordList } from '@/components/WordList'
import { Footer } from '@/components/Footer'

const MOCK_PUZZLE = {
  letters: ['B', 'E', 'A', 'U', 'T', 'S', 'R'], // Center is 'A'
  centerIndex: 2,
  words: [
    'BEAUT', 'BEAUTS', 'BEAR', 'BEARS', 'BARS', 'STAR', 'STARE', 'TEAR', 'TEARS', 'EARS', 'RATE', 'EAT', 'TEA', 'ART', 'SEA', 'SEAT', 'BETA', 'BATS', 'BUST', 'BUSTER', 'BUSTA', 'BUSTS', 'SURE', 'USER', 'RUST', 'RUSTS', 'RUES', 'RATE', 'RATES', 'EAST', 'TEAS', 'SATE', 'SEAR', 'SUET', 'AURA', 'AURAS', 'ARE', 'AREA', 'AREAS', 'ERA', 'ERAS', 'ARTS', 'TUBA', 'TUBAS', 'TUBER', 'TUBERS', 'TUBS', 'TRUE', 'TRUEST', 'AUSTER', 'AURATE', 'AUREATE', 'ASTRA', 'ASTUTE', 'BUREAU', 'BUREAUS', 'BURET', 'BURETS', 'BUSTER', 'BUSTIER', 'BUSTS', 'BUTA', 'BUTE', 'BUTES', 'BUTS', 'BUTTE', 'BUTTER', 'BUTTERS', 'BUTTES', 'BUTT', 'BUTTS', 'RUB', 'RUBS', 'RUBE', 'RUBES', 'RUBS', 'RUST', 'RUSTS',
  ],
  maxScore: 100,
}

const RANKS = [
  { name: 'Beginner', threshold: 0 },
  { name: 'Good', threshold: 10 },
  { name: 'Great', threshold: 25 },
  { name: 'Amazing', threshold: 50 },
  { name: 'Queen Bee', threshold: 80 },
]

const STORAGE_KEY = 'buzzwords-daily-2024-06-17' // In real app, use date

export function GamePage() {
  const [input, setInput] = useState('')
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set())
  const [score, setScore] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Restore state from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setFoundWords(new Set(parsed.foundWords || []))
        setScore(parsed.score || 0)
      } catch {}
    }
  }, [])

  // Save state on change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ foundWords: Array.from(foundWords), score })
    )
  }, [foundWords, score])

  function getRank() {
    const pct = (score / MOCK_PUZZLE.maxScore) * 100
    let rank = RANKS[0].name
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (score >= RANKS[i].threshold) {
        rank = RANKS[i].name
        break
      }
    }
    return rank
  }

  function handleSubmit() {
    const word = input.trim().toUpperCase()
    setError(null)
    setSuccess(null)
    if (word.length < 4) {
      setError('Words must be at least 4 letters.')
      return
    }
    if (!word.includes(MOCK_PUZZLE.letters[MOCK_PUZZLE.centerIndex])) {
      setError('Word must include the center letter.')
      return
    }
    if (!MOCK_PUZZLE.words.includes(word)) {
      setError('Not in word list.')
      return
    }
    if (foundWords.has(word)) {
      setError('Already found!')
      return
    }
    setFoundWords(new Set([...foundWords, word]))
    setScore(score + word.length)
    setInput('')
    setSuccess('Nice!')
  }

  function handleLetterClick(letter: string) {
    setInput(input + letter)
  }

  // For instant feedback, clear error/success after short delay
  useEffect(() => {
    if (error || success) {
      const timeout = setTimeout(() => {
        setError(null)
        setSuccess(null)
      }, 1200)
      return () => clearTimeout(timeout)
    }
  }, [error, success])

  return (
    <main className="min-h-[80vh] flex flex-col items-center bg-yellow-50 pb-12">
      <div className="w-full flex flex-col items-center pt-6">
        <HoneycombLetters
          letters={MOCK_PUZZLE.letters}
          centerIndex={MOCK_PUZZLE.centerIndex}
          onLetterClick={handleLetterClick}
        />
        <WordInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          error={error || undefined}
          success={success || undefined}
        />
        <ScoreDisplay score={score} maxScore={MOCK_PUZZLE.maxScore} />
        <RankFeedback rank={getRank()} />
        <WordList words={MOCK_PUZZLE.words} foundWords={foundWords} />
      </div>
      <Footer />
    </main>
  )
}
