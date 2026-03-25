import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This replaces process.env.GEMINI_API_KEY with its actual value during the build
    // It will first check for GEMINI_API_KEY, then VITE_GEMINI_API_KEY, then fall back to an empty string
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '')
  },
  // Setting base to / ensures root resolution on Vercel
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});