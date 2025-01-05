import { FC, useState, useEffect } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { MainContent } from './components/MainContent/MainContent'
import { LoadingSequence } from './components/LoadingSequence/LoadingSequence'
import { motion, useReducedMotion } from 'framer-motion'

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // 1024px matches Tailwind's lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const navbarAnimation = {
    initial: isMobile ? { y: -100 } : { x: -50 },
    animate: { 
      y: isMobile ? (showContent ? 0 : -100) : 0,
      x: isMobile ? 0 : (showContent ? 0 : -50)
    },
    transition: { duration: shouldReduceMotion ? 0 : 0.5 }
  }

  return (
    <>
      <LoadingSequence 
        isComplete={!isLoading}
        onComplete={() => setShowContent(true)} 
      />
      
      <motion.div 
        className="relative w-screen h-screen overflow-hidden flex flex-col lg:flex-row bg-[#ff6a1a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ 
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.3s ease-out'
        }}
      >
        <motion.div
          {...navbarAnimation}
        >
          <Navbar />
        </motion.div>
        
        <motion.div 
          className="flex-1 h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <MainContent />
        </motion.div>
      </motion.div>
    </>
  )
}

export default App
