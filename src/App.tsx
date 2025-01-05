import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col lg:flex-row">
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
            <span className="text-[#ff6a1a] font-mono text-sm -rotate-90 w-max">ELIZA OS * ELIZA STUDIOS</span>
          </div>

          <div className="flex lg:flex-col items-center p-4 lg:p-0">
            <div className="relative w-full lg:w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#ff6a1a] font-mono text-sm lg:-rotate-90 pr-8 lg:pr-0">2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex-1">
        <div className="absolute inset-0 z-0">
          <ShaderGradientCanvas className="w-full h-full">
            <ShaderGradient
              type="waterPlane"
              animate="on"
              cDistance={2.4}
              cPolarAngle={95}
              color1="#ff6a1a"
              color2="#ec5a11"
              color3="#FD4912"
              brightness={1.2}
              grain="off"
              uDensity={1.8}
              uFrequency={5.5}
              uSpeed={0.2}
              uStrength={3}
            />
          </ShaderGradientCanvas>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-start justify-center p-8">
          <img 
            src="/eliza-os.png" 
            alt="Eliza Studios" 
            className="w-auto h-auto max-w-[90%] lg:max-w-[70%] max-h-[25vh] object-contain pointer-events-none invert"
          />
        </div>
      </div>
    </div>
  )
}

export default App
