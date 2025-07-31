import { Sparkles, HeartHandshake } from 'lucide-react'

export function AboutContent() {
  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col items-center mt-12 mb-8">
      <div className="w-32 h-32 mb-4">
        <img src="/branding/assets/logo-1.png" className="w-full h-full object-contain" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-orange-900 mb-2" style={{fontFamily: 'Fredoka, sans-serif'}}>About BuzzWords</h2>
      <p className="text-lg text-orange-900 mb-2 text-center" style={{fontFamily: 'Nunito, sans-serif'}}>
        <span className="inline-flex items-center gap-2 font-bold"><Sparkles className="w-5 h-5 inline text-yellow-400" />Bee Inspired!</span>
      </p>
      <p className="text-base text-orange-800 mb-4 text-center" style={{fontFamily: 'Nunito, sans-serif'}}>
        BuzzWords is a daily word puzzle game inspired by the classic Spelling Bee, but with a honey-sweet twist! Spell as many words as you can from the honeycomb, always using the center letter. Challenge your friends, climb the leaderboard, and become the Queen Bee!
      </p>
      <div className="w-full flex flex-col items-center my-6">
        <div className="w-full h-40 rounded-xl overflow-hidden shadow-lg mb-4" style={{backgroundImage: "url('/branding/assets/hero-0.png')", backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-orange-700">Created as a playful homage to bees, puzzles, and the joy of language.</p>
          <span className="inline-flex items-center text-orange-700 text-xs"><HeartHandshake className="w-4 h-4 inline mr-1" /> Crafted by Team Buzz</span>
        </div>
      </div>
      <div className="w-full text-center mt-4 text-xs text-orange-400">
        &copy; {new Date().getFullYear()} BuzzWords. Not affiliated with NYT.
      </div>
    </section>
  )
}
