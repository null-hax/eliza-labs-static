import { FC } from 'react'

export const Navbar: FC = () => {
  return (
    <div className="w-full lg:w-24 h-20 lg:h-full bg-white">
      <div className="w-full h-full flex lg:flex-col items-center justify-between">
        <div className="flex lg:flex-col items-center gap-8 p-4 lg:p-6 relative">
          <img 
            src="/elizab.png" 
            alt="Eliza" 
            className="w-10 h-10 lg:w-12 lg:h-12 object-contain grayscale"
          />
        </div>

        <div className="hidden lg:flex flex-col items-center gap-4 p-6">
          <span className="text-black font-mono text-sm -rotate-90 w-max">
            ELIZA OS * ELIZA LABS
          </span>
        </div>

        <div className="flex lg:flex-col items-center p-4 lg:p-0">
          <div className="relative w-full lg:w-24 h-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black font-mono text-sm lg:-rotate-90 pr-8 lg:pr-0">
                {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 