import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This allows process.env.API_KEY to be replaced during build time by Vercel's environment variables
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  // Vercel expects the app to be served from the root
  base: '/'
});

