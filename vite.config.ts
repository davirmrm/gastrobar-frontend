import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const hash = Math.floor(Math.random() * 90000) + 10000;

// https://vitejs.dev/config/
export default defineConfig({
   build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: `[name]${hash}.js`,
        chunkFileNames: `[name]${hash}.js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  plugins: [react()]
})
