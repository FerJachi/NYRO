import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, DollarSign, Package, Brain, Sliders } from 'lucide-react'
import { LampContainer } from './ui/lamp'
import RadialOrbitalTimeline from './ui/radial-orbital-timeline'
import type { TimelineItem } from './ui/radial-orbital-timeline'



const PILLS = ['People', 'Finance', 'Inventory', 'Intelligence', 'Control']

const nyroOrbitalData: TimelineItem[] = [
  {
    id: 1,
    title: 'People',
    date: 'Team Operations',
    content: 'NYRO manages your team automatically. Scheduling, attendance, payroll alerts and performance tracking handled while you are anywhere in the world.',
    category: 'HR Automation',
    icon: Users,
    relatedIds: [2, 5],
    status: 'completed',
    energy: 95,
  },
  {
    id: 2,
    title: 'Finance',
    date: 'Cash Flow Intelligence',
    content: 'Real-time cash flow visibility. Revenue tracking, expense alerts and financial health monitoring so you always know where your business stands.',
    category: 'Financial Control',
    icon: DollarSign,
    relatedIds: [1, 4],
    status: 'completed',
    energy: 88,
  },
  {
    id: 3,
    title: 'Inventory',
    date: 'Supply Chain Autopilot',
    content: 'Stock levels, supplier alerts and order management running on autopilot. NYRO flags what needs attention before it becomes a problem.',
    category: 'Inventory Management',
    icon: Package,
    relatedIds: [1, 2],
    status: 'completed',
    energy: 82,
  },
  {
    id: 4,
    title: 'Intelligence',
    date: 'AI Decision Engine',
    content: 'AI-powered insights delivered to your phone. NYRO learns your business patterns and surfaces the decisions that actually matter.',
    category: 'Business Intelligence',
    icon: Brain,
    relatedIds: [1, 2, 3, 5],
    status: 'in-progress',
    energy: 90,
  },
  {
    id: 5,
    title: 'Control',
    date: 'Executive Dashboard',
    content: 'One dashboard. Every operation. Full executive visibility and action capability from wherever you are in the world.',
    category: 'Command Center',
    icon: Sliders,
    relatedIds: [1, 2, 3, 4],
    status: 'completed',
    energy: 100,
  },
]

const headingId = 'solution-section-heading'

