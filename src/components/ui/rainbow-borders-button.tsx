'use client'
import { useEffect } from 'react'

const NYRO_BTN_STYLES = `
@property --nyro-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes nyroRainbow {
  to { --nyro-angle: 360deg; }
}

.nyro-border {
  position: relative;
  isolation: isolate;
}

.nyro-border::before,
.nyro-border::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--nyro-angle),
    #134E4A,
    #0D9488,
    #2DD4BF,
    #5EEAD4,
    #2DD4BF,
    #0D9488,
    #134E4A
  );
  animation: nyroRainbow 8s linear infinite;
  z-index: -1;
}

.nyro-border::after {
  filter: blur(16px);
  opacity: 0.55;
  inset: -4px;
}

.nyro-border:hover::after {
  opacity: 0.8;
  filter: blur(20px);
}
`

interface NyroButtonProps {
  onClick?: () => void
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function NyroButton({ onClick, children, className = '', style }: NyroButtonProps) {
  useEffect(() => {
    if (document.getElementById('nyro-btn-styles')) return
    const el = document.createElement('style')
    el.id = 'nyro-btn-styles'
    el.textContent = NYRO_BTN_STYLES
    document.head.appendChild(el)
    return () => { el.remove() }
  }, [])

  return (
    <button
      onClick={onClick}
      data-hover
      className={`nyro-border inline-flex items-center justify-center gap-3 bg-black text-white cursor-none font-black transition-transform duration-300 hover:scale-105 ${className}`}
      style={style}
    >
      {children}
    </button>
  )
}
