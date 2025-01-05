import { useState, useEffect, useCallback, useRef } from 'react'

// Control variables for easy adjustment
const CONFIG = {
  TRANSITION_INTERVAL: 2000,    // How often transitions occur (in ms)
  TRANSITION_DURATION: 0.5,     // Duration of each transition animation (in seconds)
  FADE_OPACITY: 0.2            // How transparent glyphs become during transition
}

interface TransitioningGlyph {
  index: number
  newGlyph: number
}

export const useGlyphTransition = (
  totalGlyphs: number, 
  onTransitionComplete: (index: number, newGlyph: number) => void
) => {
  const [transitioningGlyph, setTransitioningGlyph] = useState<TransitioningGlyph | null>(null)
  const lastIndex = useRef<number | null>(null)

  const triggerTransition = useCallback(() => {
    let index: number
    do {
      index = Math.floor(Math.random() * totalGlyphs)
    } while (index === lastIndex.current)
    
    lastIndex.current = index

    const currentGlyph = Number(
      document.querySelector(`[data-glyph-index="${index}"]`)?.getAttribute('data-glyph-number')
    )

    let newGlyph: number
    do {
      newGlyph = Math.floor(Math.random() * totalGlyphs) + 1
    } while (newGlyph === currentGlyph)
    
    const newTransition: TransitioningGlyph = { index, newGlyph }
    setTransitioningGlyph(newTransition)
    
    setTimeout(() => {
      setTransitioningGlyph(null)
      onTransitionComplete(index, newGlyph)
    }, CONFIG.TRANSITION_DURATION * 1000)
  }, [totalGlyphs, onTransitionComplete])

  useEffect(() => {
    const interval = setInterval(triggerTransition, CONFIG.TRANSITION_INTERVAL)
    return () => clearInterval(interval)
  }, [triggerTransition])

  return { transitioningGlyph, config: CONFIG }
} 