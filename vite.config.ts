import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({ 
  server: {
    cors: false,
    proxy: {
      '/api': {
        target: 'https://www.blackbox.ai',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  } ,
  plugins: [react()],
})