import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  // Disable CSP for development to avoid blocking issues
  // server: {
  //   headers: {
  //     'Content-Security-Policy': [
  //       "default-src 'self'",
  //       "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  //       "style-src 'self' 'unsafe-inline'",
  //       "connect-src 'self' https://generativelanguage.googleapis.com",
  //       "font-src 'self' data: https:",
  //       "img-src 'self' data: https:"
  //     ].join('; ')
  //   }
  // }
})
