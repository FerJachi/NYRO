import React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

function GradientText({ className, children, as: _as, ...props }: GradientTextProps) {
  return (
    <span
      className={cn("relative inline-flex overflow-hidden", className)}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute inset-0">
        <span
          className="pointer-events-none absolute rounded-full blur-[2rem] animate-pulse"
          style={{
            top: '-25%',
            left: '0',
            width: '30vw',
            height: '30vw',
            background: 'rgba(45,212,191,0.35)',
          }}
        />
        <span
          className="pointer-events-none absolute rounded-full blur-[2rem] animate-pulse"
          style={{
            top: '0',
            right: '0',
            width: '30vw',
            height: '30vw',
            background: 'rgba(13,148,136,0.25)',
            animationDelay: '1.5s',
          }}
        />
        <span
          className="pointer-events-none absolute rounded-full blur-[2rem] animate-pulse"
          style={{
            bottom: '0',
            left: '0',
            width: '30vw',
            height: '30vw',
            background: 'rgba(94,234,212,0.2)',
            animationDelay: '3s',
          }}
        />
      </span>
    </span>
  )
}

export { GradientText }
