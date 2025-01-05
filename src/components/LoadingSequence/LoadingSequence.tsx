import { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingSequenceProps {
  isComplete: boolean
  onComplete: () => void
}

export const LoadingSequence: FC<LoadingSequenceProps> = ({ isComplete, onComplete }) => {
  return (
    <AnimatePresence mode="sync" onExitComplete={onComplete}>
      {!isComplete && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.img 
              src="/eliza.png" 
              alt="Eliza"
              className="w-16 h-16 object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative h-[2px] w-[120px]">
              <motion.div 
                className="absolute inset-0 bg-[#ff6a1a]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1],
                  delay: 0.2
                }}
                style={{ originX: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 