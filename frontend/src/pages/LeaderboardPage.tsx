import { LeaderboardTable } from '@/components/LeaderboardTable'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/components/useAuth'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoginDialog } from '@/components/LoginDialog'

const MOCK_LEADERBOARD = [
  { username: 'QueenBee', score: 98, rank: 1 },
  { username: 'HoneyHero', score: 87, rank: 2 },
  { username: 'BuzzBuddy', score: 73, rank: 3 },
  { username: 'WorkerBee', score: 68, rank: 4 },
  { username: 'BeeLiever', score: 55, rank: 5 },
]

export function LeaderboardPage() {
  const { user, login } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const [entries, setEntries] = useState(MOCK_LEADERBOARD)

  // Add current user to leaderboard if not present
  useEffect(() => {
    if (user && !entries.some(e => e.username === user)) {
      setEntries(prev =>
        [...prev, { username: user, score: Math.floor(Math.random() * 100), rank: prev.length + 1 }]
      )
    }
  }, [user])

  // Recompute ranks after adding user
  const sorted = [...entries].sort((a, b) => b.score - a.score)
  sorted.forEach((entry, idx) => (entry.rank = idx + 1))

  return (
    <main className="min-h-[80vh] flex flex-col items-center bg-yellow-50 pb-12">
      <h1 className="text-3xl font-bold text-orange-900 mt-8 mb-4" style={{fontFamily: 'Fredoka, sans-serif'}}>Leaderboard</h1>
      {!user && (
        <Button id="login-leaderboard-btn" className="mb-4 bg-orange-400 text-white hover:bg-orange-500" onClick={() => setLoginOpen(true)}>
          Login to join the leaderboard
        </Button>
      )}
      <LeaderboardTable entries={sorted} currentUser={user ?? undefined} />
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={login} />
      <Footer />
    </main>
  )
}
