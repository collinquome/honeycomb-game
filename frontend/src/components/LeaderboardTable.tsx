import { Trophy, User } from 'lucide-react'

interface LeaderboardEntry {
  username: string
  score: number
  rank: number
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  currentUser?: string
}

import { cn } from '@/lib/utils'

export function LeaderboardTable({ entries, currentUser }: LeaderboardTableProps) {
  const sorted = [...entries].sort((a, b) => b.score - a.score)
  return (
    <div className="max-w-2xl w-full mx-auto my-12 overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow border">
        <thead className="bg-yellow-200 text-orange-900">
          <tr>
            <th className="py-2 px-4 text-left">Rank</th>
            <th className="py-2 px-4 text-left">Player</th>
            <th className="py-2 px-4 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry, idx) => (
            <tr
              key={entry.username}
              className={cn(
                currentUser === entry.username ? 'bg-yellow-100 font-bold' : '',
                'transition-colors duration-150'
              )}
            >
              <td className="py-2 px-4 flex items-center gap-1">
                {entry.rank === 1 && <Trophy className="w-5 h-5 text-yellow-500 inline" />} {entry.rank}
              </td>
              <td className="py-2 px-4 flex items-center gap-1">
                <User className="w-4 h-4 text-orange-500" /> {entry.username}
                {currentUser === entry.username && <span className="ml-2 px-2 rounded bg-orange-200 text-orange-800 text-xs">You</span>}
              </td>
              <td className="py-2 px-4">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
