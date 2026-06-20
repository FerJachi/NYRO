'use client'
import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-[#2DD4BF] text-xs tracking-[0.3em] uppercase">
            Loading
          </span>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
