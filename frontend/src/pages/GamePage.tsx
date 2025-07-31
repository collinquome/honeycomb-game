import { useState, useEffect, useRef } from 'react'
import { HoneycombLetters } from '@/components/HoneycombLetters'
import { WordInput } from '@/components/WordInput'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { RankFeedback } from '@/components/RankFeedback'
import { WordList } from '@/components/WordList'
import { Footer } from '@/components/Footer'
import { generateValidWords, calculateMaxScore, getPuzzleStats, type PuzzleConfig } from '@/lib/wordGenerator'

const PUZZLE_CONFIG: PuzzleConfig = {
  letters: ['B', 'E', 'A', 'U', 'T', 'S', 'R'], // Center is 'A'
  centerIndex: 2,
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
  const [validWords, setValidWords] = useState<string[]>([])
  const [maxScore, setMaxScore] = useState(0)
  const [puzzleStats, setPuzzleStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Generate words when component mounts
  useEffect(() => {
    setIsLoading(true)
    try {
      const words = generateValidWords(PUZZLE_CONFIG)
      const max = calculateMaxScore(words)
      const stats = getPuzzleStats(words)
      
      setValidWords(words)
      setMaxScore(max)
      setPuzzleStats(stats)
      
      console.log(`Generated ${words.length} valid words with max score ${max}`)
      console.log('Puzzle stats:', stats)
    } catch (error) {
      console.error('Error generating words:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

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
    const pct = maxScore > 0 ? (score / maxScore) * 100 : 0
    let rank = RANKS[0].name
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (pct >= RANKS[i].threshold) {
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
    if (!word.includes(PUZZLE_CONFIG.letters[PUZZLE_CONFIG.centerIndex])) {
      setError('Word must include the center letter.')
      return
    }
    if (!validWords.includes(word)) {
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

  if (isLoading) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center bg-yellow-50">
        <div className="text-orange-900 text-lg">Loading word list...</div>
        <div className="text-orange-700 text-sm mt-2">Generating {PUZZLE_CONFIG.letters.join('')} puzzle</div>
      </main>
    )
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center bg-yellow-50 pb-12">
      <div className="w-full flex flex-col items-center pt-6">
        <HoneycombLetters
          letters={PUZZLE_CONFIG.letters}
          centerIndex={PUZZLE_CONFIG.centerIndex}
          onLetterClick={handleLetterClick}
        />
        <WordInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          error={error || undefined}
          success={success || undefined}
        />
        <ScoreDisplay score={score} maxScore={maxScore} />
        <RankFeedback rank={getRank()} />
        <WordList words={validWords} foundWords={foundWords} puzzleStats={puzzleStats} />
      </div>
      <Footer />
    </main>
  )
}
