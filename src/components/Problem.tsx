import { motion } from 'framer-motion'
import { TestimonialStack, type Testimonial } from '@/components/ui/glass-testimonial-swiper'
import { Phone, Plane, Dumbbell, Coffee, Moon } from 'lucide-react'
import { MeshGradient } from '@paper-design/shaders-react'
import NyroMeshGradient from './ui/nyro-mesh-gradient'
import LazyGradient from './ui/lazy-gradient'

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

const problemCards: Testimonial[] = [
  {
    id: 1,
    initials: '01',
    name: 'Family Dinner',
    role: 'The moment that never stays yours',
    quote: 'A moment with your family becomes another emergency. The phone rings. The table goes quiet.',
    tags: [
      { text: 'INTERRUPTED', type: 'featured' },
      { text: 'Personal Time', type: 'default' },
    ],
    stats: [
      { icon: Phone, text: 'Unexpected Call' },
      { icon: Coffee, text: 'Dinner Ruined' },
    ],
    avatarGradient: 'linear-gradient(135deg, #0D9488, #2DD4BF)',
  },
  {
    id: 2,
    initials: '02',
    name: 'Vacation',
    role: 'The trip that became a work call',
    quote: 'The flight lands. Your inbox fills with crises. The trip you planned for months dissolves into work calls.',
    tags: [
      { text: 'INTERRUPTED', type: 'featured' },
      { text: 'Travel', type: 'default' },
    ],
    stats: [
      { icon: Plane, text: 'Mid-Flight' },
      { icon: Phone, text: 'Crisis Call' },
    ],
    avatarGradient: 'linear-gradient(135deg, #0D9488, #5EEAD4)',
  },
  {
    id: 3,
    initials: '03',
    name: 'The Gym',
    role: 'The hour that was never really yours',
    quote: 'Mid workout. A payroll issue. An inventory alert. You leave early again because no one else can decide.',
    tags: [
      { text: 'INTERRUPTED', type: 'featured' },
      { text: 'Health', type: 'default' },
    ],
    stats: [
      { icon: Dumbbell, text: 'Left Early' },
      { icon: Phone, text: 'Payroll Alert' },
    ],
    avatarGradient: 'linear-gradient(135deg, #2DD4BF, #5EEAD4)',
  },
  {
    id: 4,
    initials: '04',
    name: 'The Weekend',
    role: 'Saturday that never felt like Saturday',
    quote: 'Saturday morning. Your team cannot move without you. The weekend you earned disappears before noon.',
    tags: [
      { text: 'INTERRUPTED', type: 'featured' },
      { text: 'Weekend', type: 'default' },
    ],
    stats: [
      { icon: Coffee, text: 'Saturday Morning' },
      { icon: Phone, text: 'Team Blocked' },
    ],
    avatarGradient: 'linear-gradient(135deg, #0D9488, #2DD4BF)',
  },
  {
    id: 5,
    initials: '05',
    name: '2:00 AM',
    role: 'The call you always answer',
    quote: 'A late night call about cash flow. You answer because you always do. Because the business cannot breathe without you.',
    tags: [
      { text: 'INTERRUPTED', type: 'featured' },
      { text: 'Late Night', type: 'default' },
    ],
    stats: [
      { icon: Moon, text: '2:00 AM' },
      { icon: Phone, text: 'Cash Flow Crisis' },
    ],
    avatarGradient: 'linear-gradient(135deg, #5EEAD4, #2DD4BF)',
  },
]

// ─── Main section ─────────────────────────────────────────────────────────────
const headingId = 'problem-section-heading'

export default function Problem() {
  return (
    <>
      <h2 id={headingId} style={{
        position: 'absolute', width: 1, height: 1, overflow: 'hidden',
        clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap',
      }}>
        The Problem
      </h2>

      <section
        id="problem"
        aria-labelledby={headingId}
        style={{
          background: '#030805',
          padding: 'clamp(120px,14vw,180px) clamp(24px,4vw,64px) clamp(100px,12vw,160px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Paper-design mesh gradient base */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <MeshGradient
            style={{ width: '100%', height: '100%' }}
            colors={['#000000', '#010c09', '#021510', '#052e1f', '#000000']}
            speed={0.3}
          />
        </div>

        {/* Mesh gradient */}
        <LazyGradient>
          <NyroMeshGradient
            className="absolute inset-0 z-0 pointer-events-none"
            opacity={0.7}
            speed={0.18}
          />
        </LazyGradient>

        {/* Floating teal orbs */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '10%', left: '5%',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,212,191,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
          animation: 'orbFloat 8s ease-in-out infinite',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', right: '8%',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,212,191,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
          animation: 'orbFloat 12s ease-in-out 2s infinite reverse',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '15%', left: '40%',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,212,191,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
          animation: 'orbFloat 10s ease-in-out 4s infinite',
        }} />

        {/* Background atmosphere */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(45,212,191,0.03) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Top-left atmospheric glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0,
          width: '600px', height: '600px', pointerEvents: 'none',
          background: 'radial-gradient(circle at 0% 0%, rgba(13,148,136,0.07) 0%, transparent 70%)',
        }} />

        {/* Bottom-right atmospheric glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '500px', height: '500px', pointerEvents: 'none',
          background: 'radial-gradient(circle at 100% 100%, rgba(45,212,191,0.04) 0%, transparent 60%)',
        }} />

        {/* Scan line at top */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '1px', transformOrigin: 'center',
          background: 'linear-gradient(to right, transparent 0%, rgba(45,212,191,0.3) 30%, rgba(45,212,191,0.6) 50%, rgba(45,212,191,0.3) 70%, transparent 100%)',
          animation: 'scanLine 4s ease-in-out infinite',
        }} />

        {/* Top gradient from Vision */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '80px',
          background: 'linear-gradient(to bottom, #000000, transparent)',
          pointerEvents: 'none', zIndex: 5,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EXPO }}
            style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: 'rgba(45,212,191,0.6)', marginBottom: '64px',
            }}
          >
            03 / The Problem
          </motion.p>

          {/* Opening statement */}
          <motion.p
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: EXPO }}
            style={{
              fontSize: 'clamp(30px,3.8vw,56px)', fontWeight: 200,
              lineHeight: 1.25, letterSpacing: '-0.025em',
              maxWidth: '800px', color: 'rgba(255,255,255,0.92)', marginBottom: '96px',
            }}
          >
            You built a business. Now the business owns you.{' '}
            Every call, every decision, every moment.{' '}
            Your presence is required.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            style={{ width: '48px', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '96px' }}
          />

          {/* Interruption scenario swiper */}
          <div style={{
            position: 'relative',
            height: '480px',
            width: '100%',
            maxWidth: '720px',
            margin: '64px auto 96px',
            padding: '0 24px',
          }}>
            <TestimonialStack
              testimonials={problemCards}
              visibleBehind={2}
            />
          </div>

          {/* Bottom transition */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div style={{
              width: '100%', height: '1px',
              background: 'rgba(255,255,255,0.06)', marginTop: '96px',
            }} />
            <p style={{
              fontSize: '13px', fontWeight: 300, letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: '32px 0 0',
            }}>
              What if there was another way.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
