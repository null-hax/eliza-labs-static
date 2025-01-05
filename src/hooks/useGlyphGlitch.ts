import { useState, useEffect, useCallback } from 'react'

interface GlitchingGlyph {
  index: number
  temporaryGlyph: number
  intensity: number
}

export const useGlyphGlitch = (totalGlyphs: number) => {
  const [glitchingGlyphs, setGlitchingGlyphs] = useState<GlitchingGlyph[]>([])

  const triggerGlitch = useCallback(() => {
    // Random number of glyphs to glitch (1-9)
    const glitchCount = Math.floor(Math.random() * 9) + 1
    
    // Create new glitch instances
    const newGlitches: GlitchingGlyph[] = Array.from({ length: glitchCount }, () => ({
      index: Math.floor(Math.random() * totalGlyphs),
      temporaryGlyph: Math.floor(Math.random() * totalGlyphs) + 1,
      intensity: Math.random() * 0.4 + 0.8
    }))

    setGlitchingGlyphs(prev => [...prev, ...newGlitches])

    // Stagger the reset of each glitch
    newGlitches.forEach((glitch, i) => {
      setTimeout(() => {
        setGlitchingGlyphs(prev => 
          prev.filter(g => g.index !== glitch.index)
        )
      }, 100 + Math.random() * 200)
    })
  }, [totalGlyphs])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.20) { // Increased to 20% chance
        triggerGlitch()
      }
    }, 600)

    return () => clearInterval(interval)
  }, [triggerGlitch])

  return glitchingGlyphs
} 