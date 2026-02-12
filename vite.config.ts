import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This replaces process.env.API_KEY with its actual value during the build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  // Setting base to / ensures root resolution on Vercel
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});

