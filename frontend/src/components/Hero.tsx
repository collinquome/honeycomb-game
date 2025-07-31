import { Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative">
      <div style={{backgroundImage: "url('/branding/assets/hero-0.png')"}} className="bg-cover bg-center h-[440px] rounded-b-3xl shadow-lg">
        <div className="bg-black/40 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-2">
              <span className="inline-flex items-center gap-1 bg-bee-secondary py-1 px-3 rounded-full text-white font-bold text-sm shadow">
                <Sparkles className="w-4 h-4" /> Daily Bee Puzzle
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4" style={{fontFamily: 'Fredoka, sans-serif'}}>Welcome to BuzzWords!</h1>
            <p className="text-lg md:text-2xl text-yellow-100 mb-6 max-w-2xl mx-auto font-medium">
              Unleash your word skills in our honey-sweet daily puzzle. Use the center letter and fill the hive with your vocabulary!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button asChild id="hero-play-btn" className="bg-bee-primary text-brand-brown font-bold hover:bg-yellow-300 transition">
                <Link to="/game" className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> Play Today’s Game
                </Link>
              </Button>
              <Button asChild variant="outline" id="hero-how-btn" className="border-bee-primary text-white hover:bg-bee-primary hover:text-brand-brown">
                <Link to="#how-to-play" className="flex items-center gap-1">
                  How To Play
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
