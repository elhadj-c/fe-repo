'use client'

import { Card } from '@/components/ui/card'
import { Link2 } from 'lucide-react'

interface LinkPreviewProps {
  links: string
}

export function LinkPreview({ links }: LinkPreviewProps) {
  // Extract valid links from the input
  const extractLinks = (input: string): string[] => {
    return input
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
  }

  const linkList = extractLinks(links)

  if (linkList.length === 0) {
    return null
  }

  return (
    <Card className="p-4 bg-secondary/50 border-border">
      <div className="flex items-start gap-3">
        <Link2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Preview ({linkList.length} {linkList.length === 1 ? 'link' : 'links'})
          </h3>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {linkList.map((link, index) => (
              <div
                key={index}
                className="text-xs text-muted-foreground font-mono bg-background/50 px-2 py-1.5 rounded border border-border/50 truncate"
                title={link}
              >
                {link}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

