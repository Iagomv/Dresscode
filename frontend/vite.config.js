import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
  },
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
  test: {
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
    },
    reporters: ['default', 'junit'],
    outputFile: 'coverage/test-report.xml',
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },

  define: {
    VITE_API_URL: JSON.stringify(process.env.VITE_API_BASE_URL || '/api'),
  },
})