export default function Solution() {
  const [isMobile, setIsMobile]     = useState(false)
  const [hoveredPill, setHoveredPill] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const hPad       = isMobile ? '24px' : '48px'
  const bleedMargin = `0 -${hPad}`

  return (
    <>
      <h2 id={headingId} style={{
        position: 'absolute', width: 1, height: 1, overflow: 'hidden',
        clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap',
      }}>
        The Solution
      </h2>

      <section
        id="solution"
        aria-labelledby={headingId}
        style={{
          background: '#000000', position: 'relative', overflow: 'hidden',
          isolation: 'isolate',
          padding: isMobile ? '120px 24px 100px' : '180px 64px 160px',
        }}
      >
        {/* Solid black base — prevents any bleed from adjacent sections */}
        <div style={{ position: 'absolute', inset: 0, background: '#000000', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* NYRO wordmark — inside Lamp */}
          <LampContainer className="min-h-0 pt-40 pb-32 bg-black rounded-none w-full">

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                textAlign: 'center', fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.35em', textTransform: 'uppercase',
                color: 'rgba(45,212,191,0.5)', marginBottom: '40px',
              }}
            >
              Introducing
            </motion.p>

            <div
              style={{
                fontSize: 'clamp(72px, 16vw, 210px)',
                fontWeight: 800,
                letterSpacing: '-0.055em',
                lineHeight: 0.9,
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px', height: '400px', borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.1) 0%, rgba(13,148,136,0.05) 40%, transparent 70%)',
                pointerEvents: 'none', zIndex: -1,
              }} />
              {(['N', 'Y', 'R', 'O'] as const).map((letter, i) => (
                <motion.span
                  key={letter}
                  initial={{ opacity: 0, y: 24, scale: 0.88, filter: 'blur(12px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: 'spring', duration: 0.7, bounce: 0.12, delay: i * 0.1 }}
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(90deg, #0D9488 0%, #2DD4BF 25%, #ffffff 50%, #2DD4BF 75%, #0D9488 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    animation: 'shinyTextSweep 3s linear infinite',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                fontSize: 'clamp(13px, 1.8vw, 20px)', fontWeight: 300,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                textAlign: 'center', marginTop: '28px',
                background: 'linear-gradient(90deg, #0D9488 0%, #2DD4BF 30%, #5EEAD4 50%, #2DD4BF 70%, #0D9488 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                animation: 'shinyTagline 4s linear infinite',
              }}
            >
              The Operating System For Modern Businesses
            </motion.p>

          </LampContainer>

          {/* Capabilities row */}
          <div
            role="list"
            style={{
              display: 'flex', flexWrap: 'wrap',
              border: '1px solid rgba(45,212,191,0.2)',
              maxWidth: '960px', margin: '0 auto 120px',
            }}
          >
            {PILLS.map((label, i) => (
              <motion.div
                key={label}
                role="listitem"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredPill(i)}
                onMouseLeave={() => setHoveredPill(null)}
                data-hover
                style={{
                  flex: '1 1 auto', padding: '40px 24px', textAlign: 'center',
                  borderRight: i < PILLS.length - 1
                    ? `1px solid ${hoveredPill === i ? 'rgba(45,212,191,0.4)' : 'rgba(45,212,191,0.18)'}`
                    : 'none',
                  background: hoveredPill === i ? 'rgba(45,212,191,0.06)' : 'transparent',
                  boxShadow: hoveredPill === i ? '0 0 32px rgba(45,212,191,0.1), inset 0 0 32px rgba(45,212,191,0.04)' : 'none',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'none', position: 'relative',
                }}
              >
                <span style={{
                  fontSize: '10px', fontWeight: 500,
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: hoveredPill === i ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.45)',
                  transition: 'color 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  {label}
                </span>
                {/* Teal bottom border slides in on hover */}
                <span style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
                  background: '#2DD4BF',
                  transformOrigin: 'left center',
                  transform: hoveredPill === i ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }} />
              </motion.div>
            ))}
          </div>

          {/* 04 / How NYRO Works — radial orbital */}
          <div style={{ marginBottom: '80px' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', marginBottom: '12px' }}
            >
              <span style={{
                fontSize: '10px', fontWeight: 600, letterSpacing: '0.32em',
                textTransform: 'uppercase', color: 'rgba(45,212,191,0.45)',
              }}>
                04 / How NYRO Works
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                textAlign: 'center', fontSize: 'clamp(11px, 1.1vw, 13px)',
                fontWeight: 300, color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.06em', marginBottom: '0',
              }}
            >
              Click any pillar to explore. Drag to spin.
            </motion.p>

            <div style={{ height: '480px', overflow: 'hidden', position: 'relative', background: '#000' }}>
              <RadialOrbitalTimeline timelineData={nyroOrbitalData} />
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding: `120px ${hPad} 120px`, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{
                fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 200,
                letterSpacing: '-0.025em', lineHeight: 1.2, color: 'white', marginBottom: '20px',
              }}>
                Ready to run your business from anywhere?
              </p>
              <p style={{
                fontSize: '16px', fontWeight: 300,
                color: 'rgba(255,255,255,0.4)', letterSpacing: '0.01em',
                lineHeight: 1.7, marginBottom: '56px',
              }}>
                NYRO handles everything. You handle your life.
              </p>

              {/* CTA button */}
              <motion.button
                aria-label="Scroll to Campaign section"
                data-hover
                onClick={() => document.getElementById('campaign')?.scrollIntoView({ behavior: 'smooth' })}
                animate={{
                  boxShadow: [
                    '0 0 24px rgba(45,212,191,0.12)',
                    '0 0 48px rgba(45,212,191,0.32)',
                    '0 0 24px rgba(45,212,191,0.12)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 60px rgba(45,212,191,0.45)' }}
                style={{
                  display: 'inline-block', padding: '20px 72px',
                  background: 'linear-gradient(135deg, #0D9488 0%, #2DD4BF 50%, #5EEAD4 100%)',
                  color: '#000000', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.24em', textTransform: 'uppercase',
                  border: 'none', cursor: 'none',
                  transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform',
                }}
              >
                See It In Action
              </motion.button>
            </motion.div>
          </div>
        </div>

      </section>
    </>
  )
}
