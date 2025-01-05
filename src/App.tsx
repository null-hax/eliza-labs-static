import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
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

      <div className="relative z-10 w-full h-full text-white p-8 flex flex-col items-start justify-center py-32">
        <img 
          src="/eliza-os.png" 
          alt="Eliza Studios" 
          className="w-auto h-auto max-w-[70%] max-h-[25vh] object-contain drop-shadow-lg pointer-events-none"
        />
      </div>
    </div>
  )
}

export default App
