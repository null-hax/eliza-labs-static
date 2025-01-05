import { FC } from 'react'

export const Navbar: FC = () => {
  return (
    <div className="relative z-20 w-full lg:w-24 h-20 lg:h-full bg-black">
      <div className="w-full h-full flex lg:flex-col items-center justify-between">
        <div className="flex lg:flex-col items-center gap-8 p-4 lg:p-6 relative">
          <img 
            src="/eliza.png" 
            alt="Eliza" 
            className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
          />
        </div>

        <div className="hidden lg:flex flex-col items-center gap-4 p-6">
          <span className="text-[#ff6a1a] font-mono text-sm -rotate-90 w-max">
            ELIZA OS * ELIZA STUDIOS
          </span>
        </div>

        <div className="flex lg:flex-col items-center p-4 lg:p-0">
          <div className="relative w-full lg:w-24 h-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#ff6a1a] font-mono text-sm lg:-rotate-90 pr-8 lg:pr-0">
                2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 