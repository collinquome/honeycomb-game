import { Star } from 'lucide-react'

interface ScoreDisplayProps {
  score: number
  maxScore: number
}

export function ScoreDisplay({ score, maxScore }: ScoreDisplayProps) {
  // Visual progress bar for bee theme
  const pct = Math.min(100, Math.round((score / maxScore) * 100))
  return (
    <div className="flex flex-col items-center gap-1 my-4 w-full max-w-md">
      <div className="flex items-center gap-2 justify-center">
        <Star className="w-6 h-6 text-yellow-400" />
        <span className="text-2xl font-bold text-orange-900" id="score-display">
          {score}
        </span>
        <span className="text-lg text-orange-700 font-medium">/ {maxScore}</span>
      </div>
      <div className="w-full bg-orange-100 rounded-full h-3 mt-1 relative">
        <div
          className="h-3 rounded-full bg-yellow-400 transition-all"
          style={{ width: pct + '%' }}
        ></div>
        <div className="absolute inset-0 flex justify-center items-center text-xs text-orange-700 font-semibold">
          {pct}%
        </div>
      </div>
    </div>
  )
}
