import { cn } from '@/lib/utils'
import { Hexagon } from 'lucide-react'

interface HoneycombLettersProps {
  letters: string[]
  centerIndex: number
  onLetterClick?: (letter: string) => void
}

// Responsive honeycomb layout: center + 6 outer in true honeycomb tessellation
export function HoneycombLetters({ letters, centerIndex, onLetterClick }: HoneycombLettersProps) {
  // True honeycomb layout (center is index 0-6)
  //     [1]
  //   [2] [0] [3]
  // [4] [5] [6]
  // Using absolute positioning to create proper honeycomb tessellation
  return (
    <div className="relative flex items-center justify-center my-8 select-none" style={{ height: '200px', width: '280px' }}>
      {/* Center hexagon */}
      <HoneyLetter
        letter={letters[centerIndex]}
        onClick={onLetterClick}
        center
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Top hexagon */}
      <HoneyLetter
        letter={letters[(centerIndex + 1) % 7]}
        onClick={onLetterClick}
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Top-right hexagon */}
      <HoneyLetter
        letter={letters[(centerIndex + 3) % 7]}
        onClick={onLetterClick}
        style={{
          position: 'absolute',
          top: '30%',
          left: '75%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Bottom-right hexagon */}
      <HoneyLetter
        letter={letters[(centerIndex + 6) % 7]}
        onClick={onLetterClick}
        style={{
          position: 'absolute',
          top: '70%',
          left: '75%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Bottom hexagon */}
      <HoneyLetter
        letter={letters[(centerIndex + 5) % 7]}
        onClick={onLetterClick}
        style={{
          position: 'absolute',
          top: '90%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Bottom-left hexagon */}
      <HoneyLetter
        letter={letters[(centerIndex + 4) % 7]}
        onClick={onLetterClick}
        style={{
          position: 'absolute',
          top: '70%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Top-left hexagon */}
      <HoneyLetter
        letter={letters[(centerIndex + 2) % 7]}
        onClick={onLetterClick}
        style={{
          position: 'absolute',
          top: '30%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Mobile fallback: simple grid for very small screens */}
      <div className="absolute inset-0 grid grid-cols-4 gap-1 sm:hidden">
        {letters.map((letter, i) => (
          <HoneyLetter
            key={i}
            letter={letter}
            center={i === centerIndex}
            onClick={onLetterClick}
            style={{ position: 'static', transform: 'none' }}
          />
        ))}
      </div>
    </div>
  )
}

function HoneyLetter({ 
  letter, 
  center, 
  onClick, 
  style 
}: { 
  letter: string, 
  center?: boolean, 
  onClick?: (letter: string) => void,
  style?: React.CSSProperties 
}) {
  return (
    <button
      type="button"
      id={`honeycomb-letter-${letter}`}
      className={cn(
        // Hexagonal shape using clip-path
        'w-16 h-16 flex items-center justify-center text-xl font-bold uppercase shadow-lg border-2 transition relative',
        'sm:w-18 sm:h-18 md:w-20 md:h-20 md:text-2xl', // Responsive sizing
        // Perfect hexagon clip-path
        '[clip-path:polygon(30%_0%,_70%_0%,_100%_50%,_70%_100%,_30%_100%,_0%_50%)]',
        center ? 'bg-yellow-400 border-yellow-500 text-yellow-900 scale-110 z-10' : 'bg-orange-100 border-orange-300 text-orange-900',
        'hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1',
        // Hide on small screens when mobile grid is shown
        'hidden sm:flex'
      )}
      onClick={() => onClick && onClick(letter)}
      tabIndex={0}
      aria-label={center ? `Center letter ${letter}` : `Letter ${letter}`}
      style={style}
    >
      <span className="relative z-10">{letter}</span>
      {center && (
        <Hexagon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-yellow-600 opacity-30" />
      )}
    </button>
  )
}
