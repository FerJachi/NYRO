'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function LampContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen flex-col items-center justify-center bg-black w-full z-0',
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-150 items-center justify-center isolate z-0">

        {/* Left conic beam */}
        <motion.div
          initial={{ opacity: 0.3, width: '15rem' }}
          whileInView={{ opacity: 1, width: '50rem' }}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible"
          style={{
            backgroundImage:
              'conic-gradient(from 70deg at center top, #2DD4BF, transparent, transparent)',
          }}
        >
          <div
            className="absolute w-full left-0 h-40 bottom-0 z-20"
            style={{
              background: '#000000',
              WebkitMaskImage: 'linear-gradient(to top, white, transparent)',
              maskImage: 'linear-gradient(to top, white, transparent)',
            }}
          />
          <div
            className="absolute w-40 h-full left-0 bottom-0 z-20"
            style={{
              background: '#000000',
              WebkitMaskImage: 'linear-gradient(to right, white, transparent)',
              maskImage: 'linear-gradient(to right, white, transparent)',
            }}
          />
        </motion.div>

        {/* Right conic beam */}
        <motion.div
          initial={{ opacity: 0.3, width: '15rem' }}
          whileInView={{ opacity: 1, width: '50rem' }}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="absolute inset-auto left-1/2 h-56"
          style={{
            backgroundImage:
              'conic-gradient(from 290deg at center top, transparent, transparent, #2DD4BF)',
          }}
        >
          <div
            className="absolute w-40 h-full right-0 bottom-0 z-20"
            style={{
              background: '#000000',
              WebkitMaskImage: 'linear-gradient(to left, white, transparent)',
              maskImage: 'linear-gradient(to left, white, transparent)',
            }}
          />
          <div
            className="absolute w-full right-0 h-40 bottom-0 z-20"
            style={{
              background: '#000000',
              WebkitMaskImage: 'linear-gradient(to top, white, transparent)',
              maskImage: 'linear-gradient(to top, white, transparent)',
            }}
          />
        </motion.div>

        {/* Background blur block to match dark bg */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl bg-black" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Wide atmospheric teal glow */}
        <div
          className="absolute inset-auto z-50 h-36 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ width: '40rem', background: '#2DD4BF' }}
        />

        {/* Tight inner glow dot */}
        <motion.div
          initial={{ width: '6rem', opacity: 0 }}
          whileInView={{ width: '16rem', opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="absolute inset-auto z-30 h-36 w-96 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ background: '#5EEAD4' }}
        />

        {/* Horizontal glowing line */}
        <motion.div
          initial={{ width: '10rem', opacity: 0 }}
          whileInView={{ width: '50rem', opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem]"
          style={{ background: '#5EEAD4' }}
        />

        {/* Bottom black fill — hides beam undersides */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black" />
      </div>

      {/* Content — pulled up into the lamp glow */}
      <div className="relative z-50 flex -translate-y-20 flex-col items-center px-5">
        {children}
      </div>
    </div>
  )
}
