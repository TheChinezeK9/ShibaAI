# ShibaAI

AI study copilot startup

🐕 ShibaAI — Your Study Copilot

ShibaAI is an AI-powered study tool that helps students learn more efficiently by identifying weak areas and generating targeted practice.

Instead of giving generic content, ShibaAI adapts to how you learn.

## Deploy on Render

The included `render.yaml` deploys ShibaAI as two Render services: a static
React frontend and a Node API backend.

1. In Render, choose **New > Blueprint** and connect this repository.
2. Enter the requested environment variables when Render prompts for them:
   - Backend `GEMINI_API_KEY`: your Gemini API key.
   - Backend `CLIENT_ORIGIN`: the full frontend URL, such as
     `https://shibaai-web.onrender.com`.
   - Frontend `VITE_API_URL`: the full backend URL, such as
     `https://shibaai-api.onrender.com` (with no trailing `/`).
3. Deploy. Render runs the build and start commands from `render.yaml`.

For existing manually configured services, use:

### Backend web service

- Root directory: `shibaai/server`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`
- Environment variables: `NODE_ENV=production`, `GEMINI_API_KEY=<your key>`,
  and `CLIENT_ORIGIN=<your frontend URL>`

### Frontend static site

- Root directory: `shibaai/client`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL=<your backend URL>`

After changing `VITE_API_URL`, manually redeploy the frontend because Vite
embeds this value during the build.
