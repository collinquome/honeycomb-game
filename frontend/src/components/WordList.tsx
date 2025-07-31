import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface WordListProps {
  words: string[]
  foundWords: Set<string>
  puzzleStats?: {
    totalWords: number
    maxScore: number
    wordsByLength: Record<number, number>
    longestWord: number
    shortestWord: number
  }
}

export function WordList({ words, foundWords, puzzleStats }: WordListProps) {
  // Calculate progress percentage
  const progress = words.length > 0 ? Math.round((foundWords.size / words.length) * 100) : 0
  
  return (
    <div className="w-full max-w-2xl mx-auto my-4 space-y-4">
      {/* Progress and Stats Card */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-orange-900 flex justify-between items-center">
            <span>Progress</span>
            <span className="text-sm font-normal">{progress}% Complete</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm text-orange-800">
            <span>Words found: <strong>{foundWords.size}</strong> / {words.length}</span>
            {puzzleStats && (
              <span>Longest word: <strong>{puzzleStats.longestWord}</strong> letters</span>
            )}
          </div>
          
          {puzzleStats && (
            <div className="grid grid-cols-2 gap-4 text-xs text-orange-700">
              <div>
                <div className="font-medium mb-1">Words by length:</div>
                <div className="space-y-1">
                  {Object.entries(puzzleStats.wordsByLength)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([length, count]) => (
                      <div key={length} className="flex justify-between">
                        <span>{length} letters:</span>
                        <span>{count} words</span>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Scoring:</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Max score:</span>
                    <span>{puzzleStats.maxScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg per word:</span>
                    <span>{Math.round(puzzleStats.maxScore / puzzleStats.totalWords * 10) / 10}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Progress bar */}
          <div className="w-full bg-yellow-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Found Words List */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-orange-900">
            Found Words
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40 rounded bg-yellow-100 border border-yellow-200">
            <div className="p-3">
              {foundWords.size === 0 ? (
                <div className="text-center text-orange-600 italic">
                  No words found yet. Start typing!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-orange-800 text-sm font-mono">
                  {[...foundWords].sort().map(word => (
                    <div key={word} className="truncate">
                      {word}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
