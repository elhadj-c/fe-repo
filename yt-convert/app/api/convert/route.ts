import { NextRequest, NextResponse } from 'next/server'

interface YouTubeVideo {
  title: string
  videoId: string
}

interface SpotifyTrack {
  name: string
  artist: string
  uri: string
  preview: string
}

interface ConvertedTrack {
  youtubeTitle: string
  spotifyTrack: SpotifyTrack | null
  status: 'success' | 'error' | 'pending'
  error?: string
}

function extractVideoId(url: string): string | null {
  // Handle youtube.com/watch?v=ID
  const match1 = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (match1) return match1[1]

  // Handle direct video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return url.trim()
  }

  return null
}

async function getYouTubeVideoTitle(videoId: string): Promise<string | null> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    if (!apiKey) {
      console.warn('YOUTUBE_API_KEY not set - using placeholder')
      return `YouTube Video ${videoId}`
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
    )

    if (!response.ok) return null

    const data = await response.json()
    if (data.items && data.items.length > 0) {
      return data.items[0].snippet.title
    }
    return null
  } catch (error) {
    console.error('Error fetching YouTube video:', error)
    return null
  }
}

async function searchSpotify(query: string): Promise<SpotifyTrack | null> {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.warn('Spotify credentials not set - using placeholder')
      return {
        name: `Matched: ${query}`,
        artist: 'Unknown Artist',
        uri: `spotify:track:placeholder_${Date.now()}`,
        preview: '',
      }
    }

    // Get access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Spotify token')
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Search for track
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!searchResponse.ok) {
      throw new Error('Failed to search Spotify')
    }

    const searchData = await searchResponse.json()

    if (searchData.tracks.items.length > 0) {
      const track = searchData.tracks.items[0]
      return {
        name: track.name,
        artist: track.artists[0].name,
        uri: track.uri,
        preview: track.preview_url || '',
      }
    }

    return null
  } catch (error) {
    console.error('Error searching Spotify:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { links } = await request.json()

    if (!links || typeof links !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const videoIds = links
      .split('\n')
      .map((link: string) => extractVideoId(link.trim()))
      .filter((id: string | null) => id !== null)

    if (videoIds.length === 0) {
      return NextResponse.json(
        { error: 'No valid YouTube links found' },
        { status: 400 }
      )
    }

    const results: ConvertedTrack[] = []

    for (const videoId of videoIds) {
      try {
        // Get YouTube video title
        const title = (await getYouTubeVideoTitle(videoId)) || `YouTube Video ${videoId}`

        // Search Spotify
        const spotifyTrack = await searchSpotify(title)

        results.push({
          youtubeTitle: title,
          spotifyTrack: spotifyTrack,
          status: spotifyTrack ? 'success' : 'error',
          error: spotifyTrack ? undefined : 'Track not found on Spotify',
        })
      } catch (error) {
        results.push({
          youtubeTitle: `Video ${videoId}`,
          spotifyTrack: null,
          status: 'error',
          error: 'Processing error',
        })
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
