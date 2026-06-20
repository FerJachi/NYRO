import LiquidGradient from './ui/liquid-gradient'
import CinematicHero from './ui/cinematic-landing-hero'
import { NyroMeshGradientTeal } from './ui/nyro-mesh-gradient'
import LazyGradient from './ui/lazy-gradient'

interface LandingProps {
  onEnter: () => void
}

export default function Landing({ onEnter }: LandingProps) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100svh',
      background: 'transparent',
      overflow: 'hidden',
    }}>
      {/* Mesh gradient — deepest layer */}
      <LazyGradient>
        <NyroMeshGradientTeal
          className="absolute inset-0 z-0 pointer-events-none"
          opacity={0.9}
          speed={0.35}
        />
      </LazyGradient>

      {/* Atmospheric depth layer */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(13,148,136,0.15) 0%, rgba(0,0,0,0) 70%)',
      }} />

      {/* Liquid gradient — above mesh */}
      <LiquidGradient
        className="absolute inset-0 z-[1] pointer-events-none"
        opacity={0.9}
        speed={0.45}
        mouseReactive={true}
      />

      {/* Pulsing teal rings behind phone */}
      {([
        { size: 600, borderOpacity: 0.06, delay: '0s' },
        { size: 800, borderOpacity: 0.04, delay: '0.7s' },
        { size: 1000, borderOpacity: 0.02, delay: '1.4s' },
      ] as const).map(({ size, borderOpacity, delay }) => (
        <div
          key={size}
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: `${size}px`, height: `${size}px`,
            borderRadius: '50%',
            border: `1px solid rgba(45,212,191,${borderOpacity})`,
            pointerEvents: 'none', zIndex: 1,
            animation: `ringPulse 4s ease-in-out ${delay} infinite`,
          }}
        />
      ))}

      {/* Cinematic hero — NYRO landing gate */}
      <CinematicHero
        brandName="NYRO"
        tagline1="Your business runs."
        tagline2="You live."
        cardHeading="Control Without Presence."
        cardDescription="NYRO is the mobile app that lets CEOs and business owners run their entire operation from anywhere in the world. AI handles the decisions. You handle your life."
        metricValue={100}
        metricLabel="Remote Control"
        ctaHeading="Enter the future"
        ctaDescription="Puerto Rico's next generation of business leaders runs on NYRO."
        onEnter={onEnter}
      />
    </div>
  )
}
