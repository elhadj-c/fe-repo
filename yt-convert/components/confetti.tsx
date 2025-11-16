'use client'

import { useEffect, useState } from 'react'

interface ConfettiProps {
  x: number
  y: number
  onComplete: () => void
}

export function Confetti({ x, y, onComplete }: ConfettiProps) {
  const [particles] = useState(() => {
    // Generate 8-12 confetti particles with random colors
    const colors = [
      '#1DB954', // Spotify green
      '#1ed760', // Lighter green
      '#1aa34a', // Darker green
      '#169c3f', // Dark green
      '#ffffff', // White
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
    </div>
  )
}

