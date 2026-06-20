import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Scene {
  id: string
  videoSrc: string
  bigWord: string
  title: string
  description: string
  notificationText: string
  gradientColors: string[]
  accentColor: string
}

interface FullbleedScenesProps {
  scenes: Scene[]
}

export default function FullbleedScenes({ scenes }: FullbleedScenesProps) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {scenes.map((scene, index) => (
        <FullbleedScene
          key={scene.id}
          scene={scene}
          index={index}
          total={scenes.length}
        />
      ))}
    </div>
  )
}

function FullbleedScene({
  scene,
  index,
  total,
}: {
  scene: Scene
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const [isPlaying, setIsPlaying] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bigWordY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const bigWordOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])

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

    let t = index * 1.5
    const colors = scene.gradientColors

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
        w * 0.3,
        h * 0.4,
        w * 0.75
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
        w * 0.75,
        h * 0.65,
        w * 0.55
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
  }, [scene.gradientColors, index])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent 0%, rgba(45,212,191,0.3) 20%, rgba(45,212,191,0.8) 50%, rgba(45,212,191,0.3) 80%, transparent 100%)',
        boxShadow: '0 0 20px 2px rgba(45,212,191,0.25), 0 0 60px 4px rgba(45,212,191,0.1)',
        zIndex: 20,
      }} />

      <video
        src={scene.videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        data-video={scene.id}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.35,
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
          opacity: 0.85,
          zIndex: 1,
        }}
      />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.2)',
        zIndex: 2,
      }} />

      <motion.div
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-1%',
          zIndex: 2,
          y: bigWordY,
          opacity: bigWordOpacity,
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
          fontFamily: 'inherit',
        }}>
          {scene.bigWord}
        </span>
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          top: '32px',
          left: '56px',
          zIndex: 10,
          opacity: contentOpacity,
        }}
      >
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
        }}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          top: '80px',
          right: '56px',
          maxWidth: '360px',
          zIndex: 10,
          y: textY,
          opacity: contentOpacity,
        }}
      >
        <h2 style={{
          fontSize: 'clamp(22px, 2.8vw, 36px)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: 'white',
          lineHeight: 1.2,
          margin: '0 0 16px 0',
        }}>
          {scene.title}
        </h2>
        <p style={{
          fontSize: '14px',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.75,
          margin: '0 0 24px 0',
        }}>
          {scene.description}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(45,212,191,0.2)',
          borderRadius: '10px',
          padding: '10px 14px',
          width: 'fit-content',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: scene.accentColor,
            animation: 'pulse 2s infinite',
            flexShrink: 0,
          }} />
          <div>
            <div style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: scene.accentColor,
              marginBottom: '2px',
            }}>NYRO</div>
            <div style={{
              fontSize: '10px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.55)',
            }}>{scene.notificationText}</div>
          </div>
        </div>
      </motion.div>

      {/* Play button — lower left */}
      <motion.button
        onClick={() => setIsPlaying(true)}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '56px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(45,212,191,0.35)',
          borderRadius: '100px',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          color: 'white',
          fontSize: '13px',
          fontWeight: 400,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
        whileHover={{
          scale: 1.04,
          borderColor: 'rgba(45,212,191,0.7)',
          background: 'rgba(13,148,136,0.2)',
        }}
        whileTap={{ scale: 0.97 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7.5" stroke="rgba(45,212,191,0.6)" strokeWidth="1" />
          <path d="M6.5 5.5L11 8L6.5 10.5V5.5Z" fill="#2DD4BF" />
        </svg>
        Watch the moment
      </motion.button>

      {/* Horizontal progress dots — bottom center */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10,
      }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: i === index ? '24px' : '6px',
            height: '4px',
            borderRadius: '2px',
            background: i === index
              ? scene.accentColor
              : 'rgba(255,255,255,0.25)',
            transition: 'all 0.3s ease',
            boxShadow: i === index
              ? `0 0 8px ${scene.accentColor}`
              : 'none',
          }} />
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent 0%, rgba(45,212,191,0.3) 20%, rgba(45,212,191,0.8) 50%, rgba(45,212,191,0.3) 80%, transparent 100%)',
        boxShadow: '0 0 20px 2px rgba(45,212,191,0.25), 0 0 60px 4px rgba(45,212,191,0.1)',
        zIndex: 20,
      }} />

      {/* Fullscreen video overlay */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setIsPlaying(false)}
        >
          <video
            src={scene.videoSrc}
            autoPlay
            muted={false}
            loop
            playsInline
            controls={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsPlaying(false)
            }}
            style={{
              position: 'absolute',
              top: '32px',
              right: '40px',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              fontSize: '18px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <div style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
          }}>
            Click anywhere to close
          </div>
        </motion.div>
      )}
    </div>
  )
}
