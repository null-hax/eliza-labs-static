import { FC, useEffect, useRef, useState } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export const ShaderBackground: FC = () => {
  const [isShaderLoaded, setIsShaderLoaded] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkCanvas = () => {
      if (!canvasRef.current) return
      
      const canvas = canvasRef.current.querySelector('canvas')
      if (!canvas) return
      
      const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (ctx && ctx.getContextAttributes()) {
        setTimeout(() => {
          setIsShaderLoaded(true)
        }, 100)
        return
      }
      
      requestAnimationFrame(checkCanvas)
    }

    checkCanvas()
  }, [])

  return (
    <div 
      ref={canvasRef}
      className={`w-full h-full transition-opacity duration-700 ${
        isShaderLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
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
  )
} 