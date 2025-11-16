'use client'

import { useEffect, useState } from 'react'

interface ConfettiProps {
  x: number
  y: number
  onComplete: () => void
}

export function Confetti({ x, y, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; color: string }>>([])

  useEffect(() => {
    const colors = ['#1DB954', '#1ed760', '#1aa34a', '#169c3f', '#ffffff']
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 8,
      vy: -Math.random() * 6 - 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)

    const duration = 1000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = elapsed / duration

      if (progress < 1) {
        setParticles((prev) =>
          prev.map((p) => ({
            ...p,
            x: p.vx * elapsed * 0.01,
            y: p.vy * elapsed * 0.01 + 0.5 * 0.5 * elapsed * elapsed * 0.0001,
          }))
        )
        requestAnimationFrame(animate)
      } else {
        onComplete()
      }
    }

    requestAnimationFrame(animate)
  }, [onComplete])

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            transform: `translate(${particle.x}px, ${particle.y}px)`,
            transition: 'opacity 0.3s',
          }}
        />
      ))}
    </div>
  )
}

