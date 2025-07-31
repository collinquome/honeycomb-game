import { Input } from '@/components/ui/input'
import { useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface WordInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  error?: string
  success?: string
  disabled?: boolean
}

export function WordInput({ value, onChange, onSubmit, error, success, disabled }: WordInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
      <form
        className="flex gap-2"
        onSubmit={e => {
          e.preventDefault()
          onSubmit()
          inputRef.current?.focus()
        }}
        autoComplete="off"
      >
        <Input
          id="word-input"
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="text-lg tracking-wide font-mono bg-yellow-50 border-orange-300 focus:border-orange-400"
          placeholder="Type a word..."
          autoFocus
          disabled={disabled}
        />
        <button id="submit-word" className="btn btn-primary px-6" type="submit" disabled={disabled}>
          Submit
        </button>
      </form>
      {error && <div className="text-red-600 text-sm px-1" id="input-error">{error}</div>}
      {success && (
        <div className="text-green-700 flex items-center gap-1 text-sm px-1" id="input-success">
          <CheckCircle2 className="w-4 h-4" /> {success}
        </div>
      )}
    </div>
  )
}
