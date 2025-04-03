import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Fix for WebSocket connection issues
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173, // Ensure client port is explicitly set
    },
    watch: {
      usePolling: true, // Use polling for file changes
    },
    port: 5173,
    strictPort: true, // Don't try other ports if 5173 is taken
  },
  preview: {
    port: 5173,
    strictPort: true,
    host: 'localhost',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173, // Ensure client port is explicitly set
    },
  },
})
