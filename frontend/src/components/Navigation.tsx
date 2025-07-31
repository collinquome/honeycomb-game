import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/components/useAuth'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { LoginDialog } from '@/components/LoginDialog'

export function Navigation() {
  const { user, logout, login } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const location = useLocation()

  function handleLogin(username: string) {
    login(username)
    setLoginOpen(false)
  }

  return (
    <nav className="w-full bg-yellow-100 border-b border-yellow-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/branding/assets/logo-0.png" className="w-12 h-12" />
          <span className="text-2xl font-bold text-orange-900 tracking-tight group-hover:text-orange-600" style={{fontFamily: 'Fredoka, sans-serif'}}>BuzzWords</span>
        </Link>
        <ul className="flex gap-6 items-center text-orange-900 text-lg font-semibold" style={{fontFamily: 'Nunito, sans-serif'}}>
          <li>
            <Link to="/game" className={location.pathname === '/game' ? 'underline underline-offset-4' : ''}>Play</Link>
          </li>
          <li>
            <Link to="/leaderboard" className={location.pathname === '/leaderboard' ? 'underline underline-offset-4' : ''}>Leaderboard</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'underline underline-offset-4' : ''}>About</Link>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="flex items-center gap-1 px-2 py-1 bg-yellow-200 rounded text-orange-900 text-sm" style={{fontFamily: 'Nunito, sans-serif'}}>
                <User className="w-4 h-4 text-orange-500" /> {user}
              </span>
              <Button id="logout-btn" variant="outline" className="border-orange-300 text-orange-900" onClick={logout}><LogOut className="w-4 h-4 mr-1" />Logout</Button>
            </>
          ) : (
            <Button id="login-btn" variant="default" className="bg-orange-400 text-white hover:bg-orange-500" onClick={() => setLoginOpen(true)}>Login</Button>
          )}
        </div>
        <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
      </div>
    </nav>
  )
}
