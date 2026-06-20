import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface SkewCardProps {
  title: string
  description: string
  className?: string
  gradientFrom?: string
  gradientTo?: string
}

const SkewCard: React.FC<SkewCardProps> = ({
  title,
  description,
  className = '',
  gradientFrom = '#0D9488',
  gradientTo = '#2DD4BF',
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-px group cursor-pointer',
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      />
      <div
        className="relative rounded-2xl p-8 h-full flex flex-col justify-between gap-6 bg-[#060606] group-hover:bg-[#060606]/90 transition-all duration-500"
        style={{
          borderImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo}) 1`,
        }}
      >
        <div>
          <div
            className="inline-block mb-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.28em] uppercase"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}22, ${gradientTo}22)`,
              color: gradientTo,
              border: `1px solid rgba(45,212,191,0.3)`,
            }}
          >
            NYRO
          </div>
          <h3
            className="text-2xl font-700 text-white mb-3 group-hover:text-white transition-colors duration-300"
            style={{ fontWeight: 700 }}
          >
            {title}
          </h3>
          <p className="text-white/60 font-light text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
            {description}
          </p>
        </div>
        <button
          className="self-start uppercase transition-all duration-300"
          style={{
            padding: '10px 24px',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: 'white',
            background: 'transparent',
            border: '1px solid rgba(45,212,191,0.5)',
            borderRadius: 0,
            cursor: 'none',
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget
            btn.style.background = 'rgba(45,212,191,0.1)'
            btn.style.borderColor = '#2DD4BF'
            btn.style.color = '#2DD4BF'
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget
            btn.style.background = 'transparent'
            btn.style.borderColor = 'rgba(45,212,191,0.5)'
            btn.style.color = 'white'
          }}
        >
          Read More
        </button>
      </div>
    </div>
  )
}

interface GradientCardShowcaseProps {
  cards: Array<{
    title: string
    description: string
  }>
  className?: string
}

const GradientCardShowcase: React.FC<GradientCardShowcaseProps> = ({
  cards,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4',
        className
      )}
      style={{ background: 'transparent' }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: index * 0.15, ease: EXPO }}
          style={{ willChange: 'transform' }}
        >
          <SkewCard
            title={card.title}
            description={card.description}
            gradientFrom="#0D9488"
            gradientTo="#2DD4BF"
          />
        </motion.div>
      ))}
    </div>
  )
}

export { SkewCard, GradientCardShowcase }
