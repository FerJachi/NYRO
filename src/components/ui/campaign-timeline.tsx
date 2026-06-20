import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface TimelineMonth {
  month: string
  number: string
  title: string
  tagline: string
  description: string
  tactics: string[]
  gradientColors: string[]
  accentColor: string
  videoSrc: string
}

interface CampaignTimelineProps {
  months: TimelineMonth[]
}

export default function CampaignTimeline({ months }: CampaignTimelineProps) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {months.map((month, index) => (
        <TimelineMonth
          key={month.month}
          data={month}
          index={index}
          total={months.length}
        />
      ))}
    </div>
  )
}

function TimelineMonth({
  data,
  index,
  total,
}: {
  data: TimelineMonth
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bigNumberY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const bigNumberOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  // Canvas gradient animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let t = index * 1.2
    const colors = data.gradientColors

    const draw = () => {
      t += 0.006
      const w = canvas.width
      const h = canvas.height
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)

      const g1 = ctx.createRadialGradient(
        w * (0.25 + Math.sin(t * 0.5) * 0.15 + mx * 0.08),
        h * (0.35 + Math.cos(t * 0.4) * 0.15 + my * 0.08),
        0,
        w * 0.3, h * 0.4, w * 0.75
      )
      g1.addColorStop(0, colors[0])
      g1.addColorStop(0.5, colors[1])
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      const g2 = ctx.createRadialGradient(
        w * (0.75 + Math.cos(t * 0.6) * 0.12),
        h * (0.65 + Math.sin(t * 0.7) * 0.12),
        0,
        w * 0.75, h * 0.65, w * 0.55
      )
      g2.addColorStop(0, colors[2])
      g2.addColorStop(0.6, colors[1])
      g2.addColorStop(1, 'transparent')
      ctx.globalAlpha = 0.4
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)
      ctx.globalAlpha = 1

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', handleMouse)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [data.gradientColors, index])

  // IntersectionObserver entrance trigger
  useEffect(() => {
    const section = ref.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('timeline-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const splitTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="title-char"
        style={{
          display: 'inline-block',
          opacity: 0,
          transform: 'translateY(40px)',
          transition: `opacity 0.6s ease ${0.2 + i * 0.035}s, transform 0.6s ease ${0.2 + i * 0.035}s`,
        }}
      >
        {char === ' ' ? ' ' : char}
      </span>
    ))
  }

  return (
    <div
      ref={ref}
      className="timeline-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          zIndex: 20,
          background: `linear-gradient(
            to right,
            transparent 0%,
            ${data.accentColor}20 20%,
            ${data.accentColor}50 50%,
            ${data.accentColor}20 80%,
            transparent 100%
          )`,
        }}
      />

      <video
        src={data.videoSrc}
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
          opacity: 0.25,
          mixBlendMode: 'screen',
          zIndex: 0,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.75,
          zIndex: 1,
        }}
      />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.35)',
        zIndex: 2,
      }} />

      {/* Ghost number — Framer Motion parallax */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-8%',
          left: '-1%',
          zIndex: 2,
          y: bigNumberY,
          opacity: bigNumberOpacity,
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 0.8,
        }}
      >
        <span style={{
          fontSize: 'clamp(160px, 28vw, 420px)',
          fontWeight: 900,
          letterSpacing: '-0.06em',
          color: 'rgba(255,255,255,0.04)',
          display: 'block',
          whiteSpace: 'nowrap',
        }}>
          {data.number}
        </span>
      </motion.div>

      {/* Month label — slides from left */}
      <div
        data-anim="label"
        style={{
          position: 'absolute',
          top: '32px',
          left: '56px',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span style={{
            width: '32px',
            height: '1px',
            background: 'rgba(255,255,255,0.15)',
            display: 'block',
          }} />
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: data.accentColor,
          }}>
            {data.month}
          </span>
        </div>
      </div>

      {/* Right column — tagline, title, description, tactics */}
      <div style={{
        position: 'absolute',
        top: '80px',
        right: '56px',
        maxWidth: '400px',
        zIndex: 10,
      }}>
        <p
          data-anim="tagline"
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: data.accentColor,
            marginBottom: '14px',
          }}
        >
          {data.tagline}
        </p>

        <h2
          style={{
            fontSize: 'clamp(18px, 2.2vw, 32px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'white',
            lineHeight: 1.15,
            margin: '0 0 20px 0',
            whiteSpace: 'nowrap',
            overflow: 'visible',
          }}
        >
          {splitTitle(data.title)}
        </h2>

        <p
          data-anim="desc"
          style={{
            fontSize: '14px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.8,
            margin: '0 0 28px 0',
          }}
        >
          {data.description}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.tactics.map((tactic, i) => (
            <div
              key={i}
              data-anim="tactic"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: data.accentColor,
                flexShrink: 0,
                marginTop: '7px',
                boxShadow: `0 0 6px ${data.accentColor}`,
              }} />
              <span style={{
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.6,
              }}>
                {tactic}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div
        data-anim="progress"
        style={{
          position: 'absolute',
          bottom: '48px',
          left: '56px',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              width: i === index ? '28px' : '6px',
              height: '4px',
              borderRadius: '2px',
              background: i === index
                ? data.accentColor
                : i < index
                ? 'rgba(45,212,191,0.3)'
                : 'rgba(255,255,255,0.15)',
              transition: 'all 0.4s ease',
              boxShadow: i === index ? `0 0 8px ${data.accentColor}` : 'none',
            }} />
          ))}
        </div>
        {index < total - 1 && (
          <p style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
          }}>
            Scroll for Month {index + 2}
          </p>
        )}
        {index === total - 1 && (
          <p style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: data.accentColor,
            opacity: 0.7,
          }}>
            The plan is ready.
          </p>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          zIndex: 20,
          background: `linear-gradient(
            to right,
            transparent 0%,
            ${data.accentColor}40 15%,
            ${data.accentColor}90 35%,
            ${data.accentColor} 50%,
            ${data.accentColor}90 65%,
            ${data.accentColor}40 85%,
            transparent 100%
          )`,
          boxShadow: `0 0 12px 1px ${data.accentColor}60,
                      0 0 24px 2px ${data.accentColor}30`,
        }}
      />
    </div>
  )
}
