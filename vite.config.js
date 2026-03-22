import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Force restart for Tailwind configuration
export default defineConfig({
  plugins: [react()],
})
