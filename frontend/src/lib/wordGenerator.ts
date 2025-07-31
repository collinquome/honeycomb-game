import words from 'an-array-of-english-words'

export interface PuzzleConfig {
  letters: string[]
  centerIndex: number
}

/**
 * Generate valid words for a honeycomb puzzle
 * Rules:
 * - Words must be at least 4 letters long
 * - Words must contain the center letter
 * - Words can only use letters from the available set
 * - Each letter can be used multiple times
 */
export function generateValidWords(config: PuzzleConfig): string[] {
  const { letters, centerIndex } = config
  
  // Validation
  if (!letters || letters.length === 0) {
    throw new Error('Letters array cannot be empty')
  }
  if (centerIndex < 0 || centerIndex >= letters.length) {
    throw new Error('Invalid center index')
  }
  if (!words || !Array.isArray(words)) {
    throw new Error('Word list not loaded properly')
  }
  
  const centerLetter = letters[centerIndex].toLowerCase()
  const availableLetters = new Set(letters.map(l => l.toLowerCase()))
  
  console.log(`Generating words for letters: ${letters.join('')}, center: ${centerLetter}`)
  console.log(`Total words in dictionary: ${words.length}`)
  
  const validWords = words.filter(word => {
    // Convert to lowercase for comparison
    const lowerWord = word.toLowerCase()
    
    // Must be at least 4 letters
    if (lowerWord.length < 4) return false
    
    // Must contain center letter
    if (!lowerWord.includes(centerLetter)) return false
    
    // All letters must be available in the puzzle
    for (const letter of lowerWord) {
      if (!availableLetters.has(letter)) return false
    }
    
    return true
  })
  
  console.log(`Found ${validWords.length} valid words`)
  
  // Return uppercase words, sorted by length then alphabetically
  return validWords
    .map(word => word.toUpperCase())
    .sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length
      }
      return a.localeCompare(b)
    })
}

/**
 * Calculate maximum possible score for a puzzle
 * Scoring: 1 point per letter in word
 */
export function calculateMaxScore(words: string[]): number {
  return words.reduce((total, word) => total + word.length, 0)
}

/**
 * Get puzzle statistics
 */
export function getPuzzleStats(words: string[]) {
  if (!words || words.length === 0) {
    return {
      totalWords: 0,
      maxScore: 0,
      wordsByLength: {},
      longestWord: 0,
      shortestWord: 0
    }
  }
  
  const byLength = words.reduce((acc, word) => {
    acc[word.length] = (acc[word.length] || 0) + 1
    return acc
  }, {} as Record<number, number>)
  
  return {
    totalWords: words.length,
    maxScore: calculateMaxScore(words),
    wordsByLength: byLength,
    longestWord: Math.max(...words.map(w => w.length)),
    shortestWord: Math.min(...words.map(w => w.length))
  }
}