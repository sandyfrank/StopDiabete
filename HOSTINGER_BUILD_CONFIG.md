# Hostinger Build Configuration

## Framework
This is a **Vite + React + TypeScript** project.

## Build Configuration

### Install Command
```bash
npm install
```
(This will run `postinstall` which installs frontend dependencies)

### Build Command
```bash
npm run build
```
(This runs `cd frontend && npm ci && npm run build`)

### Output Directory
```
frontend/dist
```

### Node Version
```
18.x or higher
```

## Environment Variables (Optional)

Add these in Hostinger Environment Variables section:

- `VITE_API_URL` - URL of your backend API (e.g., `https://yourdomain.com/api`)

## Project Structure

```
StopDiabete/
├── frontend/          ← Vite React App (what gets deployed)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── dist/         ← Build output (auto-generated)
│
├── backend/           ← Node.js Express API (deploy separately)
│   ├── src/
│   └── package.json
│
└── package.json       ← Root orchestration
```

## Deployment Steps

1. **Framework**: Select "Other" or "Vite" if available
2. **Branch**: `main`
3. **Build Command**: `npm run build`
4. **Publish Directory**: `frontend/dist`
5. **Install Command**: `npm install` (default)
6. **Node Version**: 18.x

## Notes

- Only the **frontend** (React SPA) will be deployed via this method
- The **backend** needs to be deployed separately (via SSH, PM2, or another service)
- The build output is static files (HTML, CSS, JS) served by Hostinger's web server
