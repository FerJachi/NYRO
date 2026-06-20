'use client'
import React from 'react'

export function NyroTextColor() {
  return (
    <div className="mt-6 mb-2 px-4">
      <h2
        className="tracking-tighter flex select-none flex-col text-center font-extralight leading-none md:flex-row justify-center gap-4 md:gap-8"
        style={{ fontSize: 'clamp(24px, 4vw, 48px)', letterSpacing: '-0.02em' }}
      >
        <span
          data-content="People."
          className="before:animate-gradient-background-1 relative before:absolute before:bottom-4 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)]"
        >
          <span className="nyro-gradient-1 animate-gradient-foreground-1 bg-clip-text px-2 text-transparent">
            People.
          </span>
        </span>
        <span
          data-content="Control."
          className="before:animate-gradient-background-2 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)]"
        >
          <span className="nyro-gradient-2 animate-gradient-foreground-2 bg-clip-text px-2 text-transparent">
            Control.
          </span>
        </span>
        <span
          data-content="Freedom."
          className="before:animate-gradient-background-3 relative before:absolute before:bottom-1 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)]"
        >
          <span className="nyro-gradient-3 animate-gradient-foreground-3 bg-clip-text px-2 text-transparent">
            Freedom.
          </span>
        </span>
      </h2>
    </div>
  )
}
