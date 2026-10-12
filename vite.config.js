import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages ให้บริการเว็บที่ /<ชื่อ repo>/ จึงตั้ง BASE_PATH ตอน build (ดู .github/workflows/deploy.yml)
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    // Remotion Player + framer-motion รวมกันมีขนาดใหญ่ตามธรรมชาติ
    chunkSizeWarningLimit: 1000,
  },
})
