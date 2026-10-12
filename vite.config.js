import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Remotion Player + framer-motion รวมกันมีขนาดใหญ่ตามธรรมชาติ
    chunkSizeWarningLimit: 1000,
  },
})
