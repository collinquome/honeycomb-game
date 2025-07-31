import { Footer } from '@/components/Footer'
import { Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LeaderboardPagePlaceholder() {
  return (
    <main className="bg-brand-bg min-h-screen flex flex-col items-center justify-center">
      <div className="mt-24 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-8 h-8 text-bee-secondary" />
          <h1 className="text-3xl font-bold text-brand-brown" style={{fontFamily: 'Fredoka, sans-serif'}}>Leaderboard</h1>
        </div>
        <p className="text-lg mb-6 text-brand-brown/80">Top scores will be shown here soon!</p>
        <Button asChild id="leaderboard-back-home" className="bg-bee-primary text-brand-brown font-bold hover:bg-yellow-300 transition">
          <a href="/">Back to Home</a>
        </Button>
      </div>
      <Footer />
    </main>
  )
}
