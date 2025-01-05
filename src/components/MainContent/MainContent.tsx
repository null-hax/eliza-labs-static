import { FC, useState } from 'react'
import { ShaderBackground } from '../ShaderBackground/ShaderBackground'
import { useGlyphTransition } from '../../hooks/useGlyphTransition'
import { motion } from 'framer-motion'

const GLYPH_COUNT = 11

export const MainContent: FC = () => {
  const [currentGlyphs, setCurrentGlyphs] = useState(() => {
    const glyphNumbers = Array.from({ length: GLYPH_COUNT }, (_, i) => i + 1)
    return glyphNumbers.sort(() => Math.random() - 0.5)
  })

  const { transitioningGlyph, config } = useGlyphTransition(GLYPH_COUNT, (index, newGlyph) => {
    setCurrentGlyphs(prev => {
      const newGlyphs = [...prev]
      newGlyphs[index] = newGlyph
      return newGlyphs
    })
  })

  return (
    <div className="relative w-full h-full">
      <ShaderBackground />
      <div className="relative z-10 w-full h-full flex flex-col items-start justify-center p-8 gap-8">
        <img 
          src="/eliza-os.png" 
          alt="Eliza OS logo" 
          className="w-auto h-auto max-w-[90%] lg:max-w-[70%] max-h-[25vh] object-contain pointer-events-none invert"
        />
        
        <div className="flex flex-row flex-wrap gap-4 items-center">
          {currentGlyphs.map((num, index) => {
            const isTransitioning = transitioningGlyph?.index === index
            
            return (
              <motion.div
                key={`glyph-${index}`}
                animate={{
                  opacity: isTransitioning ? config.FADE_OPACITY : 1
                }}
                transition={{
                  duration: config.TRANSITION_DURATION,
                  ease: "easeInOut"
                }}
              >
                <motion.img
                  src={`/glyphs/${num}.png`}
                  alt={`Glyph ${num}`}
                  className="w-6 h-6 lg:w-10 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
                  data-glyph-index={index}
                  data-glyph-number={num}
                  transition={{
                    duration: config.TRANSITION_DURATION,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 