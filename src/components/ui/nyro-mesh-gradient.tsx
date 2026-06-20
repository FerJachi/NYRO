"use client"
import { MeshGradient } from "@paper-design/shaders-react"

interface NyroMeshGradientProps {
  className?: string
  opacity?: number
  speed?: number
}

export default function NyroMeshGradient({
  className = "",
  opacity = 1,
  speed = 0.4,
}: NyroMeshGradientProps) {
  return (
    <div className={className} style={{ opacity }}>
      <MeshGradient
        className="w-full h-full"
        colors={[
          "#000000",
          "#010d0a",
          "#021410",
          "#000000",
          "#020f0c",
          "#000000",
          "#0a2520",
          "#000000",
        ]}
        speed={speed}
      />
    </div>
  )
}

export function NyroMeshGradientTeal({
  className = "",
  opacity = 1,
  speed = 0.3,
}: NyroMeshGradientProps) {
  return (
    <div className={className} style={{ opacity }}>
      <MeshGradient
        className="w-full h-full"
        colors={[
          "#000000",
          "#031a16",
          "#042220",
          "#000000",
          "#0D9488",
          "#000000",
          "#031410",
          "#000000",
        ]}
        speed={speed}
      />
    </div>
  )
}
