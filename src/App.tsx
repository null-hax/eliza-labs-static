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

      <div className="relative z-10 w-full h-full text-white p-8 flex flex-col items-start justify-center py-32 [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
        <h1 className="text-9xl mb-4 font-bold text-black">ELIZA <span className="font-secondary">STUDIOS</span></h1>
      </div>
    </div>
  )
}

export default App
