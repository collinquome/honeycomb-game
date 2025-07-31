import { AboutContent } from '@/components/AboutContent'
import { Footer } from '@/components/Footer'

export function AboutPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center bg-yellow-50 pb-12">
      <AboutContent />
      <Footer />
    </main>
  )
}
