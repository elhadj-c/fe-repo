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

## Deploying to Vercel

**IMPORTANT:** This project has the Next.js app in the `yt-convert` subdirectory. You **must** configure the Root Directory in Vercel dashboard settings.

### Steps to Deploy:

1. **Push your code to GitHub** (if not already done)

2. **Go to [Vercel](https://vercel.com)** and sign in

3. **Click "New Project"** and import your GitHub repository

4. **CRITICAL: Set Root Directory BEFORE deploying:**
   - In the project configuration screen, look for **Root Directory**
   - Click **Edit** or **Configure**
   - Select **Other** and enter: `yt-convert`
   - **Do NOT deploy yet** - continue with the next steps

5. **Configure Environment Variables** (if using API keys):
   - In the same configuration screen, go to "Environment Variables"
   - Add:
     - `YOUTUBE_API_KEY`
     - `SPOTIFY_CLIENT_ID`
     - `SPOTIFY_CLIENT_SECRET`

6. **Deploy** - Now click Deploy. The `vercel.json` file will handle the install command with legacy peer deps.

### If you get a 404 error:

**The Root Directory MUST be set in Vercel Dashboard - it cannot be set in vercel.json.** Follow these steps:

#### Step 1: Manually configure Root Directory in Vercel Dashboard

**This is REQUIRED - Root Directory cannot be set in vercel.json:**

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **General**
4. Scroll down to **Root Directory**
5. Click **Edit**
6. Select **Other** and enter: `yt-convert`
7. Click **Save**

#### Step 2: Verify vercel.json is committed (for install command)
```bash
# Make sure vercel.json is in your repository
git add vercel.json
git commit -m "Add vercel.json configuration"
git push
```

#### Step 3: Verify Build Settings

1. In Vercel project settings, go to **Settings** → **General**
2. Check that:
   - **Root Directory** is set to `yt-convert` (this is the most important!)
   - **Framework Preset** is set to `Next.js`
   - **Build Command** is `npm run build` (or leave empty for auto-detection)
   - **Output Directory** is empty (Next.js handles this automatically)
   - **Install Command** should use `npm install --legacy-peer-deps` (or leave empty if vercel.json handles it)

#### Step 4: Redeploy

1. Go to the **Deployments** tab
2. Click the **⋯** (three dots) menu on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic redeployment

#### Step 5: Check Build Logs

If still getting 404, check the build logs:
1. Go to **Deployments** tab
2. Click on the failed deployment
3. Check the **Build Logs** for any errors
4. Look for messages about missing files or build failures

#### Alternative: Delete and Recreate Project

If nothing works, you can delete the project and recreate it:
1. In Vercel dashboard, go to project **Settings** → **General**
2. Scroll to bottom and click **Delete Project**
3. Create a new project and import your repository
4. **IMPORTANT:** When configuring, set **Root Directory** to `yt-convert` before deploying

## Troubleshooting

- **Port 3000 already in use?** The app will automatically try the next available port, or you can specify a different port:
  ```bash
   npm run dev -- -p 3001
   ```

- **Dependencies not installing?** Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

- **Build errors?** Make sure you're using a compatible Node.js version (18+).

- **404 error on Vercel?** See the "Deploying to Vercel" section above. The `vercel.json` file should resolve this by specifying the correct root directory.

- **"Command 'npm install' exited with 1" error?** This usually indicates dependency or Node version issues:
  - The project now includes `engines` in `package.json` to specify Node 18+
  - The `vercel.json` uses `--legacy-peer-deps` flag to handle peer dependency conflicts
  - Make sure your Vercel project is using Node.js 18 or higher:
    - Go to **Settings** → **General** → **Node.js Version**
    - Set it to `18.x` or higher
  - If the error persists, check the build logs for specific package errors
  - You may need to update incompatible packages or use `npm install --legacy-peer-deps` locally to regenerate `package-lock.json`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

