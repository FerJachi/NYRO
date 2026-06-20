import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import nyroLogoWebsite from '../../assets/nyro-logo-website.png'
import { NyroButton } from './rainbow-borders-button'

// ─── Injected styles ──────────────────────────────────────────────────────────
const INJECTED_STYLES = `
@keyframes ch-grain {
  0%,100%{ transform:translate(0,0); }
  10%{ transform:translate(-2%,-3%); }
  20%{ transform:translate(-4%,1%); }
  30%{ transform:translate(2%,-6%); }
  40%{ transform:translate(-1%,6%); }
  50%{ transform:translate(-4%,2%); }
  60%{ transform:translate(4%,0%); }
  70%{ transform:translate(0%,4%); }
  80%{ transform:translate(1%,8%); }
  90%{ transform:translate(-3%,2%); }
}
.ch-grain::before {
  content:'';
  position:absolute; top:-50%; left:-50%;
  width:200%; height:200%;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity:0.05; mix-blend-mode:overlay;
  animation:ch-grain 8s steps(10) infinite;
  pointer-events:none; z-index:10;
}
@keyframes ch-glow-pulse {
  0%,100%{ transform:translate(-50%,-50%) scale(1); opacity:0.6; }
  50%{ transform:translate(-50%,-50%) scale(1.15); opacity:1; }
}
@keyframes ch-arrow {
  0%,100%{ transform:translateX(0); opacity:1; }
  50%{ transform:translateX(5px); opacity:0.6; }
}
.ch-arrow{ animation:ch-arrow 1.5s ease-in-out infinite; display:inline-flex; }
`

// ─── Props ────────────────────────────────────────────────────────────────────
export interface CinematicHeroProps {
  brandName: string
  tagline1: string
  tagline2: string
  cardHeading: string
  cardDescription: string
  metricValue: number
  metricLabel: string
  ctaHeading: string
  ctaDescription: string
  onEnter: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CinematicHero({ onEnter }: CinematicHeroProps) {
  const sectionRef      = useRef<HTMLElement>(null)
  const phoneWrapperRef = useRef<HTMLDivElement>(null)   // outer wrapper — scaled on enter
  const logoRef         = useRef<HTMLImageElement>(null)  // NYRO logo — zoomed on enter
  const [isMobile, setIsMobile] = useState(false)
  const [entered, setEntered]   = useState(false)

  // Inject styles once
  useEffect(() => {
    if (document.getElementById('ch-styles')) return
    const el = document.createElement('style')
    el.id = 'ch-styles'
    el.textContent = INJECTED_STYLES
    document.head.appendChild(el)
    return () => { el.remove() }
  }, [])

  // Responsive
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // ─── Entrance animation (auto-play) ──────────────────────────────────────────
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set('.ch-phone-wrap', { opacity: 1 })
      gsap.set('.ch-glow', { opacity: 1 })
      gsap.set('.ch-badge', { autoAlpha: 1 })
      gsap.set('.ch-enter-btn', { autoAlpha: 1 })
      return
    }
    const tl = gsap.timeline({ delay: 0.2 })
    tl
      .fromTo('.ch-phone-wrap', { y: 48, opacity: 0, scale: 0.93 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' })
      .fromTo('.ch-glow', { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }, '-=0.9')
      .fromTo('.ch-badge', { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, '-=0.25')
      .fromTo('.ch-enter-btn', { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out',
          onComplete: () => gsap.set('.ch-enter-btn', { clearProps: 'transform' }),
        }, '-=0.3')
    return () => { tl.kill() }
  }, [])

  // ─── Global mouse tilt — tracks viewport center ───────────────────────────────
  useEffect(() => {
    const phone = phoneWrapperRef.current
    if (!phone || isMobile) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 10
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      gsap.to(phone, { rotateY: x, rotateX: -y, duration: 0.6, ease: 'power2.out', transformPerspective: 1200 })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [isMobile])

  // ─── Enter portal animation — zooms into NYRO logo ───────────────────────────
  const handleEnter = () => {
    if (entered) return
    setEntered(true)
    const overlay = document.getElementById('black-overlay')
    const section = sectionRef.current
    const phone   = phoneWrapperRef.current
    const logo    = logoRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      if (overlay) gsap.set(overlay, { opacity: 1 })
      onEnter()
      return
    }

    const tl = gsap.timeline()
    // Logo scales 1→3 and fades (exiting — ease-in is correct)
    if (logo) {
      tl.to(logo, { scale: 3, duration: 0.45, ease: 'power2.in' }, 0)
      tl.to(logo, { opacity: 0, duration: 0.45, ease: 'power2.in' }, 0.25)
    }
    if (phone)   tl.to(phone,   { scale: 1.4, duration: 0.45, ease: 'power2.in' }, 0)
    if (section) tl.to(section, { opacity: 0, duration: 0.45, ease: 'power2.in' }, 0)
    if (overlay) tl.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0.3)
    tl.call(onEnter, [], 0.7)
  }

  // Responsive dimensions
  const glowDia = isMobile ? '400px' : '700px'

  // ─── Badge base style ────────────────────────────────────────────────────────
  const badgeBase: React.CSSProperties = {
    visibility: 'hidden',           // GSAP autoAlpha manages this
    position: 'absolute',
    display: 'flex', alignItems: 'center', gap: '10px',
    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    background: 'rgba(4,12,11,0.82)',
    border: '1px solid rgba(45,212,191,0.2)',
    borderRadius: '14px', padding: '11px 15px',
    whiteSpace: 'nowrap',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="ch-grain"
      style={{
        position: 'relative', zIndex: 1,
        width: '100%', height: '100svh', minHeight: '100svh',
        overflow: 'hidden',
        fontFamily: "'Neue Haas Grotesk','Inter',system-ui,'Helvetica Neue',sans-serif",
      }}
    >
      {/* ── Centered content column ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        width: '100%', height: '100svh',
        padding: '24px 24px 40px',
        gap: '32px',
      }}>

        {/* ── Logo + teal glow ── */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Teal radial glow — behind logo, pulsing */}
          <div
            className="ch-glow"
            aria-hidden="true"
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: glowDia, height: glowDia, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, rgba(13,148,136,0.06) 40%, transparent 70%)',
              pointerEvents: 'none', zIndex: 0,
              animation: 'ch-glow-pulse 3s ease-in-out infinite',
              opacity: 0,
            }}
          />

          {/* Logo wrapper — 3D tilt + entrance animation target */}
          <div
            ref={phoneWrapperRef}
            className="ch-phone-wrap"
            style={{
              position: 'relative', zIndex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0,
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              ref={logoRef}
              src={nyroLogoWebsite}
              alt="NYRO"
              style={{
                width: 'clamp(160px, 18vw, 260px)',
                height: 'auto',
                display: 'block',
                mixBlendMode: 'screen',
                filter: 'brightness(1.3) drop-shadow(0 0 40px rgba(45,212,191,0.7))',
                transformOrigin: 'center',
              }}
            />
          </div>
        </div>

        {/* ── Enter button — NyroButton with animated teal border ── */}
        <NyroButton
          onClick={handleEnter}
          className={`ch-enter-btn ${isMobile ? 'px-10 py-[14px]' : 'px-16 py-5'} text-[11px] tracking-[0.28em] uppercase`}
          style={{ visibility: 'hidden' }}
        >
          <span>ENTER</span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            style={{ animation: 'arrowPulse 1.5s ease-in-out infinite' }}
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </NyroButton>

      </div>
    </section>
  )
}
