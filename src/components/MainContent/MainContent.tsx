import { FC, useState, useEffect, useRef } from 'react'
import { ShaderBackground } from '../ShaderBackground/ShaderBackground'
import { useGlyphTransition } from '../../hooks/useGlyphTransition'
import { motion } from 'framer-motion'
import { ContactForm } from '../ContactForm/ContactForm'

const DESKTOP_GLYPH_COUNT = 19
const MOBILE_GLYPH_COUNT = 11   
const AVAILABLE_GLYPHS = 11

export const MainContent: FC = () => {
  const formRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const glyphCount = isMobile ? MOBILE_GLYPH_COUNT : DESKTOP_GLYPH_COUNT

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [currentGlyphs, setCurrentGlyphs] = useState(() => {
    const glyphNumbers = Array.from({ length: DESKTOP_GLYPH_COUNT }, () => 
      Math.floor(Math.random() * AVAILABLE_GLYPHS) + 1
    )
    return glyphNumbers
  })

  const { transitioningGlyph, config } = useGlyphTransition(glyphCount, (index, newGlyph) => {
    setCurrentGlyphs(prev => {
      const newGlyphs = [...prev]
      newGlyphs[index] = newGlyph
      return newGlyphs
    })
  })

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative w-full h-full overflow-y-auto">
      <div className="fixed inset-0 z-0">
        <ShaderBackground />
      </div>
      
      <div className="relative z-[1]">
        <div className="w-full h-screen flex flex-col items-center lg:items-start justify-center p-8 gap-8 sticky top-0">
          <img 
            src="/eliza-os.png" 
            alt="Eliza OS logo" 
            className="w-auto h-auto max-w-[90%] lg:max-w-[70%] max-h-[25vh] object-contain pointer-events-none invert"
          />
          
          <div className={`
            w-[90%] lg:w-[70%]
            flex flex-row flex-wrap justify-between gap-4
          `}>
            {currentGlyphs.slice(0, glyphCount).map((num, index) => {
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
                    className="w-2 h-2 lg:w-4 lg:h-4 object-contain opacity-80 hover:opacity-100 transition-opacity pointer-events-none"
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

          <button
            onClick={scrollToForm}
            className="mt-8 px-6 py-2 font-secondary rounded focus:outline-none border-none hover:bg-black/60"
          >
            Inquiries
          </button>
        </div>

        <div 
          ref={formRef} 
          className="relative min-h-screen flex items-center justify-center bg-black/90 backdrop-blur-sm border-l border-[#ff6a1a]"
        >
          <ContactForm />
        </div>
      </div>
    </div>
  )
} 