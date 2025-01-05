import { FC } from 'react'
import { ShaderBackground } from '../ShaderBackground/ShaderBackground'

export const MainContent: FC = () => {
  return (
    <div className="relative w-full h-full">
      <ShaderBackground />
      <div className="relative z-10 w-full h-full flex flex-col items-start justify-center p-8">
        <img 
          src="/eliza-os.png" 
          alt="Eliza OS logo" 
          className="w-auto h-auto max-w-[90%] lg:max-w-[70%] max-h-[25vh] object-contain pointer-events-none invert"
        />
      </div>
    </div>
  )
} 