import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,       // ✅ force port
    strictPort: true  // ✅ agar busy hai to error dega (auto change nahi karega)
  }
})
