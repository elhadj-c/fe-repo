# YouTube to Spotify Playlist Converter

A Next.js application that converts YouTube playlists to Spotify playlists by matching YouTube videos with Spotify tracks.

## Prerequisites

Before launching the app, ensure you have the following installed:

- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

You can verify your installation by running:
```bash
node --version
npm --version
```

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd yt-convert
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   Or if you're using yarn:
   ```bash
   yarn install
   ```
   
   Or if you're using pnpm:
   ```bash
   pnpm install
   ```

## Environment Variables (Optional)

The app can work without API keys, but for full functionality, you'll need to set up environment variables. Create a `.env.local` file in the `yt-convert` directory:

```bash
cd yt-convert
```

Create a `.env.local` file with the following variables:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

**Note:** The app will work without these keys, but will use placeholder data. To get full functionality:
- **YouTube API Key:** Get it from [Google Cloud Console](https://console.cloud.google.com/)
- **Spotify Credentials:** Get them from [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

## Launching the App

### Development Mode

1. **Navigate to the app directory** (if not already there):
   ```bash
   cd yt-convert
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Or with yarn:
   ```bash
   yarn dev
   ```
   
   Or with pnpm:
   ```bash
   pnpm dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

The development server will automatically reload when you make changes to the code.

### Production Mode

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm start` - Starts the production server (requires `npm run build` first)
- `npm run lint` - Runs ESLint to check for code issues

## Project Structure

```
fe-repo/
├── yt-convert/          # Main application directory
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── lib/            # Utility functions
│   └── public/         # Static assets
├── cursor_rules.md     # Cursor IDE rules
└── gitflow_rules.md    # Git workflow guidelines
```

## Troubleshooting

- **Port 3000 already in use?** The app will automatically try the next available port, or you can specify a different port:
  ```bash
   npm run dev -- -p 3001
   ```

- **Dependencies not installing?** Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

- **Build errors?** Make sure you're using a compatible Node.js version (18+).

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

