'use client'

import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Play, ArrowRight } from 'lucide-react'
import { ConvertedPlaylist } from './converted-playlist'
import { LinkPreview } from './link-preview'
<<<<<<< HEAD
import { Confetti } from './confetti'
=======
import { ThemeToggle } from './theme-toggle'
>>>>>>> feature/dark-mode

interface ConvertedTrack {
  youtubeTitle: string
  spotifyTrack: {
    name: string
    artist: string
    uri: string
    preview: string
  } | null
  status: 'success' | 'pending' | 'error'
  error?: string
}

interface ConfettiState {
  x: number
  y: number
  id: number
}

export function PlaylistConverter() {
  const [youtubeLinks, setYoutubeLinks] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ConvertedTrack[]>([])
  const [error, setError] = useState('')
  const [confettiList, setConfettiList] = useState<ConfettiState[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const confettiIdRef = useRef(0)

  const triggerConfetti = (x: number, y: number) => {
    const id = confettiIdRef.current++
    setConfettiList((prev) => [...prev, { x, y, id }])
  }

  const removeConfetti = (id: number) => {
    setConfettiList((prev) => prev.filter((c) => c.id !== id))
  }

  const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget
    const rect = textarea.getBoundingClientRect()
    // Get cursor position within textarea
    const textBeforeCursor = textarea.value.substring(0, textarea.selectionStart)
    const lines = textBeforeCursor.split('\n')
    const currentLine = lines.length - 1
    const x = rect.left + 12
    const y = rect.top + 20 + currentLine * 20
    triggerConfetti(x, y)
  }

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // Small delay to let the newline be added first
      setTimeout(() => {
        const textarea = e.currentTarget
        const rect = textarea.getBoundingClientRect()
        const textBeforeCursor = textarea.value.substring(0, textarea.selectionStart)
        const lines = textBeforeCursor.split('\n')
        const lineNumber = lines.length - 1
        const x = rect.left + 12
        const y = rect.top + 20 + lineNumber * 20
        triggerConfetti(x, y)
      }, 10)
    }
  }

  const handleConvert = async () => {
    if (!youtubeLinks.trim()) {
      setError('Please enter at least one YouTube link')
      return
    }

    setLoading(true)
    setError('')
    setResults([])

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links: youtubeLinks }),
      })

      if (!response.ok) {
        throw new Error('Failed to convert playlist')
      }

      const data = await response.json()
      setResults(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (results.length > 0) {
    return <ConvertedPlaylist results={results} onReset={() => setResults([])} />
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PlaySync</h1>
              <p className="text-xs text-muted-foreground">YouTube to Spotify</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Convert Your Playlists</h2>
            <p className="text-muted-foreground">
              Paste YouTube links and find their Spotify counterparts instantly
            </p>
          </div>

          <Card className="p-8 bg-card border-border">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  YouTube Links
                </label>
                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Paste YouTube links here (one per line)&#10;Example:&#10;https://www.youtube.com/watch?v=..."
                    value={youtubeLinks}
                    onChange={(e) => {
                      setYoutubeLinks(e.target.value)
                      setError('')
                    }}
                    onClick={handleTextareaClick}
                    onKeyDown={handleTextareaKeyDown}
                    className="min-h-40 resize-none bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                  {confettiList.map((confetti) => (
                    <Confetti
                      key={confetti.id}
                      x={confetti.x}
                      y={confetti.y}
                      onComplete={() => removeConfetti(confetti.id)}
                    />
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Supports YouTube URLs and video IDs
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    {(() => {
                      const linkCount = youtubeLinks
                        .split('\n')
                        .map((line) => line.trim())
                        .filter((line) => line.length > 0).length
                      return `${linkCount} ${linkCount === 1 ? 'link' : 'links'}`
                    })()}
                  </p>
                </div>
              </div>

              <LinkPreview links={youtubeLinks} />

              {error && (
                <div className="p-4 bg-destructive/20 border border-destructive/40 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button
                onClick={handleConvert}
                disabled={loading || !youtubeLinks.trim()}
                className="w-full h-12 text-base font-semibold gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Convert to Spotify
                  </>
                )}
              </Button>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 bg-card border-border hover:bg-secondary transition-colors">
              <div className="text-primary text-2xl font-bold mb-2">100%</div>
              <h3 className="font-semibold text-foreground mb-1">Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                Find exact matches on Spotify
              </p>
            </Card>
            <Card className="p-6 bg-card border-border hover:bg-secondary transition-colors">
              <div className="text-primary text-2xl font-bold mb-2">Instant</div>
              <h3 className="font-semibold text-foreground mb-1">Conversion</h3>
              <p className="text-sm text-muted-foreground">
                Get results in seconds
              </p>
            </Card>
            <Card className="p-6 bg-card border-border hover:bg-secondary transition-colors">
              <div className="text-primary text-2xl font-bold mb-2">Free</div>
              <h3 className="font-semibold text-foreground mb-1">Forever</h3>
              <p className="text-sm text-muted-foreground">
                No payment required
              </p>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card mt-8">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-muted-foreground text-center">
          <p>Set YOUTUBE_API_KEY and SPOTIFY_CLIENT_ID in environment variables to get started</p>
        </div>
      </footer>
    </div>
  )
}
