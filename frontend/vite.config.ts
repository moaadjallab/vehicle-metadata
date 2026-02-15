import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/signals': 'http://localhost:8080',
      '/legal-purposes': 'http://localhost:8080',
      '/data-requests': 'http://localhost:8080',
    }
  }
})