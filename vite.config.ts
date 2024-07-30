import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({ 
  server: {
    // cors: false,
    proxy: {
      '/api/chat': {
        target: 'https://www.blackbox.ai',
        changeOrigin: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    } ,
  },
  plugins: [react()],
})