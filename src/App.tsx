import { FC, useState, useEffect } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { MainContent } from './components/MainContent/MainContent'
import { LoadingSequence } from './components/LoadingSequence/LoadingSequence'
import { motion, useReducedMotion } from 'framer-motion'
import { Toaster } from 'sonner'

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
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
    initial: isMobile ? { y: -100 } : { x: -100 },
    animate: { 
      y: isMobile ? (showContent ? 0 : -100) : 0,
      x: isMobile ? 0 : (showContent ? 0 : -100)
    },
    transition: { duration: shouldReduceMotion ? 0 : 0.5 }
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'white',
            color: '#002AF0',
            border: '1px solid rgba(255, 106, 26, 0.3)',
          },
        }}
      />
      <LoadingSequence 
        isComplete={!isLoading}
        onComplete={() => setShowContent(true)} 
      />
      
      <motion.div 
        className="relative w-screen h-screen overflow-hidden flex flex-col lg:flex-row bg-[#002AF0]"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="relative z-10"
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
