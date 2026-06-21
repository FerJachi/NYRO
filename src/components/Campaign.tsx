import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MeshGradient } from '@paper-design/shaders-react'
import CinematicFooter from './ui/motion-footer'
import NyroMeshGradient from './ui/nyro-mesh-gradient'
import LazyGradient from './ui/lazy-gradient'

import CampaignTimeline from '@/components/ui/campaign-timeline'
import FullbleedScenes from '@/components/ui/fullbleed-scenes'
import { GradientText } from '@/components/ui/gradient-text'

// ─── Main component ───────────────────────────────────────────────────────────
const headingId = 'campaign-section-heading'

export default function Campaign() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
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

        {/* ── BLOCK 1: Wherever you are ────────────────────────────────── */}
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
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16,1,0.3,1], delay: 0.1 }}
              style={{ display: 'block' }}
            >
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
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16,1,0.3,1], delay: 0.22 }}
              style={{
                color: 'rgba(255,255,255,0.9)',
                display: 'block',
                marginTop: '8px',
              }}
            >
              NYRO is there.
            </motion.span>
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

          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(to right, transparent 0%, rgba(45,212,191,0.3) 20%, rgba(45,212,191,0.8) 50%, rgba(45,212,191,0.3) 80%, transparent 100%)',
            boxShadow: '0 0 20px 2px rgba(45,212,191,0.25), 0 0 60px 4px rgba(45,212,191,0.1)',
            zIndex: 10,
          }} />
        </div>

        {/* ── BLOCK 2: Lifestyle video scenes ──────────────────────────── */}
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
                'rgba(13,100,136,0.85)',
                'rgba(8,60,90,0.6)',
                'rgba(2,20,40,0.9)',
              ],
              accentColor: '#2DD4BF',
            },
          ]}
        />

        {/* ── BLOCK 3: Campaign opener — logo video fullscreen ─────────── */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100svh',
          overflow: 'hidden',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Mesh gradient base */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
            <MeshGradient
              style={{ width: '100%', height: '100%' }}
              colors={['#000000', '#011a14', '#032e22', '#0a4a35', '#000000']}
              speed={0.4}
            />
          </div>

          <video
            src="/assets/videos/nyro-website-logo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.7,
              zIndex: 1,
            }}
          />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 2,
          }} />

          <motion.div
            style={{
              position: 'relative',
              zIndex: 3,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                width: '40px',
                height: '1px',
                background: 'rgba(45,212,191,0.6)',
                transformOrigin: 'left center',
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                fontSize: 'clamp(13px, 1.6vw, 18px)',
                fontWeight: 700,
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(45,212,191,0.9)',
              }}
            >
              05 / The Campaign
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{
                fontSize: 'clamp(56px, 10vw, 140px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                color: 'white',
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              NYRO
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
              style={{
                width: '40px',
                height: '1px',
                background: 'rgba(45,212,191,0.4)',
                transformOrigin: 'center center',
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
                marginTop: '16px',
              }}
            >
              Scroll to explore
            </motion.p>
          </motion.div>
        </div>

        {/* ── BLOCK 4: The Plan heading ─────────────────────────────────── */}
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
            {['Six months.', 'One mission.'].map((phrase, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16,1,0.3,1], delay: 0.1 + i * 0.12 }}
                style={{ display: 'block' }}
              >
                {phrase}
              </motion.span>
            ))}
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

        {/* ── BLOCK 5: Campaign Timeline ────────────────────────────────── */}
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
              videoSrc: '/assets/videos/billboard.mp4',
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
              videoSrc: '/assets/videos/campaign-phone.mp4',
            },
            {
              month: 'Month 03',
              number: '03',
              title: 'Conversion and Launch',
              tagline: 'Phase Three',
              description: "Full conversion activation. Executive demos. The Freedom Package launch. Limited early access for Puerto Rico's top 100 businesses. The island's most anticipated business platform officially opens.",
              tactics: [
                'NYRO official launch event at a premium San Juan venue with cinematic production',
                'Freedom Package announcement with exclusive pricing for first 100 businesses',
                'Full-funnel paid campaign across Meta Google and LinkedIn driving demo signups',
                "Strategic presence at Puerto Rico's leading business forums and entrepreneur summits",
                'Launch day social media push with real-time countdown and CEO testimonials going live',
              ],
              gradientColors: [
                'rgba(13,100,136,0.85)',
                'rgba(8,60,90,0.6)',
                'rgba(2,20,40,0.9)',
              ],
              accentColor: '#2DD4BF',
              videoSrc: '/assets/videos/mall.mp4',
            },
            {
              month: 'Month 04',
              number: '04',
              title: 'Freedom Campaign',
              tagline: 'Phase Four',
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
              videoSrc: '/assets/videos/beach.mp4',
            },
            {
              month: 'Month 05',
              number: '05',
              title: 'Authority and Trust',
              tagline: 'Phase Five',
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
              videoSrc: '/assets/videos/owner-breakfast.mp4',
            },
            {
              month: 'Month 06',
              number: '06',
              title: 'Growth Stories',
              tagline: 'Phase Six',
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
              videoSrc: '/assets/videos/miramar.mp4',
            },
          ]}
        />

        <CinematicFooter />
      </section>
    </>
  )
}
