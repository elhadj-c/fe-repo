'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false) // Default to light mode
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('theme')
    const htmlElement = document.documentElement
    
    if (savedTheme === 'dark') {
      setIsDark(true)
      htmlElement.classList.add('dark')
    } else {
      setIsDark(false)
      htmlElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    const htmlElement = document.documentElement
    
    if (newIsDark) {
      htmlElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      htmlElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 border-border bg-card hover:bg-secondary"
        aria-label="Toggle theme"
        disabled
      >
        <Moon className="h-4 w-4 text-foreground" />
      </Button>
    )
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="h-9 w-9 border-border bg-card hover:bg-secondary"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-foreground" />
      ) : (
        <Moon className="h-4 w-4 text-foreground" />
      )}
    </Button>
  )
}

