import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NyroMeshGradient from './nyro-mesh-gradient'
import LazyGradient from './lazy-gradient'

gsap.registerPlugin(ScrollTrigger)

const STYLES = `
@keyframes footer-marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes footer-aurora-a {
  0%, 100% { opacity: 0.28; transform: translate(0,0) scale(1); }
  50%       { opacity: 0.35; transform: translate(2%,-1.5%) scale(1.1); }
}
@keyframes footer-aurora-b {
  0%, 100% { opacity: 0.18; transform: translate(0,0) scale(1); }
  50%       { opacity: 0.28; transform: translate(-2%,2%) scale(1.08); }
}
`

const MARQUEE_ITEMS = [
  'Control Without Presence', 'People', 'Finance', 'Inventory',
  'Intelligence', 'Control', 'Puerto Rico', 'Run From Anywhere',
]

function MarqueeItem({ text }: { text: string }) {
  return (
    <>
      <span style={{
        fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
        whiteSpace: 'nowrap',
      }}>
        {text}
      </span>
      <span aria-hidden="true" style={{
        color: 'rgba(45,212,191,0.55)', margin: '0 20px',
        flexShrink: 0, fontSize: '10px',
      }}>✦</span>
    </>
  )
}

export default function CinematicFooter() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const btnRef     = useRef<HTMLButtonElement>(null)
  const [btnHovered, setBtnHovered] = useState(false)
  const [isMobile, setIsMobile]     = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (document.getElementById('footer-styles')) return
    const el = document.createElement('style')
    el.id = 'footer-styles'
    el.textContent = STYLES
    document.head.appendChild(el)
    return () => { el.remove() }
  }, [])

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(el,
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        )
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 18
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 18
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <footer
      style={{
        position: 'relative', overflow: 'hidden',
        background: '#000000',
        fontFamily: "'Neue Haas Grotesk','Inter',system-ui,sans-serif",
      }}
    >
      {/* Mesh gradient — footer base */}
      <LazyGradient>
        <NyroMeshGradient
          className="absolute inset-0 z-0 pointer-events-none"
          opacity={0.5}
          speed={0.15}
        />
      </LazyGradient>

      {/* Aurora blobs */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '15%', left: '25%',
        width: '600px', height: '420px',
        background: 'radial-gradient(ellipse, rgba(45,212,191,0.1) 0%, rgba(13,148,136,0.05) 50%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(48px)', pointerEvents: 'none',
        animation: 'footer-aurora-a 7s ease-in-out infinite',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '40%', right: '15%',
        width: '480px', height: '360px',
        background: 'radial-gradient(ellipse, rgba(13,148,136,0.08) 0%, rgba(45,212,191,0.04) 50%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(52px)', pointerEvents: 'none',
        animation: 'footer-aurora-b 9s ease-in-out infinite',
      }} />

      {/* Grid */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: [
          'linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '80px 80px',
      }} />

      {/* Marquee */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.6)', overflow: 'hidden',
        padding: '14px 0', position: 'relative', zIndex: 2,
      }}>
        <div style={{
          display: 'flex', width: 'max-content',
          animation: 'footer-marquee 22s linear infinite',
        }}>
          {doubled.map((text, i) => <MarqueeItem key={i} text={text} />)}
        </div>
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: isMobile ? '80px 24px 72px' : '120px 64px 96px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        {/* Giant watermark */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(120px, 22vw, 260px)', fontWeight: 800,
          letterSpacing: '-0.06em', lineHeight: 1,
          color: 'rgba(255,255,255,0.02)',
          WebkitTextStroke: '1px rgba(45,212,191,0.06)',
          pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
        }}>
          NYRO
        </div>

        <h2
          ref={headingRef}
          style={{
            fontSize: isMobile ? 'clamp(32px, 9vw, 52px)' : 'clamp(44px, 6vw, 80px)',
            fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.05,
            color: 'white', marginBottom: '56px', opacity: 0,
            maxWidth: '820px',
          }}
        >
          Control Without Presence.
        </h2>

        <div data-reveal="scale" data-reveal-delay="3">
          <button
            ref={btnRef}
            data-hover
            aria-label="Experience NYRO"
            onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              padding: isMobile ? '16px 48px' : '18px 60px',
              background: 'linear-gradient(135deg, #0D9488 0%, #2DD4BF 50%, #5EEAD4 100%)',
              color: '#000000', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              border: 'none', cursor: 'none',
              boxShadow: btnHovered ? '0 0 60px rgba(45,212,191,0.45)' : '0 0 40px rgba(45,212,191,0.25)',
              transform: btnHovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              willChange: 'transform',
            }}
          >
            Experience NYRO
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'relative', zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: isMobile ? '20px 24px' : '24px 64px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '6px', textAlign: 'center',
      }}>
        <span
          data-reveal
          data-reveal-delay="4"
          style={{
            fontSize: '10px', fontWeight: 400,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          2025 NYRO. All rights reserved.
        </span>
        <span
          data-reveal
          data-reveal-delay="5"
          style={{
            fontSize: '10px', fontWeight: 400,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          Built for Puerto Rico&apos;s future leaders.
        </span>
      </div>
    </footer>
  )
}
