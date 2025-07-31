import { Link } from 'react-router-dom'
import { Github, Bee } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-brand-bg border-t py-8 mt-16 text-brand-brown">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src="/branding/assets/logo-1.png" className="w-8 h-8" />
          <span className="font-bold text-lg" style={{fontFamily: 'Fredoka, sans-serif'}}>BuzzWords</span>
        </div>
        <div className="flex gap-4 text-brand-brown">
          <Link to="/" className="hover:text-bee-primary transition underline" id="footer-home">Home</Link>
          <Link to="/game" className="hover:text-bee-primary transition underline" id="footer-game">Game</Link>
          <Link to="/leaderboard" className="hover:text-bee-primary transition underline" id="footer-leaderboard">Leaderboard</Link>
          <Link to="/about" className="hover:text-bee-primary transition underline" id="footer-about">About</Link>
        </div>
        <div className="flex gap-2 items-center">
          <a href="#" className="hover:text-bee-secondary" id="footer-github">
            <Github className="w-5 h-5" />
          </a>
          <span className="text-xs">&copy; {new Date().getFullYear()} BuzzWords</span>
        </div>
      </div>
    </footer>
  )
}
