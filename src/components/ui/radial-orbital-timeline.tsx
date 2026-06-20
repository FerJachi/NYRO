'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { LucideIcon } from 'lucide-react'
import { CheckCircle, Clock, Circle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import nyroLogo from '../../assets/nyro-logo-website.png'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: LucideIcon
  relatedIds: number[]
  status: 'completed' | 'in-progress' | 'pending'
  energy: number
}

interface Props {
  timelineData: TimelineItem[]
}

// ─── Status styling ───────────────────────────────────────────────────────────

function getStatusConfig(status: 'completed' | 'in-progress' | 'pending') {
  switch (status) {
    case 'completed':
      return {
        Icon: CheckCircle,
        label: 'Live',
        style: {
          background: 'rgba(45,212,191,0.2)',
          color: '#2DD4BF',
          border: '1px solid rgba(45,212,191,0.4)',
        },
      }
    case 'in-progress':
      return {
        Icon: Clock,
        label: 'Learning',
        style: {
          background: 'rgba(45,212,191,0.1)',
          color: 'rgba(45,212,191,0.7)',
          border: '1px solid rgba(45,212,191,0.2)',
        },
      }
    default:
      return {
        Icon: Circle,
        label: 'Pending',
        style: {
          background: 'rgba(255,255,255,0.05)',
          color: 'rgba(255,255,255,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      }
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

const RADIUS = 160 // px — orbit radius (Change 3)

export default function RadialOrbitalTimeline({ timelineData }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [rotation, setRotation]     = useState(0)
  const [isPaused, setIsPaused]     = useState(false)

  const rotRef       = useRef(0)
  const rafRef       = useRef<number | null>(null)
  const lastTsRef    = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const isDragging    = useRef(false)
  const dragLastAngle = useRef(0)

  // ── Auto-rotate ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) {
      lastTsRef.current = 0
      return
    }
    const tick = (ts: number) => {
      if (lastTsRef.current) {
        const delta = ts - lastTsRef.current
        rotRef.current = (rotRef.current + 0.018 * delta) % 360
        setRotation(rotRef.current)
      }
      lastTsRef.current = ts
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [isPaused])

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const getPointerAngle = useCallback((e: React.PointerEvent | PointerEvent) => {
    const el = containerRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI)
  }, [])

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-orbital-node]')) return
    isDragging.current    = true
    dragLastAngle.current = getPointerAngle(e)
    setIsPaused(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const angle = getPointerAngle(e)
    const delta = angle - dragLastAngle.current
    const wrappedDelta = delta > 180 ? delta - 360 : delta < -180 ? delta + 360 : delta
    dragLastAngle.current = angle
    rotRef.current = (rotRef.current + wrappedDelta + 360) % 360
    setRotation(rotRef.current)
  }

  const onPointerUp = () => {
    isDragging.current = false
    if (!selectedId) setIsPaused(false)
  }

  // ── Node click ────────────────────────────────────────────────────────────
  const handleNodeClick = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null)
      setIsPaused(false)
    } else {
      setSelectedId(id)
      setIsPaused(true)
    }
  }

  const handleClose = () => {
    setSelectedId(null)
    setIsPaused(false)
  }

  // ── Derived state ────────────────────────────────────────────────────────
  const selected   = timelineData.find(d => d.id === selectedId) ?? null
  const relatedIds = selected?.relatedIds ?? []
  const n          = timelineData.length

  return (
    // Change 3: h-full instead of h-screen
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={handleClose}
      style={{ cursor: 'grab' }}
    >

      {/* ── Decorative outer ring ── */}
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          width:  RADIUS * 2 + 80,
          height: RADIUS * 2 + 80,
          border: '1px solid rgba(45,212,191,0.06)',
        }}
      />

      {/* ── Orbital ring (Change 3: sized to RADIUS * 2) ── */}
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          width:  RADIUS * 2,
          height: RADIUS * 2,
          border: '1px solid rgba(45,212,191,0.15)',
        }}
      />

      {/* ── Inner accent ring ── */}
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          width:  RADIUS * 2 - 60,
          height: RADIUS * 2 - 60,
          border: '1px solid rgba(45,212,191,0.04)',
        }}
      />

      {/* ── Center orb — Change 1: dark glass + NYRO logo ── */}
      <div
        aria-hidden="true"
        className="absolute z-10 flex items-center justify-center rounded-full"
        style={{
          // Change 1 + Change 3: w-14 h-14 = 56px
          width:               56,
          height:              56,
          background:          'rgba(13,148,136,0.3)',
          border:              '1px solid rgba(45,212,191,0.4)',
          backdropFilter:      'blur(8px)',
          WebkitBackdropFilter:'blur(8px)',
          boxShadow:           '0 0 40px rgba(45,212,191,0.25), 0 0 80px rgba(45,212,191,0.08)',
          opacity:             selected ? 0.3 : 1,
          transition:          'opacity 0.4s ease',
        }}
      >
        {/* Change 1: NYRO logo image */}
        <img
          src={nyroLogo}
          alt="NYRO"
          style={{
            width:      42,
            height:     42,
            objectFit:  'contain',
            mixBlendMode: 'screen',
            filter:     'brightness(1.3) drop-shadow(0 0 8px rgba(45,212,191,0.8))',
            position:   'relative',
            zIndex:     10,
          }}
        />
      </div>

      {/* ── Orbiting nodes ── */}
      {timelineData.map((item, i) => {
        const baseDeg  = (360 / n) * i
        const angleDeg = (baseDeg + rotation) % 360
        const angleRad = (angleDeg * Math.PI) / 180
        const x        = Math.cos(angleRad) * RADIUS
        const y        = Math.sin(angleRad) * RADIUS

        const isSelected = item.id === selectedId
        const isRelated  = relatedIds.includes(item.id)
        const isDimmed   = selectedId !== null && !isSelected && !isRelated

        const Icon = item.icon

        return (
          <div
            key={item.id}
            data-orbital-node="true"
            className="absolute flex flex-col items-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              zIndex: isSelected ? 20 : 5,
            }}
            onClick={e => { e.stopPropagation(); handleNodeClick(item.id) }}
          >
            {/* Node button */}
            <div
              className={cn(
                'relative flex items-center justify-center rounded-full border-2',
                'transition-all duration-300',
                isSelected
                  ? 'bg-[#2DD4BF] text-black border-[#2DD4BF]'
                  : isRelated
                  ? 'bg-[rgba(45,212,191,0.3)] text-white border-[rgba(45,212,191,0.5)]'
                  : isDimmed
                  ? 'bg-black/60 text-white/20 border-white/10'
                  : 'bg-black/80 text-white/80 border-[rgba(45,212,191,0.3)] hover:border-[#2DD4BF]'
              )}
              style={{
                width:      48,
                height:     48,
                cursor:     'pointer',
                transform:  `scale(${isSelected ? 1.2 : isRelated ? 1.08 : 1})`,
                boxShadow:  isSelected
                  ? '0 0 28px rgba(45,212,191,0.55), 0 0 60px rgba(45,212,191,0.2)'
                  : isRelated
                  ? '0 0 16px rgba(45,212,191,0.25)'
                  : 'none',
                opacity:    isDimmed ? 0.25 : 1,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease, background 0.3s ease, border-color 0.3s ease',
              }}
            >
              <Icon size={16} />
            </div>

            {/* Change 2: label with NO rotation transform — parent only translates so
                labels are always horizontal in screen space */}
            <div className="mt-2 pointer-events-none">
              <span
                className="whitespace-nowrap transition-colors duration-300"
                style={{
                  fontSize:      '8px',
                  fontWeight:    600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isSelected
                    ? '#2DD4BF'
                    : isDimmed
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(255,255,255,0.45)',
                }}
              >
                {item.title}
              </span>
            </div>
          </div>
        )
      })}

      {/* ── Popup card ── */}
      {selected && (() => {
        const { Icon: StatusIcon, label: statusLabel, style: statusStyle } = getStatusConfig(selected.status)
        return (
          <div
            className="absolute z-30 pointer-events-auto"
            style={{
              top:       '50%',
              left:      '50%',
              transform: 'translate(-50%, -50%)',
              width:     '290px',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              background:           'rgba(3,15,12,0.95)',
              border:               '1px solid rgba(45,212,191,0.2)',
              borderRadius:         '16px',
              padding:              '20px 22px',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow:            '0 30px 60px rgba(0,0,0,0.85), 0 0 50px rgba(45,212,191,0.06)',
            }}>

              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.22em', color: 'rgba(45,212,191,0.6)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {selected.category}
                  </p>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#fff', marginBottom: '3px', lineHeight: 1.2 }}>
                    {selected.title}
                  </h3>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                    {selected.date}
                  </p>
                </div>
                <button
                  style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0, marginLeft: '12px',
                  }}
                  onClick={e => { e.stopPropagation(); handleClose() }}
                  aria-label="Close"
                >
                  <X size={11} />
                </button>
              </div>

              {/* Status badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '3px 9px', borderRadius: '5px',
                marginBottom: '12px', ...statusStyle,
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                <StatusIcon size={10} />
                {statusLabel}
              </div>

              {/* Content */}
              <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: 'rgba(255,255,255,0.62)', marginBottom: '14px' }}>
                {selected.content}
              </p>

              {/* Energy bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
                    System Load
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#2DD4BF', fontVariantNumeric: 'tabular-nums' }}>
                    {selected.energy}%
                  </span>
                </div>
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${selected.energy}%`,
                    background: 'linear-gradient(to right, #0D9488, #2DD4BF)',
                    borderRadius: '2px',
                    transition: 'width 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                  }} />
                </div>
              </div>

            </div>
          </div>
        )
      })()}

    </div>
  )
}
