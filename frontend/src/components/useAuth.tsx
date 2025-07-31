import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: string | null
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('buzzwords-username')
    if (stored) setUser(stored)
  }, [])

  function login(username: string) {
    setUser(username)
    localStorage.setItem('buzzwords-username', username)
  }
  function logout() {
    setUser(null)
    localStorage.removeItem('buzzwords-username')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
