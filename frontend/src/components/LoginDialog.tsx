import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface LoginDialogProps {
  open: boolean
  onClose: () => void
  onLogin: (username: string) => void
}

export function LoginDialog({ open, onClose, onLogin }: LoginDialogProps) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username.trim()) {
      setError('Please enter a username')
      return
    }
    setError('')
    onLogin(username.trim())
    setUsername('')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-orange-900">Login to BuzzWords</DialogTitle>
          <DialogDescription>Enter a username to join the leaderboard.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="login-username"
            autoFocus
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <DialogFooter>
            <Button id="login-submit" type="submit" className="w-full">Login</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
