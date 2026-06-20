import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import nyroLogo from '../assets/nyro-logo-website.png'

const SECTIONS = ['vision', 'problem', 'solution', 'campaign'] as const

export default function Nav() {
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Frosted glass after 80px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section detection — 0.3 for tall sections
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0, rootMargin: '-10% 0px -80% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className="nav-materialize"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 48px',
          background: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#vision"
          data-hover
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <img
            src={nyroLogo}
            alt="NYRO"
            style={{
              height: '32px',
              width: 'auto',
              display: 'block',
              mixBlendMode: 'screen',
              clipPath: 'circle(44% at 50% 48%)',
              filter: 'brightness(1.2) drop-shadow(0 0 8px rgba(45,212,191,0.4))',
            }}
          />
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
          {SECTIONS.map((id) => {
            const isActive = activeSection === id
            return (
              <button
                key={id}
                data-hover
                onClick={() => scrollTo(id)}
                style={{
                  position: 'relative',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.42)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'none',
                  transition: 'color 0.25s ease',
                  paddingBottom: '4px',
                }}
              >
                {id}
                {/* Teal underline slides in when active */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: '#2DD4BF',
                    transformOrigin: 'left center',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </button>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden"
          data-hover
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
        >
          <span style={{
            display: 'block', width: '22px', height: '1.5px',
            background: 'white',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            transition: 'transform 0.3s ease',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '1.5px',
            background: 'white',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '1.5px',
            background: 'white',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            transition: 'transform 0.3s ease',
          }} />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.96)',
              zIndex: 490,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            {SECTIONS.map((id, i) => (
              <motion.button
                key={id}
                data-hover
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => scrollTo(id)}
                style={{
                  fontSize: '32px',
                  fontWeight: 200,
                  letterSpacing: '-0.02em',
                  textTransform: 'capitalize',
                  color: activeSection === id ? '#2DD4BF' : 'white',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {id}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
