// Vite configuration proxy for monorepo
// This file helps build systems locate the actual Vite config in frontend/

import { defineConfig } from 'vite'

export default defineConfig({
  // This config is not used directly
  // The actual config is in frontend/vite.config.ts
  // This file helps some hosting platforms detect the framework
  
  // If this file is executed, show helpful message
  build: {
    outDir: 'frontend/dist',
  },
})
