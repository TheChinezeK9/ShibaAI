# ShibaAI

AI study copilot startup

🐕 ShibaAI — Your Study Copilot

ShibaAI is an AI-powered study tool that helps students learn more efficiently by identifying weak areas and generating targeted practice.

Instead of giving generic content, ShibaAI adapts to how you learn.

## Deploy on Render

The included `render.yaml` deploys ShibaAI as one Node web service. The server
serves both the built React app and the API, avoiding cross-origin and frontend
API URL configuration issues.

1. In Render, choose **New > Blueprint** and connect this repository.
2. Enter `GEMINI_API_KEY` when Render prompts for it.
3. Deploy. Render runs the build and start commands from `render.yaml`.

For an existing manually configured Render service, use:

- Root directory: `shibaai`
- Build command: `npm install --prefix server && npm install --prefix client && npm run build --prefix client`
- Start command: `npm start --prefix server`
- Health check path: `/api/health`
- Environment variables: `NODE_ENV=production` and `GEMINI_API_KEY=<your key>`
