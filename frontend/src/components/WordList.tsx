import { ScrollArea } from '@/components/ui/scroll-area'

interface WordListProps {
  words: string[]
  foundWords: Set<string>
}

export function WordList({ words, foundWords }: WordListProps) {
  // Show found words and count
  return (
    <div className="w-full max-w-md mx-auto my-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-orange-900">Found words</span>
        <span className="text-sm text-orange-700">{foundWords.size} / {words.length}</span>
      </div>
      <ScrollArea className="h-32 rounded bg-yellow-100 border border-yellow-200">
        <ul className="p-2 grid grid-cols-2 gap-1 text-orange-800 text-sm font-mono">
          {[...foundWords].sort().map(word => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
