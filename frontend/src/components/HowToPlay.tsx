import { CheckCircle, Hexagon, CircleDashed, Crown } from 'lucide-react'

export function HowToPlay() {
  return (
    <section id="how-to-play" className="container mx-auto max-w-3xl mt-16 mb-20 px-4">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 bg-bee-primary px-4 py-1 rounded-full font-bold text-brand-brown shadow">
          <Hexagon className="w-4 h-4 text-bee-secondary" /> How To Play
        </span>
        <h2 className="mt-4 text-3xl font-bold text-brand-brown" style={{fontFamily: 'Fredoka, sans-serif'}}>How To Play</h2>
        <p className="mt-2 text-lg text-brand-brown/70">
          Fill the hive with words using the honeycomb letters!
        </p>
      </div>
      <ul className="space-y-6 text-lg">
        <li className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-bee-secondary mt-1" />
          <span>Words must be at least <span className="font-bold">4 letters</span> long.</span>
        </li>
        <li className="flex items-start gap-3">
          <CircleDashed className="w-6 h-6 text-bee-secondary mt-1" />
          <span>Each word must use the <span className="font-bold">center letter</span> at least once.</span>
        </li>
        <li className="flex items-start gap-3">
          <Hexagon className="w-6 h-6 text-bee-secondary mt-1" />
          <span>You can use letters as many times as you like.</span>
        </li>
        <li className="flex items-start gap-3">
          <Crown className="w-6 h-6 text-bee-secondary mt-1" />
          <span>Find all the words for a sweet <span className="font-bold">Queen Bee</span> win!</span>
        </li>
      </ul>
    </section>
  )
}
