import { Send } from 'lucide-react'

interface SubmitButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function SubmitButton({ onClick, disabled }: SubmitButtonProps) {
  return (
    <button
      id="submit-word-btn"
      className="btn btn-primary flex items-center gap-2"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <Send className="w-4 h-4" />
      Submit
    </button>
  )
}
