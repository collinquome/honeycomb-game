import { cn } from '@/lib/utils'
import { Hexagon } from 'lucide-react'

interface HoneycombLettersProps {
  letters: string[]
  centerIndex: number
  onLetterClick?: (letter: string) => void
}

// Responsive honeycomb layout: center + 6 outer
export function HoneycombLetters({ letters, centerIndex, onLetterClick }: HoneycombLettersProps) {
  // Layout for 7-letter honeycomb (center is index 0-6)
  // [1]
  // [2][0][3]
  // [4][5][6]
  // We'll use a flexbox layout for simplicity
  return (
    <div className="flex flex-col items-center gap-1 my-6 select-none">
      {/* Top row */}
      <div className="flex justify-center">
        <HoneyLetter
          letter={letters[(centerIndex + 1) % 7]}
          onClick={onLetterClick}
        />
      </div>
      {/* Middle row */}
      <div className="flex gap-2">
        <HoneyLetter
          letter={letters[(centerIndex + 2) % 7]}
          onClick={onLetterClick}
        />
        <HoneyLetter
          letter={letters[centerIndex]}
          onClick={onLetterClick}
          center
        />
        <HoneyLetter
          letter={letters[(centerIndex + 3) % 7]}
          onClick={onLetterClick}
        />
      </div>
      {/* Bottom row */}
      <div className="flex gap-2">
        <HoneyLetter
          letter={letters[(centerIndex + 4) % 7]}
          onClick={onLetterClick}
        />
        <HoneyLetter
          letter={letters[(centerIndex + 5) % 7]}
          onClick={onLetterClick}
        />
        <HoneyLetter
          letter={letters[(centerIndex + 6) % 7]}
          onClick={onLetterClick}
        />
      </div>
      {/* Mobile row: show all letters as grid for tiny screens */}
      <div className="grid grid-cols-4 gap-2 sm:hidden mt-3">
        {letters.map((letter, i) => (
          <HoneyLetter
            key={i}
            letter={letter}
            center={i === centerIndex}
            onClick={onLetterClick}
          />
        ))}
      </div>
    </div>
  )
}

function HoneyLetter({ letter, center, onClick }: { letter: string, center?: boolean, onClick?: (letter: string) => void }) {
  return (
    <button
      type="button"
      id={`honeycomb-letter-${letter}`}
      className={cn(
        'rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold uppercase shadow border transition',
        center ? 'bg-yellow-400 border-orange-400 text-orange-900 scale-110' : 'bg-orange-100 border-yellow-400 text-yellow-900',
        'hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-orange-400',
        'sm:w-16 sm:h-16 md:w-20 md:h-20', // Responsive sizing
      )}
      onClick={() => onClick && onClick(letter)}
      tabIndex={0}
      aria-label={center ? `Center letter ${letter}` : `Letter ${letter}`}
    >
      {letter}
      {center && <Hexagon className="ml-1 w-5 h-5 text-orange-400" />}
    </button>
  )
}
