import { Footer } from '@/components/Footer'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AboutPagePlaceholder() {
  return (
    <main className="bg-brand-bg min-h-screen flex flex-col items-center justify-center">
      <div className="mt-24 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-8 h-8 text-bee-secondary" />
          <h1 className="text-3xl font-bold text-brand-brown" style={{fontFamily: 'Fredoka, sans-serif'}}>About BuzzWords</h1>
        </div>
        <p className="text-lg mb-6 text-brand-brown/80 max-w-xl text-center">
          BuzzWords is a bee-themed daily word puzzle game inspired by the classic Spelling Bee. Challenge your vocabulary, climb the leaderboard, and have a honey-sweet time!
        </p>
        <Button asChild id="about-back-home" className="bg-bee-primary text-brand-brown font-bold hover:bg-yellow-300 transition">
          <a href="/">Back to Home</a>
        </Button>
      </div>
      <Footer />
    </main>
  )
}
