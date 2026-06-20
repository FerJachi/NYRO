import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import nyroLogo from '../assets/nyro-logo-website.png'
import { MeshGradient } from '@paper-design/shaders-react'

import LiquidGradient from './ui/liquid-gradient'
import NyroMeshGradient from './ui/nyro-mesh-gradient'
import LazyGradient from './ui/lazy-gradient'

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Vision() {
  const [isMobile, setIsMobile] = useState(false)
  const [statPercent, setStatPercent] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const countUpDone = useRef(false)

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768)
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  // Count-up triggers when stat pillars enter the viewport
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countUpDone.current) {
          countUpDone.current = true
          const duration = 1500
          let start: number | null = null
          const step = (ts: number) => {
            if (!start) start = ts
            const elapsed = ts - start
            const p = Math.min(elapsed / duration, 1)
            setStatPercent(Math.round(p * 100))
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const statGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr',
    maxWidth: '600px',
    width: '100%',
    border: '1px solid rgba(45,212,191,0.22)',
  }

  return (
    <section
      id="vision"
      ref={sectionRef}
      style={{ position: 'relative', background: '#000000', overflowX: 'hidden' }}
    >
      {/* ── Logo zoom hero ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        {/* Paper-design mesh gradient base */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <MeshGradient
            style={{ width: '100%', height: '100%' }}
            colors={['#000000', '#010f0c', '#021a14', '#063d2a', '#000000']}
            speed={0.35}
          />
        </div>

        {/* Background layers */}
        <LazyGradient>
          <NyroMeshGradient
            className="absolute inset-0 z-0 pointer-events-none"
            opacity={0.85}
            speed={0.25}
          />
        </LazyGradient>

        <LiquidGradient
          className="absolute inset-0 pointer-events-none"
          opacity={0.6}
          speed={0.25}
          mouseReactive={true}
        />

        {/* Left edge teal glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0,
          width: '3px', height: '100%', pointerEvents: 'none', zIndex: 5,
          background: 'linear-gradient(to bottom, transparent, rgba(45,212,191,0.4), rgba(45,212,191,0.6), rgba(45,212,191,0.4), transparent)',
        }} />

        {/* Atmospheric overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: [
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(13,148,136,0.1) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 60% at 100% 100%, rgba(45,212,191,0.05) 0%, transparent 50%)',
          ].join(', '),
        }} />

        {/* Radial glow behind logo */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Logo — quick zoom entrance */}
        <motion.img
          src={nyroLogo}
          alt="NYRO"
          initial={{
            scale: 0.4,
            opacity: 0,
            filter: 'blur(20px) brightness(0.3)',
          }}
          animate={{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px) brightness(1.3) drop-shadow(0 0 40px rgba(45,212,191,0.7))',
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 14,
            delay: 0.2,
          }}
          style={{
            width: 'clamp(160px, 22vw, 320px)',
            height: 'auto',
            objectFit: 'contain',
            mixBlendMode: 'screen',
            position: 'relative',
            zIndex: 2,
          }}
        />

        {/* Control Without Presence — word by word */}
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 72px)',
            fontWeight: 200,
            letterSpacing: '-0.025em',
            color: 'white',
            textAlign: 'center',
            margin: '32px 0 0',
            lineHeight: 1.1,
            zIndex: 2,
            position: 'relative',
          }}
        >
          {'Control Without Presence'.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EXPO, delay: 0.7 + i * 0.08 }}
              style={{ display: 'inline-block', marginRight: '0.28em' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* People. Control. Freedom. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EXPO, delay: 1.0 }}
          style={{
            display: 'flex',
            gap: '32px',
            marginTop: '24px',
            zIndex: 2,
            position: 'relative',
          }}
        >
          {['People.', 'Control.', 'Freedom.'].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 1.1 + i * 0.2, duration: 0.6, ease: EXPO }}
              style={{
                fontSize: 'clamp(14px, 1.8vw, 20px)',
                fontWeight: 300,
                color: '#2DD4BF',
                letterSpacing: '0.05em',
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll label */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          zIndex: 2,
          whiteSpace: 'nowrap',
        }}>
          Scroll to Enter
        </div>
      </div>

      {/* ── Content below ─────────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: isMobile ? '80px 24px 120px' : '100px 24px 160px',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '120px', pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.95))',
        }} />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
            marginBottom: '48px',
          }}
        >
          02 / Vision
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', duration: 0.8, bounce: 0.1, delay: 0.4 }}
          style={{
            fontSize: 'clamp(36px,5.5vw,80px)', fontWeight: 200,
            letterSpacing: '-0.03em', lineHeight: 1.05, color: 'white',
            textAlign: 'center', marginBottom: '36px',
          }}
        >
          Your business runs. You live.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            fontSize: isMobile ? '15px' : '17px', fontWeight: 300,
            lineHeight: 1.8, letterSpacing: '0.01em',
            color: 'rgba(255,255,255,0.55)', maxWidth: '520px',
            textAlign: 'center', margin: '0 auto', marginBottom: '96px',
          }}
        >
          NYRO is the mobile app that lets CEOs and business owners run their
          entire operation from anywhere in the world. AI handles the decisions.
          You handle your life.
        </motion.p>

        {/* Stat pillars */}
        <div style={statGridStyle}>
          {[
            { display: '24/7',           label: 'Always On',      delay: 0 },
            { display: `${statPercent}%`, label: 'Remote Control', delay: 0.1 },
            { display: '0',              label: 'Interruptions',   delay: 0.2 },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: stat.delay }}
              style={{
                padding: '36px 28px', textAlign: 'center',
                borderRight: isMobile
                  ? i === 0 ? '1px solid rgba(45,212,191,0.22)' : 'none'
                  : i < 2   ? '1px solid rgba(45,212,191,0.22)' : 'none',
                gridColumn: isMobile && i === 2 ? '1 / -1' : 'auto',
                borderTop: isMobile && i === 2 ? '1px solid rgba(45,212,191,0.22)' : 'none',
              }}
            >
              <span style={{
                fontSize: '34px', fontWeight: 700, color: '#2DD4BF',
                letterSpacing: '-0.03em', display: 'block', marginBottom: '10px',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {stat.display}
              </span>
              <span style={{
                fontSize: '10px', fontWeight: 500, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
              }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom transition gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '120px',
        background: 'linear-gradient(to bottom, transparent, #000000)',
        pointerEvents: 'none', zIndex: 5,
      }} />
    </section>
  )
}
