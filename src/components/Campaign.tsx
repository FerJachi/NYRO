import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Spotlight } from './ui/spotlight'
import CinematicFooter from './ui/motion-footer'
import NyroMeshGradient from './ui/nyro-mesh-gradient'
import LazyGradient from './ui/lazy-gradient'

import CampaignTimeline from '@/components/ui/campaign-timeline'
import FullbleedScenes from '@/components/ui/fullbleed-scenes'
import { GradientText } from '@/components/ui/gradient-text'

gsap.registerPlugin(ScrollTrigger)


const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Main component ───────────────────────────────────────────────────────────
const headingId = 'campaign-section-heading'

export default function Campaign() {
  const billboardWrapRef  = useRef<HTMLDivElement>(null)
  const billboardVideoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // GSAP billboard zoom — extended end for more cinematic travel
  useEffect(() => {
    const wrap  = billboardWrapRef.current
    const video = billboardVideoRef.current
    if (!wrap || !video) return
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 80%',
      end: 'center 30%',
      scrub: 1.5,
      animation: gsap.to(video, { scale: 1.18, ease: 'none', transformOrigin: 'center center' }),
    })
    return () => st.kill()
  }, [])

  return (
    <>
      <h2 id={headingId} style={{
        position: 'absolute', width: 1, height: 1, overflow: 'hidden',
        clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap',
      }}>
        The Campaign
      </h2>

      <section
        id="campaign"
        aria-labelledby={headingId}
        style={{ background: '#000000', position: 'relative', overflow: 'hidden' }}
      >
        {/* Mesh gradient — entire campaign section */}
        <LazyGradient>
          <NyroMeshGradient
            className="absolute inset-0 z-0 pointer-events-none"
            opacity={0.75}
            speed={0.22}
          />
        </LazyGradient>

        {/* Animated horizontal scan line */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, right: 0,
          height: '1px', pointerEvents: 'none', zIndex: 5,
          background: 'linear-gradient(to right, transparent, rgba(45,212,191,0.15), rgba(45,212,191,0.3), rgba(45,212,191,0.15), transparent)',
          animation: 'scanDown 12s linear infinite',
        }} />

        {/* Top transition from Solution */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '100px',
          background: 'linear-gradient(to bottom, #060606, transparent)',
          pointerEvents: 'none', zIndex: 5,
        }} />

        {/* ── PART A.1: NYRO wordmark / Billboard Campaign opener ───────── */}
        <div
          style={{
            position: 'relative', width: '100%', textAlign: 'center',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', background: '#000000',
            padding: isMobile ? '80px 24px 48px' : '80px 48px 48px',
          }}
        >
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: 'rgba(45,212,191,0.6)',
              marginBottom: '48px', textAlign: 'center',
              position: 'relative', zIndex: 2,
            }}
          >
            05 / The Campaign
          </motion.p>

          {/* Teal atmospheric glow — top left */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, left: 0,
            width: '600px', height: '600px', pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse at top left, rgba(13,148,136,0.14) 0%, transparent 60%)',
          }} />

          {/* NYRO wordmark */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <div style={{
              fontSize: 'clamp(48px, 10vw, 120px)', fontWeight: 800,
              letterSpacing: '-0.055em', lineHeight: 1,
              background: 'linear-gradient(90deg, #0D9488 0%, #2DD4BF 40%, #ffffff 60%, #2DD4BF 80%, #0D9488 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'shinyTextSweep 3s linear infinite',
            }}>
              NYRO
            </div>
            <div style={{
              fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
              marginTop: '16px', textAlign: 'center',
            }}>
              Puerto Rico · Billboard Campaign 2025
            </div>
          </div>
        </div>

        {/* ── PART A.2: Billboard image with spotlight zoom ──────────────── */}
        <div
          className="billboard-moment"
          style={{
            position: 'relative', background: '#000000',
            padding: isMobile ? '0 0 60px' : '0 0 80px',
          }}
        >
          {/* Wide atmospheric teal glow behind billboard */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%', height: '600px', pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(13,148,136,0.06) 0%, transparent 70%)',
          }} />

          {/* Billboard video container — full width, 16:9, overflow clips GSAP zoom */}
          <div
            ref={billboardWrapRef}
            style={{
              position: 'relative', width: '100%', maxWidth: '100%',
              aspectRatio: '16/9', overflow: 'hidden',
              borderRadius: 0, zIndex: 1,
              boxShadow: '0 0 80px rgba(45,212,191,0.08)',
            }}
          >
            {/* Fallback background shown when video is absent or fails */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, zIndex: 0,
              background: 'linear-gradient(135deg, #030d0a 0%, #061a14 40%, #030d0a 100%)',
            }} />

            <video
              ref={billboardVideoRef}
              src="/assets/videos/billboard.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              data-video="billboard"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', display: 'block', zIndex: 1,
                transformOrigin: 'center center', willChange: 'transform',
              }}
              onError={(e) => {
                const video = e.target as HTMLVideoElement
                video.style.display = 'none'
              }}
            />
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)',
              pointerEvents: 'none',
            }} />
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#2DD4BF" />
          </div>

          {/* Billboard text — "Puerto Rico's Future is Here." only, no duplicate NYRO */}
          <div style={{ marginTop: '64px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <motion.p
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EXPO }}
              style={{
                fontSize: 'clamp(30px, 4.2vw, 60px)', fontWeight: 200,
                letterSpacing: '-0.03em', lineHeight: 1.1, color: 'white', marginBottom: '20px',
              }}
            >
              Puerto Rico's Future is Here.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: '11px', fontWeight: 500, letterSpacing: '0.36em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginTop: '8px',
              }}
            >
              The Operating System For Modern Businesses
            </motion.p>
          </div>
        </div>

        {/* ── Wherever you are heading ─────────────────────────────────── */}
        <div style={{
          width: '100%',
          background: '#000',
          padding: '120px 56px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(45,212,191,0.5)',
            marginBottom: '32px',
          }}>
            Control Without Presence
          </p>

          <h2 style={{
            fontSize: 'clamp(40px, 6vw, 88px)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            margin: '0 auto',
            maxWidth: '900px',
          }}>
            <GradientText
              as="span"
              style={{
                fontSize: 'inherit',
                fontWeight: 'inherit',
                letterSpacing: 'inherit',
                lineHeight: 'inherit',
                color: 'white',
              }}
            >
              Wherever you are.
            </GradientText>
            <br />
            <span style={{
              color: 'rgba(255,255,255,0.9)',
              display: 'block',
              marginTop: '8px',
            }}>
              NYRO is there.
            </span>
          </h2>

          <p style={{
            fontSize: '16px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.04em',
            marginTop: '32px',
            maxWidth: '480px',
            margin: '32px auto 0',
            lineHeight: 1.7,
          }}>
            The operating system for modern businesses that refuse to be tied to one place.
          </p>
        </div>

        {/* ── PART B: Lifestyle video scenes ──────────────────────────── */}
        <FullbleedScenes
          scenes={[
            {
              id: 'beach',
              videoSrc: '/assets/videos/beach.mp4',
              bigWord: 'BEACH',
              title: 'Beachside. Full control.',
              description: 'The business runs. The waves do not wait. NYRO monitors every operation in real time while you enjoy the moment you earned.',
              notificationText: 'Beachside. All systems running.',
              gradientColors: [
                'rgba(13,100,136,0.85)',
                'rgba(8,60,90,0.6)',
                'rgba(2,20,40,0.9)',
              ],
              accentColor: '#2DD4BF',
            },
            {
              id: 'cafe',
              videoSrc: '/assets/videos/cafe.mp4',
              bigWord: 'CAFE',
              title: 'From anywhere in the world.',
              description: 'A laptop. An espresso. A business running thousands of miles away with full executive visibility.',
              notificationText: 'Cafe. Revenue up 12% today.',
              gradientColors: [
                'rgba(9,80,100,0.9)',
                'rgba(13,148,136,0.5)',
                'rgba(3,30,45,0.9)',
              ],
              accentColor: '#2DD4BF',
            },
            {
              id: 'morning',
              videoSrc: '/assets/videos/morning.mp4',
              bigWord: 'MORNING',
              title: 'Your morning. Your rules.',
              description: 'NYRO handled everything before you woke up. Payroll processed. Inventory checked. Team briefed.',
              notificationText: 'Good morning. Everything is handled.',
              gradientColors: [
                'rgba(6,60,80,0.9)',
                'rgba(20,120,110,0.6)',
                'rgba(2,25,35,0.9)',
              ],
              accentColor: '#5EEAD4',
            },
          ]}
        />

        {/* ── 06 / The Plan heading ────────────────────────────────────── */}
        <div style={{
          background: '#000',
          padding: '100px 56px 60px',
          position: 'relative',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(45,212,191,0.6)',
            marginBottom: '20px',
          }}>
            06 / The Plan
          </p>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 200,
            letterSpacing: '-0.025em',
            color: 'white',
            lineHeight: 1.1,
            maxWidth: '700px',
            margin: '0 0 16px 0',
          }}>
            Six months. One mission.
          </h2>
          <p style={{
            fontSize: '16px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.35)',
            maxWidth: '520px',
            letterSpacing: '0.02em',
          }}>
            A sequenced roadmap to make NYRO the most recognized business platform in Puerto Rico.
          </p>
        </div>

        {/* ── PART B: Campaign Timeline ────────────────────────────────── */}
        <CampaignTimeline
          months={[
            {
              month: 'Month 01',
              number: '01',
              title: 'Brand Awareness',
              tagline: 'Phase One',
              description: "Establish NYRO as a recognizable brand in Puerto Rico's business landscape. Generate curiosity without revealing the full product. Create conversation around the idea of business freedom.",
              tactics: [
                'Launch teaser campaign across Instagram and LinkedIn with the tagline Control Without Presence',
                "Deploy NYRO billboard across San Juan's major business corridors",
                "Begin CEO outreach program targeting Puerto Rico's top 200 business owners",
                'Publish first thought leadership content on what it means to truly delegate',
                'Build email waitlist with exclusive early access positioning',
              ],
              gradientColors: [
                'rgba(13,100,136,0.85)',
                'rgba(8,60,90,0.6)',
                'rgba(2,20,40,0.9)',
              ],
              accentColor: '#2DD4BF',
            },
            {
              month: 'Month 02',
              number: '02',
              title: 'Product Reveal',
              tagline: 'Phase Two',
              description: 'A dramatic emotion-first reveal of NYRO as a platform. Focus on the promise not the features. Position NYRO as the operating system that changes what it means to be a business owner in Puerto Rico.',
              tactics: [
                'Cinematic product launch video released simultaneously across all channels',
                'Exclusive reveal event for 50 hand-selected Puerto Rico CEOs and founders',
                'Press release to El Nuevo Dia, Caribbean Business and all major PR business media',
                'Social media countdown campaign building to the reveal moment',
                "Influencer seeding with Puerto Rico's top business voices and entrepreneurs",
              ],
              gradientColors: [
                'rgba(9,80,100,0.9)',
                'rgba(13,148,136,0.5)',
                'rgba(3,30,45,0.9)',
              ],
              accentColor: '#2DD4BF',
            },
            {
              month: 'Month 03',
              number: '03',
              title: 'Freedom Campaign',
              tagline: 'Phase Three',
              description: 'Full cinematic content rollout. The CEO lifestyle stories go live. Control Without Presence at scale across digital and out-of-home channels throughout Puerto Rico.',
              tactics: [
                'Release beach cafe and morning lifestyle video series across all platforms',
                'Out-of-home expansion to Dorado Condado and Hato Rey business districts',
                'CEO Vacation Challenge launch inviting business owners to go 48 hours with NYRO',
                'Meta Ads campaign targeting business owners with lifestyle visuals and ROI messaging',
                'Partner with Puerto Rico Chamber of Commerce for co-branded visibility',
              ],
              gradientColors: [
                'rgba(6,60,80,0.9)',
                'rgba(20,120,110,0.6)',
                'rgba(2,25,35,0.9)',
              ],
              accentColor: '#5EEAD4',
            },
            {
              month: 'Month 04',
              number: '04',
              title: 'Authority and Trust',
              tagline: 'Phase Four',
              description: "Press coverage. Executive interviews. Thought leadership positioning across Puerto Rico's leading business publications and networks. NYRO becomes the platform serious business owners talk about.",
              tactics: [
                'Executive interview series with NYRO founders in Caribbean Business and Negocios Now',
                "Guest appearances on Puerto Rico's top business podcasts and radio programs",
                'Publish NYRO State of Business Freedom report with original research and data',
                'Host exclusive Executive Breakfast Series at a premium San Juan venue',
                'LinkedIn thought leadership campaign targeting C-suite and founders island-wide',
              ],
              gradientColors: [
                'rgba(4,50,70,0.9)',
                'rgba(13,100,120,0.65)',
                'rgba(1,20,30,0.95)',
              ],
              accentColor: '#2DD4BF',
            },
            {
              month: 'Month 05',
              number: '05',
              title: 'Growth Stories',
              tagline: 'Phase Five',
              description: 'Real business transformation narratives. Case studies produced as cinematic mini-documentaries. Trust through proof not promise. The first NYRO users become the most powerful marketing tool.',
              tactics: [
                'Release three cinematic customer story mini-documentaries on YouTube and social',
                'Feature early adopter testimonials across all NYRO owned channels and website',
                'Host The Freedom Room pop-up installation in Miramar for three days',
                'Referral program launch rewarding existing users for bringing in new businesses',
                'Retargeting campaign targeting everyone who engaged with NYRO content to date',
              ],
              gradientColors: [
                'rgba(10,70,90,0.9)',
                'rgba(8,110,100,0.55)',
                'rgba(3,28,38,0.95)',
              ],
              accentColor: '#5EEAD4',
            },
            {
              month: 'Month 06',
              number: '06',
              title: 'Conversion and Launch',
              tagline: 'Phase Six',
              description: "Full conversion activation. Executive demos. The Freedom Package launch. Limited early access for Puerto Rico's top 100 businesses. The island's most anticipated business platform officially opens.",
              tactics: [
                'NYRO official launch event at a premium San Juan venue with cinematic production',
                'Freedom Package announcement with exclusive pricing for first 100 businesses',
                'Full-funnel paid campaign across Meta Google and LinkedIn driving demo signups',
                "Strategic presence at Puerto Rico's leading business forums and entrepreneur summits",
                'Launch day social media push with real-time countdown and CEO testimonials going live',
              ],
              gradientColors: [
                'rgba(13,148,136,0.8)',
                'rgba(6,80,80,0.6)',
                'rgba(2,30,30,0.9)',
              ],
              accentColor: '#2DD4BF',
            },
          ]}
        />

        <CinematicFooter />
      </section>
    </>
  )
}
