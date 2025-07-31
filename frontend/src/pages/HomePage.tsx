import { Hero } from '@/components/Hero'
import { HowToPlay } from '@/components/HowToPlay'
import { Footer } from '@/components/Footer'

export function HomePage() {
  return (
    <main className="bg-brand-bg min-h-screen flex flex-col">
      <Hero />
      <HowToPlay />
      <Footer />
    </main>
  )
}
