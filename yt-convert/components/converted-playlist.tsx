'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, CheckCircle, AlertCircle } from 'lucide-react'

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

interface ConvertedPlaylistProps {
  results: ConvertedTrack[]
  onReset: () => void
}

export function ConvertedPlaylist({ results, onReset }: ConvertedPlaylistProps) {
  const successful = results.filter((r) => r.status === 'success').length
  const failed = results.filter((r) => r.status === 'error').length
  const spotifyUris = results
    .filter((r) => r.status === 'success' && r.spotifyTrack)
    .map((r) => r.spotifyTrack!.uri)

  const handleDownload = () => {
    const data = results.map((r) => ({
      youtube: r.youtubeTitle,
      spotify: r.spotifyTrack
        ? `${r.spotifyTrack.name} - ${r.spotifyTrack.artist}`
        : 'Not found',
      status: r.status,
    }))
    const csv = [
      ['YouTube', 'Spotify Match', 'Status'],
      ...data.map((d) => [d.youtube, d.spotify, d.status]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'playlist-conversion.csv'
    a.click()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button
            onClick={onReset}
            variant="ghost"
            className="gap-2 text-primary hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Converter
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Conversion Results</h2>
            <p className="text-muted-foreground">
              {successful} matched • {failed} not found • {results.length} total
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-primary">{successful}</div>
                <p className="text-sm text-muted-foreground">Successfully Matched</p>
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-destructive">{failed}</div>
                <p className="text-sm text-muted-foreground">Not Found</p>
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-primary">
                  {Math.round((successful / results.length) * 100)}%
                </div>
                <p className="text-sm text-muted-foreground">Match Rate</p>
              </div>
            </Card>
          </div>

          <div className="space-y-2">
            {results.map((result, idx) => (
              <Card
                key={idx}
                className="p-4 bg-card border-border hover:bg-secondary transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">
                    {result.status === 'success' && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                    {result.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {result.youtubeTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">YouTube</p>
                    </div>
                    {result.spotifyTrack && (
                      <div>
                        <p className="text-sm font-semibold text-primary truncate">
                          {result.spotifyTrack.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          by {result.spotifyTrack.artist}
                        </p>
                      </div>
                    )}
                    {result.error && (
                      <p className="text-xs text-destructive">{result.error}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex-1 gap-2"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </Button>
            <Button
              onClick={onReset}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Convert Another
            </Button>
          </div>

          {spotifyUris.length > 0 && (
            <Card className="p-6 bg-secondary border-border">
              <h3 className="font-semibold text-foreground mb-3">Spotify URIs</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Copy these URIs to create a new Spotify playlist
              </p>
              <div className="p-3 bg-background rounded text-xs font-mono text-muted-foreground overflow-auto max-h-24 border border-border">
                {spotifyUris.join(',')}
              </div>
            </Card>
          )}
        </div>
      </main>

      <footer className="border-t border-border bg-card mt-8">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-muted-foreground text-center">
          <p>Playlist conversion complete. Convert another or export your results.</p>
        </div>
      </footer>
    </div>
  )
}
