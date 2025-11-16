'use client'

import { useEffect, useState } from 'react'

interface ConfettiProps {
  x: number
  y: number
  onComplete: () => void
}

export function Confetti({ x, y, onComplete }: ConfettiProps) {
<<<<<<< HEAD
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
=======
  const [particles] = useState(() => {
    // Generate 8-12 confetti particles with random colors
    const colors = [
      'oklch(0.65 0.15 145)', // Spotify green
      'oklch(0.6 0.15 20)',   // Orange
      'oklch(0.55 0.15 140)', // Blue
      'oklch(0.5 0.15 340)',  // Purple
      'oklch(0.45 0.15 60)',  // Yellow
    ]
    const count = 8 + Math.floor(Math.random() * 5)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: (Math.PI * 2 * i) / count + Math.random() * 0.5,
      distance: 30 + Math.random() * 20,
      delay: Math.random() * 0.2,
    }))
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 1200)
    return () => clearTimeout(timer)
>>>>>>> feature/performance
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
<<<<<<< HEAD
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
=======
      {particles.map((particle) => {
        const endX = Math.cos(particle.angle) * particle.distance
        const endY = Math.sin(particle.angle) * particle.distance
        return (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full confetti-particle"
            style={{
              backgroundColor: particle.color,
              '--end-x': `${endX}px`,
              '--end-y': `${endY}px`,
              '--delay': `${particle.delay}s`,
            } as React.CSSProperties & {
              '--end-x': string
              '--end-y': string
              '--delay': string
            }}
          />
        )
      })}
>>>>>>> feature/performance
    </div>
  )
}

