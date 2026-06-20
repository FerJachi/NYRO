'use client'
import React, { useRef, useState } from 'react'

interface Stat {
  icon: React.ElementType
  text: string
}

interface Tag {
  text: string
  type: 'featured' | 'default'
}

export interface Testimonial {
  id: number
  initials: string
  name: string
  role: string
  quote: string
  tags: Tag[]
  stats: Stat[]
  avatarGradient: string
}

interface TestimonialStackProps {
  testimonials: Testimonial[]
  visibleBehind?: number
}

function tagStyle(type: 'featured' | 'default'): React.CSSProperties {
  return type === 'featured'
    ? { background: 'rgba(45,212,191,0.2)', color: '#2DD4BF', border: '1px solid rgba(45,212,191,0.4)', fontWeight: 700 }
    : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }
}

export function TestimonialStack({ testimonials, visibleBehind = 2 }: TestimonialStackProps) {
  const [current, setCurrent]       = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX    = useRef(0)
  const dragStartTime = useRef(0)
  const totalCards    = testimonials.length

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function goTo(index: number) {
    setDragOffset(0)
    setCurrent(Math.max(0, Math.min(index, totalCards - 1)))
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current    = e.clientX
    dragStartTime.current = Date.now()
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return
    setDragOffset(e.clientX - dragStartX.current)
  }

  function handlePointerUp() {
    if (!isDragging) return
    setIsDragging(false)

    const elapsed  = Math.max(1, Date.now() - dragStartTime.current)
    const velocity = Math.abs(dragOffset) / elapsed        // px/ms
    const swipe    = Math.abs(dragOffset) > 60 || velocity > 0.35

    if (dragOffset < 0 && swipe && current < totalCards - 1) {
      if (prefersReduced) {
        setDragOffset(0); setCurrent(c => c + 1)
      } else {
        setDragOffset(-800)
        setTimeout(() => { setDragOffset(0); setCurrent(c => c + 1) }, 220)
      }
    } else if (dragOffset > 0 && swipe && current > 0) {
      if (prefersReduced) {
        setDragOffset(0); setCurrent(c => c - 1)
      } else {
        setDragOffset(800)
        setTimeout(() => { setDragOffset(0); setCurrent(c => c - 1) }, 220)
      }
    } else {
      setDragOffset(0)
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {testimonials.map((testimonial, index) => {
        const displayOrder = index - current
        if (displayOrder < 0 || displayOrder > visibleBehind) return null

        const isActive = displayOrder === 0
        const rotate   = isActive
          ? Math.max(-5, Math.min(5, (dragOffset / 300) * 5))
          : 0

        // ── Per-card inline style ──────────────────────────────────────────
        const cardStyle: React.CSSProperties = {
          position:     'absolute',
          left:         '50%',
          top:          0,
          width:        '100%',
          maxWidth:     '680px',
          borderRadius: '24px',
          userSelect:   'none',
          willChange:   'transform',
          pointerEvents: isActive ? 'auto' : 'none',
          cursor:        isActive ? (isDragging ? 'grabbing' : 'grab') : 'default',
          // No transition while actively dragging the top card
          transition: isDragging && isActive
            ? 'none'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        }

        if (displayOrder === 0) {
          cardStyle.transform = `translateX(calc(-50% + ${dragOffset}px)) rotate(${rotate}deg)`
          cardStyle.opacity   = 1
          cardStyle.zIndex    = totalCards
        } else if (displayOrder <= visibleBehind) {
          const scale      = 1 - 0.04 * displayOrder
          const translateY = -10 * displayOrder
          cardStyle.transform = `translateX(-50%) scale(${scale}) translateY(${translateY}px)`
          cardStyle.opacity   = 1 - 0.15 * displayOrder
          cardStyle.zIndex    = totalCards - displayOrder
        } else {
          cardStyle.transform = 'translateX(-50%) scale(0.85)'
          cardStyle.opacity   = 0
          cardStyle.zIndex    = 0
        }

        return (
          <div
            key={testimonial.id}
            className="glass-effect"
            style={cardStyle}
            onPointerDown={isActive ? handlePointerDown : undefined}
            onPointerMove={isActive ? handlePointerMove : undefined}
            onPointerUp={isActive ? handlePointerUp : undefined}
            onPointerCancel={isActive ? handlePointerUp : undefined}
          >
            <div style={{ padding: '40px 44px' }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '28px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px', flexShrink: 0,
                  background: testimonial.avatarGradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700, color: '#000000', letterSpacing: '0.05em',
                }}>
                  {testimonial.initials}
                </div>

                <div>
                  <div style={{ fontSize: '17px', fontWeight: 600, color: '#ffffff', marginBottom: '3px' }}>
                    {testimonial.name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {testimonial.role}
                  </div>
                </div>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {testimonial.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        ...tagStyle(tag.type),
                        fontSize: '9px', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '4px 9px', borderRadius: '4px', display: 'inline-block',
                      }}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p style={{
                fontSize: 'clamp(14px, 1.5vw, 16px)', fontWeight: 300,
                lineHeight: 1.78, color: 'rgba(255,255,255,0.85)',
                marginBottom: '24px',
              }}>
                {testimonial.quote}
              </p>

              {/* Stats */}
              <div style={{
                display: 'flex', gap: '28px', flexWrap: 'wrap',
                paddingTop: '24px', borderTop: '1px solid rgba(45,212,191,0.15)',
              }}>
                {testimonial.stats.map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <Icon size={13} style={{ color: '#2DD4BF', flexShrink: 0 }} />
                      <span style={{
                        fontSize: '10px', color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                      }}>
                        {stat.text}
                      </span>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        )
      })}

      {/* Pagination dots */}
      <div style={{
        position: 'absolute', bottom: '-44px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '8px', alignItems: 'center',
      }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            data-hover
            aria-label={`Go to slide ${i + 1}`}
            className={`pagination-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

    </div>
  )
}
