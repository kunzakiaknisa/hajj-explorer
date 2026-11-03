
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Path repository GitHub Pages
  base: '/hajj-explorer/',

  server: {
    port: 5173,
    host: true
  }
});
