

// https://vitejs.dev/config/

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import reactRefresh from '@vitejs/plugin-react-refresh';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env
const env = dotenv.parse(readFileSync('.env'));

export default defineConfig({
  server: {
    proxy: {
        '/api': {
            target: 'http://localhost:8000',
            changeOrigin: true,
            
        }
    }
},
  plugins: [react(),reactRefresh()],
  define: {
    'process.env': {
      REACT_APP_PUSHER_APP_ID: JSON.stringify(env.PUSHER_APP_ID),
      REACT_APP_PUSHER_APP_KEY: JSON.stringify(env.PUSHER_APP_KEY),
      REACT_APP_PUSHER_APP_SECRET: JSON.stringify(env.PUSHER_APP_SECRET),
      REACT_APP_PUSHER_HOST: JSON.stringify(env.PUSHER_HOST),
      REACT_APP_PUSHER_PORT: JSON.stringify(env.PUSHER_PORT),
      REACT_APP_PUSHER_SCHEME: JSON.stringify(env.PUSHER_SCHEME),
      REACT_APP_PUSHER_APP_CLUSTER: JSON.stringify(env.PUSHER_APP_CLUSTER),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  proxy: {
    '/api': 'http://localhost:8000'
  },
  optimizeDeps: {
    include: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion', '@react-three/fiber', '@react-three/drei']
  },
})

