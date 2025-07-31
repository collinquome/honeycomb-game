import { Award, Zap } from 'lucide-react'

interface RankFeedbackProps {
  rank: string
}

const rankIcons: Record<string, any> = {
  "Beginner": Zap,
  "Good": Award,
  "Great": Award,
  "Amazing": Award,
  "Queen Bee": Award,
}

const rankColors: Record<string, string> = {
  "Beginner": 'bg-yellow-100 text-yellow-800',
  "Good": 'bg-yellow-200 text-yellow-900',
  "Great": 'bg-orange-200 text-orange-900',
  "Amazing": 'bg-orange-300 text-orange-900',
  "Queen Bee": 'bg-orange-400 text-white',
}

export function RankFeedback({ rank }: RankFeedbackProps) {
  const Icon = rankIcons[rank] || Award
  const color = rankColors[rank] || 'bg-yellow-100 text-yellow-800'
  return (
    <div className={`rounded-lg px-4 py-2 font-bold flex items-center gap-2 justify-center my-2 ${color}`} id="rank-feedback">
      <Icon className="w-5 h-5" />
      <span>{rank}</span>
    </div>
  )
}
