import { useEffect, useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import gsap from 'gsap'
import './styles/globals.css'
import Nav from './components/Nav'
import Vision from './components/Vision'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Campaign from './components/Campaign'
import Landing from './components/Landing'
import { ReducedMotionContext } from './contexts/ReducedMotionContext'

export default function App() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hasEntered, setHasEntered]       = useState(false)

  // Always start at the top — prevents browser scroll-position restoration
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Global data-reveal IntersectionObserver — runs after sections mount
  useEffect(() => {
    if (!hasEntered) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))

    const timerId = window.setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.revealed)')
        .forEach((el) => observer.observe(el))
    }, 500)

    return () => {
      observer.disconnect()
      clearTimeout(timerId)
    }
  }, [hasEntered])

  // Fade out the black overlay when presentation loads; snap to vision while overlay covers screen
  useEffect(() => {
    if (!hasEntered) return
    window.scrollTo(0, 0)
    const overlay = document.getElementById('black-overlay')
    if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.55, delay: 0.15, ease: 'power2.out' })
  }, [hasEntered])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const dot  = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0, rafId = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      if (dot) gsap.set(dot, { x: mouseX, y: mouseY })
    }
    const lerpRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) gsap.set(ring, { x: ringX, y: ringY })
      rafId = requestAnimationFrame(lerpRing)
    }
    lerpRing()
    window.addEventListener('mousemove', onMouseMove)

    const addHover    = () => document.body.classList.add('cursor-hover')
    const removeHover = () => document.body.classList.remove('cursor-hover')
    const attachCursor = () => {
      const els = document.querySelectorAll('a, button, [data-hover], [data-glow]')
      els.forEach((el) => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
      return els
    }
    let els = attachCursor()
    const reattachId = window.setTimeout(() => {
      els.forEach((el) => { el.removeEventListener('mouseenter', addHover); el.removeEventListener('mouseleave', removeHover) })
      els = attachCursor()
    }, 1500)

    const bar = document.getElementById('progress-bar')
    const onScroll = () => {
      if (!bar) return
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      clearTimeout(reattachId)
      els.forEach((el) => { el.removeEventListener('mouseenter', addHover); el.removeEventListener('mouseleave', removeHover) })
    }
  }, [])

  return (
    <ReducedMotionContext.Provider value={reducedMotion}>
      <MotionConfig reducedMotion="user">
      {/* Black overlay — always rendered; GSAP controls opacity during enter transition */}
      <div
        id="black-overlay"
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#000000', opacity: 0,
          pointerEvents: 'none',
        }}
      />

      <div id="cursor-dot" />
      <div id="cursor-ring" />

      {!hasEntered ? (
        /* Landing gate — only thing visible before user enters */
        <Landing onEnter={() => setHasEntered(true)} />
      ) : (
        /* Full presentation — mounts only after entering */
        <div style={{ background: '#000000', overflowX: 'hidden', position: 'relative' }}>
          <div id="progress-bar" />
          <Nav />
          <Vision />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(45,212,191,0.4), transparent)', transformOrigin: 'center', width: '100%' }}
          />
          <Problem />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(45,212,191,0.4), transparent)', transformOrigin: 'center', width: '100%' }}
          />
          <Solution />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(45,212,191,0.4), transparent)', transformOrigin: 'center', width: '100%' }}
          />
          <Campaign />
        </div>
      )}
      </MotionConfig>
    </ReducedMotionContext.Provider>
  )
}
